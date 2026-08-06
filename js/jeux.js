/* ============================================================
   ÉPREUVES 1 à 8 (écrans 4 à 11)

   RÈGLE ABSOLUE DU FICHIER : on peut la faire rager autant qu'on veut,
   mais aucune épreuve ne doit jamais la bloquer pour de bon. Chacune
   finit par céder — le plus tard possible, et toujours avec une vanne.

   PRINCIPE DE DIFFICULTÉ : les premiers niveaux sont faciles et gentils.
   Le DERNIER niveau de chaque épreuve est méchant, injouable ou truqué.
   Tout ce qui ressemble à une perte de progression est purement cosmétique.
   ============================================================ */

/* ============================================================
   4 — ÉPREUVE 1 : RITUEL 6-7
   Escalade : le bouton rétrécit et se balade sur TOUTE la page au fil
   des clics. Et au 67e du premier tour, le compteur saute directement
   à 68 : « t'as loupé le 67, on recommence ». Le 2e tour est honnête —
   le bouton ne bouge plus et le compte s'arrête bien à 67.
   ============================================================ */
let n67 = 0, ritOK = false, ritGele = false, tour67 = 1;
ECRANS[5] = function(){
  tape(document.getElementById('d4'),
    "Première épreuve. Appuie 67 fois sur le bouton. Pourquoi ? Aucune raison. C'est ça la beauté du truc.");
};
const paliers67 = {
  1:"1. Il n'y a plus de retour en arrière.",
  5:"5. Tu commences déjà à te demander ce que tu fous là.",
  17:"17. À ce stade, arrêter serait un échec personnel.",
  25:"25. Nasdas distribue des billets, moi je distribue des clics. Chacun son truc.",
  33:"33. Mi-parcours. « Je suis pas venue ici pour souffrir, OK ? » Bah si.",
  42:"42. La réponse à tout. Mais la vraie réponse c'est 67.",
  50:"50 ! Plus que 17. Ta dignité, elle, est déjà partie.",
  58:"58. Pas de bras, pas de chocolat. Pas de clics, pas de Tasty Crousty.",
  60:"60. ⚠️ SEPT. DE. PLUS. …et le bouton commence à bouger. Non, c'est pas ton écran.",
  62:"62. Il rétrécit aussi. Il joue sale sur la fin.",
  64:"64. Tu y crois. C'est mignon.",
  66:"66. UN. SEUL. CLIC. Rien peut mal tourner."
};
const PALIERS_TOUR2 = {
  1:"1. Deuxième tour. Le bouton a promis de plus bouger. On verra.",
  20:"20. Il bouge vraiment plus. Étonnant, pour ce site.",
  40:"40. Tu commences à te méfier de tout, et t'as raison.",
  60:"60. Cette fois c'est la bonne. Normalement.",
  66:"66. Vas-y. Fais-le. On te regarde."
};

const DEBUT_MOUVEMENT = 60;   // le bouton ne commence à bouger qu'à partir de là

/* Le bouton rétrécit et se déplace, mais il reste CONFINÉ à la carte (plus une
   petite marge) : il ne doit jamais sortir de l'écran ni devenir introuvable.
   On utilise `transform`, pas `position:fixed` : le bouton reste dans le flux
   du document, donc la carte ne s'effondre pas quand il part se balader. */
function animerBouton67(){
  const btn = document.getElementById('bouton67');
  if(tour67 === 2 || n67 < DEBUT_MOUVEMENT){
    btn.style.transform = ''; btn.style.width = ''; btn.style.fontSize = '';
    return;
  }
  // 60 → à peine, 67 → amplitude maximale
  const p = Math.min(1, (n67 - DEBUT_MOUVEMENT + 1) / 7);

  // il rétrécit d'abord, sinon il est trop large pour se déplacer horizontalement
  btn.style.width = (100 - p * 55) + '%';
  btn.style.fontSize = 'clamp(24px,' + (15 - p * 8) + 'vw,' + (120 - p * 62) + 'px)';

  // on mesure sa position naturelle une fois la nouvelle taille appliquée
  btn.style.transform = 'none';
  const r = btn.getBoundingClientRect();

  // zone autorisée : la carte, débordement de 30 px toléré, le tout rogné
  // par la fenêtre visible (et jamais sous le HUD)
  const carte = btn.closest('.boite') || btn.parentElement;
  const b = carte.getBoundingClientRect();
  const MARGE = 30, BORD = 8, HAUT = 70;
  const zoneG = Math.max(b.left  - MARGE, BORD);
  const zoneD = Math.min(b.right + MARGE, window.innerWidth  - BORD);
  const zoneH = Math.max(b.top   - MARGE, HAUT);
  const zoneB = Math.min(b.bottom+ MARGE, window.innerHeight - BORD);

  // décalages possibles pour que le bouton reste entièrement dans cette zone
  const minDx = zoneG - r.left, maxDx = zoneD - r.right;
  const minDy = zoneH - r.top,  maxDy = zoneB - r.bottom;

  function tirer(min, max){
    if(max <= min) return 0;                       // pas la place de bouger
    const v = (Math.random() * (max - min) + min) * p;
    return Math.round(Math.min(max, Math.max(min, v)));   // ceinture et bretelles
  }
  btn.style.transform = 'translate(' + tirer(minDx, maxDx) + 'px,' + tirer(minDy, maxDy) + 'px)';
}

document.getElementById('bouton67').onclick = function(){
  if(ritOK || ritGele) return;
  n67++; ETAT.clics67++;
  document.getElementById('compte').textContent = n67;
  SONS.sixSept();
  document.body.classList.remove('secousse');
  void document.body.offsetWidth;
  if(n67 % 10 === 0) document.body.classList.add('secousse');
  const pal = document.getElementById('palier');
  const table = tour67 === 1 ? paliers67 : PALIERS_TOUR2;
  if(table[n67]) pal.textContent = table[n67];
  if(n67 % 20 === 0) SONS.vineBoom();
  animerBouton67();

  /* LE moment : au 67e clic du premier tour, l'affichage saute à 68.
     « T'as loupé le 67 » → on repart de zéro, pour de vrai cette fois. */
  if(n67 >= 67 && tour67 === 1){
    ritGele = true;
    SONS.erreur();
    document.getElementById('compte').textContent = '68';
    document.getElementById('compteSous').textContent = '⚠️ 67 NON DÉTECTÉ';
    pal.innerHTML = "🚨 <b>68 ?!</b> Le compteur a sauté le 67. C'est exactement le seul chiffre qui nous intéressait. " +
                    "Comptage invalide.";
    document.body.classList.add('secousse');

    setTimeout(function(){
      SONS.bruh();
      pal.innerHTML = "Faut tout recommencer. 😐 Je suis vraiment désolé. Sincèrement. Presque.";
    }, 2600);

    setTimeout(function(){
      // remise à zéro réelle, mais le bouton arrête ses bêtises
      tour67 = 2;
      n67 = 0;
      ritGele = false;
      const btn = document.getElementById('bouton67');
      btn.style.transform = ''; btn.style.width = ''; btn.style.fontSize = '';
      document.getElementById('compte').textContent = '0';
      document.getElementById('compteSous').textContent = '/ 67 — DEUXIÈME TOUR (le bouton ne bougera plus)';
      pal.innerHTML = "Par contre, promis : <b>le bouton bouge plus</b>. Et cette fois ça marchera. Vas-y.";
      SONS.airhorn();
    }, 5200);
    return;
  }

  if(n67 >= 67){
    ritOK = true;
    this.style.transform = ''; this.style.width = ''; this.style.fontSize = '';
    document.getElementById('compteSous').textContent = '✅ 67 / 67';
    pal.innerHTML = "🚨 <b>67 ATTEINT.</b> Pour de vrai. Tu as cliqué " + ETAT.clics67 +
                    " fois au total sur un bouton qui fuyait et qui t'a fait tout recommencer. C'est officiel : t'es des nôtres. 🗿";
    SONS.aura(); confettis(110);
    document.body.classList.add('aura-max');
    setTimeout(function(){ document.body.classList.remove('aura-max'); }, 3500);
    document.getElementById('b4').style.display = 'block';
    this.textContent = '✅';
    modale("🐶 BON TOUTOU",
      "T'as appuyé sur le bouton comme je te l'ai demandé. " + ETAT.clics67 + " fois. " +
      "Sans poser une seule question. Voilà ta récompense : une caresse sur la tête.",
      "photos/bontoutou.jpg");
  }
};
document.getElementById('b4').onclick = function(){ aller(6); };

