/* ============================================================
   ÉTAPES 0 à 3 — boot, identité, captcha, âge
   ============================================================ */

/* ------------------------------------------------------------
   0 — BOOT
   ------------------------------------------------------------ */
ECRANS[0] = function(){
  const d = document.getElementById('d0'), b = document.getElementById('b0');
  const lignes = [
    "Initialisation du protocole 6-7…",
    "Scan de l'appareil… ⚠️ NIVEAU D'AURA ANORMAL DÉTECTÉ",
    "Chargement du Tasty Crousty… 67%… toujours 67%… bon, tant pis.",
    "Synchronisation avec les serveurs de Nasdas… aucune liasse reçue.",
    "Ce site est réservé à UNE seule personne.",
    "Si c'est pas toi : ferme l'onglet. Si c'est toi : t'es très mal barrée.",
    "7 épreuves. On va te mentir 6-7 fois. C'est le concept, faut pas le prendre mal."
  ];
  let i = 0;
  (function suite(){
    if(i >= lignes.length){ b.style.display = 'block'; return; }
    tape(d, lignes[i++], function(){ setTimeout(suite, 1900); });   // le temps de lire tranquillement
  })();
};
document.getElementById('b0').onclick = function(){
  ETAT.debut = Date.now();
  SONS.fanfare();
  aller(1);
};

/* ------------------------------------------------------------
   1 — IDENTITÉ
   ------------------------------------------------------------ */
let essaisNom = 0;
ECRANS[1] = function(){
  tape(document.getElementById('d1'),
    "Avant tout : on doit vérifier que t'es bien la bonne personne. Tape ton prénom. Et mens pas, on a des moyens.");
  setTimeout(function(){ document.getElementById('inputNom').focus(); }, 900);
};
/* Le prénom retenu ne doit JAMAIS contenir d'espace : il est réinjecté dans
   l'épreuve du mot de passe, où une règle exige le prénom et une autre interdit
   les espaces. Un « Marie Claire » rendrait l'épreuve mathématiquement insoluble.
   On ne garde donc que le premier mot. */
function nomPropre(saisie){
  const mot = saisie.trim().split(/\s+/)[0] || '';
  return mot.charAt(0).toUpperCase() + mot.slice(1);
}

function validerNom(){
  const inp = document.getElementById('inputNom');
  const val = inp.value.trim();
  const p = document.getElementById('p1');
  if(!val){ p.textContent = "→ Erreur : le champ est vide. Comme ton frigo."; SONS.erreur(); return; }

  const saisie = norm(val);
  const ok = CONFIG.prenoms.some(function(pr){ return saisie.indexOf(norm(pr)) !== -1; });
  essaisNom++;

  if(ok){
    ETAT.nom = nomPropre(val);
    SONS.aura(); confettis(80);
    tape(document.getElementById('d1'),
      "…Vérification… ✅ C'est bien toi. On t'attendait. Le protocole peut commencer.");
    p.textContent = "→ Identité confirmée. Bienvenue " + ETAT.nom + ". Fuis tant qu'il est encore temps.";
    setTimeout(function(){ aller(2); }, 2600);
    return;
  }

  SONS.bruh();
  if(essaisNom === 1){
    p.textContent = '→ "' + val + '" ? Mytho. Réessaye.';
    tape(document.getElementById('d1'), "Nan. C'est pas ça. Deuxième chance, et j'te préviens j'ai pas que ça à faire.");
  }else if(essaisNom === 2){
    p.textContent = "→ Toujours faux. Indice : ça commence par " + CONFIG.prenomAffiche.charAt(0).toUpperCase() +
                    " et ça a " + CONFIG.age + " ans aujourd'hui.";
    tape(document.getElementById('d1'), "Sérieusement ? Tu connais même pas ton propre prénom ? C'est inquiétant.");
  }else{
    ETAT.nom = nomPropre(val);
    SONS.erreur();
    p.textContent = '→ Bon. On te laisse passer sous le nom de "' + ETAT.nom + '". Mais on sait que c\'est faux.';
    tape(document.getElementById('d1'), "Ok j'abandonne. Passe. De toute façon le site est nul, tu perds rien.");
    setTimeout(function(){ aller(2); }, 2800);
  }
  inp.select();
}
document.getElementById('b1').onclick = validerNom;
document.getElementById('inputNom').addEventListener('keydown', function(e){ if(e.key === 'Enter') validerNom(); });

