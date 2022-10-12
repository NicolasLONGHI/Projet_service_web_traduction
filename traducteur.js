// -------------------------> Déclaraction de variable <------------------------- \\
let theme = document.getElementById("theme");
let chkScore = document.getElementById("chkScore");
let chkNbChance = document.getElementById("chkNbChance");
let nbChance = document.getElementById("nbChance");
let chkSon = document.getElementById("chkSon");
let chkReponse = document.getElementById("chkReponse");
let chkAide = document.getElementById("chkAide");
let btnAppliquer = document.getElementById("appliquer");
let btnDefaut = document.getElementById("defaut");
let interfaceAdmin = document.getElementById("interfaceAdmin");
let ajoutMotFr = document.getElementById("ajoutMotFr");
let labelAjoutMotFr = document.getElementById("labelAjoutMotFr");
let ajoutMotAn = document.getElementById("ajoutMotAn");
let labelAjoutMotAn = document.getElementById("labelAjoutMotAn");
let themeAjt = document.getElementById("themeAjt");
let btnAjouter = document.getElementById("ajouter");
let motFr = document.getElementById("motFr");
let motEn = document.getElementById("motEn");
let taper = document.getElementById("taper");
let rdoChoix = document.getElementById("choix");
let btnVerifier = document.getElementById("verifier");
let btnPasser = document.getElementById("passer");
let msg = document.getElementById("msg");
let aideMsg = document.getElementById("aideMsg");
let img = document.getElementById("img");
let score = document.getElementById("score");
let fusee1 = document.getElementById("fusee1");
let fusee2 = document.getElementById("fusee2");
let fusee3 = document.getElementById("fusee3");
let fusee4 = document.getElementById("fusee4");
let fusee5 = document.getElementById("fusee5");
let fusee6 = document.getElementById("fusee6");
let fusee7 = document.getElementById("fusee7");
let fusee8 = document.getElementById("fusee8");
let motsFrancais = new Array ();
let motsAnglais = new Array ();
let aleatoire = 0;
let motATrouver = "";
let themeChoisi = "";
let chkScoreChoisi = true;
let chkNbChanceChoisi = false;
let nbChanceChoisi = 2;
let chkSonChoisi = true;
let chkReponseChoisi = false;
let chkAideChoisi = false;
let nbBonneReponse = 0;
let nbMauvaiseReponse = 0;
let nbErreur = 0;
let interface = false;
const codeParental = "1Kod/ental"; //Supposons que l'enfant ne sait pas lire le code
let date = new Date();
let correctAudio = new Audio("audios/correctAudio.wav");
let erreurAudio = new Audio("audios/erreurAudio.wav");


// -------------------------> Abonnement au gestionnaire d'événements <------------------------- \\
window.addEventListener("load", initialisation);
chkNbChance.addEventListener("click", desactiverNbChance);
btnAppliquer.addEventListener("click", appliquer);
btnDefaut.addEventListener("click", defaut);
interfaceAdmin.addEventListener("click", afficherInterfaceAJout);
ajoutMotFr.addEventListener("keypress", function (e) { if (e.key === "Enter") { ajouterMot(); }});
ajoutMotAn.addEventListener("keypress", function (e) { if (e.key === "Enter") { ajouterMot(); }});
btnAjouter.addEventListener("click", ajouterMot);
motEn.addEventListener("keypress", function (e) { if (e.key === "Enter") { verif(); }});
btnVerifier.addEventListener("click", verif);
btnPasser.addEventListener("click", passer);

// -------------------------> Déclaration des fonctions <------------------------- \\

function initialisation() {
    if (date.getHours() < 6 || date.getHours() > 21) {
        if (date.getHours() < 6) {
            document.write("<center>Il est trop tôt pour s'entrainer ! Reviens tout à l'heure</center>");
        }
        else {
            document.write("<center>Il est trop tard pour s'entrainer ! Reviens demain</center>");
        }
    }
    else {
        recupMot(theme.value);
    }
    interfaceAdmin.cursor = "pointer";  
}