/* ============================================================
   5 — ÉPREUVE 2 : TROUVE LE 67
   Escalade : on annonce 3 manches, il y en a 5. La 4e est en 12×12
   AVEC les chiffres qui changent de place. La 5e est offerte.
   ============================================================ */
const MANCHES_67 = [
  {n:6,  leurres:['68']},
  {n:8,  leurres:['68','66']},
  {n:10, leurres:['68','66','87','61','76']},
  {n:12, leurres:['68','66','87','61','76','69','97'], surprise:true, bouge:true},
  {n:1,  leurres:['68'], cadeau:true}
];
let manche67 = 0, tMelange67 = null;
ECRANS[6] = function(){
  tape(document.getElementById('d5'),
    "Test optique obligatoire. 3 manches. Trouve le 67. Si tu cliques à côté, on le saura, et on le notera.");
  manche67 = 0; ETAT.rates67 = 0;
  document.getElementById('b5').style.display = 'none';
  document.getElementById('r5').textContent = '';
  construireGrille();
};
function construireGrille(){
  clearInterval(tMelange67);
  const cfg = MANCHES_67[manche67];
  const g = document.getElementById('grille67');
  const total = cfg.n * cfg.n;
  const cible = alea(total);
  let ratesManche = 0;

  g.style.gridTemplateColumns = 'repeat(' + cfg.n + ',1fr)';
  g.style.fontSize = cfg.cadeau ? 'clamp(40px,14vw,90px)' : 'clamp(8px,' + (46 / cfg.n) + 'vw,26px)';
  g.innerHTML = '';
  document.getElementById('manche67').textContent =
    cfg.cadeau ? 'MANCHE 5/3 — CADEAU' : cfg.surprise ? 'MANCHE 4/3 (?!)' : 'MANCHE ' + (manche67 + 1) + '/3';
  document.getElementById('rates67').textContent = 'RATÉS : ' + ETAT.rates67;

  const cases = [];
  for(let i = 0; i < total; i++){
    const s = document.createElement('span');
    const bon = (i === cible);
    s.textContent = bon ? '67' : pioche(cfg.leurres);
    s.onclick = function(){
      if(bon) reussiteGrille(g);
      else{
        ETAT.rates67++; ratesManche++;
        SONS.erreur();
        document.getElementById('rates67').textContent = 'RATÉS : ' + ETAT.rates67;
        g.classList.remove('rate'); void g.offsetWidth; g.classList.add('rate');
        document.getElementById('r5').textContent = pioche([
          "C'est un " + s.textContent + ". Un 68 n'est pas un 67. C'est la base.",
          "Non. Regarde mieux. Prends ton temps, on a la vie.",
          "Raté. Tu veux des lunettes ? On peut arranger ça.",
          "Faux. Ton oculiste va recevoir un mail.",
          "Non. Même Swan et Néo auraient trouvé."
        ]);
        // on finit par l'aider : plus tôt sur la manche surprise, elle a assez souffert
        if(ratesManche === (cfg.surprise ? 6 : 7)){
          document.getElementById('r5').textContent = "Bon. J'te le fais clignoter. C'est humiliant pour nous deux.";
          cases[cible].classList.add('aide');
        }
      }
    };
    cases.push(s);
    g.appendChild(s);
  }

  /* manche 4 : les cases changent de place toutes les 2,5 s. Bonne chance. */
  if(cfg.bouge){
    tMelange67 = setInterval(function(){
      const ordre = cases.map(function(_, i){ return i; });
      for(let k = ordre.length - 1; k > 0; k--){
        const j = alea(k + 1), t = ordre[k]; ordre[k] = ordre[j]; ordre[j] = t;
      }
      cases.forEach(function(c, i){ c.style.order = ordre[i]; });
      SONS.bip();
    }, 2500);
    g.style.display = 'flex';
    g.style.flexWrap = 'wrap';
    cases.forEach(function(c){ c.style.flex = '0 0 calc(' + (100 / cfg.n) + '% - 2px)'; });
    document.getElementById('r5').innerHTML = "⚠️ <b>Et les chiffres bougent.</b> Oui. Bon courage.";
  }else{
    g.style.display = 'grid';
    cases.forEach(function(c){ c.style.flex = ''; c.style.order = ''; });
  }
}
function reussiteGrille(g){
  clearInterval(tMelange67);
  SONS.pop(); confettis(60);
  manche67++;

  if(manche67 >= MANCHES_67.length){
    document.getElementById('r5').innerHTML =
      "✅ <b>5 manches sur 3. Épreuve réussie.</b> Vision validée, rétines intactes.";
    document.getElementById('b5').style.display = 'block';
    g.innerHTML = '';
    SONS.fanfare(); confettis(100);
    modale("👁️ ÉPREUVE 2 VALIDÉE",
      "J'ai hésité à mettre des perspectives 3D mais t'aurais pas vu la différence de toute façon…",
      "photos/200w.gif", "pixel");
    return;
  }
  const suiv = MANCHES_67[manche67];
  g.innerHTML = '';

  if(suiv.surprise){
    SONS.erreur();
    document.getElementById('r5').innerHTML =
      "🎉 3/3 ! Bravo ! Épreuve termi— <b>ah non attends.</b> En fait il y avait 4 manches. C'est marqué nulle part mais si.";
    setTimeout(construireGrille, 2500);
  }else if(suiv.cadeau){
    SONS.erreur();
    document.getElementById('r5').innerHTML =
      "Manche 4 passée. 😤 Il en reste <b>une</b>. Dernière. Promis.";
    setTimeout(function(){
      SONS.fanfare();
      document.getElementById('r5').innerHTML = "Allez, cadeau. T'as assez souffert. 🎁";
      construireGrille();
    }, 2500);
  }else{
    document.getElementById('r5').textContent = pioche([
      "Trouvé. Étonnamment vite. Suspect.",
      "Ok. Manche suivante, et là ça pique.",
      "Bien joué. Profite, ça va se compliquer."
    ]);
    construireGrille();
  }
}
document.getElementById('b5').onclick = function(){ clearInterval(tMelange67); aller(7); };

/* ============================================================
   6 — ÉPREUVE 3 : SIMON 6-7
   Escalade : 5 manches de plus en plus rapides. À la manche 5 les
   boutons changent de place après la séquence — injouable exprès.
   Et si elle réussit quand même, une manche 6 secrète l'attend,
   où les boutons bougent à CHAQUE clic.
   ============================================================ */
/* 7 manches, chacune plus rapide que la précédente. La 7e mélange les boutons
   en plus : elle est injouable par construction. La 8e est secrète et n'existe
   que pour punir celles qui passent la 7e. */
const MANCHES_SIMON = [
  {longueur:2,  pas:640, flash:330, titre:"MANCHE 1 / 7 — tranquille"},
  {longueur:3,  pas:520, flash:280, titre:"MANCHE 2 / 7 — ça va encore"},
  {longueur:4,  pas:420, flash:230, titre:"MANCHE 3 / 7 — ça accélère"},
  {longueur:5,  pas:330, flash:180, titre:"MANCHE 4 / 7 — ça devient sérieux"},
  {longueur:6,  pas:245, flash:135, titre:"MANCHE 5 / 7 — ⚠️ ça part en vrille"},
  {longueur:7,  pas:165, flash:95,  titre:"MANCHE 6 / 7 — 🔥 plus vite que ton cerveau"},
  {longueur:8,  pas:100, flash:60,  titre:"MANCHE 7 / 7 — 🚨 MODE 6-7", melange:true},
  {longueur:10, pas:70,  flash:45,  titre:"MANCHE 8 / 7 — 💀 MODE NASDAS (secrète)", melange:true, chaque:true}
];
const DERNIERE_SIMON = 7;   // au-delà, c'est la manche secrète
let seqSimon = [], posSimon = 0, mancheSimon = 0, simonVerrou = true;

ECRANS[7] = function(){
  tape(document.getElementById('d6'),
    "Test de mémoire. Je joue une séquence, tu la répètes. 7 manches, et ça accélère à chaque fois. Ça va bien se passer. (non)");
  seqSimon = []; posSimon = 0; mancheSimon = 0; ETAT.erreursSimon = 0; simonVerrou = true;
  ETAT.mancheSimonMax = 0;
  rangerPads();
  document.getElementById('b6').style.display = 'none';
  document.getElementById('bSimon').style.display = 'block';
  document.getElementById('bSimon').textContent = 'LANCER LA SÉQUENCE ▶';
  document.getElementById('r6').textContent = '';
  document.getElementById('infoSimon').textContent = MANCHES_SIMON[0].titre;
};

