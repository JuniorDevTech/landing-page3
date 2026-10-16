import { z } from "zod";

export const PAYS = ["Côte d'Ivoire", "Cameroun", "Burkina Faso", "Sénégal", "Gabon"] as const;

const schema = z.object({
  nom: z.string().trim().min(1, "Nom obligatoire").max(100),
  prenom: z.string().trim().min(1, "Prénom obligatoire").max(100),
  email: z.union([z.literal(""), z.string().trim().email("Email invalide").max(255)]),
  pays: z.enum(PAYS),
  date_essai: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide"),
  website: z.string().optional(), // honeypot
  startedAt: z.number(),
});

export async function submitEssai({ data }: { data: unknown }) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Champs invalides." };
  }
  const payload = parsed.data;

  // Anti-spam : champ piège rempli ou envoi trop rapide (< 2 s)
  if (payload.website || Date.now() - payload.startedAt < 2000) {
    return { ok: false as const, error: "Envoi bloqué par l'anti-spam. Patientez quelques secondes et réessayez." };
  }

  const today = new Date().toISOString().slice(0, 10);
  if (payload.date_essai < today) {
    return { ok: false as const, error: "La date d'essai doit être dans le futur." };
  }

  try {
    const response = await fetch("http://localhost:3001/api/demandes-essai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: payload.nom,
        prenom: payload.prenom,
        email: payload.email || "",
        pays: payload.pays,
        date_essai_souhaitee: payload.date_essai,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return { ok: false as const, error: result.message || "Erreur d'enregistrement, réessayez." };
    }

    return { ok: true as const };
  } catch (error) {
    console.error("Erreur API:", error);
    return { ok: false as const, error: "Connexion impossible pour le moment. Réessayez dans un instant." };
  }
}
