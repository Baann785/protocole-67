/* ============================================================
   EFFETS — confettis, popups Windows, secrets et easter eggs
   ============================================================ */

/* ------------------------------------------------------------
   CONFETTIS
   Rectangles vectoriels, PAS des emojis : fillText() d'emoji est ~50x plus
   coûteux qu'un fillRect et faisait ramer la page. + plafond de particules
   + la boucle s'arrête quand l'écran est vide.
   ------------------------------------------------------------ */
const cv = document.getElementById('confetti'), cx = cv.getContext('2d');
const COULEURS = ['#ff2bd6','#00f0ff','#c6ff00','#ffe600','#7b2bff','#ffffff'];
const MAX_PARTICULES = 120;
let particules = [], anime = false;

function taille(){ cv.width = window.innerWidth; cv.height = window.innerHeight; }
taille();
window.addEventListener('resize', function(){ clearTimeout(taille._t); taille._t = setTimeout(taille, 150); });

function confettis(n){
  n = Math.min(n, MAX_PARTICULES - particules.length);
  for(let i = 0; i < n; i++){
    particules.push({
      x: Math.random() * cv.width,
      y: -20 - Math.random() * cv.height * .4,
      vx: (Math.random() - .5) * 4,
      vy: 2.5 + Math.random() * 5,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - .5) * .22,
      w: 7 + Math.random() * 9,
      h: 10 + Math.random() * 12,
      c: pioche(COULEURS)
    });
  }
  if(!anime){ anime = true; requestAnimationFrame(boucleConfetti); }
}
function boucleConfetti(){
  cx.clearRect(0, 0, cv.width, cv.height);
  if(!particules.length){ anime = false; return; }
  const limite = cv.height + 40, restants = [];
  for(let i = 0; i < particules.length; i++){
    const p = particules[i];
    p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vy += .12;
    if(p.y >= limite) continue;
    restants.push(p);
    cx.save();
    cx.translate(p.x, p.y);
    cx.rotate(p.r);
    cx.fillStyle = p.c;
    cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cx.restore();
  }
  particules = restants;
  requestAnimationFrame(boucleConfetti);
}

/* ------------------------------------------------------------
   POPUPS TROLL
   ------------------------------------------------------------ */