/* remet les 4 pads dans l'ordre d'origine */
function rangerPads(){
  Array.prototype.forEach.call(document.querySelectorAll('.pad'), function(p){
    p.style.order = p.dataset.i;
  });
}
/* mélange leur position à l'écran — l'identité logique (data-i) ne bouge pas,
   donc c'est bien elle qui doit retrouver la bonne couleur ailleurs */
function melangerPads(){
  const ordre = [0,1,2,3];
  for(let k = 3; k > 0; k--){ const j = alea(k+1), t = ordre[k]; ordre[k] = ordre[j]; ordre[j] = t; }
  Array.prototype.forEach.call(document.querySelectorAll('.pad'), function(p, i){
    p.style.order = ordre[i];
  });
}

function flashPad(i, dureeMs){
  const p = document.querySelector('.pad[data-i="' + i + '"]');
  p.classList.add('on');
  SONS.pad(i);
  setTimeout(function(){ p.classList.remove('on'); }, dureeMs);
}

function jouerSequence(){
  const cfg = MANCHES_SIMON[mancheSimon - 1];
  simonVerrou = true;
  rangerPads();
  document.getElementById('r6').textContent = 'Écoute…';
  seqSimon.forEach(function(v, i){
    setTimeout(function(){ flashPad(v, cfg.flash); }, 500 + i * cfg.pas);
  });
  setTimeout(function(){
    simonVerrou = false;
    if(mancheSimon > DERNIERE_SIMON){
      melangerPads();
      document.getElementById('r6').innerHTML =
        "À toi. Et cette fois <b>les boutons bougent à chaque clic</b>. 💀";
      SONS.vineBoom();
    }else if(mancheSimon === DERNIERE_SIMON){
      melangerPads();
      document.getElementById('r6').innerHTML = "À toi. Ah, et <b>j'ai mélangé les boutons</b>. Bonne chance. 🙂";
      SONS.vineBoom();
    }else{
      document.getElementById('r6').textContent = 'À toi. ' + seqSimon.length + ' à répéter.';
    }
  }, 500 + seqSimon.length * cfg.pas);
}

function lancerManche(n){
  mancheSimon = n;
  ETAT.mancheSimonMax = Math.max(ETAT.mancheSimonMax, n);
  const cfg = MANCHES_SIMON[n - 1];
  seqSimon = [];
  for(let i = 0; i < cfg.longueur; i++) seqSimon.push(alea(4));
  posSimon = 0;
  document.getElementById('infoSimon').textContent = cfg.titre + ' — ' + cfg.longueur + ' SIGNAUX';
  jouerSequence();
}
function finirSimon(html){
  simonVerrou = true;
  rangerPads();
  document.getElementById('r6').innerHTML = html;
  document.getElementById('b6').style.display = 'block';
}

document.getElementById('bSimon').onclick = function(){
  this.style.display = 'none';
  lancerManche(1);
};

Array.prototype.forEach.call(document.querySelectorAll('.pad'), function(p){
  p.onclick = function(){
    if(simonVerrou) return;
    const i = +p.dataset.i;
    flashPad(i, 180);
    if(MANCHES_SIMON[mancheSimon - 1].chaque) melangerPads();   // mode Nasdas : ça bouge à chaque clic

    if(i === seqSimon[posSimon]){
      posSimon++;
      if(posSimon < seqSimon.length) return;
      simonVerrou = true;

      if(mancheSimon > DERNIERE_SIMON){
        // elle a battu la manche secrète. On s'incline.
        finirSimon("👑 <b>MANCHE 8 RÉUSSIE.</b> 10 signaux, 70 ms, les boutons qui bougent à chaque clic. " +
                   "On sait pas ce que t'es, mais c'est pas humain.");
        SONS.aura(); confettis(120);
        toast('👑 MODE NASDAS VAINCU');
        modale("👑 LÉGENDE VIVANTE",
          "Personne, absolument personne, n'était censé passer la manche 8. Elle existait juste pour punir " +
          "les gens trop forts à la manche 7. " + ETAT.nom + ", tu as cassé le jeu. Respect éternel.");
        return;
      }
      if(mancheSimon === DERNIERE_SIMON){
        // récompense empoisonnée : une manche de plus
        SONS.airhorn();
        document.getElementById('r6').innerHTML =
          "🏆 <b>MANCHE 7 RÉUSSIE.</b> C'était censé être impossible… donc on a déverrouillé la <b>manche 8 secrète</b>. " +
          "Désolé. Tu l'as cherché.";
        setTimeout(function(){ lancerManche(DERNIERE_SIMON + 1); }, 3000);
        return;
      }
      document.getElementById('r6').textContent = pioche([
        "Correct. On monte d'un cran.", "Pas mal. Encore.", "Ok t'es pas si nulle. Suite.",
        "Bien. Maintenant ça devient méchant."
      ]);
      setTimeout(function(){ lancerManche(mancheSimon + 1); }, 1100);

    }else{
      ETAT.erreursSimon++;
      SONS.bruh();
      posSimon = 0;
      simonVerrou = true;
      rangerPads();

      if(mancheSimon > DERNIERE_SIMON){
        finirSimon("Raté — mais tu avais déjà battu la manche 7, et ça personne le fait. " +
                   "<b>La manche 8 était une punition, pas une épreuve.</b> Passe, tu l'as mérité.");
        SONS.fanfare(); confettis(90);
        return;
      }
      // la manche 7 est injouable par construction : la moindre erreur la libère
      if(mancheSimon >= DERNIERE_SIMON){
        finirSimon("Raté. Évidemment. <b>C'était impossible</b> : 8 signaux en moins d'une seconde et les boutons " +
                   "qui changent de place. Personne y arrive. On voulait juste voir ta tête. Passe.");
        SONS.erreur();
        return;
      }
      if(ETAT.erreursSimon >= 7){
        finirSimon("7 erreurs. Bon. <b>On te laisse passer par pitié.</b> Joyeux anniversaire quand même.");
        SONS.erreur();
        return;
      }
      document.getElementById('r6').textContent = pioche([
        "Raté. Erreur " + ETAT.erreursSimon + "/7. On refait la même manche.",
        "Non. C'était pas ça du tout. Erreur " + ETAT.erreursSimon + "/7.",
        "Aïe. Erreur " + ETAT.erreursSimon + "/7. Concentre-toi deux secondes.",
        "Erreur " + ETAT.erreursSimon + "/7. Tu veux qu'on ralentisse ? Non."
      ]);
      setTimeout(function(){ lancerManche(mancheSimon); }, 1200);
    }
  };
});
document.getElementById('b6').onclick = function(){ aller(8); };

/* ============================================================
   7 — ÉPREUVE 4 : MOT DE PASSE IMPOSSIBLE
   Escalade : 15 règles révélées une par une, dont une qui ANNULE
   une règle précédente. Puis faux refus. Puis une 16e règle surprise.
   ============================================================ */
function sommeChiffres(v){
  let s = 0;
  for(let i = 0; i < v.length; i++){
    const c = v.charCodeAt(i) - 48;
    if(c >= 0 && c <= 9) s += c;
  }
  return s;
}
/* `annule` = index d'une règle précédente qui saute dès que celle-ci est dévoilée
   `surprise` = n'apparaît qu'après le faux refus final */
const REGLES = [
  {t:"Au moins 8 caractères.",                            f:function(v){ return v.length >= 8; }},
  {t:"Doit contenir « 67 ». Évidemment.",                 f:function(v){ return v.indexOf('67') !== -1; }},
  {t:"Doit contenir une majuscule (fais un effort).",     f:function(v){ return /[A-ZÀ-ÝŒ]/.test(v); }},
  {t:"Doit contenir ton prénom.",                         f:function(v){ return norm(v).indexOf(norm(ETAT.nom)) !== -1; }},
  {t:"Doit contenir le mot « aura ».",                    f:function(v){ return norm(v).indexOf('aura') !== -1; }},
  {t:"Aucun espace. On n'est pas des animaux.",           f:function(v){ return v.indexOf(' ') === -1; }},
  {t:"La somme de TOUS les chiffres doit faire exactement 20 (ton âge).",
                                                          f:function(v){ return sommeChiffres(v) === 20; }},
  {t:"Doit contenir un Moaï 🗿. Débrouille-toi.",          f:function(v){ return v.indexOf('🗿') !== -1; }},
  {t:"Doit contenir le mot « crousty ». Oui. Crousty.",   f:function(v){ return norm(v).indexOf('crousty') !== -1; }},
  {t:"On a changé d'avis : la somme des chiffres doit faire 67, pas 20. Désolé.",
                                                          f:function(v){ return sommeChiffres(v) === 67; }, annule:6},
  {t:"Doit contenir un 🥪, parce qu'un Crousty sans sandwich c'est juste un mot.",
                                                          f:function(v){ return v.indexOf('🥪') !== -1; }},
  {t:"Doit contenir « nasdas ». Sans majuscule, il aime pas.",
                                                          f:function(v){ return norm(v).indexOf('nasdas') !== -1; }},
  {t:"Doit se TERMINER par « 67 ».",                      f:function(v){ return v.slice(-2) === '67'; }},
  {t:"Doit faire moins de 90 caractères. On sait. On sait.",
                                                          f:function(v){ return v.length < 90; }},
  {t:"⚠️ RÈGLE AJOUTÉE APRÈS COUP : doit aussi contenir « swanetneo ». Le service juridique insiste.",
                                                          f:function(v){ return norm(v).indexOf('swanetneo') !== -1; }, surprise:true}
];
let mdpFini = false, mdpSurprise = false, niveauMax = 0, chronoIndice = null, chronoIndice2 = null;