/* ------------------------------------------------------------
   2 — CAPTCHA
   ------------------------------------------------------------ */
ECRANS[2] = function(){
  tape(document.getElementById('d2'),
    "Étape réglementaire. On doit s'assurer que t'es humaine. Spoiler : le test est truqué.");
  const grid = document.getElementById('captchaGrid');
  if(grid.children.length) return;
  ['🗿','🦈','🐊','💀','🥪','🕺','🥖','👻','🔥'].forEach(function(e){
    const d = document.createElement('div');
    d.className = 'case'; d.textContent = e;
    d.onclick = function(){ d.classList.toggle('on'); SONS.bip(); };
    grid.appendChild(d);
  });
};
document.getElementById('b2').onclick = function(){
  const n = document.querySelectorAll('#captchaGrid .case.on').length;
  let msg;
  if(n === 0) msg = "Zéro sélection. Techniquement t'as raison : l'aura ne se voit pas, elle se ressent. Test échoué quand même.";
  else if(n === 9) msg = "T'as TOUT sélectionné. C'est exactement ce qu'un bot ferait. Ou une personne qui lit les consignes. Suspect.";
  else msg = "T'as sélectionné " + n + " image" + (n > 1 ? "s" : "") + ". La bonne réponse était 6. Ou 7. On sait plus.";
  SONS.erreur();
  tape(document.getElementById('d2'), msg + " → ACCÈS ACCORDÉ QUAND MÊME (c'est ton anniv).");
  this.disabled = true;
  setTimeout(function(){ document.getElementById('b2').disabled = false; aller(3); }, 3400);
};

/* ------------------------------------------------------------
   3 — ÂGE
   ------------------------------------------------------------ */
ECRANS[3] = function(){
  tape(document.getElementById('d3'), "Bouge le curseur jusqu'à ton âge réel. On vérifiera. On vérifie tout ici.");
};
const slider = document.getElementById('ageSlider'), ageAff = document.getElementById('ageAff');
/* Un glissé émet des dizaines d'évènements par seconde. Émettre un son à
   chacun saturait le moteur audio et rendait le curseur poussif : on limite
   à un bip toutes les 90 ms. */
let dernierBipAge = 0;
slider.addEventListener('input', function(){
  ageAff.textContent = slider.value;
  const t = Date.now();
  if(t - dernierBipAge > 90){ dernierBipAge = t; SONS.bip(); }
  const p = document.getElementById('p3'), v = +slider.value;
  if(v <= 6) p.textContent = "→ Bébé détecté. Repose ce téléphone.";
  else if(v === 7) p.textContent = "→ 7. Presque. Il manque un 6 devant.";
  else if(v === 67) p.textContent = "→ 🚨 67. LE CHIFFRE. Tu as tout compris. Mais c'est pas ton âge.";
  else if(v < 18) p.textContent = "→ Mentalement c'est plausible.";
  else if(v === CONFIG.age) p.textContent = "→ Hmm. Ça sent le vrai âge, ça.";
  else if(v > 60) p.textContent = "→ Bon là tu forces. On te voit.";
  else p.textContent = "";
});
document.getElementById('b3').onclick = function(){
  ETAT.ageDit = +slider.value;
  const d = document.getElementById('d3');
  SONS.skibidi();
  tape(d, "Analyse biométrique en cours… croisement avec la base nationale de l'aura…", function(){
    setTimeout(function(){
      tape(d, "Résultat : âge déclaré " + ETAT.ageDit + " ans · âge réel " + CONFIG.age +
              " ans · âge mental 6-7 ans. Dossier clos.", function(){
        SONS.airhorn(); confettis(100);
        setTimeout(function(){ aller(4); }, 2400);
      });
    }, 1400);
  });
};
