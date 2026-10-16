CREATE TABLE public.demandes_essai (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  prenom text NOT NULL,
  email text,
  pays text NOT NULL,
  date_essai date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.demandes_essai TO service_role;
ALTER TABLE public.demandes_essai ENABLE ROW LEVEL SECURITY;