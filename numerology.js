/******************** 
MOTEUR DE NUMEROLOGIE
*********************/

/*
------------ creation du prototype ------------
*/
function NumerologyEngine(nom, prenom, jour, mois, annee){
    this.nom = nom;
    this.prenom = prenom;
    this.jour = jour;
    this.mois = mois;
    this.annee = annee;
}


/*
------------ getters ------------
*/
NumerologyEngine.prototype.getNom = function(){
    return this.nom;
}

NumerologyEngine.prototype.getPrenom = function(){
    return this.prenom;
}

NumerologyEngine.prototype.getJour = function(){
    return this.jour;
}

NumerologyEngine.prototype.getMois = function(){
    return this.mois;
}

NumerologyEngine.prototype.getAnnee = function(){
    return this.annee;
}


/* ------------ LISTE DES FONCTIONS ------------

 - reduceToNumber
 - reduceToLessThanTen
 - letterToNumber
 - reduceWordToNumber
 - isVowel
 - reduceAllVowelsToNumber
 - reduceAllConsToNumber
 - reduceFromInitialLetters
 - getEvolutionNumber
 - getLifeNumber
 - getPersonalNumber
 - getActiveNumber
 - getHereditaryNumber
 - getExpressionNumber
 - getIntimacyNumber
 - getRealisationNumber
 - nb_occurrences
 - getKarmicNumberTable
*/




/* ------------ reduceToNumber ------------

 ARGUMENTS : prend un unique nombre qui est une chaine de carateres
 RETOUR : un entier 
 RESULTAT : somme des chiffres qui constituent le nombre donné en argument (peut être supérieure à 10)
*/
NumerologyEngine.prototype.reduceToNumber = function(nombre){
    var somme = 0;
    for (var i=0 ; i<nombre.length ; i++){
        somme += parseInt(nombre.charAt(i));
    }
    return somme;	
}


/* ------------ reduceToLessThanTen ------------

 ARGUMENTS : un entier
 RETOUR : un entier
 RESULTAT : somme irréductible des chiffres qui constituent le nombre donné en argument; cette somme peut être inférieure à 10;
*/
NumerologyEngine.prototype.reduceToLessThanTen = function(nombre){
	var nombre_irreductible = nombre;
    var taille = nombre.length;
    while (taille>1){
        nombre_irreductible = this.reduceToNumber(nombre_irreductible).toString(); 
        taille = nombre_irreductible.length;
    }
	return parseInt(nombre_irreductible);
}


/* ------------ letterToNumber ------------

 ARGUMENTS : un caratere
 RETOUR : un entier
 RESULTAT : effectue la correspondance entre les lettres et les chiffres
*/
NumerologyEngine.prototype.letterToNumber = function(lettre){
	var chiffre;
    var corresp = new Array();
    corresp["1"] = new Array("A","J","S","a","j","s");
	corresp["2"] = new Array("B","K","T","b","k","t");
    corresp["3"] = new Array("C","L","U","c","l","u");
    corresp["4"] = new Array("D","M","V","d","m","v");
    corresp["5"] = new Array("E","N","W","e","n","w");
    corresp["6"] = new Array("F","O","X","f","o","x");
    corresp["7"] = new Array("G","P","Y","g","p","y");
    corresp["8"] = new Array("H","Q","Z","h","q","z");
    corresp["9"] = new Array("I","R","i","r");
    for (var i in corresp){
        for (var j=0 ; j<6 ; j++){
            if (lettre == corresp[i][j]){
                chiffre = i;
            }
        }
    }
    return parseInt(chiffre);
}


/* ------------ reduceWordToNumber ------------

 ARGUMENTS : une chaîne de caractère
 RETOUR : un entier
 RESULTAT : correspondance entre les lettres et les chiffres et somme ces chiffres pour enfin les réduire à un nombre inférieur à 10
*/
NumerologyEngine.prototype.reduceWordToNumber = function(mot){
    var chiffres_mot = new Array();
    for (var i=0 ; i<mot.length ; i++){
        chiffres_mot[i] = this.letterToNumber(mot.charAt(i));
    }
    var somme=0;
    for (var i in chiffres_mot){
        somme += chiffres_mot[i];
    }    
   return this.reduceToLessThanTen(somme.toString());
}


