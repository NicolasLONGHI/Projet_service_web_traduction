<!DOCTYPE html> 
<html lang="fr"> 
<head> 
    <meta charset="utf-8" /> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Mini jeu</title>
    <link rel="stylesheet" href="style.css">
    <?php
        function recupererTheme() {
            $themes = null;
            $bdd = new PDO('mysql:host=localhost;dbname=traduction', 'root', 'root')
                or die('Erreur connexion à la base de données');
            $requete="SELECT * FROM themes;";
            $resultat= $bdd->query($requete);
            $themes=$resultat->fetchAll();
            return $themes;
        }
    ?>
</head>
<body> 
<center>
    <b><font size="10"><font class="text-decoration-underline">Mini jeu d'Anglais</font> :</font><br/><br/></b>
    <br/><br/><br/>
    <div class="container-fluid">
    <div class="row">
            <div class="col-12 col-md-2">
                <font size="6"><font class="text-decoration-underline">Options</font> :</font><br/><br/>
                Choisir un thème :<br/>
                <select name="theme" id="theme" size="1">
                    <?php
                    $themes = recupererTheme();
                    foreach ($themes as $theme) {
                    ?>
                        <option value="<?php echo $theme['theme']; ?>"> <?php echo $theme['theme']; ?></option>
                    <?php
                    }
                    ?>
                </select>
                <br/><br/>
                <input type="checkbox" id="chkScore" checked/><label for="chkScore">&nbsp;Score</label>
                <br/><br/>
                <input type="checkbox" id="chkNbChance"/><label for="chkNbChance">&nbsp;Limiter le nombre de chance</label>
                <br/>
                <input type="number" id="nbChance" value="2" min="2" max="10" disabled/>
                <br/><br/>
                <input type="checkbox" id="chkSon" checked/><label for="chkSon">&nbsp;Activer le son</label>
                <br/><br/>
                <input type="checkbox" id="chkReponse"/><label for="chkReponse">&nbsp;Proposer des réponses</label>
                <br/><br/>
                <input type="checkbox" id="chkAide"/><label for="chkAide">&nbsp;Aide (affiche 1 lettre sur 2)</label>
                <br/><br/>
                <a class="btn btn-dark" id="appliquer">Appliquer</a>&nbsp;&nbsp;
                <a class="btn btn-dark" id="defaut">Par défaut</a><br/><br/>
                <a id="interfaceAdmin" style="cursor:pointer;">Interface admin</a>
                <br/><br/>
                <label for="ajoutMotFr" id="labelAjoutMotFr" hidden>&nbsp;Mot Français</label><input type="text" id="ajoutMotFr" hidden/>
                <label for="ajoutMotAn" id="labelAjoutMotAn" hidden>&nbsp;Mot Anglais</label><input type="text" id="ajoutMotAn" hidden/><br/><br/>
                <select name="themeAjt" id="themeAjt" size="1" hidden>
                <?php
                    foreach ($themes as $theme) {
                    ?>
                        <option value="<?php echo $theme['theme']; ?>"> <?php echo $theme['theme']; ?></option>
                    <?php
                    }
                    ?>
                </select><br/><br/>
                <a class = "btn btn-success" id="ajouter"hidden ><img src="images\logoPlus.png" alt="Logo ajouter" style="height: 25px; width: 25px;">&nbsp;traduction</a>
            </div>
            <div class="col-12 col-md-8">
                <img id="fusee3" src="images/imageVide.png" style="height: 94px; width: 40px;" class="rotate90"/><br/>
                <img id="fusee2" src="images/imageVide.png" style="height: 94px; width: 40px;" class="rotate45"/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <img id="fusee4" src="images/imageVide.png" style="height: 94px; width: 40px;" class="rotate135"/>
                <br/><br/><br/>Mot à traduire :<br/>
                <img id="fusee1" src="images/imageVide.png" style="height: 94px; width: 40px;"/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <input type="text" id="motFr" readonly/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <img id="fusee5" src="images/imageVide.png" style="height: 94px; width: 40px;" class="rotate180"/>
                <p id="taper">
                    Saisir la traduction :<br/>
                    <input type="text" id="motEn"/>
                </p>
                <p id="choix" hidden>
                </p>
                <a class="btn btn-dark" id="verifier">Vérifier</a>&nbsp;&nbsp;
                <a class="btn btn-dark" id="passer">Passer</a><br/><br/>
                <img id="img" src="" style="height: 100px; width: 100px;" hidden/><br/>
                <a id="msg"></a><br/>
                <a id="aideMsg"></a><br/>
                <img id="fusee8" src="images/imageVide.png" style="height: 94px; width: 40px;" class="rotate315"/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <img id="fusee6" src="images/imageVide.png" style="height: 94px; width: 40px;" class="rotate225"/><br/>
                <img id="fusee7" src="images/imageVide.png" style="height: 94px; width: 40px;" class="rotate270"/>
            </div>
            <div class="col-12 col-md-2">
                <a id="score"></a>
            </div>
    </div>
    </div>
</center>
<script src="traducteur.js"></script>
</body> 
</html>