function recupMot(theme) {
    fetch("recupMots.php?theme=" + theme)
    .then(response => response.json())
    .then(data => {
        motsFrancais.length = 0;
        motsAnglais.length = 0;
        for (let i = 0 ; i < data.length ; i++) {
            motsFrancais[i] = data[i]["motsFrancais"];
            motsAnglais.push(data[i]["motsAnglais"]);
        }
        tirerMot();
        appliquerSansMDP();
        afficherListe();
        demarerAnimation();
    })
    .catch(function(error) {
        console.log('La requête a echoué',  error);
    });
}

function appliquer() {
    let mdp = prompt("Veuillez saisir le code parental");
    if (mdp == codeParental) {
        appliquerSansMDP();
    }
    else {
        alert("Mot de passe incorrecte !")
    }
}

function appliquerSansMDP() {
    if (themeChoisi != theme.value) {
        themeChoisi = theme.value;
        recupMot(themeChoisi);
        tirerMot();
    }
    chkScoreChoisi = chkScore.checked;
    if (chkScoreChoisi) {
        score.innerHTML = "<font size='6'><font class='text-decoration-underline'>Score</font> :</font><br/><br/>" + nbBonneReponse + " bonne(s) réponse(s)<br/>" + nbMauvaiseReponse + " mauvaise(s) réponse(s)";
    }
    else {
        score.innerHTML = "";
        nbBonneReponse = 0;
        nbMauvaiseReponse = 0;
    }
    chkNbChanceChoisi = chkNbChance.checked
    nbChanceChoisi = nbChance.value;
    chkSonChoisi = chkSon.checked;
    chkReponseChoisi = chkReponse.checked;
    chkAideChoisi = chkAide.checked;
    if (chkReponseChoisi) {
        taper.hidden = true;
        rdoChoix.hidden = false;
    }
    else {
        taper.hidden = false;
        rdoChoix.hidden = true;
    }
    if (chkAideChoisi) {
        aide(motATrouver);
    }
    else {
        aideMsg.innerHTML = "";
    }
    demarerAnimation();
}

function afficherInterfaceAJout() {
    if (!interface) {
        ajoutMotFr.hidden = false;
        labelAjoutMotFr.hidden = false;
        ajoutMotAn.hidden = false;
        labelAjoutMotAn.hidden = false;
        themeAjt.hidden = false;
        btnAjouter.hidden = false;
        interface = true;
    }
    else {
        ajoutMotFr.hidden = true;
        labelAjoutMotFr.hidden = true;
        ajoutMotAn.hidden = true;
        labelAjoutMotAn.hidden = true;
        themeAjt.hidden = true;
        btnAjouter.hidden = true;
        interface = false;
    }
}

function mettreMajLettre(mot) {
    let lettreMaj = mot.substring(0,1).toUpperCase();
    let finDuMot = mot.substring(1,99).toLowerCase();
    let motBien = lettreMaj + finDuMot;
    return motBien;
}

function ajouterMot() {
    if ((ajoutMotFr.value == '') || (ajoutMotAn.value == '')) {
        if (ajoutMotFr.value == '') {
            ajoutMotFr.focus();
        }
        else {
            ajoutMotAn.focus();
        }
    }
    else {
        let mdp = prompt("Veuillez saisir le code parental");
        if (mdp == codeParental) {
            let motFrAjt = mettreMajLettre(ajoutMotFr.value);
            fetch("ajouterMots.php?motFr=" + motFrAjt + '&motAn=' + ajoutMotAn.value.toLowerCase() + '&theme=' + themeAjt.value)
            .then(response => response.json())
            .then(data => {
            })
            .catch(function(error) {
                console.log('La requête a echoué',  error);
            });
            ajoutMotFr.value = '';
            ajoutMotAn.value = '';
            ajoutMotFr.focus();
        }
        else {
            alert("Mot de passe incorrecte !")
        }
    }
}




