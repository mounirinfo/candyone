export const TABLES: Record<string, string> = {
  "employes": "employe",
  "clients": "client",
  "adresses": "adresse",
  "clubs": "club",
  "formules": "formule",
  "contrats": "contrat",
  "options": "option_abonnement",
  "abonnements": "abonnement",
  "seances": "seance",
  "seance-notes": "seance_note",
  "connexions": "connexion",
  "satisfactions": "satisfaction",
  "partenaires": "partenaire",
  "callbacks": "callback",
  "roles": "role",
  "comptes-client": "compte_client",
  "factures": "facture",
  "lignes-facture": "ligne_facture",
  "paiements": "paiement",
  "avantages": "avantage",
  "avantages-client": "avantage_client",
  "applications-avantage": "avantage_application",
  "journal-rgpd": "journal_acces_rgpd",
  "demandes-rgpd": "demande_rgpd",

  // liaisons à clé composite
  "employe-club": "employe_club",
  "client-adresse": "client_adresse",
  "employe-adresse": "employe_adresse",
  "club-adresse": "club_adresse",
  "abonnement-option": "abonnement_option",
} as const;

export function tableFor(resource: string) {
  return TABLES[resource];
}