/* construit un mot de passe valide : prénom + tous les mots imposés + des 9
   dosés pour que la somme des chiffres tombe pile sur 67, et « 67 » à la fin */
function solutionMdp(){
  const nom = ETAT.nom.charAt(0).toUpperCase() + ETAT.nom.slice(1).toLowerCase();
  const base = nom + "auracrousty🗿🥪nasdasswanetneo";
  let manque = Math.max(0, 67 - sommeChiffres(base) - 13);   // 13 = le « 67 » final
  let suffixe = "";
  while(manque > 9){ suffixe += "9"; manque -= 9; }
  if(manque > 0) suffixe += String(manque);
  return base + suffixe + "67";
}

ECRANS[4] = function(){
  tape(document.getElementById('d7'),
    "Sécurité renforcée. Crée un mot de passe. Les règles arrivent au fur et à mesure. Non, on peut pas te les donner toutes d'un coup.");
  mdpFini = false; mdpSurprise = false; niveauMax = 0;
  document.getElementById('inputMdp').value = '';
  document.getElementById('b7').style.display = 'none';
  document.getElementById('bIndice').style.display = 'none';
  document.getElementById('bMoai').style.display = 'none';
  document.getElementById('bCrousty').style.display = 'none';
  document.getElementById('indiceMdp').textContent = '';
  majRegles();

  clearTimeout(chronoIndice); clearTimeout(chronoIndice2);
  chronoIndice = setTimeout(function(){
    if(!mdpFini) document.getElementById('indiceMdp').textContent =
      "→ Indice gratuit : ton prénom, puis « auracrousty », puis les emojis, puis « nasdas ». Les chiffres, débrouille-toi.";
  }, 45000);
  chronoIndice2 = setTimeout(function(){
    if(!mdpFini) document.getElementById('bIndice').style.display = 'block';
  }, 90000);
};

function majRegles(){
  const v = document.getElementById('inputMdp').value;
  const liste = document.getElementById('listeRegles');

  // toutes les annulations des règles déjà dévoilées s'appliquent définitivement
  const annulees = {};
  for(let i = 0; i <= niveauMax && i < REGLES.length; i++){
    if(REGLES[i].annule != null) annulees[REGLES[i].annule] = true;
  }

  liste.innerHTML = '';
  let toutesOK = true;
  for(let i = 0; i < REGLES.length; i++){
    if(REGLES[i].surprise && !mdpSurprise) continue;   // pas encore dévoilée
    if(annulees[i]){
      liste.insertAdjacentHTML('beforeend',
        '<div class="regle annulee"><span class="etat">🚫</span><span>' + REGLES[i].t + '</span></div>');
      continue;
    }
    const ok = REGLES[i].f(v);
    liste.insertAdjacentHTML('beforeend',
      '<div class="regle' + (ok ? ' ok' : '') + '"><span class="etat">' + (ok ? '✅' : '❌') +
      '</span><span>' + REGLES[i].t + '</span></div>');
    niveauMax = Math.max(niveauMax, i);
    if(!ok){ toutesOK = false; break; }   // une règle à la fois, comme un vrai cauchemar
  }

  // les boutons d'insertion n'apparaissent qu'une fois la règle concernée dévoilée
  if(niveauMax >= 7)  document.getElementById('bMoai').style.display = 'block';
  if(niveauMax >= 10) document.getElementById('bCrousty').style.display = 'block';

  const somme = sommeChiffres(v);
  const objectif = annulees[6] ? 67 : 20;
  document.getElementById('sommeInfo').textContent =
    v ? 'somme des chiffres actuelle : ' + somme + (somme === objectif ? ' ✅' : ' (objectif : ' + objectif + ')') : '';

  if(toutesOK && !mdpFini){
    if(!mdpSurprise) refuserPuisSurprise();
    else accepterMdp();
  }
}

/* le faux refus, puis la règle qu'on avait « oubliée » */
function refuserPuisSurprise(){
  mdpFini = true;   // on gèle le temps de l'animation
  clearTimeout(chronoIndice); clearTimeout(chronoIndice2);
  document.getElementById('bIndice').style.display = 'none';
  document.getElementById('indiceMdp').textContent = '';
  const liste = document.getElementById('listeRegles');

  liste.innerHTML = '<div class="regle"><span class="etat">⏳</span><span>Vérification du mot de passe…</span></div>';
  SONS.logo();   // jingle de banque, juste avant de tout lui refuser

  setTimeout(function(){
    SONS.erreur();
    liste.innerHTML = '<div class="regle"><span class="etat">❌</span><span><b>REFUSÉ.</b> ' +
      'Mot de passe trop fort. Le serveur a pris peur. Merci de tout recommencer depuis le début.</span></div>';
    document.body.classList.add('secousse');
  }, 2300);

  setTimeout(function(){
    SONS.vineBoom();
    liste.innerHTML = '<div class="regle"><span class="etat">😌</span><span>' +
      'Nan je déconne, tu recommences pas. C\'est bon.</span></div>';
  }, 4300);

  setTimeout(function(){
    SONS.airhorn();
    mdpSurprise = true;
    mdpFini = false;
    tape(document.getElementById('d7'),
      "Par contre. Le service juridique vient d'ajouter une règle. Une seule. La dernière. Promis.");
    majRegles();
    // si elle galère sur la surprise, l'aide revient vite
    chronoIndice2 = setTimeout(function(){
      if(!mdpFini) document.getElementById('bIndice').style.display = 'block';
    }, 20000);
  }, 6100);
}

/* Vérification FINALE, une fois la règle « swanetneo » satisfaite. */
function accepterMdp(){
  mdpFini = true;
  clearTimeout(chronoIndice); clearTimeout(chronoIndice2);
  document.getElementById('bIndice').style.display = 'none';
  document.getElementById('bMoai').style.display = 'none';
  document.getElementById('bCrousty').style.display = 'none';
  document.getElementById('indiceMdp').textContent = '';
  const liste = document.getElementById('listeRegles');

  liste.innerHTML = '<div class="regle"><span class="etat">⏳</span><span>Vérification finale…</span></div>';
  SONS.logo();

  setTimeout(function(){
    SONS.aura(); confettis(110);
    liste.innerHTML =
      '<div class="regle ok"><span class="etat">🏆</span><span><b>Mot de passe accepté.</b> ' +
      'Pour de vrai. On va jamais s\'en servir, c\'était juste pour te voir souffrir.</span></div>';
    document.getElementById('b7').style.display = 'block';
    tape(document.getElementById('d7'),
      "15 règles, une qui annulait la précédente, un faux refus et une règle rajoutée en douce. " +
      "La plupart des gens abandonnent à la règle 7.");
  }, 2100);
}

document.getElementById('inputMdp').addEventListener('input', majRegles);
document.getElementById('bMoai').onclick = function(){ insererMdp('🗿'); };
document.getElementById('bCrousty').onclick = function(){ insererMdp('🥪'); };
function insererMdp(txt){
  const inp = document.getElementById('inputMdp');
  inp.value += txt;
  SONS.pop();
  majRegles();
  inp.focus();
}
document.getElementById('bIndice').onclick = function(){
  const sol = solutionMdp();
  ETAT.indiceMdp = true;
  document.getElementById('inputMdp').value = sol;
  SONS.bruh();
  tape(document.getElementById('d7'), "Pff. Tiens : « " + sol + " ». Aucune fierté. Mais bon, c'est ton anniversaire.");
  majRegles();
};
document.getElementById('b7').onclick = function(){ aller(5); };

