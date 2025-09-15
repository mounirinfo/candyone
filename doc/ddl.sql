-- =========================================================
-- CandyBody - Schéma PostgreSQL complet (exécution unique)
-- =========================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- gen_random_uuid(), digest
CREATE EXTENSION IF NOT EXISTS citext;   -- e-mails insensibles à la casse

-- =========================
-- ENUMS
-- =========================
DO $$ BEGIN
  CREATE TYPE role_employe AS ENUM ('COACH','STAFF','ADMIN_SITE','PRESIDENT_CLUB');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE statut_contrat AS ENUM ('BROUILLON','ACTIF','SUSPENDU','RESILIE','TERMINE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE statut_abonnement AS ENUM ('ACTIF','PAUSE','TERMINE','ANNULE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE periode_formule AS ENUM ('JOUR','SEMAINE','MOIS','AN','SEANCE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE statut_seance AS ENUM ('PLANIFIEE','REALISEE','ANNULEE','ABSENT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE type_partenaire AS ENUM ('OSTEO','KINE','NUTRITIONNISTE','AUTRE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE canal_satisfaction AS ENUM ('EMAIL','APP','SMS','WEB','AUTRE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE canal_acquisition AS ENUM ('DIRECT','RECOMMANDATION','GOOGLE','FACEBOOK','INSTAGRAM','SNAP','TIKTOK','AFFILIATION','AUTRE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE statut_compte_client AS ENUM ('ACTIVE','DISABLED','PENDING');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE statut_facture AS ENUM ('DRAFT','ISSUED','PAID','PARTIAL','VOID','CANCELLED','REFUNDED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE statut_paiement AS ENUM ('PENDING','SUCCEEDED','FAILED','REFUNDED','PARTIAL_REFUND');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE mode_paiement AS ENUM ('CB','SEPA','CASH','CHEQUE','PAYPAL','OTHER');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE fournisseur_paiement AS ENUM ('STRIPE','MOLLIE','PAYPAL','AUTRE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE type_avantage AS ENUM ('REMISE_POURCENT','REMISE_FIXE','OFFERT','AVOIR');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE scope_avantage AS ENUM ('ABONNEMENT','OPTION','FACTURE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE auteur_note AS ENUM ('EMPLOYE','CLIENT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE visibilite_note AS ENUM ('INTERNE','PARTAGE_CLIENT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE acteur_rgpd AS ENUM ('EMPLOYE','SYSTEM');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE action_rgpd AS ENUM ('READ','EXPORT','UPDATE','DELETE','ANONYMIZE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE type_demande_rgpd AS ENUM ('ACCES','RECTIFICATION','SUPPRESSION','PORTABILITE','OPPOSITION');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE statut_demande_rgpd AS ENUM ('OUVERTE','EN_COURS','CLOTUREE','REJETEE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =========================
-- TABLES DE BASE
-- =========================

-- Employés (tous collaborateurs : coachs, staff, admin site, président, etc.)
CREATE TABLE IF NOT EXISTS employe (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prenom          TEXT NOT NULL,
  nom             TEXT NOT NULL,
  email_pro       citext UNIQUE,
  telephone       TEXT,
  role            role_employe NOT NULL DEFAULT 'COACH',
  notes           TEXT, -- remarques internes
  actif           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_employe_role ON employe(role);

-- Clients
CREATE TABLE IF NOT EXISTS client (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prenom           TEXT NOT NULL,
  nom              TEXT NOT NULL,
  email            citext UNIQUE,
  telephone        TEXT,
  date_naissance   DATE,
  date_inscription DATE NOT NULL DEFAULT CURRENT_DATE,
  acquisition_source canal_acquisition,
  acquisition_detail TEXT,
  utm_source       TEXT,
  utm_medium       TEXT,
  utm_campaign     TEXT,
  utm_term         TEXT,
  utm_content      TEXT,
  actif            BOOLEAN NOT NULL DEFAULT TRUE,
  deleted_at       TIMESTAMPTZ,
  anonymized_at    TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_client_acq ON client(acquisition_source);
CREATE INDEX IF NOT EXISTS idx_client_deleted ON client(deleted_at);

-- Adresses + liaisons
CREATE TABLE IF NOT EXISTS adresse (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ligne1          TEXT NOT NULL,
  ligne2          TEXT,
  code_postal     TEXT,
  ville           TEXT,
  pays            TEXT NOT NULL DEFAULT 'FR',
  latitude        NUMERIC(9,6),
  longitude       NUMERIC(9,6),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS client_adresse (
  client_id      UUID NOT NULL REFERENCES client(id) ON DELETE CASCADE,
  adresse_id     UUID NOT NULL REFERENCES adresse(id) ON DELETE CASCADE,
  est_principale BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (client_id, adresse_id)
);

CREATE TABLE IF NOT EXISTS employe_adresse (
  employe_id     UUID NOT NULL REFERENCES employe(id) ON DELETE CASCADE,
  adresse_id     UUID NOT NULL REFERENCES adresse(id) ON DELETE CASCADE,
  est_principale BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (employe_id, adresse_id)
);

-- Clubs partenaires (Basic-Fit Ermont, etc.) - société CandyBody unique
CREATE TABLE IF NOT EXISTS club (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom           TEXT NOT NULL,
  code          TEXT UNIQUE,
  email_contact citext,
  telephone     TEXT,
  actif         BOOLEAN NOT NULL DEFAULT TRUE,
  contact_id    UUID, -- interlocuteur employé côté CandyBody (ex-président)
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_club_contact FOREIGN KEY (contact_id) REFERENCES employe(id)
);

CREATE TABLE IF NOT EXISTS club_adresse (
  club_id        UUID NOT NULL REFERENCES club(id) ON DELETE CASCADE,
  adresse_id     UUID NOT NULL REFERENCES adresse(id) ON DELETE CASCADE,
  est_principale BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (club_id, adresse_id)
);

-- N..N employés ↔ clubs (affectations)
CREATE TABLE IF NOT EXISTS employe_club (
  employe_id    UUID NOT NULL REFERENCES employe(id) ON DELETE CASCADE,
  club_id       UUID NOT NULL REFERENCES club(id) ON DELETE CASCADE,
  date_debut    DATE,
  date_fin      DATE,
  est_principal BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (employe_id, club_id),
  CHECK (date_fin IS NULL OR date_fin >= date_debut)
);
CREATE INDEX IF NOT EXISTS idx_employe_club_club ON employe_club(club_id);

-- Formules tarifaires
CREATE TABLE IF NOT EXISTS formule (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom             TEXT NOT NULL,
  description     TEXT,
  prix_cents      INTEGER NOT NULL CHECK (prix_cents >= 0),
  devise          TEXT NOT NULL DEFAULT 'EUR',
  periode         periode_formule NOT NULL DEFAULT 'MOIS',
  recurrence      INTEGER NOT NULL DEFAULT 1,
  actif           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_formule_actif ON formule(actif);

-- Contrats
CREATE TABLE IF NOT EXISTS contrat (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id      UUID NOT NULL REFERENCES client(id) ON DELETE RESTRICT,
  club_id        UUID REFERENCES club(id) ON DELETE SET NULL,
  reference      TEXT UNIQUE,
  statut         statut_contrat NOT NULL DEFAULT 'BROUILLON',
  date_debut     DATE NOT NULL,
  date_fin       DATE,
  conditions_pdf TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (date_fin IS NULL OR date_fin >= date_debut)
);
CREATE INDEX IF NOT EXISTS idx_contrat_client ON contrat(client_id);
CREATE INDEX IF NOT EXISTS idx_contrat_statut ON contrat(statut);

-- Options d'abonnement
CREATE TABLE IF NOT EXISTS option_abonnement (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT UNIQUE NOT NULL,
  libelle         TEXT NOT NULL,
  description     TEXT,
  prix_cents      INTEGER NOT NULL CHECK (prix_cents >= 0),
  actif           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Abonnements
CREATE TABLE IF NOT EXISTS abonnement (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contrat_id      UUID NOT NULL REFERENCES contrat(id) ON DELETE CASCADE,
  coach_id        UUID REFERENCES employe(id) ON DELETE SET NULL,
  club_id         UUID REFERENCES club(id) ON DELETE SET NULL,
  formule_id      UUID NOT NULL REFERENCES formule(id),
  date_debut      DATE NOT NULL,
  date_fin        DATE,
  statut          statut_abonnement NOT NULL DEFAULT 'ACTIF',
  commentaires    TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (date_fin IS NULL OR date_fin >= date_debut)
);
CREATE INDEX IF NOT EXISTS idx_abonnement_contrat ON abonnement(contrat_id);
CREATE INDEX IF NOT EXISTS idx_abonnement_coach ON abonnement(coach_id);
CREATE INDEX IF NOT EXISTS idx_abonnement_statut ON abonnement(statut);

CREATE TABLE IF NOT EXISTS abonnement_option (
  abonnement_id   UUID NOT NULL REFERENCES abonnement(id) ON DELETE CASCADE,
  option_id       UUID NOT NULL REFERENCES option_abonnement(id),
  quantite        INTEGER NOT NULL DEFAULT 1 CHECK (quantite > 0),
  prix_cents_applique INTEGER,
  PRIMARY KEY (abonnement_id, option_id)
);

-- Séances
CREATE TABLE IF NOT EXISTS seance (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  abonnement_id   UUID NOT NULL REFERENCES abonnement(id) ON DELETE CASCADE,
  coach_id        UUID REFERENCES employe(id) ON DELETE SET NULL,
  club_id         UUID REFERENCES club(id) ON DELETE SET NULL,
  debut_at        TIMESTAMPTZ NOT NULL,
  fin_at          TIMESTAMPTZ NOT NULL,
  lieu_libre      TEXT,
  statut          statut_seance NOT NULL DEFAULT 'PLANIFIEE',
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (fin_at > debut_at)
);
CREATE INDEX IF NOT EXISTS idx_seance_abonnement ON seance(abonnement_id);
CREATE INDEX IF NOT EXISTS idx_seance_coach ON seance(coach_id);
CREATE INDEX IF NOT EXISTS idx_seance_club ON seance(club_id);
CREATE INDEX IF NOT EXISTS idx_seance_debut ON seance(debut_at);

-- Notes de séance (suivi, auteur & visibilité)
CREATE TABLE IF NOT EXISTS seance_note (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seance_id         UUID NOT NULL REFERENCES seance(id) ON DELETE CASCADE,
  auteur_type       auteur_note NOT NULL,
  auteur_employe_id UUID REFERENCES employe(id) ON DELETE SET NULL,
  auteur_client_id  UUID REFERENCES client(id)  ON DELETE SET NULL,
  visibilite        visibilite_note NOT NULL DEFAULT 'INTERNE',
  contenu           TEXT NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (
    (auteur_type='EMPLOYE' AND auteur_employe_id IS NOT NULL AND auteur_client_id IS NULL) OR
    (auteur_type='CLIENT'  AND auteur_client_id  IS NOT NULL AND auteur_employe_id IS NULL)
  )
);
CREATE INDEX IF NOT EXISTS idx_seance_note_seance ON seance_note(seance_id);

-- Connexions (audit)
CREATE TABLE IF NOT EXISTS connexion (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID REFERENCES client(id) ON DELETE SET NULL,
  email_saisi     citext,
  reussie         BOOLEAN NOT NULL DEFAULT FALSE,
  ip              INET,
  user_agent      TEXT,
  occured_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_connexion_client ON connexion(client_id);
CREATE INDEX IF NOT EXISTS idx_connexion_time ON connexion(occured_at);

-- Satisfaction
CREATE TABLE IF NOT EXISTS satisfaction (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID REFERENCES client(id) ON DELETE SET NULL,
  abonnement_id   UUID REFERENCES abonnement(id) ON DELETE SET NULL,
  seance_id       UUID REFERENCES seance(id) ON DELETE SET NULL,
  note            SMALLINT CHECK (note BETWEEN 0 AND 10),
  commentaire     TEXT,
  canal           canal_satisfaction,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_satisfaction_client ON satisfaction(client_id);
CREATE INDEX IF NOT EXISTS idx_satisfaction_abonnement ON satisfaction(abonnement_id);
CREATE INDEX IF NOT EXISTS idx_satisfaction_seance ON satisfaction(seance_id);

-- Partenaires
CREATE TABLE IF NOT EXISTS partenaire (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom             TEXT NOT NULL,
  type            type_partenaire NOT NULL DEFAULT 'AUTRE',
  email           citext,
  telephone       TEXT,
  club_id         UUID REFERENCES club(id) ON DELETE SET NULL,
  actif           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_partenaire_club ON partenaire(club_id);

-- Callbacks (demandes de rappel)
CREATE TABLE IF NOT EXISTS callback (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id         UUID REFERENCES client(id) ON DELETE SET NULL,
  nom               TEXT,
  telephone         TEXT NOT NULL,
  email             citext,
  message           TEXT,
  prefere_apres     TIMESTAMPTZ,
  statut            TEXT NOT NULL DEFAULT 'NOUVEAU', -- NOUVEAU, APPELE, CLOTURE
  assigne_a_id      UUID REFERENCES employe(id) ON DELETE SET NULL,
  appele_le         TIMESTAMPTZ,
  notes_interne     TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_callback_statut ON callback(statut);
CREATE INDEX IF NOT EXISTS idx_callback_assigne ON callback(assigne_a_id);

-- RBAC simple
CREATE TABLE IF NOT EXISTS role (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT UNIQUE NOT NULL,
  libelle     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS employe_role (
  employe_id  UUID NOT NULL REFERENCES employe(id) ON DELETE CASCADE,
  role_id     UUID NOT NULL REFERENCES role(id) ON DELETE CASCADE,
  PRIMARY KEY (employe_id, role_id)
);

-- Auth client (compte)
CREATE TABLE IF NOT EXISTS compte_client (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID UNIQUE NOT NULL REFERENCES client(id) ON DELETE CASCADE,
  email_login     citext UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL,
  twofa_secret    TEXT,
  statut          statut_compte_client NOT NULL DEFAULT 'ACTIVE',
  last_login_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Facturation
CREATE TABLE IF NOT EXISTS facture (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero             TEXT UNIQUE NOT NULL,           -- ex: 2025-000123
  client_id          UUID NOT NULL REFERENCES client(id) ON DELETE RESTRICT,
  contrat_id         UUID REFERENCES contrat(id) ON DELETE SET NULL,
  club_id            UUID REFERENCES club(id) ON DELETE SET NULL,
  date_emission      DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date           DATE,
  statut             statut_facture NOT NULL DEFAULT 'DRAFT',
  montant_ht_cents   INTEGER NOT NULL DEFAULT 0 CHECK (montant_ht_cents >= 0),
  montant_tva_cents  INTEGER NOT NULL DEFAULT 0 CHECK (montant_tva_cents >= 0),
  montant_ttc_cents  INTEGER NOT NULL DEFAULT 0 CHECK (montant_ttc_cents >= 0),
  meta               JSONB,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_facture_client ON facture(client_id);
CREATE INDEX IF NOT EXISTS idx_facture_statut ON facture(statut);

CREATE TABLE IF NOT EXISTS ligne_facture (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facture_id           UUID NOT NULL REFERENCES facture(id) ON DELETE CASCADE,
  type                 TEXT NOT NULL,  -- 'FORMULE','OPTION','SEANCE','FRAIS','REMISE'
  description          TEXT NOT NULL,
  quantite             NUMERIC(10,2) NOT NULL DEFAULT 1 CHECK (quantite > 0),
  prix_unitaire_cents  INTEGER NOT NULL DEFAULT 0 CHECK (prix_unitaire_cents >= 0),
  taux_tva             NUMERIC(5,2) NOT NULL DEFAULT 0,
  montant_ht_cents     INTEGER NOT NULL DEFAULT 0 CHECK (montant_ht_cents >= 0),
  montant_tva_cents    INTEGER NOT NULL DEFAULT 0 CHECK (montant_tva_cents >= 0),
  montant_ttc_cents    INTEGER NOT NULL DEFAULT 0 CHECK (montant_ttc_cents >= 0),
  abonnement_id        UUID REFERENCES abonnement(id) ON DELETE SET NULL,
  option_id            UUID REFERENCES option_abonnement(id) ON DELETE SET NULL,
  seance_id            UUID REFERENCES seance(id) ON DELETE SET NULL,
  formule_id           UUID REFERENCES formule(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_ligne_facture_facture ON ligne_facture(facture_id);

CREATE TABLE IF NOT EXISTS paiement (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facture_id         UUID NOT NULL REFERENCES facture(id) ON DELETE CASCADE,
  montant_cents      INTEGER NOT NULL CHECK (montant_cents >= 0),
  devise             TEXT NOT NULL DEFAULT 'EUR',
  date_paiement      TIMESTAMPTZ NOT NULL DEFAULT now(),
  mode               mode_paiement NOT NULL,
  fournisseur        fournisseur_paiement,
  external_id        TEXT,
  statut             statut_paiement NOT NULL DEFAULT 'PENDING',
  meta               JSONB,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_paiement_facture ON paiement(facture_id);
CREATE INDEX IF NOT EXISTS idx_paiement_statut ON paiement(statut);

-- Avantages / Promotions
CREATE TABLE IF NOT EXISTS avantage (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code              TEXT UNIQUE NOT NULL,
  libelle           TEXT NOT NULL,
  type              type_avantage NOT NULL,
  valeur            NUMERIC(10,2) NOT NULL,
  scope             scope_avantage NOT NULL,
  date_debut        DATE,
  date_fin          DATE,
  max_utilisations  INTEGER,
  max_par_client    INTEGER,
  actif             BOOLEAN NOT NULL DEFAULT TRUE,
  conditions        TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS avantage_client (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  avantage_id       UUID NOT NULL REFERENCES avantage(id) ON DELETE CASCADE,
  client_id         UUID NOT NULL REFERENCES client(id) ON DELETE CASCADE,
  attribue_par_id   UUID REFERENCES employe(id) ON DELETE SET NULL,
  attribue_le       TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes             TEXT,
  UNIQUE (avantage_id, client_id)
);

CREATE TABLE IF NOT EXISTS avantage_application (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  avantage_id              UUID NOT NULL REFERENCES avantage(id) ON DELETE CASCADE,
  client_id                UUID NOT NULL REFERENCES client(id) ON DELETE CASCADE,
  abonnement_id            UUID REFERENCES abonnement(id) ON DELETE SET NULL,
  ligne_facture_id         UUID REFERENCES ligne_facture(id) ON DELETE SET NULL,
  valeur_appliquee_cents   INTEGER,
  pourcentage_applique     NUMERIC(10,4),
  applied_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes                    TEXT
);
CREATE INDEX IF NOT EXISTS idx_avantage_app_client ON avantage_application(client_id);

-- RGPD : journal & demandes
CREATE TABLE IF NOT EXISTS journal_acces_rgpd (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  acteur_type       acteur_rgpd NOT NULL,
  acteur_employe_id UUID REFERENCES employe(id) ON DELETE SET NULL,
  client_id         UUID REFERENCES client(id) ON DELETE SET NULL,
  action            action_rgpd NOT NULL,
  finalite          TEXT,
  occured_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip                INET,
  user_agent        TEXT
);
CREATE INDEX IF NOT EXISTS idx_rgpd_client ON journal_acces_rgpd(client_id);
CREATE INDEX IF NOT EXISTS idx_rgpd_action ON journal_acces_rgpd(action);

CREATE TABLE IF NOT EXISTS demande_rgpd (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID NOT NULL REFERENCES client(id) ON DELETE CASCADE,
  type            type_demande_rgpd NOT NULL,
  statut          statut_demande_rgpd NOT NULL DEFAULT 'OUVERTE',
  requested_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at    TIMESTAMPTZ,
  processed_by_id UUID REFERENCES employe(id) ON DELETE SET NULL,
  notes           TEXT
);
CREATE INDEX IF NOT EXISTS idx_demande_rgpd_client ON demande_rgpd(client_id);

-- =========================
-- TRIGGER updated_at (générique)
-- =========================
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

-- Appliquer automatiquement à toutes les tables qui possèdent updated_at
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN
    SELECT table_name
    FROM information_schema.columns
    WHERE column_name = 'updated_at'
      AND table_schema = 'public'
  LOOP
    EXECUTE format('
      DO $X$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = %L) THEN
          CREATE TRIGGER %I
          BEFORE UPDATE ON %I
          FOR EACH ROW EXECUTE FUNCTION set_updated_at();
        END IF;
      END $X$;',
      'trg_'||r.table_name||'_updated_at', 'trg_'||r.table_name||'_updated_at', r.table_name
    );
  END LOOP;
END $$;

-- =========================
-- Fonction RGPD : anonymisation client
-- =========================
CREATE OR REPLACE FUNCTION anonymize_client(p_client_id UUID) RETURNS VOID AS $$
DECLARE
  v_token TEXT := encode(digest(p_client_id::text || now()::text, 'sha256'), 'hex');
BEGIN
  -- Désactiver le compte
  UPDATE compte_client
     SET statut = 'DISABLED',
         email_login  = CONCAT('anon+', substr(v_token,1,12), '@example.invalid'),
         password_hash = '' -- remplacer par hash aléatoire si besoin
   WHERE client_id = p_client_id;

  -- Anonymiser le client
  UPDATE client
     SET prenom = 'Anonyme',
         nom = substr(v_token,1,8),
         email = CONCAT('anon+', substr(v_token,1,12), '@example.invalid')::citext,
         telephone = NULL,
         date_naissance = NULL,
         actif = FALSE,
         anonymized_at = now()
   WHERE id = p_client_id;

  -- Anonymiser adresses liées
  UPDATE adresse a
     SET ligne1='[ANONYMISÉ]', ligne2=NULL, code_postal=NULL, ville=NULL,
         latitude=NULL, longitude=NULL, updated_at=now()
   WHERE a.id IN (SELECT adresse_id FROM client_adresse WHERE client_id = p_client_id);

  -- Journaliser
  INSERT INTO journal_acces_rgpd (acteur_type, action, client_id, finalite)
  VALUES ('SYSTEM','ANONYMIZE', p_client_id, 'Exécution anonymisation');
END; $$ LANGUAGE plpgsql;
