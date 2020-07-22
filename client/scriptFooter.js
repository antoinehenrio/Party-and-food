function clickBtn1()
{
    var p = document.getElementById("btn1");
    // NOTE: showAlert(); ou showAlert(param); NE fonctionne PAS ici.
    // Il faut fournir une valeur de type function (nom de fonction déclaré ailleurs ou declaration en ligne de fonction).
    p.onclick = showAlert;
};