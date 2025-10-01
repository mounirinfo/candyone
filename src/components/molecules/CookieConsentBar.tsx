"use client";

import React from "react";
import CookieConsent from "react-cookie-consent";

// 🎨 Couleurs CandyBody
export const Sky = "#ddf9ff";
export const Cyan = "#40a2ff";
export const Pink = "#ff48b0";

const CookieConsentBar: React.FC = () => {
  return (
    <CookieConsent
      location="bottom"
      cookieName="siteCookieConsent"
      buttonText="Accepter"
      declineButtonText="Refuser"
      enableDeclineButton
      style={{
        background: Cyan, // Fond bleu Cyan
        color: Sky, // Texte en Sky
        fontSize: "14px",
        fontWeight: "500",
      }}
      buttonStyle={{
        background: Sky, // Bouton blanc/bleu clair
        color: Cyan, // Texte en bleu
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "4px",
        border: `1px solid ${Cyan}`,
      }}
      declineButtonStyle={{
        background: "transparent",
        border: `1px solid ${Sky}`,
        color: Sky,
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "4px",
      }}
      expires={150} // Cookie expire dans 150 jours
    >
      🍪 CandyBody utilise des cookies pour améliorer votre expérience. Vous
      pouvez accepter ou refuser.
    </CookieConsent>
  );
};

export default CookieConsentBar;