function tirerMot() {  
    aleatoire = Math.floor(Math.random() * motsFrancais.length);
    motFr.value = motsFrancais[aleatoire];
    motATrouver = motsAnglais[aleatoire];
    if (chkReponseChoisi) {
        afficherListe();
    }
    if (chkAideChoisi) {
        aide(motATrouver);
    }
}

function afficherListe() {
    rdoChoix.replaceChildren("Trouver la bonne traduction :");
    let newline = document.createElement('br');
    rdoChoix.appendChild(newline);
    for (let i = 0 ; i < motsAnglais.length ; i++) {
        let radiobox = document.createElement('input');
        radiobox.name = "rdoProposition"
        radiobox.type = 'radio';
        radiobox.id = i;
        radiobox.value = motsAnglais[i];
        let label = document.createElement('label')
        label.htmlFor = i;
        //Mettre la première lettre en majuscule
        let motMaj = mettreMajLettre(motsAnglais[i])
        let description = document.createTextNode(motMaj);
        label.appendChild(description);
        let newline = document.createElement('br');
        let rdoChoix = document.getElementById("choix");
        rdoChoix.appendChild(radiobox);
        rdoChoix.appendChild(label);
        rdoChoix.appendChild(newline);
    }
}

function verif() {
    if (!chkReponseChoisi) {
        let motTape = motEn.value.toLowerCase();
        if (motTape != '') {
            if (motsAnglais[aleatoire] == motTape) {
                bonneReponse();
            }
            else {
                mauvaiseReponse();
            }
        }
        else {
            msg.style.color = "red";
            msg.innerHTML = "Veuillez taper une traduction";
            setTimeout(effacerMsg, 3000);
        }
        motEn.focus();
    }
    else {
        let rdoProposition = document.getElementsByName("rdoProposition");
        for (let i = 0 ; i < rdoProposition.length ; i++) {
            if (rdoProposition[i].checked) {
                if (rdoProposition[i].value == motsAnglais[aleatoire]) {
                    bonneReponse();
                }
                else {
                    mauvaiseReponse();
                }
            }
        }
    }
}

function mauvaiseReponse() {
    if (chkSonChoisi) {
        erreurAudio.play();
    }
    img.src= "images/mauvaiseReponse.png"
    img.hidden = false;
    setTimeout(cacherImage, 3000);
    msg.style.color = "red";
    if (chkNbChanceChoisi) {
        nbErreur++;
        msg.innerHTML = "La réponse est incorrecte<br/>Veuillez réessayer";
        setTimeout(effacerMsg, 3000);
        if (nbErreur == nbChanceChoisi) {
            tirerMot();
            nbMauvaiseReponse++;
            nbErreur = 0;
            motEn.value = "";
            if (chkScoreChoisi) {
                score.innerHTML = "<font size='6'><font class='text-decoration-underline'>Score</font> :</font><br/><br/>" + nbBonneReponse + " bonne(s) réponse(s)<br/>" + nbMauvaiseReponse + " mauvaise(s) réponse(s)";
            }
        }
    }
    else {
        nbMauvaiseReponse++;
        msg.innerHTML = "La réponse est incorrecte";
        setTimeout(effacerMsg, 3000);
        motEn.value = "";
        tirerMot();
    }
    if (chkScoreChoisi) {
        score.innerHTML = "<font size='6'><font class='text-decoration-underline'>Score</font> :</font><br/><br/>" + nbBonneReponse + " bonne(s) réponse(s)<br/>" + nbMauvaiseReponse + " mauvaise(s) réponse(s)";
    }
}

function bonneReponse() {
    if (chkScoreChoisi) {
        nbBonneReponse++;
        score.innerHTML = "<font size='6'><font class='text-decoration-underline'>Score</font> :</font><br/><br/>" + nbBonneReponse + " bonne(s) réponse(s)<br/>" + nbMauvaiseReponse + " mauvaise(s) réponse(s)";
    }
    if (chkSonChoisi) {
        correctAudio.play();
    }
    img.src= "images/bonneReponse.png"
    img.hidden = false;
    setTimeout(cacherImage, 3000);
    msg.style.color = "green";
    msg.innerHTML = "Bonne réponse !";
    setTimeout(effacerMsg, 3000);
    motEn.value = "";
    tirerMot();
}

