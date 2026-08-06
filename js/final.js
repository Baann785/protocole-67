/* ============================================================
   ÉCRANS 12 & 13 — compliments, page finale, relance
   ============================================================ */

/* ============================================================
   12 — COMPLIMENTS
   ============================================================ */
const DEBUTS = ["t'as l'aura de","t'es officiellement","sur ma vie t'es","scientifiquement prouvé : t'es",
  "franchement t'es","l'État confirme que t'es","d'après mes sources t'es","le Larousse te définit comme",
  "sans exagérer t'es","les scientifiques sont formels, t'es","c'est écrit dans la Constitution : t'es",
  "wesh j'te jure t'es","le cadastre te classe comme","d'après le dernier recensement t'es"];

const MILIEUX = [
  // — six seven —
  "6-7 fois plus stylée que la moyenne nationale",
  "la preuve vivante que le 6-7 peut être une personnalité",
  "la seule à qui on pardonnerait de dire « six seven » à voix haute",
  "classée 6-7 sur 10 par un jury qui te met 20 en vrai",
  "le seul être humain dont l'aura se mesure en 6-7",
  "6 fois plus drôle que la moyenne, et 7 fois plus insupportable",
  // — tasty crousty —
  "plus légendaire qu'un Tasty Crousty",
  "plus rare qu'un Tasty Crousty en 2026",
  "croustillante à l'extérieur, tasty à l'intérieur",
  "le Tasty Crousty des êtres humains, et c'est le plus beau compliment du site",
  "la seule chose qui manque à McDo depuis qu'ils l'ont retiré de la carte",
  // — brainrot —
  "le personnage principal de ton propre brainrot",
  "l'aura farming incarné, sans même faire exprès",
  "la raison pour laquelle Tralalero Tralala met ses plus belles chaussures",
  "plus rizz que tout le rayon parfum de Sephora réuni",
  "genre le sigma le plus sigma que j'ai jamais vu, sans ironie, enfin si un peu",
  "capable de faire un aura farming juste en existant dans une pièce",
  "la version humaine d'un edit sur fond de phonk",
  "le Ohio de personne, le rizz de tout le monde",
  // — gênant assumé —
  "objectivement la personne la plus drôle de ce groupe et tu le sais très bien",
  "quelqu'un pour qui on annulerait un plan, et ça, ça se dit pas à voix haute",
  "la seule à qui on montre un truc débile en premier parce qu'on sait qu'elle va rire",
  "insupportablement attachante, et c'est très gênant à écrire",
  "la personne qu'on cite quand on raconte une anecdote à quelqu'un qui te connaît pas",
  "la preuve qu'on peut être une catastrophe ambulante et rester la meilleure",
  // — français —
  "plus rare qu'un TGV à l'heure","meilleure que le wifi gratuit dans un TER",
  "plus solide qu'un Nokia 3310 tombé du 6e étage","l'équivalent humain d'un vendredi 17h",
  "trop drôle pour être légale dans 6-7 départements",
  "capable de rendre un lundi matin supportable",
  "la définition du mot « validée » dans le Larousse 2027",
  "plus précieuse qu'un chargeur retrouvé chez quelqu'un d'autre",
  "au-dessus du game depuis la maternelle",
  "la raison pour laquelle le groupe tient encore debout",
  "plus attendue que le générique de Fort Boyard",
  "la seule à pouvoir dire « wesh alors » avec élégance",
  "plus généreuse que Nasdas un soir de story",
  "plus culte que Swan et Néo pour une génération entière",
  "plus fiable qu'un « je pars dans 5 minutes »",
  "la seule personne dont la story vaut le coup d'être regardée en entier"];

const FINS = ["et ça, personne peut te l'enlever. 🗿","Certifié par 6 experts sur 7. 🧪","L'ONU a validé. 🇺🇳",
  "Aucun débat. Dossier clos. ⚖️","+9999 aura. 🔥","Bon anniversaire au passage. 🎂",
  "Redemande, y'en a encore. 🔁","C'est pas faux. 🛡️","Le Père Fouras approuve. 🗝️",
  "Six seven. 🫡","Voilà. C'était gênant. Assume. 😳","Screenshot ça, tu le reliras dans 6-7 ans. 📸",
  "Le Ministère du Brainrot a signé. 🧠","Et là normalement tu souris toute seule. 😐",
  "Tasty. Crousty. 🥪","Nasdas t'aurait donné 50 balles pour ça. 💸"];