const POPUPS = [
  {t:"Alerte Sécurité",  i:"⚠️", m:"Niveau d'aura anormalement élevé détecté sur cet appareil.", b:"Assumer"},
  {t:"Windows",          i:"💾", m:"6-7 memes non autorisés détectés. En installer 67 de plus ?", b:"Évidemment"},
  {t:"Rappel",           i:"🎂", m:"C'est ton anniversaire. Tu n'as pas encore assez été félicitée. Recommence.", b:"D'accord"},
  {t:"Antivirus 2007",   i:"🦠", m:"Virus détecté : brainrot.exe — suppression impossible (trop drôle).", b:"Tant pis"},
  {t:"Impôts.gouv",      i:"🏛️", m:"Vous devez 6,70 € à l'État pour usage abusif du chiffre 67. Payable en câlins.", b:"Contester"},
  {t:"Erreur 404",       i:"❓", m:"Le sérieux de ce site est introuvable. Il n'a jamais existé.", b:"Logique"},
  {t:"SNCF Connect",     i:"🚆", m:"Votre train a 6-7 minutes de retard. Ces 6-7 minutes durent 2 heures.", b:"Évidemment"},
  {t:"Vinted",           i:"👗", m:"Quelqu'un vient de proposer 3 € pour ton aura. Accepter ?", b:"Jamais"},
  {t:"Doctolib",         i:"🩺", m:"Aucun créneau disponible avant 6-7 mois. Bon courage.", b:"Super"},
  {t:"Fort Boyard",      i:"🗝️", m:"Père Fouras : « Je suis le début de la fin et la fin du temps. » Réponse : 6-7.", b:"Tourne serviette"},
  {t:"Notification",     i:"🦈", m:"Tralalero Tralala souhaite vous ajouter en ami. Refuser est inutile.", b:"Accepter"},
  {t:"Météo France",     i:"🌡️", m:"Prévisions du jour : 100% de chances de vieillir. Bon courage.", b:"Merci"},
  {t:"Le Bon Coin",      i:"📦", m:"« Bonjour, toujours dispo ? » — non, elle a 20 ans, elle est plus dispo.", b:"Fermer"},
  {t:"Snapchat",         i:"👻", m:"Nasdas a ajouté une story : « QUI VEUT 6-7 € ? » Vous êtes 4 millions à répondre.", b:"MOI MOI MOI"},

  /* --- la série gênante : celles qui la visent personnellement --- */
  {t:"Rappel de santé",  i:"🩺", m:"Votre médecin : « le taux de six seven dans votre sang reste préoccupant. »", b:"Je gère"},
  {t:"Groupe famille",   i:"👨‍👩‍👧", m:"Ton petit cousin de 9 ans vient d'expliquer le 6-7 à toute la table. Tu as hoché la tête comme si tu savais.", b:"J'assume"},
  {t:"Rapport d'incident", i:"📋", m:"Vous avez prononcé « six seven » à voix haute pendant un moment sérieux. 6-7 personnes ont entendu.", b:"Et alors"},
  {t:"Historique Google",i:"🔎", m:"Recherche récente : « est-ce que le tasty crousty revient ». 6-7 fois cette semaine. Toujours non.", b:"J'espère encore"},
  {t:"Temps d'écran",    i:"📱", m:"6-7 heures aujourd'hui. On a arrêté de compter par respect pour toi.", b:"Ignorer"},
  {t:"Message d'un ami", i:"💬", m:"« elle dit encore six seven… à 20 ans… » — quelqu'un, quelque part, en ce moment même.", b:"Ratio"},
  {t:"Service client McDo", i:"🥪", m:"Votre réclamation concernant le Tasty Crousty a bien été reçue. Elle fait 6 pages. La réponse est non.", b:"Faire appel"},
  {t:"Spotify Wrapped",  i:"🎧", m:"Votre son le plus écouté cette année dure 6 secondes et vient d'un edit. Bravo.", b:"Partager"},
  {t:"Rappel gênant",    i:"😬", m:"Souvenir d'il y a 6-7 ans : cette story que tu as postée à 3h et supprimée à 3h04. On l'a.", b:"Supprimer (ça marchera pas)"},
  {t:"Note du prof",     i:"📝", m:"« Élève brillante mais dit six seven au milieu des exposés. » Moyenne : 6,7/20.", b:"Injuste"},
  {t:"YouTube",          i:"▶️", m:"Swan et Néo viennent de poster : « 24H DANS UN SITE D'ANNIVERSAIRE ». 12 M de vues.", b:"S'abonner"},
  {t:"McDo",             i:"🥪", m:"Rupture de stock : Tasty Crousty. Depuis 6-7 ans. Ça reviendra jamais.", b:"Deuil"},
  {t:"Uber Eats",        i:"🛵", m:"Votre commande arrive dans 6-7 min. Le livreur est à Marseille. Vous non.", b:"Suivre"}
];
/* Coupe-circuit : pendant la scène finale, plus AUCUNE popup du parcours
   ne doit apparaître — ni la boucle automatique, ni le détecteur d'absence,
   ni le code secret « 67 ». La phase d'intrusion a ses propres fenêtres. */
let popupsBloquees = false;

function popup(){
  if(popupsBloquees) return;
  const p = pioche(POPUPS);
  const d = document.createElement('div');
  d.className = 'popup';
  d.style.left = (Math.random() * Math.max(10, window.innerWidth - 330)) + 'px';
  d.style.top  = (60 + Math.random() * Math.max(10, window.innerHeight - 280)) + 'px';
  d.innerHTML =
    '<div class="barre-titre"><span>' + p.t + '</span><button>✕</button></div>' +
    '<div class="corps"><span class="ico">' + p.i + '</span><span>' + p.m + '</span></div>' +
    '<div class="pied"><button>' + p.b + '</button></div>';
  document.body.appendChild(d);
  SONS.erreur();
  Array.prototype.forEach.call(d.querySelectorAll('button'), function(b){
    b.onclick = function(){ d.remove(); SONS.sixSept(); };
  });
  setTimeout(function(){ if(d.parentNode) d.remove(); }, 15000);
}
setTimeout(function boucle(){
  // pas de popup pendant l'épreuve chronométrée (écran 8), ce serait déloyal (à peine)
  if(ETAT.ecran > 0 && ETAT.ecran !== 8) popup();
  setTimeout(boucle, 30000 + Math.random() * 30000);
}, 35000);

/* ------------------------------------------------------------
   SECRETS
   ------------------------------------------------------------ */
