/* ============================================================
   CONFIG — LE SEUL FICHIER À MODIFIER POUR PERSONNALISER LE SITE
   ============================================================ */

const CONFIG = {
  // Tous les prénoms acceptés à l'étape 1 (la casse et les accents n'ont pas d'importance)
  prenoms: ["yass", "yasmine", "jenna"],

  // Utilisé dans les indices quand elle se trompe de prénom
  prenomAffiche: "Yass",

  age: 20,

  // ---- FICHE « CIBLE » affichée pendant la scène finale de faux piratage ----
  // Tout est fictif ou anodin. Rien n'est envoyé nulle part : c'est juste du
  // texte affiché à l'écran pour faire peur trois secondes.
  cible: {
    prenom:    "Yasmine Jenna",
    nom:       "[ CHIFFRÉ ]",
    naissance: "07/06/2006",
    pays:      "France",
    region:    "Île-de-France",
    ville:     "Paris",
    latitude:  "48.8566° N",
    longitude: "2.3522° E"
  },

  // Panneau de test permettant de sauter d'une épreuve à l'autre.
  // Laisse-le sur `false` : pour tester, ajoute simplement « ?debug » à la fin
  // de l'URL (ex. .../protocole-67/?debug). Comme ça aucun risque de l'oublier
  // activé le jour où tu lui envoies le lien.
  debug: false,

  // Le vrai message de fin — le seul moment sincère du site.
  // Il s'affiche APRÈS la vidéo, sur la page épilogue, avec la musique en fond.
  // <b>…</b> met en valeur, <br><br> sépare les paragraphes (ils apparaissent un par un).
  // Date affichée sur le certificat
  dateFete: "07 août 2026",

  messageFinal:
    "Voilà. C'est fini. Le calvaire est terminé.<br><br>" +
    "<b>Joyeux anniversaire.</b> 🎂<br><br>" +
    "Et merci. Sincèrement. Merci pour la personne que tu es tous les jours, " +
    "pas seulement aujourd'hui parce que c'est ton anniversaire. " +
    "Merci de nous faire autant rire et de partager ta bonne humeur, " +
    "même s'il y a parfois quelques petites crises émotionnelles. " +
    "Mais tu restes <b>notre Yass national</b>.<br><br>" +
    "<b>On t'aime tous.</b> Vraiment tous.<br><br>" +
    "Et encore plus <b>Ludo</b> et <b>Baann_</b>, tes super potes, qui sont les meilleurs. 🫡<br><br>" +
    "Passe une journée à la hauteur de ce que tu vaux. C'est-à-dire : <b>beaucoup</b>.<br><br>" +
    "<span style='font-size:.85em;opacity:.75'>6-7. 🗿</span>"
};
