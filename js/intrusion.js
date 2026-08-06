/* ============================================================
   SCÈNE FINALE — LE FAUX PIRATAGE

   Après le message d'anniversaire, le site "plante" violemment puis
   bascule dans une direction artistique complètement différente :
   terminal vert sur noir, scanlines, récupération de données.

   TOUT EST FICTIF, mais les quelques infos affichées sont RÉELLES et
   viennent uniquement de son propre navigateur (agent utilisateur,
   résolution, langue, fuseau) : rien n'est demandé, rien n'est envoyé,
   aucune géolocalisation n'est sollicitée. C'est justement parce que
   ces données sont vraies que l'effet fonctionne — et parce qu'elles
   sont anodines qu'on peut se le permettre.

   Chute : le "fichier chiffré" récupéré est la vidéo d'anniversaire.
   ============================================================ */

/* ---------------- ce que le navigateur raconte de lui-même ---------------- */
function infosMachine(){
  const n = navigator, e = screen;
  let sys = 'Système inconnu';
  const ua = n.userAgent || '';
  if(/Windows NT 10/.test(ua))      sys = 'Windows 10/11 · x64';
  else if(/Windows/.test(ua))       sys = 'Windows';
  else if(/iPhone|iPad/.test(ua))   sys = 'iOS · appareil Apple';
  else if(/Android/.test(ua))       sys = 'Android';
  else if(/Mac OS X/.test(ua))      sys = 'macOS';
  else if(/Linux/.test(ua))         sys = 'Linux';

  let nav = 'Navigateur inconnu';
  if(/Edg\//.test(ua))              nav = 'Microsoft Edge';
  else if(/OPR\//.test(ua))         nav = 'Opera';
  else if(/Chrome\//.test(ua))      nav = 'Google Chrome';
  else if(/Firefox\//.test(ua))     nav = 'Mozilla Firefox';
  else if(/Safari\//.test(ua))      nav = 'Safari';

  let zone = 'inconnu';
  try{ zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'inconnu'; }catch(err){}

  return {
    sys: sys,
    nav: nav,
    ecran: e.width + ' × ' + e.height + ' · ' + (e.colorDepth || 24) + ' bits',
    langue: n.language || 'fr-FR',
    zone: zone,
    coeurs: n.hardwareConcurrency || '?',
    memoire: n.deviceMemory ? n.deviceMemory + ' Go' : 'non communiquée',
    tactile: ('ontouchstart' in window) ? 'oui' : 'non'
  };
}

/* ---------------- 1. LE CRASH ---------------- */
function declencherIntrusion(){
  const box   = document.getElementById('crash'),
        flash = document.getElementById('crashFlash'),
        gros  = document.getElementById('crashGros'),
        lig   = document.getElementById('crashLignes');

  box.classList.add('on');
  box.classList.add('secousse2');
  flash.classList.add('on');
  gros.textContent = '';
  lig.textContent = '';

  SONS.erreur();
  setTimeout(function(){ SONS.vineBoom(); }, 200);
  setTimeout(function(){ SONS.bruh(); }, 700);

  // charabia de plantage
  const charabia = [];
  const HEX = '0123456789ABCDEF';
  for(let i = 0; i < 26; i++){
    let l = '0x';
    for(let k = 0; k < 8; k++) l += HEX[alea(16)];
    l += '   ';
    for(let k = 0; k < 26; k++) l += HEX[alea(16)] + (k % 2 ? ' ' : '');
    charabia.push(l);
  }

  let i = 0;
  const t = setInterval(function(){
    lig.textContent += charabia[i % charabia.length] + '\n';
    if(++i === 4)  gros.textContent = 'ERREUR FATALE';
    if(i === 12)   gros.textContent = 'SYSTEME COMPROMIS';
    if(i === 20)   gros.textContent = 'ACCES NON AUTORISE';
    if(i >= 26){
      clearInterval(t);
      gros.textContent = '6-7';
      lig.textContent = '\n> connexion entrante depuis un hôte inconnu…\n> prise de contrôle de la session…';
      SONS.vineBoom();
      setTimeout(function(){
        box.classList.remove('on', 'secousse2');
        flash.classList.remove('on');
        document.body.classList.add('hack');       // ← LA bascule de DA
        aller(14);
      }, 2200);
    }
  }, 90);
}

/* ---------------- 2. LE TERMINAL ---------------- */
let intrusionLancee = false;

ECRANS[14] = function(){
  document.getElementById('hud').querySelector('.lbl').textContent = 'INTRUSION';
  if(intrusionLancee) return;                       // pas de relance si elle revient
  intrusionLancee = true;

  const m = infosMachine();
  const term = document.getElementById('terminal');
  term.innerHTML = '';

  /* [classe, texte, pause après (ms)] */
  const SCRIPT = [
    ['dim',  'root@protocole-67:~# ./recover --cible=' + norm(ETAT.nom).toUpperCase() + ' --profondeur=max', 500],
    ['ok',   '[  OK  ] Élévation de privilèges', 220],
    ['ok',   '[  OK  ] Accès au système de fichiers local', 260],
    ['dim',  '[  ..  ] Empreinte de la machine…', 700],
    ['ok',   '[  OK  ] Système    : ' + m.sys, 130],
    ['ok',   '[  OK  ] Navigateur : ' + m.nav, 130],
    ['ok',   '[  OK  ] Écran      : ' + m.ecran, 130],
    ['ok',   '[  OK  ] Langue     : ' + m.langue + '   ·   Tactile : ' + m.tactile, 130],
    ['ok',   '[  OK  ] Processeur : ' + m.coeurs + ' cœurs   ·   Mémoire : ' + m.memoire, 300],
    ['dim',  '[  ..  ] Triangulation de la position…', 900],
    ['warn', '[ WARN ] Zone détectée : ' + m.zone, 200],
    ['warn', '[ WARN ] Précision : ± 6,7 m du chargeur le plus proche', 500],
    ['dim',  '[  ..  ] Indexation des données personnelles…', 800],
    ['ok',   '[  OK  ] 6 743 photos analysées', 160],
    ['ok',   '[  OK  ] 67 captures de conversations retrouvées', 160],
    ['ok',   '[  OK  ] 1 dossier caché : /souvenirs/genants/', 400],
    ['err',  '[ ERR  ] Accès refusé : contenu trop gênant, même pour nous', 700],
    ['dim',  '[  ..  ] Recherche de fichiers chiffrés…', 900],
    ['err',  '[  !!  ] 1 FICHIER TROUVÉ — YassSixSeven.mp4', 400],
    ['dim',  '[  ..  ] Déchiffrement AES-256… 12%', 350],
    ['dim',  '[  ..  ] Déchiffrement AES-256… 41%', 350],
    ['dim',  '[  ..  ] Déchiffrement AES-256… 67%', 800],
    ['warn', '[  ..  ] 67%', 800],
    ['warn', '[  ..  ] toujours 67%', 900],
    ['dim',  '[  ..  ] Déchiffrement AES-256… 100%', 400],
    ['ok',   '[  OK  ] Déchiffrement terminé', 300],
    ['ok',   '[  OK  ] Intégrité vérifiée · signature valide', 400],
    ['err',  '', 200],
    ['err',  '>>> LECTURE AUTORISÉE <<<', 600]
  ];

  let i = 0;
  (function suite(){
    if(i >= SCRIPT.length){ afficherVideo(); return; }
    const [cls, txt, pause] = SCRIPT[i++];
    const d = document.createElement('div');
    d.className = 'l ' + cls;
    d.textContent = txt;
    term.appendChild(d);
    term.scrollTop = term.scrollHeight;
    if(txt) SONS.bip();
    setTimeout(suite, pause);
  })();
};

/* ---------------- 3. LA VIDÉO ---------------- */
function afficherVideo(){
  SONS.logo();
  const bloc = document.getElementById('blocVideo');
  bloc.style.display = 'block';
  bloc.scrollIntoView({behavior: 'smooth', block: 'center'});

  const r = document.getElementById('r14');
  r.innerHTML = '▶ <b>CLIQUE SUR LA VIDÉO.</b> C\'est la seule chose vraie de tout ce site.';
  r.style.color = '#00ff41';

  document.getElementById('zoneRelance').style.display = 'none';
  brancherLecteur();
}

/* commandes personnalisées, en plus des commandes natives du navigateur :
   elle doit voir tout de suite qu'elle peut mettre en pause et régler le son */
function brancherLecteur(){
  const v    = document.getElementById('videoFinale'),
        play = document.getElementById('videoPlay'),
        mute = document.getElementById('videoMute'),
        vol  = document.getElementById('videoVolume'),
        pct  = document.getElementById('videoVolPct'),
        tps  = document.getElementById('videoTemps');

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

  play.onclick = function(){ if(v.paused) v.play(); else v.pause(); };
  v.onplay  = function(){ play.textContent = '⏸'; };
  v.onpause = function(){ play.textContent = '▶'; };
  v.ontimeupdate = majTemps;
  v.onloadedmetadata = majTemps;
  v.onvolumechange = majVolume;

  mute.onclick = function(){ v.muted = !v.muted; majVolume(); };
  vol.oninput = function(){
    v.muted = false;
    v.volume = vol.value / 100;
    majVolume();
  };

  // à la fin de la vidéo seulement, on rend la main
  v.onended = function(){
    confettis(120);
    SONS.fanfare();
    document.getElementById('r14').innerHTML =
      "🎂 Voilà. C'était ça, le vrai cadeau. Le reste c'était juste pour te faire perdre du temps.";
    const z = document.getElementById('zoneRelance');
    z.style.display = 'block';
    z.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  };

  majVolume();
  majTemps();
}

/* remet la scène à zéro (utilisé par le bouton « relancer ») */
function resetIntrusion(){
  intrusionLancee = false;
  document.body.classList.remove('hack');
  document.getElementById('hud').querySelector('.lbl').textContent = 'PROTOCOLE 6-7';
  document.getElementById('terminal').innerHTML = '';
  document.getElementById('blocVideo').style.display = 'none';
  document.getElementById('zoneRelance').style.display = 'none';
  document.getElementById('r14').textContent = '';
  const v = document.getElementById('videoFinale');
  v.pause();
  v.currentTime = 0;
}
