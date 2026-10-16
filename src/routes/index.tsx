import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import hero from "@/assets/hero.jpg";
import { submitEssai, PAYS } from "@/lib/essai.functions";

const TITLE = "Essai SUV Horizon — Réservez votre essai gratuit";
const DESC =
  "Réservez un essai du SUV Horizon en Côte d'Ivoire, au Cameroun, au Burkina Faso, au Sénégal ou au Gabon. Demande en 1 minute.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ATOUTS = [
  { t: "Robuste sur toutes les routes", d: "Garde au sol élevée et suspension renforcée pour la ville comme la piste." },
  { t: "Sobre et économique", d: "Moteur optimisé : jusqu'à 6 L/100 km pour aller plus loin à moindre coût." },
  { t: "Confort climatisé", d: "Climatisation bi-zone, sièges spacieux et écran tactile connecté." },
];

const WHATSAPP = "https://wa.me/2250700000000?text=" + encodeURIComponent("Bonjour, je souhaite réserver un essai.");

function Index() {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle");
  const [error, setError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setError("");
    setStatus("sending");
    try {
      const r = await submitEssai({
        data: {
          nom: String(f.get("nom") ?? ""),
          prenom: String(f.get("prenom") ?? ""),
          email: String(f.get("email") ?? ""),
          pays: String(f.get("pays") ?? "") as (typeof PAYS)[number],
          date_essai: String(f.get("date_essai") ?? ""),
          website: String(f.get("website") ?? ""),
          startedAt: startedAt.current,
        },
      });
      if (r.ok) setStatus("ok");
      else { setError(r.error); setStatus("idle"); }
    } catch {
      setError("Connexion impossible pour le moment. Réessayez dans un instant.");
      setStatus("idle");
    }
  }

  return (
    <main>
      <section className="relative min-h-[85vh] flex items-end">
        <img src={hero} alt="SUV Horizon noir garé sur une route côtière au coucher du soleil" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-16 pt-32">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Nouveau SUV Horizon</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl text-foreground max-w-2xl leading-tight">Prenez le volant avant tout le monde</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">Un essai gratuit, près de chez vous, à la date de votre choix.</p>
          <a href="#formulaire" className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105">Réserver un essai</a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20">
        <h2 className="font-display text-3xl text-foreground">Ses atouts</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ATOUTS.map((a, i) => (
            <article key={a.t} className="rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-3xl text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold text-card-foreground">{a.t}</h3>
              <p className="mt-2 text-muted-foreground">{a.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="formulaire" className="mx-auto max-w-2xl px-5 pb-28 scroll-mt-6">
        <h2 className="font-display text-3xl text-foreground">Réserver un essai</h2>
        {status === "ok" ? (
          <div role="status" className="mt-8 rounded-2xl border border-primary bg-card p-8 text-center">
            <p className="text-2xl font-semibold text-foreground">Merci, votre demande est bien enregistrée !</p>
            <p className="mt-2 text-muted-foreground">Notre équipe vous contactera pour confirmer votre essai.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
            <Field label="Nom *"><input name="nom" required maxLength={100} className="field" /></Field>
            <Field label="Prénom *"><input name="prenom" required maxLength={100} className="field" /></Field>
            <Field label="Email (facultatif)"><input name="email" type="email" maxLength={255} className="field" /></Field>
            <Field label="Pays *">
              <select name="pays" required defaultValue="" className="field">
                <option value="" disabled>Choisir…</option>
                {PAYS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Date d'essai souhaitée *" full><input name="date_essai" type="date" required min={today} className="field" /></Field>
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label>Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            {error && <p role="alert" className="sm:col-span-2 text-destructive">{error}</p>}
            <button disabled={status === "sending"} className="sm:col-span-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
              {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
            </button>
          </form>
        )}
      </section>

      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Nous contacter sur WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-glow transition hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>
      </a>
    </main>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={"flex flex-col gap-2 text-sm font-medium text-card-foreground " + (full ? "sm:col-span-2" : "")}>
      {label}
      {children}
    </label>
  );
}
