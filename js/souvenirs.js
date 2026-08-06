/* ============================================================
   SOUVENIRS — ce qu'elle peut garder après le parcours

   • la vidéo : simple lien <a download>, le fichier est déjà sur le site
   • le certificat : il n'existe qu'en HTML, donc on le redessine dans un
     canvas pour produire une vraie image PNG téléchargeable et partageable
   ============================================================ */

const CERT_L = 1240, CERT_H = 1754;            // proportions d'une feuille A4
const CERT_CREME = '#fffdf2', CERT_BRUN = '#6b4a1a',
      CERT_ENCRE = '#1a1206', CERT_BLEU = '#1a3a8f', CERT_OR = '#8a6a34';

/* écrit un paragraphe centré en le coupant à la largeur voulue,
   et renvoie le nouveau y */
function texteCentre(c, texte, y, largeurMax, interligne){
  const mots = texte.split(' ');
  let ligne = '';
  for(let i = 0; i < mots.length; i++){
    const essai = ligne ? ligne + ' ' + mots[i] : mots[i];
    if(c.measureText(essai).width > largeurMax && ligne){
      c.fillText(ligne, CERT_L / 2, y);
      y += interligne;
      ligne = mots[i];
    }else{
      ligne = essai;
    }
  }
  if(ligne){ c.fillText(ligne, CERT_L / 2, y); y += interligne; }
  return y;
}

function dessinerCertificat(){
  const cv = document.createElement('canvas');
  cv.width = CERT_L; cv.height = CERT_H;
  const c = cv.getContext('2d');
  c.textAlign = 'center';
  c.textBaseline = 'alphabetic';

  // fond + double filet, comme le certificat à l'écran
  c.fillStyle = CERT_CREME;
  c.fillRect(0, 0, CERT_L, CERT_H);
  c.strokeStyle = CERT_BRUN;
  c.lineWidth = 9;  c.strokeRect(46, 46, CERT_L - 92, CERT_H - 92);
  c.lineWidth = 3;  c.strokeRect(66, 66, CERT_L - 132, CERT_H - 132);

  let y = 190;
  const M = 190, LARG = CERT_L - M * 2;

  c.fillStyle = CERT_BRUN;
  c.font = '500 30px Georgia, serif';
  c.letterSpacing = '10px';
  c.fillText('RÉPUBLIQUE TRÈS FRANÇAISE', CERT_L / 2, y);
  c.letterSpacing = '0px';

  y += 46;
  c.fillStyle = CERT_OR;
  c.font = 'italic 27px Georgia, serif';
  c.fillText('Liberté, Égalité, Tasty Crousty', CERT_L / 2, y);

  y += 96;
  c.fillStyle = CERT_ENCRE;
  c.font = 'bold 56px Georgia, serif';
  c.letterSpacing = '3px';
  c.fillText("CERTIFICAT OFFICIEL", CERT_L / 2, y);
  y += 66;
  c.fillText("D'EXISTENCE", CERT_L / 2, y);
  c.letterSpacing = '0px';

  y += 88;
  c.fillStyle = '#4a3a22';
  c.font = '28px Georgia, serif';
  y = texteCentre(c, 'Nous, hautes autorités compétentes autoproclamées, certifions que :', y, LARG, 40);

  // le prénom, en grand
  y += 106;
  c.fillStyle = CERT_BLEU;
  c.font = "120px 'Brush Script MT', 'Segoe Script', cursive";
  c.fillText(String(ETAT.nom).toUpperCase(), CERT_L / 2, y);

  y += 84;
  c.fillStyle = CERT_ENCRE;
  c.font = '28px Georgia, serif';
  y = texteCentre(c,
    'est officiellement déclarée âgée de ' + CONFIG.age + ' ans en ce jour historique du ' +
    CONFIG.dateFete + ', soit 6-7 ans selon le calendrier international de l’aura.',
    y, LARG, 42);

  y += 26;
  y = texteCentre(c,
    'Après examen approfondi de son dossier, de son flow et de sa capacité à dire ' +
    '« six-seven » sans contexte, elle est également nommée :',
    y, LARG, 42);

  y += 52;
  c.fillStyle = CERT_BLEU;
  c.font = 'bold 33px Georgia, serif';
  y = texteCentre(c, 'Ambassadrice suprême du Tasty Crousty', y, LARG, 44);
  c.fillStyle = CERT_OR;
  c.font = 'italic 26px Georgia, serif';
  y = texteCentre(c, 'et', y + 6, LARG, 38);
  c.fillStyle = CERT_BLEU;
  c.font = 'bold 33px Georgia, serif';
  y = texteCentre(c, 'Citoyenne d’honneur de la Principauté du Six Seven', y + 6, LARG, 44);

  y += 56;
  c.fillStyle = CERT_ENCRE;
  c.font = '28px Georgia, serif';
  y = texteCentre(c,
    'Cette distinction lui accorde l’ensemble des droits, privilèges et avantages associés, à savoir :',
    y, LARG, 42);
  c.font = 'bold 38px Georgia, serif';
  y = texteCentre(c, 'absolument aucun.', y + 16, LARG, 46);

  y += 40;
  c.fillStyle = '#4a3a22';
  c.font = 'italic 25px Georgia, serif';
  y = texteCentre(c,
    'Le présent certificat fait foi partout où personne ne demande de justificatif sérieux.',
    y, LARG, 38);

  // la médaille
  c.font = '112px serif';
  c.fillText('🏅', CERT_L / 2, CERT_H - 180);

  return cv;
}

function telechargerCertificat(){
  const etat = document.getElementById('etatDl');
  try{
    const cv = dessinerCertificat();
    cv.toBlob(function(blob){
      if(!blob){ etat.textContent = "Ton navigateur n'a pas voulu générer l'image. Fais une capture d'écran, ça marchera aussi."; return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificat-' + norm(ETAT.nom).replace(/\s+/g, '-') + '-6-7.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
      etat.textContent = '✓ Certificat enregistré. Encadre-le.';
    }, 'image/png');
  }catch(e){
    etat.textContent = "Impossible de générer l'image ici. Une capture d'écran fera l'affaire.";
  }
}

document.getElementById('dlCertif').onclick = telechargerCertificat;
document.getElementById('dlVideo').onclick = function(){
  document.getElementById('etatDl').textContent = '↓ Téléchargement de la vidéo… (48 Mo, laisse-lui un instant)';
};