/* ============================================================
   8 — ÉPREUVE 5 : ATTRAPE LES MOAÏ
   Escalade : à 7 Crousty on lui annonce que l'objectif était 67, puis
   on lui impose une « prolongation » de 3 Crousty à vitesse doublée.
   ============================================================ */
let scoreTaupe = 0, tempsTaupe = 20, tTaupe = null, tSpawn = null, essaisTaupe = 0, prolongation = false;
ECRANS[8] = function(){
  tape(document.getElementById('d8'),
    "Épreuve de réflexes. Attrape 7 Tasty Crousty en 20 secondes. Tape sur un crâne 💀 et tu perds un point. Simple.");
  const z = document.getElementById('taupes');
  if(!z.children.length){
    for(let i = 0; i < 9; i++){
      const t = document.createElement('div');
      t.className = 'trou';
      t.innerHTML = '<span></span>';
      t.onclick = function(){ taperTrou(t); };
      z.appendChild(t);
    }
  }
  essaisTaupe = 0; prolongation = false;
  resetTaupe();
};
function resetTaupe(){
  clearInterval(tTaupe); clearInterval(tSpawn);
  scoreTaupe = 0; tempsTaupe = 20;
  document.getElementById('scoreTaupe').textContent = 'SCORE : 0 / 7';
  document.getElementById('tempsTaupe').textContent = '⏱ 20s';
  document.getElementById('b8').style.display = 'none';
  document.getElementById('bTaupe').style.display = 'block';
  document.getElementById('r8').textContent = '';
  viderTrous();
}
function viderTrous(){
  Array.prototype.forEach.call(document.querySelectorAll('.trou span'), function(s){
    s.className = ''; s.textContent = '';
  });
}
function objectifTaupe(){ return prolongation ? 3 : 7; }
function taperTrou(t){
  const s = t.querySelector('span');
  if(!s.classList.contains('sorti')) return;
  if(s.classList.contains('crousty')){
    scoreTaupe++;
    SONS.pop();
  }else{
    scoreTaupe = Math.max(0, scoreTaupe - 1);
    SONS.bruh();
    document.getElementById('r8').textContent = pioche([
      "T'as tapé un crâne. -1. Bravo.",
      "💀 Non. C'était pas un Crousty. -1.",
      "Le crâne. Tu l'as vraiment tapé. -1 et un peu de honte."
    ]);
  }
  s.className = ''; s.textContent = '';
  document.getElementById('scoreTaupe').textContent = 'SCORE : ' + scoreTaupe + ' / ' + objectifTaupe();
  if(scoreTaupe >= objectifTaupe()) finTaupe(true);
}
function lancerTaupe(duree, vitesse, cadence){
  tempsTaupe = duree;
  document.getElementById('tempsTaupe').textContent = '⏱ ' + duree + 's';
  document.getElementById('bTaupe').style.display = 'none';

  tTaupe = setInterval(function(){
    tempsTaupe--;
    document.getElementById('tempsTaupe').textContent = '⏱ ' + tempsTaupe + 's';
    if(tempsTaupe <= 0) finTaupe(false);
  }, 1000);

  tSpawn = setInterval(function(){
    const libres = [];
    Array.prototype.forEach.call(document.querySelectorAll('.trou'), function(t){
      if(!t.querySelector('span').classList.contains('sorti')) libres.push(t);
    });
    if(!libres.length) return;
    const s = libres[alea(libres.length)].querySelector('span');
    const bon = Math.random() < .78;
    s.className = 'sorti ' + (bon ? 'crousty' : 'crane');
    s.textContent = bon ? '' : '💀';        // le Crousty est une image, le crâne un emoji
    setTimeout(function(){ s.className = ''; s.textContent = ''; }, vitesse);
  }, cadence);
}
document.getElementById('bTaupe').onclick = function(){
  essaisTaupe++;
  // 2e essai = les Crousty restent visibles plus longtemps, pour qu'elle finisse par y arriver
  lancerTaupe(20, essaisTaupe > 1 ? 1150 : 900, 620);
};
function finTaupe(gagne){
  clearInterval(tTaupe); clearInterval(tSpawn);
  viderTrous();
  const r = document.getElementById('r8');

  /* fin de la prolongation : quoi qu'il arrive, c'est terminé */
  if(prolongation){
    ETAT.moai += scoreTaupe;
    if(gagne){
      SONS.fanfare(); confettis(110);
      r.innerHTML = "✅ <b>Prolongation validée.</b> T'as fait 3 Crousty de plus que nécessaire pour un site qui te ment depuis le début. Respect.";
    }else{
      SONS.erreur();
      r.innerHTML = "Prolongation ratée. On s'en fiche complètement, c'était du bonus inventé sur le moment. <b>Épreuve validée.</b>";
    }
    document.getElementById('b8').style.display = 'block';
    modale("👑 LA REINE DU TASTY CROUSTY",
      ETAT.moai + " Crousty attrapés à mains nues. Le trône est à toi, personne ne conteste.",
      "photos/tastycrousty.jpg", "large");
    return;
  }

  if(gagne){
    ETAT.moai = Math.max(ETAT.moai, scoreTaupe);
    // fausse annonce : l'objectif aurait été 67
    SONS.erreur();
    r.innerHTML = "🎉 7 Tasty Crousty attrapés ! Épreuve réussie ! …<br>Attends. On relit la consigne. " +
                  "<b>L'objectif était 6-7. Donc 67 Crousty.</b> Il t'en manque 60.";
    setTimeout(function(){
      SONS.vineBoom();
      r.innerHTML = "Nan. 7 c'est bon. 😌 J'ai eu peur hein ?<br>" +
                    "<b>Par contre on prend 3 Crousty de plus, pour la route.</b> Et ça va deux fois plus vite.";
      prolongation = true;
      scoreTaupe = 0;
      document.getElementById('scoreTaupe').textContent = 'SCORE : 0 / 3';
      setTimeout(function(){ lancerTaupe(10, 480, 340); }, 2200);
    }, 3000);
    return;
  }

  ETAT.moai = Math.max(ETAT.moai, scoreTaupe);
  if(essaisTaupe >= 2){
    r.innerHTML = "Temps écoulé. Score : " + scoreTaupe + "/7. <b>On valide quand même</b>, on va pas y passer la journée.";
    document.getElementById('b8').style.display = 'block';
    SONS.erreur();
  }else{
    r.innerHTML = "Temps écoulé. Score : " + scoreTaupe + "/7. Nul. <b>Deuxième essai</b>, et cette fois concentre-toi.";
    SONS.erreur();
    setTimeout(function(){
      scoreTaupe = 0;
      document.getElementById('scoreTaupe').textContent = 'SCORE : 0 / 7';
      document.getElementById('tempsTaupe').textContent = '⏱ 20s';
      document.getElementById('bTaupe').textContent = 'DEUXIÈME ESSAI ▶';
      document.getElementById('bTaupe').style.display = 'block';
    }, 1600);
  }
}
document.getElementById('b8').onclick = function(){ aller(9); };

/* ============================================================
   9 — ÉPREUVE 6 : RECONNAISSANCE VOCALE

   Elle enregistre sa voix et « l'envoie » pour analyse. RIEN N'EST
   NI STOCKÉ NI ENVOYÉ : on ouvre le micro uniquement pour animer le
   vumètre en direct (AnalyserNode), le flux est coupé dès la fin, et
   il n'y a aucun appel réseau dans ce fichier. Si elle refuse le micro
   — ou si le navigateur n'est pas en HTTPS — on bascule sur un vumètre
   simulé et l'épreuve se déroule exactement pareil.

   La chute : « correspondance trouvée dans nos archives » → on lui
   ressort ses deux enregistrements.
   ============================================================ */
const BARRES_VU = 28, DUREE_ENREG = 6700;
let fluxMicro = null, analyseur = null, rafVoix = null, tVoix = null,
    microSimule = false, voixEnCours = false;

ECRANS[9] = function(){
  tape(document.getElementById('d9'),
    "Authentification biométrique. On a besoin d'un échantillon de ta voix. " +
    "C'est parfaitement inutile, mais c'est obligatoire.");

  const vu = document.getElementById('vumetre');
  if(!vu.children.length){
    for(let i = 0; i < BARRES_VU; i++) vu.appendChild(document.createElement('i'));
  }
  resetVoix();
};