/* ------------ isVowel ------------

 ARGUMENTS : un caractère
 RETOUR : un booléen
 RESULTAT : teste si une lettre est une voyelle
*/
NumerologyEngine.prototype.isVowel = function(lettre){
	if (lettre == "a" || lettre == "e" || lettre == "i" || lettre == "o" || lettre == "u" || lettre == "y"){
        return true;
    }else{
        return false;
    }	
}


/* ------------ reduceAllVowelsToNumber ------------

 ARGUMENTS : une chaîne de caractère
 RETOUR: un entier
 RESULTAT: correspondance entre les lettres et les chiffres et ne somme que les valeurs numériques des voyelles
*/
NumerologyEngine.prototype.reduceAllVowelsToNumber = function(mot){	
    var chiffres_mot = new Array();
    for (var i=0 ; i<mot.length ; i++){
        if(this.isVowel(mot.charAt(i)) == true){
           chiffres_mot[i] = this.letterToNumber(mot.charAt(i));
        }        
    }
    var somme=0;
    for (var i in chiffres_mot){
        somme += chiffres_mot[i];
    }    
   return this.reduceToLessThanTen(somme.toString());
}


/* ------------ reduceAllConsToNumber ------------

 ARGUMENTS : une chaîne de caractère
 RETOUR : un entier
 RESULTAT : correspondance entre les lettres et les chiffres et ne somme que les valeurs numériques des consonnes
*/
NumerologyEngine.prototype.reduceAllConsToNumber = function(mot){	
        var chiffres_mot = new Array();
    for (var i=0 ; i<mot.length ; i++){
        if(this.isVowel(mot.charAt(i)) == false){
           chiffres_mot[i] = this.letterToNumber(mot.charAt(i));
        }        
    }
    var somme=0;
    for (var i in chiffres_mot){
        somme += chiffres_mot[i];
    }    
   return this.reduceToLessThanTen(somme.toString());
}


/* ------------ reduceFromInitialLetters ------------

 ARGUMENTS : 2 chaînes de caractère
 RETOUR: un entier
 RESULTAT: prend la valeur numérique des initiales et les réduit à un nombre inférieur à 10.
*/
NumerologyEngine.prototype.reduceFromInitialLetters = function (){
    var somme_initiales = this.letterToNumber(this.getNom().charAt(0)) + this.letterToNumber(this.getPrenom().charAt(0));
    return this.reduceToLessThanTen(somme_initiales.toString());
}


/* ------------ getEvolutionNumber ------------

 ARGUMENTS : 
 RETOUR : un entier
 RESULTAT : calcule le nombre d'évolution (addition du jour et du mois)
*/
NumerologyEngine.prototype.getEvolutionNumber = function(){
    var nb_evolution = this.getJour() + this.getMois();
    return this.reduceToLessThanTen(nb_evolution.toString());
}


/* ------------ getLifeNumber ------------

 ARGUMENTS : 
 RETOUR : un entier
 RESULTAT : calcule le nombre de vie (addition du jour, du mois et de l'annee)
*/
NumerologyEngine.prototype.getLifeNumber = function (){
    var nb_vie = this.getJour() + this.getMois() + this.getAnnee();
    return this.reduceToLessThanTen(nb_vie.toString());
}


/* ------------ getPersonalNumber ------------

 ARGUMENTS :
 RETOUR : un entier
 RESULTAT : calcule le nombre personnel (addition des lettres du nom et du prenom)
*/
NumerologyEngine.prototype.getPersonalNumber = function() {
    var nb_perso = this.reduceWordToNumber(this.getNom())+this.reduceWordToNumber(this.getPrenom());
    return this.reduceToLessThanTen(nb_perso.toString());
}


