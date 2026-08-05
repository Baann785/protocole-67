# 🗿 Protocole 6-7 — Anniversaire de Yass

Parcours interactif troll en 14 étapes, dont **8 épreuves jouables**. Zéro dépendance, zéro build, tout fonctionne hors ligne.

## Structure

```
index.html          le squelette (les 14 écrans, rien d'autre)
css/style.css       tout le style
js/config.js        ⚠️ LE SEUL FICHIER À MODIFIER (prénoms, âge, message final)
js/audio.js         bruitages + logo sonore synthétisés, et lecture des 2 enregistrements
js/core.js          état global, machine à écrire, navigation entre écrans
js/effets.js        confettis, popups Windows, secrets et easter eggs
js/etapes.js        écrans 0 à 3 (boot, identité, captcha, âge)
js/jeux.js          les 8 épreuves (écrans 4 à 11)
js/final.js         compliments, page finale, relance — et démarre le site
audio/              les deux extraits où Yass chante (MP3, joués à la fin du mot de passe)
```

L'ordre des `<script>` dans `index.html` compte : chaque fichier utilise ce que le précédent a défini.

## Le parcours

| # | Étape | Le truc |
|---|-------|---------|
| 0 | Boot | Faux système d'authentification qui la menace |
| 1 | Identification | Elle tape son prénom → 3 essais, puis le site abandonne en la traitant de mytho |
| 2 | Captcha | « Sélectionne toutes les images contenant de l'aura » — impossible à réussir, réponse différente selon ce qu'elle coche |
| 3 | Âge | Slider qui commente en direct (67 = réaction spéciale) → verdict : âge mental 6-7 |
| 4 | **Épreuve 1 — Le rituel** | Cliquer **67 fois**. 🎣 **À partir de 55, le bouton rétrécit et saute d'un côté à l'autre** à chaque clic. 🎣 **À 66 : faux plantage** — « ERREUR CRITIQUE, compteur réinitialisé », affichage à 0, écran qui tremble, puis « nan je rigole » 2,6 s plus tard |
| 5 | **Épreuve 2 — Trouve le 67** | Grilles noyées dans des 68, 66, 87, 61, 76, 69, 97. 🎣 **On annonce 3 manches, il y en a 5.** La 4ᵉ est en **12×12 avec les chiffres qui changent de place toutes les 2,5 s**. La 5ᵉ est une seule case géante : « allez, cadeau, t'as assez souffert » |
| 6 | **Épreuve 3 — Répète après moi** | Simon musical à 4 pads, **5 manches** de 2 à 7 signaux, de 620 ms à **105 ms** entre chaque signal. 🎣 **Manche 5 : les boutons changent de place après la séquence.** Injouable exprès. 🎣 **Et si elle la réussit : manche 6 secrète « MODE NASDAS »** — 9 signaux à 75 ms, les boutons bougent **à chaque clic**. Récompense empoisonnée : réussir déclenche la punition |
| 7 | **Épreuve 4 — Mot de passe** | **15 règles** révélées une par une : 🗿, 🥪, « crousty », « nasdas »… 🎣 **La règle 10 annule la règle 7** (« la somme doit faire 67, pas 20, désolé »), l'ancienne reste affichée barrée. 🎣 **Puis faux refus** (« REFUSÉ, mot de passe trop fort ») → « nan je déconne » → 🎣 **puis une 15ᵉ règle ajoutée après coup** : « le service juridique insiste ». Indice à 45 s, réponse complète à 90 s |
| 8 | **Épreuve 5 — Attrape les Moaï** | Tape-taupe 20 s, objectif 7 🗿, les 💀 font perdre un point. 🎣 **À 7 : « on relit la consigne, l'objectif était 6-7, donc 67 Moaï »** pendant 3 s. 🎣 **Puis prolongation forcée** : 3 Moaï de plus, à vitesse doublée |
| 9 | **Épreuve 6 — Machine à sous** | Truquée de bout en bout. 🎣 **Elle décroche le jackpot 6️⃣7️⃣🎂 DEUX fois** — et deux fois un rouleau « glisse » sur un 💀 sous ses yeux (celui de droite, puis celui de gauche). Le vrai jackpot est au **5ᵉ** tirage |
| 10 | **Épreuve 7 — Quiz** | 8 questions sur elle-même, punchline dédiée à chaque réponse. 🎣 **Puis une « QUESTION 9 / 8 », puis une « QUESTION 6-7 / 8 »**, puis un calcul de score en 6 étapes (« envoi du dossier à Swan et Néo pour relecture… ») qui aboutit à 67% |
| 11 | **Épreuve 8 — Le cadeau** | Le bouton fuit 7 fois, annonce « j'ai perdu, clique »… 🎣 **et ment trois fois de suite** : « pardon, réflexe » → « sur la tête du Tasty Crousty » → « bon, là j'ai plus d'excuse » |
| 12 | Compliments | Générés avec son prénom + 3 compliments « rares » vraiment mignons (1 chance sur 6,7) |
| 13 | **Page finale** | Message d'anniversaire paragraphe par paragraphe → certificat à son nom → bilan chiffré de sa partie → liste des secrets → et seulement là, le bouton pour relancer |