function resetVoix(){
  stopVoix();
  microSimule = false; voixEnCours = false;
  const b = document.getElementById('bMicro');
  b.style.display = 'block';
  b.disabled = false;
  b.dataset.etape = 'micro';
  b.textContent = '🎙️ AUTORISER LE MICRO';
  document.getElementById('etatMicro').innerHTML = '<span class="pastille"></span>MICRO : INACTIF';
  document.getElementById('chronoVoix').textContent = '⏱ 6,7 s';
  document.getElementById('vumetre').classList.remove('actif');
  document.getElementById('zoneEnvoi').style.display = 'none';
  document.getElementById('fillEnvoi').style.width = '0%';
  document.getElementById('etatEnvoi').textContent = '';
  document.getElementById('r9').textContent = '';
  document.getElementById('b9').style.display = 'none';
  niveauxVu(function(){ return 0; });
}

/* coupe le micro et toutes les animations — appelé aussi par la relance */
function stopVoix(){
  cancelAnimationFrame(rafVoix); rafVoix = null;
  clearInterval(tVoix); tVoix = null;
  if(typeof stopLogo === 'function') stopLogo();
  if(fluxMicro){
    fluxMicro.getTracks().forEach(function(t){ t.stop(); });   // la LED du micro s'éteint ici
    fluxMicro = null;
  }
  analyseur = null;
}

/* applique une hauteur (0 → 1) à chaque barre du vumètre */
function niveauxVu(valeurPour){
  const barres = document.getElementById('vumetre').children;
  for(let i = 0; i < barres.length; i++){
    barres[i].style.height = Math.max(3, Math.min(100, valeurPour(i) * 100)) + '%';
  }
}

document.getElementById('bMicro').onclick = function(){
  if(this.dataset.etape === 'enregistrer') demarrerEnregistrement();
  else demanderMicro();
};

function demanderMicro(){
  const b = document.getElementById('bMicro');
  b.disabled = true;
  document.getElementById('etatMicro').innerHTML = '<span class="pastille"></span>MICRO : DEMANDE EN COURS…';
  SONS.bip();

  const md = navigator.mediaDevices;
  if(!md || !md.getUserMedia){ microIndispo("Ton navigateur veut pas ouvrir le micro."); return; }

  md.getUserMedia({audio: true}).then(function(flux){
    fluxMicro = flux;
    const a = audio();
    analyseur = a.createAnalyser();
    analyseur.fftSize = 128;
    a.createMediaStreamSource(flux).connect(analyseur);   // jamais relié aux enceintes : pas de larsen
    pretAEnregistrer("Micro autorisé. Tu vas le regretter.");
  }).catch(function(){
    microIndispo("Micro refusé. Tu te méfies. T'as bien raison, mais ça change rien.");
  });
}

function microIndispo(raison){
  microSimule = true;
  SONS.bruh();
  pretAEnregistrer(raison + " On va faire semblant, le résultat sera exactement le même.");
}

function pretAEnregistrer(msg){
  const b = document.getElementById('bMicro');
  b.disabled = false;
  b.dataset.etape = 'enregistrer';
  b.textContent = '🔴 DÉMARRER L\'ENREGISTREMENT';
  document.getElementById('etatMicro').innerHTML =
    '<span class="pastille"></span>MICRO : ' + (microSimule ? 'SIMULÉ' : 'PRÊT');
  tape(document.getElementById('d9'), msg + " Tu auras 6,7 secondes. Dis n'importe quoi. Chante, même.");
}

function demarrerEnregistrement(){
  voixEnCours = true;
  const b = document.getElementById('bMicro');
  b.style.display = 'none';
  document.getElementById('vumetre').classList.add('actif');
  document.getElementById('etatMicro').innerHTML =
    '<span class="pastille rec"></span>ENREGISTREMENT EN COURS';
  SONS.pop();

  const debut = Date.now();
  const donnees = analyseur ? new Uint8Array(analyseur.frequencyBinCount) : null;

  // vumètre : vraies fréquences du micro, ou simulation crédible si refusé
  (function boucle(){
    if(!voixEnCours) return;
    if(analyseur){
      analyseur.getByteFrequencyData(donnees);
      niveauxVu(function(i){
        return donnees[Math.floor(i * donnees.length / BARRES_VU)] / 255;
      });
    }else{
      const t = Date.now() / 130;
      niveauxVu(function(i){
        return Math.abs(Math.sin(t + i * .5)) * (.25 + Math.random() * .6);
      });
    }
    rafVoix = requestAnimationFrame(boucle);
  })();

  const phrases = [
    "Parle. N'importe quoi. On analyse rien de toute façon.",
    "Plus fort. Le micro te capte mal. (mensonge)",
    "Continue, c'est bientôt fini.",
    "Là tu chantes ? Ok. On garde ça.",
    "Encore deux secondes. Tiens bon."
  ];
  let ip = 0;
  tVoix = setInterval(function(){
    const reste = Math.max(0, DUREE_ENREG - (Date.now() - debut));
    document.getElementById('chronoVoix').textContent =
      '⏱ ' + (reste / 1000).toFixed(1).replace('.', ',') + ' s';
    if(reste > 0 && Math.random() < .06 && ip < phrases.length){
      document.getElementById('r9').textContent = phrases[ip++];
    }
    if(reste <= 0) finEnregistrement();
  }, 100);
}

function finEnregistrement(){
  voixEnCours = false;
  ETAT.voixEnvoyee = true;
  stopVoix();
  niveauxVu(function(){ return 0; });
  document.getElementById('vumetre').classList.remove('actif');
  document.getElementById('etatMicro').innerHTML = '<span class="pastille"></span>MICRO : COUPÉ';
  document.getElementById('chronoVoix').textContent = '⏱ 0,0 s';
  document.getElementById('r9').textContent = '';
  SONS.logo();
  envoyerVoix();
}

/* Le faux envoi. Aucune requête réseau : c'est une barre qui monte,
   et qui bloque à 67% parce qu'évidemment. */
function envoyerVoix(){
  const zone = document.getElementById('zoneEnvoi'),
        fill = document.getElementById('fillEnvoi'),
        etat = document.getElementById('etatEnvoi');
  zone.style.display = 'block';

  const etapes = [
    [12,  "Compression de l'échantillon…"],
    [31,  "Chiffrement (on fait semblant)…"],
    [58,  "Envoi au serveur d'analyse vocale…"],
    [67,  "Analyse en cours… 67%"],
    [67,  "Toujours 67%. Évidemment."],
    [67,  "…"],
    [94,  "Comparaison avec la base nationale des voix…"],
    [100, "⚠️ CORRESPONDANCE TROUVÉE DANS NOS ARCHIVES"]
  ];
  let i = 0;
  (function suite(){
    if(i >= etapes.length){ revelationVoix(); return; }
    const e = etapes[i++];
    fill.style.width = e[0] + '%';
    etat.textContent = e[1];
    SONS.bip();
    setTimeout(suite, i === 5 || i === 6 ? 1300 : 750);
  })();
}

/* ---- logo sonore animé pendant la lecture des extraits ---- */
let rafLogo = null;

function stopLogo(){
  cancelAnimationFrame(rafLogo); rafLogo = null;
  const l = document.getElementById('logoAudio');
  l.style.display = 'none';
  l.style.setProperty('--n', 0);
}

/* `an` = AnalyserNode branché sur l'extrait en cours, ou null si le navigateur
   n'a pas voulu : dans ce cas le logo pulse tout seul, personne ne verra la
   différence. La variable CSS --n (0 → 1) pilote tout le visuel. */
function animerLogo(an, index){
  cancelAnimationFrame(rafLogo);
  const logo = document.getElementById('logoAudio');

  if(index === -1){ stopLogo(); return; }          // lecture terminée

  logo.style.display = 'flex';
  document.getElementById('logoMarque').textContent = 'EXTRAIT ' + (index + 1) + ' / 2 · 6-7 VOICE ID™';
  document.getElementById('logoNoyau').textContent = index === 0 ? '🎤' : '🗿';

  const data = an ? new Uint8Array(an.frequencyBinCount) : null;
  (function boucle(){
    let n;
    if(an){
      an.getByteFrequencyData(data);
      let somme = 0;
      for(let i = 0; i < data.length; i++) somme += data[i];
      n = Math.min(1, (somme / data.length) / 95);              // niveau moyen → 0..1
      niveauxVu(function(i){ return data[Math.floor(i * data.length / BARRES_VU)] / 255; });
    }else{
      const t = Date.now() / 190;                                // animation libre
      n = .35 + Math.abs(Math.sin(t)) * .5;
      niveauxVu(function(i){ return Math.abs(Math.sin(t + i * .45)) * .7; });
    }
    logo.style.setProperty('--n', n.toFixed(3));
    rafLogo = requestAnimationFrame(boucle);
  })();
}

