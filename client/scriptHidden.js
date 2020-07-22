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

function clickModal1(){
    var p = document.getElementById("modal1");
    p.className = "modal";
}

function clickModal2(){
    var p = document.getElementById("modal2");
    p.className = "modal";
}

function clickCross1(){
    var p = document.getElementById("modal1");
    p.className = "modalHidden";
}

function clickCross2(){
    var p = document.getElementById("modal2");
    p.className = "modalHidden";
}