## Les 10 secrets

Chacun affiche un toast quand elle le trouve, et la page finale récapitule ceux qu'elle a ratés avec un indice.

| Secret | Comment |
|--------|---------|
| Mode aura maximale | Code Konami ⬆⬆⬇⬇⬅➡⬅➡ B A |
| Le chiffre | Taper `67` au clavier |
| Wesh alors | Taper `jul` |
| La distribution | Taper `nasdas` |
| Swan et Néo | Taper `swan` |
| Tasty Crousty | Taper `tasty` |
| Soundboard secret | Taper `meme`, ou cliquer 7 fois sur le bouton 🔊 |
| La barre truquée | Cliquer 7 fois sur le pourcentage en haut |
| Le clic droit | Faire un clic droit |
| Le mode Nasdas | Battre la manche 5 **puis** la manche 6 du test de mémoire |

Bonus non comptés : taper `aura` ou `moai`, popups Windows aléatoires (Snapchat/Nasdas, YouTube/Swan et Néo, McDo/Tasty Crousty, SNCF, Vinted, Doctolib, Fort Boyard…), popup si elle reste inactive, et le titre de l'onglet qui la supplie de revenir si elle change d'onglet.

## À personnaliser avant d'envoyer

Tout est dans [js/config.js](js/config.js) :

```js
const CONFIG = {
  prenoms: ["yass", "yasmine", "jenna"],  // tous acceptés, casse et accents ignorés
  prenomAffiche: "Yass",                  // utilisé dans les indices quand elle se trompe
  age: 20,
  messageFinal: "..."                     // ⚠️ le seul truc sincère du site
};
```

Le `messageFinal` s'affiche paragraphe par paragraphe : sépare les blocs avec `<br><br>`, `<b>...</b>` met en jaune.

**Conseil** : remplace 2-3 réponses du quiz (constante `QUIZ` dans [js/jeux.js](js/jeux.js)) par de vraies vannes internes entre vous. C'est ça qui va la faire mourir de rire, pas les blagues génériques.

## Mise en ligne (GitHub Pages)

Pages sert les fichiers tels quels — les dossiers `css/` et `js/` marchent sans configuration.

```bash
cd c:/Users/quent/Desktop/YassAniversaire
git init
git add .
git commit -m "protocole 6-7"
git branch -M main
git remote add origin https://github.com/TON_PSEUDO/yass-anniv.git
git push -u origin main
```

Puis sur GitHub : **Settings → Pages → Source: `main` / root → Save**.
En ~1 minute le site est sur `https://TON_PSEUDO.github.io/yass-anniv/`.

> Mets le repo en **public** (Pages est payant sur repo privé). Un nom de repo neutre évite qu'elle devine en voyant le lien.

## Notes techniques

- Le son démarre au premier clic (règle des navigateurs) — le bouton 🔊 en bas à droite coupe tout.
- Les bruitages et le logo sonore sont générés en Web Audio (aucun fichier). Seuls les deux enregistrements de Yass sont des fichiers, dans `audio/` : convertis en MP3 96 kbps mono pour être lus sur iPhone, que l'OGG ne supporte pas.
- Les confettis sont des rectangles dessinés au canvas (pas des emojis) : plafonnés à 120 particules, et la boucle s'arrête dès que l'écran est vide.
- **Règle absolue du ragebait** : on peut la faire rager autant qu'on veut, mais aucune épreuve ne la bloque jamais pour de bon. Chacune finit par céder — le plus tard possible, et toujours avec une vanne. Les faux plantages (compteur à 66, refus du mot de passe, rouleau qui glisse) sont purement cosmétiques : elle ne perd jamais de progression réelle.
- Pas de popup pendant le tape-taupe, ce serait déloyal (à peine).
- Testé mobile : bouton fuyant tactile, grilles responsives, HUD compact sur petit écran.