function effacerMsg() {
    msg.innerHTML = "";
}

function cacherImage() {
    img.hidden = true;
}

function passer() {
    tirerMot();
    nbErreur = 0;
    motEn.value = "";
    motEn.focus();
    if (chkScoreChoisi) {
        nbMauvaiseReponse++;
        score.innerHTML = "<font size='6'><font class='text-decoration-underline'>Score</font> :</font><br/><br/>" + nbBonneReponse + " bonne(s) réponse(s)<br/>" + nbMauvaiseReponse + " mauvaise(s) réponse(s)";
    }
}

function desactiverNbChance() {
    if (chkNbChance.checked) {
        nbChance.disabled = false;
    }
    else {
        nbChance.disabled = true;
    }
 }

function defaut() {
    let mdp = prompt("Veuillez saisir le code parental");
    if (mdp == codeParental) {
        theme.value = "Maison";
        chkScore.checked = true;
        chkNbChance.checked = false;
        chkSon.checked = true;
        chkReponse.checked = false;
        chkAide.checked = false;
        nbChance.value = "2";
        appliquerSansMDP();
        desactiverNbChance();
    }
    else {
        alert("Mot de passe incorrecte !")
    }
}


function demarerAnimation() {
    animation();
    setInterval(animation, 8500);
}

function animation() {

        setTimeout(afficherF1, 1000);
        setTimeout(cacherF1, 2000);

        setTimeout(afficherF2, 2000);
        setTimeout(cacherF2, 3000);

        setTimeout(afficherF3, 3000);
        setTimeout(cacherF3, 4000);

        setTimeout(afficherF4, 4000);
        setTimeout(cacherF4, 5000);

        setTimeout(afficherF5, 5000);
        setTimeout(cacherF5, 6000);

        setTimeout(afficherF6, 6000);
        setTimeout(cacherF6, 7000);

        setTimeout(afficherF7, 7000);
        setTimeout(cacherF7, 8000);

        setTimeout(afficherF8, 8000);
        setTimeout(cacherF8, 9000);
    
    
}

function afficherF1() {
    fusee1.src = 'images/fusee.png';
}
function cacherF1() {
    fusee1.src = 'images/imageVide.png';
}

function afficherF2() {
    fusee2.src = 'images/fusee.png';
}
function cacherF2() {
    fusee2.src = 'images/imageVide.png';
}

function afficherF3() {
    fusee3.src = 'images/fusee.png';
}
function cacherF3() {
    fusee3.src = 'images/imageVide.png';
}

function afficherF4() {
    fusee4.src = 'images/fusee.png';
}
function cacherF4() {
    fusee4.src = 'images/imageVide.png';
}

function afficherF5() {
    fusee5.src = 'images/fusee.png';
}
function cacherF5() {
    fusee5.src = 'images/imageVide.png';
}

function afficherF6() {
    fusee6.src = 'images/fusee.png';
}
function cacherF6() {
    fusee6.src = 'images/imageVide.png';
}

function afficherF7() {
    fusee7.src = 'images/fusee.png';
}
function cacherF7() {
    fusee7.src = 'images/imageVide.png';
}

function afficherF8() {
    fusee8.src = 'images/fusee.png';
}
function cacherF8() {
    fusee8.src = 'images/imageVide.png';
}


function aide(chaine) {
    let nbCar = chaine.length; 
    let tableau = chaine.split("");
    texte = new Array ();
    let txt = '';
    let nb_msg = nbCar - 1;
    let nbFois = 1;
    for (i=0; i<nbCar; i++) {
        let moduo = nbFois % 2;
        if (moduo == 1) {
            texte[i] = txt+tableau[i];
            txt = texte[i];
        }
        if (moduo == 0) {
            txt += " ";
        }
        nbFois++;
    }
    aideMsg.innerHTML = "<b>Aide : </b>" + txt
}