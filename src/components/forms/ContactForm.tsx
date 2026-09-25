"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/config/site";
import {
  ACTIVITY_CHOICES,
  GROUP_EVENT_TYPES,
  LIMITS,
  REQUEST_TYPES,
  normalizePayload,
  validatePayload,
  type ContactPayload,
  type FieldErrors,
  type FormVariant,
  type RequestType,
} from "@/lib/contact-schema";
import { cn } from "@/lib/format";

type Props = {
  variant?: FormVariant;
  defaultType?: RequestType;
  /** Titre affiché dans le message de confirmation */
  className?: string;
};

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const TODAY = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

const noopSubscribe = () => () => {};

const inputCls =
  "block w-full min-h-12 rounded-xl border bg-night/55 px-4 py-3 text-base text-cream placeholder:text-cream/40 transition-colors " +
  "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";

function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-cream">
        {label}
        {required && (
          <span className="text-gold" aria-hidden>
            {" "}*
          </span>
        )}
        {optional && <span className="font-normal text-cream/55"> (facultatif)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-cream/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-error mt-1.5 flex items-start gap-1.5 text-sm">
          <Icon name="info" size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Formulaire unique décliné en 3 variantes :
 *  - contact     : demande générale
 *  - reservation : demande de réservation (jamais confirmée automatiquement)
 *  - group       : anniversaires, groupes, entreprises
 * Validation côté client ET serveur, anti-robot (champ piège + délai).
 */
export function ContactForm({ variant = "contact", defaultType, className }: Props) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const initialType: RequestType | "" =
    defaultType ?? (variant === "reservation" ? "reservation" : variant === "group" ? "groupe" : "");

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    requestType: initialType as string,
    date: "",
    guests: "",
    eventType: "",
    activities: [] as string[],
    budget: "",
    message: "",
    consent: false,
    website: "",
  });
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const minDate = useSyncExternalStore(noopSubscribe, TODAY, () => undefined);

  // Pré-remplissage depuis l'URL (?type=anniversaire, ?sujet=carte, ?evenement=slug)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const sujet = params.get("sujet");
    const evt = params.get("evenement");
    if (!type && !sujet && !evt) return;
    // Synchronisation ponctuelle depuis l'URL au montage (système externe).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues((v) => {
      const next = { ...v };
      if (type && type in REQUEST_TYPES) next.requestType = type;
      if (sujet === "carte" && !v.message) {
        next.requestType = next.requestType || "question";
        next.message = "Bonjour, pourriez-vous m’envoyer votre carte (plats, boissons et tarifs) ? Merci !";
      }
      if (evt && !v.message) {
        next.requestType = "evenement";
        next.message = `Bonjour, je souhaite réserver pour l’événement « ${evt.replace(/-/g, " ")} ».`;
      }
      return next;
    });
  }, []);

  const payload = (): ContactPayload =>
    normalizePayload({ ...values, variant, startedAt });

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key as string]) {
      const next = validatePayload(normalizePayload({ ...values, [key]: value, variant, startedAt }));
      setErrors((e) => ({ ...e, [key]: next[key as keyof FieldErrors] }));
    }
  };

  const blur = (key: keyof FieldErrors) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const next = validatePayload(payload());
    setErrors((e) => ({ ...e, [key]: next[key] }));
  };

  const a11y = (key: keyof FieldErrors, hint = false) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id(key)}-error` : hint ? `${id(key)}-hint` : undefined,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = payload();
    const found = validatePayload(p);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: FieldErrors };
      if (res.ok && data.ok) {
        setStatus({ state: "success" });
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (data.fieldErrors) setErrors(data.fieldErrors);
      setStatus({
        state: "error",
        message: data.error ?? "Une erreur est survenue. Réessayez dans un instant ou contactez-nous sur Instagram.",
      });
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus({
        state: "error",
        message: "Connexion impossible. Vérifiez votre réseau puis réessayez, ou contactez-nous sur Instagram.",
      });
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  /* ---------- Confirmation ---------- */
  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={cn("rounded-[1.75rem] border border-leaf/50 bg-jungle-dark/70 p-8 text-center md:p-12", className)}
      >
        <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-gold text-night">
          <Icon name="check" size={32} />
        </span>
        <h3 className="text-3xl font-semibold text-cream">Merci, c’est bien reçu !</h3>
        <p className="mx-auto mt-4 max-w-md text-cream/80">
          {variant === "contact"
            ? "Votre message a bien été envoyé à l’équipe du Jungle. Nous vous répondrons dès que possible."
            : "Votre demande a bien été envoyée. Ce n’est pas encore une réservation confirmée : l’équipe du Jungle vous recontactera pour valider la disponibilité."}
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setValues((v) => ({ ...v, message: "", date: "", guests: "", activities: [], budget: "" }));
            setTouched({});
            setErrors({});
            setStartedAt(Date.now());
            setStatus({ state: "idle" });
          }}
        >
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  const needsDate = variant !== "contact";
  const submitting = status.state === "submitting";
  const submitLabel =
    variant === "reservation" ? "Envoyer ma demande de réservation" : variant === "group" ? "Envoyer ma demande" : "Envoyer le message";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className={cn("rounded-[1.75rem] border border-cream/10 bg-jungle-dark/60 p-6 backdrop-blur-sm md:p-10", className)}
      aria-busy={submitting}
    >
      <p className="mb-6 text-sm text-cream/65">
        Les champs marqués d’un <span className="text-gold">*</span> sont obligatoires.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id={id("name")} label="Nom" required error={errors.name}>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            className={cn(inputCls, errors.name ? "border-error" : "border-cream/15")}
            {...a11y("name")}
          />
        </Field>

        <Field id={id("email")} label="Email" required error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            className={cn(inputCls, errors.email ? "border-error" : "border-cream/15")}
            {...a11y("email")}
          />
        </Field>

        <Field id={id("phone")} label="Téléphone" optional error={errors.phone}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            className={cn(inputCls, errors.phone ? "border-error" : "border-cream/15")}
            {...a11y("phone")}
          />
        </Field>

        {variant === "group" ? (
          <Field id={id("eventType")} label="Type d’événement" required error={errors.eventType}>
            <select
              id={id("eventType")}
              name="eventType"
              value={values.eventType}
              onChange={(e) => {
                const val = e.target.value;
                set("eventType", val);
                const rt: RequestType = val.startsWith("Anniversaire")
                  ? "anniversaire"
                  : val.startsWith("Entreprise") || val === "Team building"
                    ? "entreprise"
                    : val === "Événement privé"
                      ? "evenement"
                      : "groupe";
                setValues((v) => ({ ...v, eventType: val, requestType: rt }));
              }}
              onBlur={() => blur("eventType")}
              className={cn(inputCls, errors.eventType ? "border-error" : "border-cream/15")}
              {...a11y("eventType")}
            >
              <option value="">Choisir…</option>
              {GROUP_EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <Field id={id("requestType")} label="Type de demande" required error={errors.requestType}>
            <select
              id={id("requestType")}
              name="requestType"
              value={values.requestType}
              onChange={(e) => set("requestType", e.target.value)}
              onBlur={() => blur("requestType")}
              className={cn(inputCls, errors.requestType ? "border-error" : "border-cream/15")}
              {...a11y("requestType")}
            >
              <option value="">Choisir…</option>
              {Object.entries(REQUEST_TYPES).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field id={id("date")} label="Date souhaitée" required={needsDate} optional={!needsDate} error={errors.date}>
          <input
            id={id("date")}
            name="date"
            type="date"
            min={minDate}
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            onBlur={() => blur("date")}
            className={cn(inputCls, "[color-scheme:dark]", errors.date ? "border-error" : "border-cream/15")}
            {...a11y("date")}
          />
        </Field>

        <Field
          id={id("guests")}
          label={variant === "group" ? "Nombre de participants" : "Nombre de personnes"}
          required={needsDate}
          optional={!needsDate}
          error={errors.guests}
        >
          <input
            id={id("guests")}
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={LIMITS.maxGuests}
            value={values.guests}
            onChange={(e) => set("guests", e.target.value)}
            onBlur={() => blur("guests")}
            className={cn(inputCls, errors.guests ? "border-error" : "border-cream/15")}
            {...a11y("guests")}
          />
        </Field>

        {variant !== "contact" && (
          <fieldset className="md:col-span-2">
            <legend className="mb-3 text-sm font-semibold text-cream">
              Activités souhaitées <span className="font-normal text-cream/55">(facultatif)</span>
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {ACTIVITY_CHOICES.map((a) => {
                const checked = values.activities.includes(a);
                return (
                  <label
                    key={a}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                      "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                      checked ? "border-gold bg-gold/15 text-cream" : "border-cream/20 text-cream/80 hover:border-cream/40",
                    )}
                  >
                    <input
                      type="checkbox"
                      name="activities"
                      value={a}
                      checked={checked}
                      onChange={(e) =>
                        set(
                          "activities",
                          e.target.checked ? [...values.activities, a] : values.activities.filter((x) => x !== a),
                        )
                      }
                      className="sr-only"
                    />
                    <Icon name={checked ? "check" : "leaf"} size={16} className={checked ? "text-gold" : "text-cream/40"} />
                    {a}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {variant === "group" && (
          <Field
            id={id("budget")}
            label="Budget envisagé"
            optional
            error={errors.budget}
            hint="Pour aider l’équipe à vous proposer une solution adaptée."
            className="md:col-span-2"
          >
            <input
              id={id("budget")}
              name="budget"
              maxLength={LIMITS.budget}
              value={values.budget}
              onChange={(e) => set("budget", e.target.value)}
              onBlur={() => blur("budget")}
              className={cn(inputCls, errors.budget ? "border-error" : "border-cream/15")}
              {...a11y("budget", true)}
            />
          </Field>
        )}

        <Field
          id={id("message")}
          label="Message"
          required={variant === "contact"}
          optional={variant !== "contact"}
          error={errors.message}
          hint={variant === "reservation" ? "Heure d’arrivée souhaitée, âge des enfants, demande particulière…" : undefined}
          className="md:col-span-2"
        >
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            maxLength={LIMITS.message}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            className={cn(inputCls, "resize-y", errors.message ? "border-error" : "border-cream/15")}
            {...a11y("message", variant === "reservation")}
          />
        </Field>

        {/* Champ piège anti-robot : invisible pour les humains */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Ne pas remplir ce champ</label>
          <input
            id={id("website")}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-cream/80">
            <input
              type="checkbox"
              name="consent"
              checked={values.consent}
              onChange={(e) => {
                set("consent", e.target.checked);
                setTouched((t) => ({ ...t, consent: true }));
                setErrors((er) => ({ ...er, consent: e.target.checked ? undefined : er.consent }));
              }}
              className="mt-0.5 size-5 shrink-0 accent-[var(--color-orange)]"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
            />
            <span>
              J’accepte que mes données soient utilisées par {SITE.name} uniquement pour répondre à ma demande.{" "}
              <Link href="/confidentialite" className="text-gold underline underline-offset-2">
                Politique de confidentialité
              </Link>
              <span className="text-gold" aria-hidden>
                {" "}*
              </span>
            </span>
          </label>
          {errors.consent && (
            <p id={`${id("consent")}-error`} className="text-error mt-1.5 flex items-start gap-1.5 pl-8 text-sm">
              <Icon name="info" size={16} className="mt-0.5 shrink-0" />
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="mt-6 outline-none">
        {status.state === "error" && (
          <p role="alert" className="text-error flex items-start gap-2 rounded-xl border border-error bg-night/50 p-4 text-sm">
            <Icon name="info" size={18} className="mt-0.5 shrink-0" />
            <span>
              {status.message}{" "}
              <a href={SITE.social.instagram.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                Instagram {SITE.social.instagram.handle}
              </a>
            </span>
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} icon={submitting ? undefined : "arrow-right"}>
          {submitting ? "Envoi en cours…" : submitLabel}
        </Button>
        {variant !== "contact" && (
          <p className="max-w-xs text-xs text-cream/55">
            Demande sans engagement : la réservation n’est confirmée qu’après réponse de l’équipe.
          </p>
        )}
      </div>
    </form>
  );
}
