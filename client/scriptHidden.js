function clickCheck1(){
    var p = document.getElementById("check1"); 
    if (p.className == "checkIcone") {
        p.className = "checkIconeHidden";
    }
    else {
        console.log("oui");
        p.className = "checkIcone";
    }
}

function clickCheck2(){
    var p = document.getElementById("check2"); 
    if (p.className == "checkIcone") {
        p.className = "checkIconeHidden";
    }
    else {
        p.className = "checkIcone";
    }
}