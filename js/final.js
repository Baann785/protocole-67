/* ============================================================
   ÉCRAN 13 — épilogue : la vraie fin, après la vidéo
   ============================================================ */

/* ============================================================
   13 — ÉPILOGUE
   La vraie fin, après l'intrusion et la vidéo. Musique douce en fond,
   message sincère, puis le récapitulatif et le bouton pour relancer.
   ============================================================ */
function reveler(id, delai){
  setTimeout(function(){
    const el = document.getElementById(id);
    el.style.display = 'block';
    el.scrollIntoView({behavior:'smooth', block:'nearest'});
  }, delai);
}

ECRANS[13] = function(){
  document.body.classList.add('epilogue');
  document.getElementById('nomEpi').textContent = ETAT.nom;
  lancerMusiqueFinale();
  const msg = document.getElementById('msgFinal');
  msg.innerHTML = '';
  ['certif','zoneSouvenirs','zoneRelance'].forEach(function(id){
    document.getElementById(id).style.display = 'none';
  });
  document.getElementById('etatDl').textContent = '';

  /* On laisse « Joyeux anniversaire <prénom> » occuper l'écran tout seul
     pendant 3,5 s — le temps que ça se pose — avant d'écrire le message. */
  const morceaux = CONFIG.messageFinal.split('<br><br>');
  let i = 0;
  setTimeout(function suite(){
    if(i >= morceaux.length){
      document.getElementById('certifNom').textContent = ETAT.nom.toUpperCase();
      document.getElementById('certifDate').textContent = CONFIG.dateFete;
      reveler('certif', 1600);
      confettis(90);
      reveler('zoneSouvenirs', 4000);
      reveler('zoneRelance', 5600);
      return;
    }
    const p = document.createElement('p');
    p.style.cssText = "margin-bottom:16px;opacity:0;transition:opacity .8s";
    p.innerHTML = morceaux[i++];
    msg.appendChild(p);
    requestAnimationFrame(function(){ p.style.opacity = 1; });
    setTimeout(suite, 2300);
  }, 3500);
};


/* ============================================================
   RELANCE — remet tout à zéro sauf les secrets déjà trouvés
   ============================================================ */
document.getElementById('b13').onclick = function(){
  n67 = 0; ritOK = false; ritGele = false; tour67 = 1;
  qi = 0; essaisNom = 0;
  manche67 = 0; essaisTaupe = 0; prolongation = false;
  mdpFini = false; mdpSurprise = false; niveauMax = 0;
  clearInterval(tMelange67); resetCadeau(); rangerPads(); animerBouton67(); stopVoix(); resetIntrusion();
  ETAT.clics67 = 0; ETAT.rates67 = 0; ETAT.erreursSimon = 0; ETAT.mancheSimonMax = 0; ETAT.moai = 0;
  ETAT.indiceMdp = false; ETAT.voixEnvoyee = false;
  ETAT.debut = Date.now();

  document.getElementById('compte').textContent = '0';
  document.getElementById('palier').textContent = '';
  document.getElementById('compteSous').textContent = '/ 67 — AUCUN RACCOURCI POSSIBLE';
  document.getElementById('bouton67').textContent = '6 7';
  document.getElementById('cadeau').style.cssText = '';
  document.getElementById('cadeau').textContent = '🎁 CLIQUE ICI';
  document.getElementById('bTaupe').textContent = 'DÉMARRER ▶';
  ['b4','b5','b6','b8','b9','b11'].forEach(function(id){
    document.getElementById(id).style.display = 'none';
  });

  /* armerBoutonFin() écrase le onclick du bouton du cadeau et le laisse
     « consommé ». Sans cette remise en état, il serait inerte au second tour. */
  const bCadeau = document.getElementById('b11');
  bCadeau.classList.remove('glitche');
  bCadeau.textContent = 'CONTINUER';
  bCadeau.disabled = false;
  bCadeau.onclick = function(){ armerBoutonFin(this); };
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