/* ------------ getActiveNumber ------------

 ARGUMENTS :  
 RETOUR : un entier
 RESULTAT : calcule le nombre actif (addition des lettres du prenom)
*/
NumerologyEngine.prototype.getActiveNumber = function(){
    return this.reduceWordToNumber(this.getPrenom());
}


/* ------------ getHereditaryNumber ------------

 ARGUMENTS :
 RETOUR : un entier
 RESULTAT : calcule le nombre hereditaire (addition des lettres du prenom)
*/
NumerologyEngine.prototype.getHereditaryNumber = function(){
    return this.reduceWordToNumber(this.getNom());
}


/* ------------ getExpressionNumber ------------

 ARGUMENTS : 
 RETOUR : un entier
 RESULTAT : calclue le nombre d'expression (addition du nombre actif et du nombre hereditaire)
*/
NumerologyEngine.prototype.getExpressionNumber = function(){
    return this.getActiveNumber(this.prenom) + this.getHereditaryNumber(this.nom);
}


/* ------------ getIntimacyNumber ------------

 ARGUMENTS : 
 RETOUR : un entier
 RESULTAT : calcule le nombre intime (addition des voyelles du nom et du prenom)
*/
NumerologyEngine.prototype.getIntimacyNumber = function(){
    var mot = this.getNom() + this.getPrenom();
    return this.reduceAllVowelsToNumber(mot);
}


/* ------------ getRealisationNumber ------------

 ARGUMENTS : 
 RETOUR : un entier
 RESULTAT : calcule le nombre de realisation (addition des consonnes du nom et du prenom)
*/
NumerologyEngine.prototype.getRealisationNumber = function(){
    var mot = this.getNom() + this.getPrenom();
    return this.reduceAllConsToNumber(mot);
}



/* ------------ nb_occurrences ------------

 ARGUMENTS : prend deux arguments qui sont un entier et un tableau
 RETOUR : un entier
 RESULTAT : donne le nombre d'occurrences d'un chiffre dans un tableau
*/
NumerologyEngine.prototype.nb_occurrences = function(chiffre,tab){
    var x = 0; 
    for (var i=0 ; i<tab.length ; i++){
        if(chiffre == tab[i]){
            x++;
        }
    }
    return x;
}

/* ------------ getKarmicNumberTable ------------

 ARGUMENTS : 2 chaines de caracteres
 RETOUR : tableau associatif
 RESULTAT : renvoie le nombre d'occurences de chaque chiffre a la conversion des lettre du prenom et du nom en chiffres
*/
NumerologyEngine.prototype.getKarmicNumberTable = function(nom,prenom){	
    var nom_complet = nom+prenom;
    var chiffres_mot = new Array();
    for (var i=0 ; i<nom_complet.length ; i++){
        chiffres_mot[i] = this.letterToNumber(nom_complet.charAt(i));
    }
    console.log(chiffres_mot);
    
    var table_karmique = new Array();
    table_karmique["un"]     = this.nb_occurrences(1,chiffres_mot);
    table_karmique["deux"]   = this.nb_occurrences(2,chiffres_mot);
    table_karmique["trois"]  = this.nb_occurrences(3,chiffres_mot);
    table_karmique["quatre"] = this.nb_occurrences(4,chiffres_mot);
    table_karmique["cinq"]   = this.nb_occurrences(5,chiffres_mot);
    table_karmique["six"]    = this.nb_occurrences(6,chiffres_mot);
    table_karmique["sept"]   = this.nb_occurrences(7,chiffres_mot);
    table_karmique["huit"]   = this.nb_occurrences(8,chiffres_mot);
    table_karmique["neuf"]   = this.nb_occurrences(9,chiffres_mot);
        
    return table_karmique;
}
/*var tab = getKarmicNumberTable("martin","julie");
console.log("essai clé 'un' : "+tab["un"]);
for(var key in tab){
    console.log(tab[key]);
}*/