/* 1 chance sur 6,7 : ceux-là sont sincères, c'est le contraste qui fait l'effet */
const RARES = [
  "🎯 RARE (1 chance sur 6,7) : T'es la seule personne pour qui je décrocherais si t'appelais sans prévenir. Et ça, dans ce monde, ça vaut de l'or. 🥹",
  "🎯 RARE (1 chance sur 6,7) : Sans toi le groupe serait juste 6 personnes qui se regardent en silence. T'es le 7e élément. 6-7. Tout s'explique.",
  "🎯 RARE (1 chance sur 6,7) : Tu vieillis pas, tu passes juste en version premium. Édition 20 ans, collector, tirage limité à 1 exemplaire."
];

ECRANS[12] = function(){
  tape(document.getElementById('d12'),
    "Épreuves terminées. Récompense : compliments illimités. Il faut en prendre au moins 3, c'est la loi.");
};
document.getElementById('bCompli').onclick = function(){
  const box = document.getElementById('compliBox');
  if(Math.random() < 1 / 6.7){
    box.textContent = pioche(RARES);
    box.style.borderColor = '#ff2bd6';
    SONS.aura(); confettis(90);
  }else{
    box.textContent = ETAT.nom + ", " + pioche(DEBUTS) + " " + pioche(MILIEUX) + ". " + pioche(FINS);
    box.style.borderColor = '#ffe600';
    SONS.rizz();
  }
  box.style.transform = 'scale(1.04)';
  setTimeout(function(){ box.style.transform = 'scale(1)'; }, 160);
  ETAT.compliments++;
  if(ETAT.compliments >= 3){
    const b = document.getElementById('b12');
    b.disabled = false;
    b.textContent = "C'EST BON J'EN AI ASSEZ";
  }
};
document.getElementById('b12').onclick = function(){ aller(13); };

/* ============================================================
   13 — PAGE FINALE
   Tout arrive dans l'ordre : message → certificat → bilan → secrets,
   et le bouton "relancer" seulement à la toute fin.
   ============================================================ */
function reveler(id, delai){
  setTimeout(function(){
    const el = document.getElementById(id);
    el.style.display = 'block';
    el.scrollIntoView({behavior:'smooth', block:'nearest'});
  }, delai);
}

ECRANS[13] = function(){
  document.getElementById('titreFinal').textContent = "Bon. " + ETAT.nom + ".";
  const msg = document.getElementById('msgFinal');
  msg.innerHTML = '';
  ['certif','bilan','blocSecrets','zoneFin'].forEach(function(id){
    document.getElementById(id).style.display = 'none';
  });
  SONS.violon();

  const morceaux = CONFIG.messageFinal.split('<br><br>');
  let i = 0;
  (function suite(){
    if(i >= morceaux.length){
      document.getElementById('certifNom').textContent = ETAT.nom;
      reveler('certif', 400);
      SONS.fanfare(); confettis(120);
      remplirBilan();
      reveler('bilan', 2200);
      remplirSecrets();
      reveler('blocSecrets', 4000);
      setTimeout(function(){ SONS.airhorn(); confettis(110); }, 4200);
      // le dernier bouton du site… qui ne va pas bien se passer (js/intrusion.js)
      reveler('zoneFin', 5600);
      setTimeout(armerBoutonFin, 5700);
      return;
    }
    const p = document.createElement('p');
    p.style.cssText = "margin-bottom:16px;opacity:0;transition:opacity .8s";
    p.innerHTML = morceaux[i++];
    msg.appendChild(p);
    requestAnimationFrame(function(){ p.style.opacity = 1; });
    setTimeout(suite, 1700);
  })();
};