const SECRETS = [
  {id:'konami', nom:"Mode aura maximale",   indice:"Un vieux code de jeu vidéo. ⬆⬆⬇⬇⬅➡⬅➡ B A"},
  {id:'67',     nom:"Le chiffre",           indice:"Tape-le au clavier. Tu le connais par cœur maintenant."},
  {id:'jul',    nom:"Wesh alors",           indice:"3 lettres. Marseille. Survêtement."},
  {id:'nasdas', nom:"La distribution",      indice:"Tape le nom de celui qui distribue des billets sur Snap."},
  {id:'swan',   nom:"Swan et Néo",          indice:"Tape le prénom du grand frère. 4 lettres. YouTube 2016."},
  {id:'tasty',  nom:"Tasty Crousty",        indice:"Tape le nom du sandwich légendaire (le premier mot suffit)."},
  {id:'board',  nom:"Le soundboard secret", indice:"Tape « meme ». Ou clique 7 fois sur le bouton 🔊."},
  {id:'hud',    nom:"La barre truquée",     indice:"Clique 7 fois sur le pourcentage tout en haut."},
  {id:'clic',   nom:"Le clic droit",        indice:"Fais un truc qu'on fait jamais sur un site."},
  {id:'simon6', nom:"Le mode Nasdas",       indice:"Bats la manche 5 du test de mémoire. Puis la 6. Bon courage."}
];
function nbSecrets(){ return Object.keys(ETAT.secrets).length; }
function secret(id){
  if(ETAT.secrets[id]) return false;
  ETAT.secrets[id] = true;
  const s = SECRETS.filter(function(x){ return x.id === id; })[0];
  toast('🔓 SECRET ' + nbSecrets() + '/' + SECRETS.length + ' — ' + s.nom);
  SONS.aura(); confettis(60);
  return true;
}
function remplirSecrets(){
  document.getElementById('titreSecrets').textContent =
    '🔎 Secrets trouvés : ' + nbSecrets() + ' / ' + SECRETS.length;
  document.getElementById('listeSecrets').innerHTML = SECRETS.map(function(s){
    const ok = !!ETAT.secrets[s.id];
    return '<div class="s ' + (ok ? 'trouve' : 'cache') + '">' +
           '<span>' + (ok ? '✅' : '🔒') + '</span>' +
           '<span><b>' + (ok ? s.nom : '???') + '</b>' + s.indice + '</span></div>';
  }).join('');
}

/* ---- soundboard secret ---- */
const BTNS_SON = [
  {t:"VINE BOOM",      s:'vineBoom', c:'#ff2bd6', d:"le classique"},
  {t:"AIRHORN 📢",     s:'airhorn',  c:'#c6ff00', d:"corne de brume"},
  {t:"BRUH",           s:'bruh',     c:'#00f0ff', d:"le soupir"},
  {t:"SKIBIDI",        s:'skibidi',  c:'#ffe600', d:"toilet"},
  {t:"TUNG TUNG TUNG", s:'tung',     c:'#ff8c00', d:"sahur"},
  {t:"RIZZ ✨",         s:'rizz',     c:'#ff5c8a', d:"+300 aura"},
  {t:"VIOLON TRISTE",  s:'violon',   c:'#9d7bff', d:"tu vieillis"},
  {t:"FORT BOYARD 🗝️", s:'boyard',   c:'#ffcf7a', d:"tourne serviette"},
  {t:"ERREUR PC 💾",   s:'erreur',   c:'#8fd6ff', d:"windows 98"},
  {t:"6-7",            s:'sixSept',  c:'#c6ff00', d:"six seven"}
];
(function(){
  const g = document.getElementById('grilleSon');
  BTNS_SON.forEach(function(b){
    const d = document.createElement('button');
    d.className = 'son'; d.style.background = b.c;
    d.innerHTML = b.t + '<small>' + b.d + '</small>';
    d.onclick = function(){ SONS[b.s](); };
    g.appendChild(d);
  });
})();
function ouvrirBoard(){
  secret('board');
  document.getElementById('board').classList.add('on');
}
document.getElementById('fermerBoard').onclick = function(){ document.getElementById('board').classList.remove('on'); };
document.getElementById('board').onclick = function(e){ if(e.target === this) this.classList.remove('on'); };

/* ---- barre de progression truquée ---- */
(function(){
  let n = 0;
  document.getElementById('hudPct').onclick = function(){
    n++;
    SONS.bip();
    if(n === 7){
      secret('hud');
      const f = document.getElementById('hudFill'), p = document.getElementById('hudPct');
      const avantF = f.style.width, avantP = p.textContent;
      f.style.width = '67%'; p.textContent = '67%';
      toast('LA BARRE A TOUJOURS AFFICHÉ 67%. TU L\'AS PAS VU.');
      setTimeout(function(){ f.style.width = avantF; p.textContent = avantP; }, 3000);
      n = 0;
    }
  };
})();

