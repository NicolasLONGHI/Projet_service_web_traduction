<?php 
    $theme = $_GET['theme'];
    $bdd = new PDO('mysql:host=localhost;dbname=traduction;charset=UTF8', 'root', 'root')
		or die('Erreur connexion à la base de données');
    $requete="SELECT * FROM mots WHERE theme = '$theme';";
	$resultat= $bdd->query($requete);
	$lesProduits=$resultat->fetchAll(PDO::FETCH_ASSOC); 
	echo json_encode($lesProduits);
?>