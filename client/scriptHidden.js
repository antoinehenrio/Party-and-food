function clickCheck1(){
    var p = document.getElementById("logoDrive"); 
    if (p.className == "logoLivDrive") {
        p.className = "logoLivDriveBlue";
    }
    else {
        p.className = "logoLivDrive";;
    }
}

function clickCheck2(){
    var p = document.getElementById("logoLivraison"); 
    if (p.className == "logoLivDrive") {
        p.className = "logoLivDriveBlue";
    }
    else {
        p.className = "logoLivDrive";;
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

function clickModal3(){
    var p = document.getElementById("modal3");
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

function clickCross3(){
    var p = document.getElementById("modal3");
    p.className = "modalHidden";
}