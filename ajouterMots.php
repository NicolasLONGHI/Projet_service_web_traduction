<?php 
    $motFr = $_GET['motFr'];
	  $motAn = $_GET['motAn'];
    $theme = $_GET['theme'];
    $bdd = new PDO('mysql:host=localhost;dbname=traduction;charset=UTF8', 'root', 'root')
		or die('Erreur connexion à la base de données');
    $requete="INSERT INTO mots VALUES ('$motFr', '$motAn', '$theme');";
	  $resultat= $bdd->query($requete);
?>