/* ============================================================
   CONFIG — LE SEUL FICHIER À MODIFIER POUR PERSONNALISER LE SITE
   ============================================================ */

const CONFIG = {
  // Tous les prénoms acceptés à l'étape 1 (la casse et les accents n'ont pas d'importance)
  prenoms: ["yass", "yasmine", "jenna"],

  // Utilisé dans les indices quand elle se trompe de prénom
  prenomAffiche: "Yass",

  age: 20,

  // Panneau de test permettant de sauter d'une épreuve à l'autre.
  // Laisse-le sur `false` : pour tester, ajoute simplement « ?debug » à la fin
  // de l'URL (ex. .../protocole-67/?debug). Comme ça aucun risque de l'oublier
  // activé le jour où tu lui envoies le lien.
  debug: false,

  // Le vrai message de fin — le seul moment sincère du site.
  // <b>…</b> met en jaune, <br><br> sépare les paragraphes (ils apparaissent un par un).
  messageFinal:
    "Ok, on arrête deux secondes le délire.<br><br>" +
    "T'as fait <b>8 épreuves</b> et cliqué <b>67 fois</b> sur un bouton pour rien. " +
    "Franchement, respect. Peu de gens seraient allés au bout. Toi si. C'est exactement pour ça qu'on t'aime bien.<br><br>" +
    "T'as <b>20 ans</b> aujourd'hui. C'est un âge stylé, profites-en à fond : " +
    "fais des trucs débiles, ris trop fort, dis oui à des plans pourris. " +
    "Le reste on s'en occupe.<br><br>" +
    "<b>Joyeux anniversaire 🎂❤️</b><br><br>" +
    "<span style='font-size:.78em;opacity:.65'>(voilà, moment mignon terminé, tu peux retourner cliquer sur 6-7)</span>"
};
