// types/database.ts

export type Client = {
  id: string;
  prenom: string;
  nom: string;
  email: string | null;
  telephone: string | null;
  date_naissance: string | null;
  date_inscription: string;
  acquisition_source: string | null;
  acquisition_detail: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  actif: boolean;
  deleted_at: string | null;
  anonymized_at: string | null;
  created_at: string;
  updated_at: string;
  auth_id: string | null;
};

export type Adresse = {
  id: string;
  ligne1: string;
  ligne2: string | null;
  code_postal: string | null;
  ville: string | null;
  pays: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
};

export type Club = {
  id: string;
  nom: string;
  code: string | null;
  email_contact: string | null;
  telephone: string | null;
  actif: boolean;
  contact_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Formule = {
  id: string;
  nom: string;
  description: string | null;
  prix_cents: number;
  devise: string;
  periode: "JOUR" | "SEMAINE" | "MOIS" | "AN" ; // adapte à ton enum periode_formule
  recurrence: number;
  actif: boolean;
  created_at: string;
  updated_at: string;
};

export type Contrat = {
  id: string;
  client_id: string;
  club_id: string | null;
  reference: string | null;
  statut: "BROUILLON" | "ACTIF" | "SUSPENDU" | "RESILIE"; // adapte à ton enum statut_contrat
  date_debut: string;
  date_fin: string | null;
  conditions_pdf: string | null;
  created_at: string;
  updated_at: string;
};

export type Abonnement = {
  id: string;
  contrat_id: string;
  coach_id: string | null;
  club_id: string | null;
  formule_id: string;
  date_debut: string;
  date_fin: string | null;
  statut: "ACTIF" | "SUSPENDU" | "RESILIE"; // adapte à ton enum statut_abonnement
  commentaires: string | null;
  created_at: string;
  updated_at: string;
};

export type OptionAbonnement = {
  id: string;
  code: string;
  libelle: string;
  description: string | null;
  prix_cents: number;
  actif: boolean;
  created_at: string;
  updated_at: string;
};

export type AbonnementOption = {
  abonnement_id: string;
  option_id: string;
  quantite: number;
  prix_cents_applique: number | null;
  option?: OptionAbonnement; // jointure
};
