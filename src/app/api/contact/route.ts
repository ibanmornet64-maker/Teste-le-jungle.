/**
 * API des formulaires (contact, réservation, groupes).
 *
 * Sécurité :
 *  - validation serveur (mêmes règles que le client) ;
 *  - anti-robot : champ piège + délai minimal de remplissage + limite de débit ;
 *  - échappement HTML de toutes les données avant envoi par email ;
 *  - aucune donnée stockée : la demande est seulement transmise ;
 *  - aucun secret côté navigateur : clés dans les variables d'environnement.
 *
 * Envoi (voir .env.example) :
 *  - RESEND_API_KEY + CONTACT_TO_EMAIL (+ CONTACT_FROM_EMAIL) → email via Resend
 *  - ou CONTACT_WEBHOOK_URL → POST JSON (Make, Zapier, n8n, Formspree…)
 *  - ou CONTACT_DELIVERY=console → affichage dans les logs (développement uniquement)
 *  Sans configuration, l'API renvoie une erreur explicite : jamais d'envoi silencieux.
 */
import { NextResponse } from "next/server";
import {
  REQUEST_TYPES,
  looksLikeBot,
  normalizePayload,
  validatePayload,
  type ContactPayload,
} from "@/lib/contact-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** Vercel : durée maximale d'exécution de la fonction (secondes). */
export const maxDuration = 15;

const MAX_BODY = 16 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Limitation simple en mémoire. Sur Vercel, chaque instance de fonction garde
// son propre compteur : c'est un frein anti-abus, pas une garantie absolue
// (le champ piège et le délai minimum complètent la protection).
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function summary(p: ContactPayload): [string, string][] {
  const rows: [string, string][] = [
    ["Formulaire", p.variant === "reservation" ? "Demande de réservation" : p.variant === "group" ? "Groupe / anniversaire" : "Contact"],
    ["Type de demande", REQUEST_TYPES[p.requestType]],
    ["Nom", p.name],
    ["Email", p.email],
  ];
  if (p.phone) rows.push(["Téléphone", p.phone]);
  if (p.eventType) rows.push(["Type d’événement", p.eventType]);
  if (p.date) rows.push(["Date souhaitée", p.date]);
  if (p.guests) rows.push(["Nombre de personnes", p.guests]);
  if (p.activities.length) rows.push(["Activités", p.activities.join(", ")]);
  if (p.budget) rows.push(["Budget", p.budget]);
  rows.push(["Message", p.message || "—"]);
  return rows;
}

function toHtml(p: ContactPayload): string {
  const rows = summary(p)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<h2 style="font-family:sans-serif">Nouvelle demande depuis le site Le Jungle</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table><p style="font-family:sans-serif;font-size:12px;color:#666">Rappel : aucune réservation n’est confirmée automatiquement. Répondez au client pour valider.</p>`;
}

const toText = (p: ContactPayload) => summary(p).map(([k, v]) => `${k} : ${v}`).join("\n");

async function deliver(p: ContactPayload): Promise<"sent" | "not-configured"> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL, CONTACT_DELIVERY } = process.env;
  const subject = `[Le Jungle] ${REQUEST_TYPES[p.requestType]} — ${p.name}`.slice(0, 150);

  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL ?? "Site Le Jungle <onboarding@resend.dev>",
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: p.email,
        subject,
        html: toHtml(p),
        text: toText(p),
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return "sent";
  }

  if (CONTACT_WEBHOOK_URL) {
    const res = await fetch(CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, ...Object.fromEntries(summary(p)), receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
    return "sent";
  }

  if (CONTACT_DELIVERY === "console" && process.env.NODE_ENV !== "production") {
    console.info(`\n——— ${subject} ———\n${toText(p)}\n`);
    return "sent";
  }

  return "not-configured";
}

export async function POST(request: Request) {
  // Exiger du JSON : un site tiers ne peut pas envoyer ce type de requête
  // sans pré-vérification CORS (que nous n'autorisons pas).
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Format de requête non pris en charge." }, { status: 415 });
  }

  // Vercel transmet l'IP du visiteur dans x-real-ip / x-forwarded-for.
  const ip =
    request.headers.get("x-real-ip")?.trim() ||
    (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes envoyées. Merci de patienter quelques minutes." },
      { status: 429 },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "Message trop volumineux." }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const payload = normalizePayload(json);

  if (looksLikeBot(payload)) {
    // Réponse volontairement générique pour ne pas aider les robots.
    return NextResponse.json(
      { ok: false, error: "Votre demande n’a pas pu être validée. Patientez quelques secondes puis réessayez." },
      { status: 400 },
    );
  }

  const fieldErrors = validatePayload(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Certains champs sont à corriger.", fieldErrors },
      { status: 422 },
    );
  }

  try {
    const result = await deliver(payload);
    if (result === "not-configured") {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Le formulaire n’est pas encore relié à une boîte de réception. En attendant, contactez Le Jungle directement sur Instagram.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] échec d’envoi", err);
    return NextResponse.json(
      { ok: false, error: "L’envoi a échoué. Réessayez dans un instant ou contactez-nous sur Instagram." },
      { status: 502 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Méthode non autorisée." }, { status: 405 });
}
