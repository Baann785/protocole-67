/* ============================================================
   PHASE FINALE — LE FAUX PIRATAGE

   Enchaînement :
     1. le bouton « TERMINER » se met à glitcher
     2. des fenêtres d'erreur Windows XP envahissent l'écran, au son
     3. l'écran entier part en glitch
     4. noir complet pendant ~2,5 s
     5. chargement façon terminal, puis extraction de données
     6. déchiffrement caractère par caractère de la fiche « cible »
     7. la vidéo apparaît : elle doit cliquer dessus

   TOUT EST FICTIF. Les seules données réelles sont celles que son
   propre navigateur expose à n'importe quel site (système, navigateur,
   résolution, langue, fuseau). Aucune géolocalisation n'est demandée,
   aucune requête réseau n'est émise, rien n'est stocké.
   ============================================================ */

const HEX = '0123456789ABCDEF';
const BROUILLAGE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*/\\<>?!';

/* ---------------- ce que le navigateur raconte de lui-même ---------------- */
function infosMachine(){
  const n = navigator, e = screen, ua = n.userAgent || '';
  let sys = 'Inconnu';
  if(/Windows NT 10/.test(ua))      sys = 'Windows 10 / 11 · x64';
  else if(/Windows/.test(ua))       sys = 'Windows';
  else if(/iPhone|iPad/.test(ua))   sys = 'iOS · Apple';
  else if(/Android/.test(ua))       sys = 'Android';
  else if(/Mac OS X/.test(ua))      sys = 'macOS';
  else if(/Linux/.test(ua))         sys = 'Linux';

  let nav = 'Inconnu';
  if(/Edg\//.test(ua))              nav = 'Microsoft Edge';
  else if(/OPR\//.test(ua))         nav = 'Opera';
  else if(/Chrome\//.test(ua))      nav = 'Google Chrome';
  else if(/Firefox\//.test(ua))     nav = 'Mozilla Firefox';
  else if(/Safari\//.test(ua))      nav = 'Safari';

  let zone = 'inconnu';
  try{ zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'inconnu'; }catch(err){}

  let mac = '';
  for(let i = 0; i < 6; i++) mac += (i ? ':' : '') + HEX[alea(16)] + HEX[alea(16)];

  return {
    sys: sys, nav: nav, zone: zone, mac: mac.toUpperCase(),
    ecran: e.width + ' × ' + e.height + ' px · ' + (e.colorDepth || 24) + ' bits',
    langue: n.language || 'fr-FR',
    coeurs: (n.hardwareConcurrency || '?') + ' cœurs logiques',
    memoire: n.deviceMemory ? n.deviceMemory + ' Go' : 'accès refusé',
    tactile: ('ontouchstart' in window) ? 'écran tactile détecté' : 'clavier + souris'
  };
}

/* ============================================================
   1 — LE BOUTON QUI DÉRAILLE
   ============================================================ */
function armerBoutonFin(){
  const b = document.getElementById('bFin');
  b.style.display = 'block';
  b.disabled = false;
  b.classList.remove('glitche');
  b.textContent = 'TERMINER LE PROTOCOLE';

  let lance = false;
  function partir(){
    if(lance) return;
    lance = true;
    b.disabled = true;
    tempeteErreurs();
  }

  // il commence à trembler tout seul au bout de 2 s
  const tGlitch = setTimeout(function(){
    b.classList.add('glitche');
    SONS.erreur();
    const mots = ['TERMINER LE PROTOCOLE','TERMIN3R L3 PR0T0C0L3','T3RM1N4R... ERR','▓▒░ ERREUR ░▒▓','6-7-6-7-6-7'];
    let i = 0;
    const tMots = setInterval(function(){
      b.textContent = mots[++i % mots.length];
      if(i > 12){ clearInterval(tMots); partir(); }
    }, 260);
  }, 2000);

  b.onclick = function(){ clearTimeout(tGlitch); partir(); };
}

/* ============================================================
   2 — LA TEMPÊTE DE FENÊTRES D'ERREUR
   ============================================================ */
const MSG_ERREURS = [
  ['Erreur système',        'ERREUR 0x0000006-7', "Une exception non gérée s'est produite dans AURA.dll"],
  ['protocole67.exe',       'DÉFAILLANCE CRITIQUE', "Le processus ne répond plus. Fermeture impossible."],
  ['Erreur système',        'ACCÈS NON AUTORISÉ',  "Une entité inconnue a pris le contrôle de la session."],
  ['Windows',               'MÉMOIRE CORROMPUE',   "Impossible de lire l'adresse 0x6767AURA"],
  ['Sécurité',              'INTRUSION DÉTECTÉE',  "Connexion entrante depuis un hôte non identifié."],
  ['Erreur système',        'PILOTE INSTABLE',     "brainrot.sys a provoqué un arrêt inattendu."],
  ['protocole67.exe',       'PERTE DE DONNÉES',    "6 743 fichiers en cours de lecture par un tiers."],
  ['Windows',               'ERREUR FATALE',       "Le système ne peut plus garantir votre confidentialité."]
];
function tempeteErreurs(){
  document.body.classList.add('secousse');
  let n = 0;
  const total = 22;

  const t = setInterval(function(){
    const m = pioche(MSG_ERREURS);
    const d = document.createElement('div');
    d.className = 'xp-err';
    d.style.left = (Math.random() * Math.max(10, window.innerWidth  - 340)) + 'px';
    d.style.top  = (Math.random() * Math.max(10, window.innerHeight - 190)) + 'px';
    d.innerHTML =
      '<div class="barre"><span>' + m[0] + '</span><span class="x">✕</span></div>' +
      '<div class="corps"><span class="ico">✕</span><div><b>' + m[1] + '</b><br>' + m[2] + '</div></div>' +
      '<div class="pied"><button>OK</button></div>';
    document.body.appendChild(d);
    SONS.xp();

    if(++n >= total){
      clearInterval(t);
      setTimeout(glitchEcran, 700);
    }
  }, 150);
}

/* ============================================================
   3 — LE GLITCH PLEIN ÉCRAN, PUIS LE NOIR
   ============================================================ */
function glitchEcran(){
  const g = document.getElementById('glitch');
  g.classList.add('on');
  SONS.vineBoom();
  bruit(1.2, .3, 3000);

  // bandes horizontales qui se déchirent
  const tBandes = setInterval(function(){
    const b = document.createElement('div');
    b.className = 'bande';
    b.style.top = (Math.random() * 100) + '%';
    b.style.height = (2 + Math.random() * 26) + 'px';
    g.appendChild(b);
    setTimeout(function(){ b.remove(); }, 120);
  }, 45);

  setTimeout(function(){
    clearInterval(tBandes);
    g.classList.remove('on');
    g.querySelectorAll('.bande').forEach(function(b){ b.remove(); });

    // on efface tout l'ancien site d'un coup
    document.querySelectorAll('.xp-err, .popup').forEach(function(e){ e.remove(); });
    document.body.classList.remove('secousse');
    document.getElementById('noir').classList.add('on');
    document.body.classList.add('hack');          // ← l'ancienne DA cesse d'exister
    aller(14);

    // noir complet : 2,5 s de silence total
    setTimeout(function(){
      document.getElementById('noir').classList.remove('on');
      demarrerTerminal();
    }, 2500);
  }, 1600);
}

/* ============================================================
   4 — LE TERMINAL
   ============================================================ */
let intrusionLancee = false;
ECRANS[14] = function(){ /* le contenu est piloté par la séquence ci-dessous */ };

function ligne(cls, txt){
  const d = document.createElement('div');
  d.className = 'l ' + (cls || '');
  d.textContent = txt;
  document.getElementById('term').appendChild(d);
  return d;
}

/* effet « déchiffrement » : les caractères défilent puis se figent un à un */
function decrypter(el, final, duree, fini){
  const n = final.length;
  let debut = null;
  function frame(ts){
    if(debut === null) debut = ts;
    const p = Math.min(1, (ts - debut) / duree);
    const fixes = Math.floor(p * n);
    let s = final.slice(0, fixes);
    for(let i = fixes; i < n; i++){
      s += (final[i] === ' ') ? ' ' : BROUILLAGE[alea(BROUILLAGE.length)];
    }
    el.textContent = s;
    if(p < 1) requestAnimationFrame(frame);
    else { el.textContent = final; if(fini) fini(); }
  }
  requestAnimationFrame(frame);
}

function demarrerTerminal(){
  if(intrusionLancee) return;
  intrusionLancee = true;
  const term = document.getElementById('term');
  term.innerHTML = '';
  const m = infosMachine();
  const C = CONFIG.cible;

  /* --- barre de chargement texte --- */
  function chargement(fini){
    const l = ligne('dim', '');
    l.className = 'charge';
    let p = 0;
    const etapes = ['INITIALISATION', 'ACCÈS AU NOYAU', 'CONTOURNEMENT PARE-FEU',
                    'ÉLÉVATION DE PRIVILÈGES', 'CANAL SÉCURISÉ ÉTABLI'];
    const t = setInterval(function(){
      p += 1 + alea(4);
      if(p > 100) p = 100;
      const plein = Math.round(p / 5);
      l.textContent = '[' + '█'.repeat(plein) + '░'.repeat(20 - plein) + '] ' +
                      String(p).padStart(3, ' ') + '%   ' +
                      etapes[Math.min(etapes.length - 1, Math.floor(p / 21))];
      if(p % 7 === 0) SONS.bip();
      if(p >= 100){
        clearInterval(t);
        SONS.logo();
        setTimeout(fini, 700);
      }
    }, 55);
  }

  /* --- la fiche de la cible, remplie ligne par ligne --- */
  function fiche(fini){
    const box = document.createElement('div');
    box.className = 'fiche';
    box.innerHTML = '<div class="t">┌─ FICHE CIBLE ─ EXTRACTION EN COURS ─────────────</div>';
    term.appendChild(box);

    const CHAMPS = [
      ['PRÉNOM',        C.prenom,                                  '',        700],
      ['NOM',           C.nom,                                     'chiffre', 900],
      ['DATE DE NAISS.', C.naissance + '   ( ' + CONFIG.age + ' ans )', '',    700],
      ['NATIONALITÉ',   'Française',                               '',        450],
      ['PAYS',          C.pays,                                    '',        450],
      ['RÉGION',        C.region,                                  '',        450],
      ['VILLE',         C.ville,                                   '',        600],
      ['COORDONNÉES',   C.latitude + '   ' + C.longitude,          'rouge',   900],
      ['PRÉCISION GPS', '± 6,7 m',                                 'rouge',   500],
      ['SYSTÈME',       m.sys,                                     '',        400],
      ['NAVIGATEUR',    m.nav,                                     '',        400],
      ['RÉSOLUTION',    m.ecran,                                   '',        400],
      ['LANGUE',        m.langue + '   ·   ' + m.tactile,          '',        400],
      ['PROCESSEUR',    m.coeurs + '   ·   RAM : ' + m.memoire,    '',        400],
      ['FUSEAU',        m.zone,                                    '',        400],
      ['ADRESSE MAC',   m.mac,                                     'rouge',   500],
      ['ADRESSE IP',    '6.7.67.6',                                'rouge',   500],
      ['NIVEAU D\'AURA', '9999  [ ERREUR DE LECTURE ]',            'rouge',   600],
      ['STATUT',        'CIBLE PRIORITAIRE',                       'chiffre', 700]
    ];

    let i = 0;
    (function suite(){
      if(i >= CHAMPS.length){
        const f = document.createElement('div');
        f.className = 't';
        f.textContent = '└──────────────────────── EXTRACTION TERMINÉE ─────';
        box.appendChild(f);
        setTimeout(fini, 900);
        return;
      }
      const [k, v, cls, pause] = CHAMPS[i++];
      const r = document.createElement('div');
      r.className = 'r';
      r.innerHTML = '<span class="k">' + k + ' ' + '.'.repeat(Math.max(2, 16 - k.length)) + '</span>' +
                    '<span class="v ' + cls + '"></span>';
      box.appendChild(r);
      SONS.bip();
      decrypter(r.querySelector('.v'), v, 420, function(){ setTimeout(suite, pause - 420); });
    })();
  }

  /* --- déchiffrement final --- */
  function dechiffrement(fini){
    const SCRIPT = [
      ['dim',  '', 200],
      ['dim',  'root@6-7:~# scan --profondeur=max --cible=' + norm(C.prenom).split(' ')[0].toUpperCase(), 600],
      ['ok',   '[  OK  ] 6 743 photos indexées', 260],
      ['ok',   '[  OK  ] 67 conversations récupérées', 260],
      ['ok',   '[  OK  ] 1 dossier caché : /souvenirs/genants/', 400],
      ['err',  '[ ERR  ] Accès refusé : contenu trop gênant, même pour nous', 700],
      ['dim',  '[  ..  ] Recherche de fichiers chiffrés…', 900],
      ['err',  '[  !!  ] 1 FICHIER TROUVÉ — YassSixSeven.mp4', 500],
      ['dim',  '[  ..  ] Déchiffrement AES-256 …  12%', 320],
      ['dim',  '[  ..  ] Déchiffrement AES-256 …  41%', 320],
      ['dim',  '[  ..  ] Déchiffrement AES-256 …  67%', 850],
      ['warn', '[  ..  ] 67%', 850],
      ['warn', '[  ..  ] toujours 67%', 950],
      ['dim',  '[  ..  ] Déchiffrement AES-256 … 100%', 400],
      ['ok',   '[  OK  ] Clé validée · signature authentique', 400],
      ['gros', '>>> LECTURE AUTORISÉE <<<', 700]
    ];
    let i = 0;
    (function suite(){
      if(i >= SCRIPT.length){ fini(); return; }
      const [cls, txt, pause] = SCRIPT[i++];
      ligne(cls, txt);
      if(txt) SONS.bip();
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
      setTimeout(suite, pause);
    })();
  }

  ligne('dim', 'root@6-7:~# ./intrusion --auto');
  chargement(function(){
    ligne('err', '');
    ligne('err', '>>> SESSION COMPROMISE · EXTRACTION DES DONNÉES <<<');
    setTimeout(function(){
      fiche(function(){
        dechiffrement(afficherVideo);
      });
    }, 600);
  });
}

/* ============================================================
   5 — LA VIDÉO
   ============================================================ */
function afficherVideo(){
  SONS.logo();
  const bloc = document.getElementById('blocVideo');
  bloc.style.display = 'block';
  document.getElementById('zoneRelance').style.display = 'none';
  brancherLecteur();
  setTimeout(function(){ bloc.scrollIntoView({behavior:'smooth', block:'center'}); }, 120);
}

function brancherLecteur(){
  const v     = document.getElementById('videoFinale'),
        cadre = document.getElementById('videoCadre'),
        play  = document.getElementById('videoPlay'),
        mute  = document.getElementById('videoMute'),
        vol   = document.getElementById('videoVolume'),
        pct   = document.getElementById('videoVolPct'),
        tps   = document.getElementById('videoTemps');

  function mmss(s){
    if(!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ':' + (r < 10 ? '0' : '') + r;
  }
  function majTemps(){ tps.textContent = mmss(v.currentTime) + ' / ' + mmss(v.duration); }
  function majVolume(){
    const p = v.muted ? 0 : Math.round(v.volume * 100);
    pct.textContent = p + '%';
    vol.value = p;
    mute.textContent = p === 0 ? '🔇' : (p < 50 ? '🔉' : '🔊');
  }
  function bascule(){ if(v.paused) v.play(); else v.pause(); }

  cadre.onclick = bascule;
  play.onclick  = bascule;

  v.onplay = function(){
    play.textContent = '⏸';
    cadre.classList.add('lance');
    v.controls = true;            // on rend les commandes natives une fois lancée
    sonActif = false;             // plus aucun bip du site par-dessus la vidéo
  };
  v.onpause = function(){ play.textContent = '▶'; };
  v.ontimeupdate = majTemps;
  v.onloadedmetadata = majTemps;
  v.onvolumechange = majVolume;

  mute.onclick = function(){ v.muted = !v.muted; majVolume(); };
  vol.oninput = function(){ v.muted = false; v.volume = vol.value / 100; majVolume(); };

  v.onended = function(){
    sonActif = true;
    confettis(120);
    SONS.fanfare();
    ligne('ok', '');
    ligne('gros', '🎂 JOYEUX ANNIVERSAIRE ' + norm(ETAT.nom).toUpperCase() + ' 🎂');
    ligne('dim', 'root@6-7:~# _');
    const z = document.getElementById('zoneRelance');
    z.style.display = 'block';
    setTimeout(function(){ z.scrollIntoView({behavior:'smooth', block:'nearest'}); }, 200);
  };

  majVolume();
  majTemps();
}

/* ============================================================
   remise à zéro (bouton « relancer »)
   ============================================================ */
function resetIntrusion(){
  intrusionLancee = false;
  sonActif = true;
  document.body.classList.remove('hack');
  document.getElementById('noir').classList.remove('on');
  document.getElementById('glitch').classList.remove('on');
  document.getElementById('term').innerHTML = '';
  document.getElementById('blocVideo').style.display = 'none';
  document.getElementById('zoneRelance').style.display = 'none';
  document.getElementById('videoCadre').classList.remove('lance');
  document.querySelectorAll('.xp-err').forEach(function(e){ e.remove(); });
  const v = document.getElementById('videoFinale');
  v.pause(); v.currentTime = 0; v.controls = false;
}