/* ---- clic droit ---- */
(function(){
  let fait = false;
  window.addEventListener('contextmenu', function(e){
    if(fait) return;          // une seule fois, sinon c'est juste pénible
    e.preventDefault();
    fait = true;
    secret('clic');
    modale("👀 CLIC DROIT DÉTECTÉ",
      "Tu cherchais quoi ? Le code source ? Y'a rien à voir, c'est écrit à 3h du matin. " +
      "Reviens jouer. (Promis, je bloque plus le clic droit.)");
  });
})();

/* ---- codes au clavier ---- */
(function(){
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let kPos = 0, tampon = '';

  const CODES = {
    '67': function(){
      secret('67');
      SONS.vineBoom(); confettis(90);
      for(let i = 0; i < 3; i++) setTimeout(popup, i * 400);
    },
    'jul': function(){
      secret('jul');
      SONS.airhorn();
      modale("🌴 WESH ALORS",
        "Tu as tapé « jul ». Le site te reconnaît comme une vraie. Ta cote de rue vient d'augmenter de 6-7 points. Zone Téléchargement activée.");
    },
    'tasty': function(){
      secret('tasty');
      SONS.fanfare(); confettis(110);
      modale("🥪 TASTY CROUSTY",
        "Le sandwich légendaire a été invoqué. Croustillant à l'extérieur, tasty à l'intérieur, indisponible partout. " +
        "Comme toi : rare et très demandée.");
    },
    'nasdas': function(){
      secret('nasdas');
      SONS.airhorn(); confettis(120);
      modale("💸 LA DISTRIBUTION",
        "Nasdas vient de te repérer. Il te tend une liasse… et se souvient que ce site n'a aucun budget. " +
        "Il te distribue donc 6,70 € d'aura symbolique. C'est déjà ça. Wesh la casa.");
    },
    'swan': function(){
      secret('swan');
      SONS.skibidi(); confettis(100);
      modale("👦 SWAN ET NÉO",
        "« SALUT TOUT LE MONDE, C'EST SWAN ET NÉO ! » Tu viens de réveiller ton toi de 2016. " +
        "Quelque part, un parent soupire. Défi accepté : souffle tes 20 bougies en moins de 6-7 secondes.");
    },
    'meme': function(){ ouvrirBoard(); },
    'son':  function(){ ouvrirBoard(); },
    'aura': function(){
      SONS.aura(); confettis(120);
      toast('AURA +9999 ⚡');
      document.body.classList.add('aura-max');
      setTimeout(function(){ document.body.classList.remove('aura-max'); }, 2500);
    },
    'moai': function(){
      SONS.vineBoom();
      toast('🗿 🗿 🗿 🗿 🗿 🗿 🗿');
    }
  };

  window.addEventListener('keydown', function(e){
    // on ignore tout ce qui est tapé dans un champ, sinon le prénom
    // et le mot de passe déclenchent les codes en permanence
    if(e.target && e.target.tagName === 'INPUT') return;

    if(e.key.toLowerCase() === String(konami[kPos]).toLowerCase()){
      kPos++;
      if(kPos === konami.length){
        kPos = 0;
        secret('konami');
        document.body.classList.toggle('aura-max');
        SONS.aura(); confettis(120);
        if(document.body.classList.contains('aura-max')){
          modale("⚡ MODE AURA MAXIMALE ⚡",
            "Code Konami détecté. Le site est maintenant aussi instable que toi à 2h du matin. Refais le code pour arrêter (si tu peux encore lire).");
        }
      }
    }else kPos = 0;

    if(e.key.length === 1){
      tampon = (tampon + e.key.toLowerCase()).slice(-8);
      for(const code in CODES){
        if(tampon.slice(-code.length) === code){ tampon = ''; CODES[code](); break; }
      }
    }
  });
})();

/* ---- détecteur d'absence ---- */
(function(){
  let t = null;
  function relancer(){
    clearTimeout(t);
    t = setTimeout(function(){
      if(ETAT.ecran > 0 && ETAT.ecran !== 8) popup();
    }, 75000);
  }
  ['click','keydown','mousemove','touchstart'].forEach(function(ev){
    window.addEventListener(ev, relancer, {passive:true});
  });
  relancer();
})();

/* ---- onglet quitté ---- */
(function(){
  const titre = document.title;
  let parti = false;
  document.addEventListener('visibilitychange', function(){
    if(document.hidden){ document.title = "😭 REVIENS C'EST TON ANNIV 😭"; parti = true; }
    else { document.title = titre; if(parti){ parti = false; setTimeout(popup, 800); } }
  });
})();