function revelationVoix(){
  const etat = document.getElementById('etatEnvoi');
  SONS.erreur();
  etat.innerHTML = '🎤 Deux enregistrements archivés à ton nom. Lecture intégrale obligatoire.';
  tape(document.getElementById('d9'),
    "On avait déjà ta voix. Depuis le début. Écoute bien, c'est toi.");

  setTimeout(function(){
    document.getElementById('vumetre').classList.add('actif');
    jouerChansons(function(){
      stopLogo();
      niveauxVu(function(){ return 0; });
      document.getElementById('vumetre').classList.remove('actif');
      SONS.aura(); confettis(110);
      etat.innerHTML = '✅ VOIX AUTHENTIFIÉE À 67% — identité confirmée';
      document.getElementById('r9').innerHTML =
        "Ton échantillon a été comparé, analysé, puis <b>supprimé</b> — on l'a jamais gardé, " +
        "on l'a même jamais envoyé nulle part. Par contre les archives, elles, on les avait. 😌";
      document.getElementById('b9').style.display = 'block';
      modale("🎤 VOIX AUTHENTIFIÉE",
        "Merci pour les belles paroles. Dieu merci t'as pas continué dans la musique…");
    }, animerLogo);
  }, 1600);
}

document.getElementById('b9').onclick = function(){ stopVoix(); aller(10); };

/* ============================================================
   10 — ÉPREUVE 7 : QUIZ SUR ELLE-MÊME
   Aucune bonne réponse : le score est 67% quoi qu'elle réponde.
   Escalade : des questions « en trop » à la fin, puis un calcul de
   score interminable.
   ============================================================ */
const QUIZ = [
  {q:"Première question, facile : la première chose que tu fais le matin ?",
   r:["Regarder mon tel pendant 6-7 heures","Dire « je me lève dans 5 min » (mensonge)","Ma routine skincare en 47 étapes","Rien, je dors encore, laissez-moi"],
   f:["Comme 97% de la population. Banal. -3 points.","Menteuse professionnelle. Confirmé.","Personne te croit mais on valide.","Réponse la plus honnête du site."]},
  {q:"Ton emoji signature, sois honnête :",
   r:["💀 (utilisé 800 fois par jour)","😭 pour absolument tout","🐵 quand j'ai rien à dire","🤡 que j'envoie aux gens en retard"],
   f:["Diagnostic : brainrot avancé.","Tu pleures pour un chat sur TikTok. On sait.","Le choix des vrais. +67 aura.","Agressive. On aime."]},
  {q:"Tu mets combien de temps à répondre à un message ?",
   r:["6-7 minutes","6-7 heures","6-7 jours ouvrés","J'ai lu, j'ai ri, j'ai jamais répondu"],
   f:["Mytho. Total mytho.","Ça c'est plus crédible.","Là on touche à la vérité.","VOILÀ. Enfin l'honnêteté."]},
  {q:"Si t'étais un personnage de brainrot italien, tu serais :",
   r:["Tralalero Tralala 🦈 (le drip)","Bombardiro Crocodilo 🐊 (le chaos)","Ballerina Cappuccina ☕ (l'élégance)","Tung Tung Tung Sahur 🥁 (la menace)"],
   f:["Les chaussures, le style, tout y est.","On savait déjà en vrai.","Ambitieux. Faux, mais ambitieux.","Terrifiant. Et exact."]},
  {q:"Ton vrai plat préféré (le mensonge sera détecté) :",
   r:["Les pâtes. Toujours les pâtes.","Un Tasty Crousty à n'importe quelle heure","Un kebab à 4h du mat', assumé","« Je mange rien j'ai pas faim » *finit ton assiette*"],
   f:["Classique et respectable.","Choix de connaisseuse. Le sandwich des légendes.","Zéro honte, respect total.","Le crime parfait, répété 6-7 fois par semaine."]},
  {q:"Si Nasdas débarquait pour distribuer des billets, tu ferais quoi ?",
   r:["Je suis déjà dans la file","Je filme pour la story, ça rapporte plus","Je prends et je dis rien à personne","J'ai 20 ans, j'ai plus l'âge (mensonge)"],
   f:["Honnête. Marseille est fière.","Stratège. On aime.","Discrète et efficace. La vraie technique.","Personne n'a plus l'âge. Tout le monde y va."]},
  {q:"Quelle est ta plus grosse force ?",
   r:["Mon aura de 9999","Annuler un plan 10 minutes avant","Rire à mes blagues avant la chute","Retrouver n'importe qui sur insta en 30 secondes 🕵️"],
   f:["Objectivement vrai. On peut pas nier.","C'est une force ? Débattable.","Le charme absolu.","Le vrai super-pouvoir. La DGSE t'a repérée."]},
  {q:"Dernière question. T'as quel âge, VRAIMENT ?",
   r:["20 ans","6-7 ans","20 ans mais mentalement 6","L'âge est un concept, je suis éternelle"],
   f:["Officiel et confirmé.","On y arrive enfin.","Diagnostic partagé par tes proches.","Réponse acceptée par le Ministère."]},
  /* les questions en trop */
  {num:"QUESTION 9 / 8",
   q:"Ah non pardon, il en restait une. T'as remarqué qu'il y a une question de trop ?",
   r:["Oui, et ça me perturbe","Non j'avais pas compté","J'ai arrêté de compter à l'épreuve 1","6-7"],
   f:["Bien vu. Elle comptait pas.","Personne compte. Elle comptait pas.","Sage décision. Elle comptait pas.","Toujours la bonne réponse. Elle comptait pas."]},
  {num:"QUESTION 6-7 / 8",
   q:"Vraiment la dernière : est-ce que ce quiz a un sens ?",
   r:["Non","Absolument pas","J'ai arrêté de chercher","Six Seven"],
   f:["Correct.","Encore plus correct.","La sagesse.","La seule vraie réponse depuis le début."]}
];
let qi = 0;
ECRANS[10] = function(){
  document.getElementById('titreQuiz').textContent = "Tu te connais, " + ETAT.nom + " ?";
  qi = 0;
  document.getElementById('quizJeu').style.display = 'block';
  document.getElementById('quizFin').style.display = 'none';
  poserQuestion();
};
function poserQuestion(){
  if(qi >= QUIZ.length){ calculerScoreQuiz(); return; }

  const q = QUIZ[qi];
  document.getElementById('qnum').textContent = q.num || ('QUESTION ' + (qi + 1) + ' / 8');
  document.getElementById('qtxt').textContent = q.q;
  const box = document.getElementById('reps');
  box.innerHTML = '';
  q.r.forEach(function(txt, idx){
    const b = document.createElement('button');
    b.className = 'rep'; b.textContent = txt;
    b.onclick = function(){
      b.classList.add('choisie');
      SONS.sixSept();
      Array.prototype.forEach.call(box.children, function(c){ c.disabled = true; });
      const fb = document.createElement('div');
      fb.style.cssText = "font-family:var(--comic);color:#ffe600;margin-top:12px;font-size:15px;line-height:1.5";
      fb.textContent = '→ ' + q.f[idx];
      box.appendChild(fb);
      setTimeout(function(){ qi++; poserQuestion(); }, 1500);
    };
    box.appendChild(b);
  });
}
/* le faux calcul interminable */
/* Le score s'affole avant de se figer : défilement rapide au début, de plus en
   plus lent, et il s'arrête évidemment sur 67. */
function roulerScore(fini){
  const el = document.getElementById('quizScore');
  const DUREE = 3400, debut = Date.now();
  let prochain = 0;
  el.classList.remove('fige');
  el.classList.add('roule');

  (function boucle(){
    const t = Date.now() - debut;
    if(t >= DUREE){
      el.textContent = '67%';
      el.classList.remove('roule');
      el.classList.add('fige');
      SONS.aura(); confettis(120);
      setTimeout(fini, 700);
      return;
    }
    if(t >= prochain){
      el.textContent = alea(101) + '%';
      SONS.bip();
      const p = t / DUREE;                    // ralentit vers la fin
      prochain = t + 45 + p * p * 300;
    }
    requestAnimationFrame(boucle);
  })();
}