function remplirBilan(){
  const min = Math.max(1, Math.round((Date.now() - ETAT.debut) / 60000));
  const lignes = [
    ["Clics sur le bouton 6-7",     ETAT.clics67],
    ["Ratés au test optique",       ETAT.rates67],
    ["Manche de mémoire atteinte",  ETAT.mancheSimonMax + " / 7"],
    ["Erreurs de mémoire",          ETAT.erreursSimon],
    ["Moaï attrapés",               ETAT.moai + " 🗿"],
    ["Mot de passe (15 règles)",    ETAT.indiceMdp ? "avec l'indice 😔" : "toute seule 💪"],
    ["Voix envoyée à un serveur imaginaire", ETAT.voixEnvoyee ? "oui 🎤" : "esquivée 😶"],
    ["Compliments réclamés",        ETAT.compliments],
    ["Temps passé sur ce site",     "~" + min + " min"]
  ];
  document.getElementById('bilanLignes').innerHTML = lignes.map(function(l){
    return '<div class="l"><span>' + l[0] + '</span><span>' + l[1] + '</span></div>';
  }).join('');

  let verdict;
  if(ETAT.mancheSimonMax > 7)
    verdict = "Verdict : t'as débloqué le mode Nasdas. Personne débloque le mode Nasdas. On sait pas ce que t'es, mais c'est pas humain. Note finale : 6-7/10.";
  else if(ETAT.mancheSimonMax >= 7 && !ETAT.indiceMdp)
    verdict = "Verdict : manche 7 atteinte, 15 règles de mot de passe sans aide, faux plantage encaissé et ta propre voix renvoyée à la figure sans jeter ton téléphone. Tu es officiellement une menace. Note finale : 6-7/10.";
  else if(ETAT.rates67 > 15)
    verdict = "Verdict : la vue laisse à désirer, mais le cœur y était, et t'as pas abandonné. Note finale : 6-7/10.";
  else
    verdict = "Verdict : t'as tout fait, t'as rien compris, on t'a menti 6-7 fois, t'as adoré. Exactement le résultat attendu. Note finale : 6-7/10.";
  document.getElementById('bilanVerdict').textContent = verdict;
}

/* ============================================================
   RELANCE — remet tout à zéro sauf les secrets déjà trouvés
   ============================================================ */
document.getElementById('b13').onclick = function(){
  n67 = 0; ritOK = false; ritGele = false; tour67 = 1;
  qi = 0; essaisNom = 0;
  manche67 = 0; essaisTaupe = 0; prolongation = false;
  mdpFini = false; mdpSurprise = false; niveauMax = 0; clicsMute = 0;
  clearInterval(tMelange67); resetCadeau(); rangerPads(); animerBouton67(); stopVoix(); resetIntrusion();
  ETAT.clics67 = 0; ETAT.rates67 = 0; ETAT.erreursSimon = 0; ETAT.mancheSimonMax = 0; ETAT.moai = 0;
  ETAT.indiceMdp = false; ETAT.voixEnvoyee = false; ETAT.compliments = 0;
  ETAT.debut = Date.now();

  document.getElementById('compte').textContent = '0';
  document.getElementById('palier').textContent = '';
  document.getElementById('compteSous').textContent = '/ 67 — AUCUN RACCOURCI POSSIBLE';
  document.getElementById('bouton67').textContent = '6 7';
  document.getElementById('b12').disabled = true;
  document.getElementById('b12').textContent = "J'EN AI ASSEZ";
  document.getElementById('compliBox').textContent = '…';
  document.getElementById('cadeau').style.cssText = '';
  document.getElementById('cadeau').textContent = '🎁 CLIQUE ICI';
  document.getElementById('bTaupe').textContent = 'DÉMARRER ▶';
  ['b4','b5','b6','b8','b9','b11'].forEach(function(id){
    document.getElementById(id).style.display = 'none';
  });
  Array.prototype.forEach.call(document.querySelectorAll('#captchaGrid .case.on'), function(c){
    c.classList.remove('on');
  });
  resetTaupe();
  aller(0);
};

/* ============================================================
   GO
   ============================================================ */
ECRANS[0]();