function calculerScoreQuiz(){
  document.getElementById('quizJeu').style.display = 'none';
  document.getElementById('quizFin').style.display = 'block';
  // le bouton reste caché tant que l'analyse n'est pas allée à son terme
  document.getElementById('b10').style.display = 'none';
  document.getElementById('quizScore').textContent = '--%';
  document.getElementById('quizScore').className = 'score-quiz';
  const d = document.getElementById('d10');
  const etapes = [
    "Calcul du score en cours…",
    "Croisement avec ta liste Spotify…",
    "Analyse de tes 6-7 dernières stories…",
    "Envoi du dossier à Swan et Néo pour relecture…",
    "Consultation de tes proches… ils ont ri…",
    "Compilation des résultats… 67%… vérification… toujours 67%…"
  ];
  let i = 0;
  (function suite(){
    if(i >= etapes.length){
      tape(d, "Calcul terminé. Résultat…", function(){
        roulerScore(function(){
          tape(d, "67%. Peu importe tes réponses, c'était 67% depuis le début. " +
                  "Tu te connais à 67%. Les 33% restants, on les garde pour nous.",
            function(){ document.getElementById('b10').style.display = 'block'; });
          modale("🔢 SIX SEVEN",
            "Six seven… finalement ce chiffre te suit jusqu'au bout, ma petite " + ETAT.nom + "…");
        });
      });
      return;
    }
    tape(d, etapes[i++], function(){ setTimeout(suite, 700); });
  })();
}
document.getElementById('b10').onclick = function(){ aller(11); };

/* ============================================================
   11 — ÉPREUVE 7 : CADEAU FUYANT

   Escalade : 12 esquives au lieu de 7, le bouton rétrécit et accélère
   à chaque fois, des faux cadeaux viennent brouiller la piste à
   mi-parcours — et à la fin il ment encore trois fois.
   ============================================================ */
const ESQUIVES_MAX = 12, LEURRE_DES = 5;
let esquives = 0, mensonges = 0, leurres = [];

const MENSONGES = [
  {txt:"🎁 VAS-Y CLIQUE (j'ai perdu)", fond:'#c6ff00', couleur:'#000',
   apres:"Ah non pardon. Réflexe. <b>Là c'est vraiment bon</b>, je te jure sur l'aura."},
  {txt:"🎁 PARDON. RÉFLEXE. LÀ C'EST BON.", fond:'#ff2bd6', couleur:'#fff',
   apres:"…ok c'était la dernière fois. <b>Sur la tête du Tasty Crousty.</b> Clique."},
  {txt:"🎁 SUR LA TÊTE DU CROUSTY. CLIQUE.", fond:'#00f0ff', couleur:'#000',
   apres:"Bon. Là j'ai plus d'excuse. 😐 Vas-y."}
];

ECRANS[11] = function(){
  tape(document.getElementById('d11'),
    "Dernière épreuve. Ton cadeau est dans ce bouton. Clique dessus. C'est tout. Facile.");
};

(function(){
  const zone = document.getElementById('zoneCadeau'), btn = document.getElementById('cadeau');
  const phrases = [
    "Ah. Raté.",
    "Encore raté. T'es proche pourtant.",
    "Non.",
    "Sérieusement ?",
    "T'as vraiment 20 ans ?",
    "⚠️ Bon. J'appelle des renforts.",
    "Lequel est le vrai ? Aucune idée. Bonne chance.",
    "Il rétrécit aussi, tu remarques ?",
    "Tu t'acharnes. C'est presque touchant.",
    "6-7 tentatives. On approche.",
    "Encore deux. Je le sens mal pour toi.",
    "Ok. J'en peux plus. Je bouge plus. Promis."
  ];

  /* place un élément au hasard dans la zone, en le gardant entièrement dedans */
  function placer(el){
    const z = zone.getBoundingClientRect(), b = el.getBoundingClientRect();
    const maxX = Math.max(0, z.width  - b.width);
    const maxY = Math.max(0, z.height - b.height);
    el.style.left = (Math.random() * maxX + b.width  / 2) + 'px';
    el.style.top  = (Math.random() * maxY + b.height / 2) + 'px';
  }

  /* il maigrit et devient de plus en plus vif au fil des esquives */
  function retrecir(){
    const p = Math.min(1, esquives / ESQUIVES_MAX);
    btn.style.fontSize = 'clamp(10px,' + (3.2 - p * 1.5) + 'vw,' + (20 - p * 9) + 'px)';
    btn.style.padding  = (17 - p * 9) + 'px ' + (24 - p * 13) + 'px';
    btn.style.transitionDuration = (0.17 - p * 0.12) + 's';
  }

  /* les faux cadeaux : ils fuient aussi, et ils sont vides */
  function semerLeurres(){
    if(leurres.length) return;
    for(let i = 0; i < 3; i++){
      const l = document.createElement('button');
      l.className = 'leurre';
      l.textContent = '🎁 CLIQUE ICI';
      zone.appendChild(l);
      placer(l);
      l.addEventListener('mouseenter', function(){ placer(l); SONS.bip(); });
      l.addEventListener('click', function(e){
        e.stopPropagation();
        SONS.erreur();
        l.textContent = '💨 VIDE';
        l.classList.add('creve');
        document.getElementById('d11').textContent = pioche([
          "Celui-là était vide. Évidemment.",
          "Faux cadeau. Il y en a trois. Amuse-toi bien.",
          "Non. Cherche encore."
        ]);
        setTimeout(function(){ l.classList.remove('creve'); l.textContent = '🎁 CLIQUE ICI'; placer(l); }, 900);
      });
      leurres.push(l);
    }
  }

  function fuir(){
    if(esquives >= ESQUIVES_MAX) return;
    placer(btn);
    document.getElementById('d11').textContent = phrases[Math.min(esquives, phrases.length - 1)];
    SONS.bruh();
    esquives++;
    retrecir();
    if(esquives === LEURRE_DES) semerLeurres();
    if(esquives >= ESQUIVES_MAX) appliquerMensonge(0);
  }

  function appliquerMensonge(i){
    // il redevient gros et lisible : elle a le droit d'y croire
    btn.style.fontSize = ''; btn.style.padding = ''; btn.style.transitionDuration = '';
    btn.style.background = MENSONGES[i].fond;
    btn.style.color = MENSONGES[i].couleur;
    btn.textContent = MENSONGES[i].txt;
    leurres.forEach(function(l){ l.remove(); });
    leurres = [];
  }

  btn.addEventListener('mouseenter', fuir);
  btn.addEventListener('touchstart', function(e){
    if(esquives < ESQUIVES_MAX){ e.preventDefault(); fuir(); }
  }, {passive:false});

  btn.addEventListener('click', function(){
    if(esquives < ESQUIVES_MAX){ fuir(); return; }

    // il a promis de plus bouger. il ment trois fois de suite.
    if(mensonges < MENSONGES.length - 1){
      placer(btn);
      SONS.vineBoom();
      document.getElementById('d11').innerHTML = MENSONGES[mensonges].apres;
      mensonges++;
      appliquerMensonge(mensonges);
      return;
    }
    if(mensonges === MENSONGES.length - 1){
      mensonges++;
      SONS.erreur();
      document.getElementById('d11').innerHTML = MENSONGES[MENSONGES.length - 1].apres;
      btn.textContent = "🎁 OUVRIR LE CADEAU";
      btn.style.background = '#ffe600';
      btn.style.color = '#000';
      return;
    }

    SONS.fanfare(); confettis(110);
    document.getElementById('b11').style.display = 'block';
    document.getElementById('d11').innerHTML =
      "Bouton vaincu ! Alors… le cadeau n'est pas dedans. 😈<br>" +
      "Il est sur <b>la prochaine épreuve</b>. Juste après. Promis.";
    modale("🎁 PRESQUE 😈",
      "12 esquives, 3 faux cadeaux et 3 mensonges — et le bouton était vide. " +
      "Ton cadeau n'est pas ici : il est sur la PROCHAINE épreuve. " +
      "Clique sur CONTINUER, il t'attend juste derrière. Qu'est-ce qui pourrait mal se passer.");
  });
})();

/* Le tout dernier bouton « normal » du site. Elle croit aller chercher son
   cadeau sur l'épreuve suivante — c'est lui qui déclenche l'effondrement
   (voir js/intrusion.js). */
document.getElementById('b11').onclick = function(){ armerBoutonFin(this); };

/* réinitialise l'esquive du cadeau — appelé par la relance dans final.js */
function resetCadeau(){
  esquives = 0;
  mensonges = 0;
  leurres.forEach(function(l){ l.remove(); });
  leurres = [];
  const b = document.getElementById('cadeau');
  b.style.fontSize = ''; b.style.padding = ''; b.style.transitionDuration = '';
}
