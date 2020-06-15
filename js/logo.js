
window.onload = updateLogoSize;
window.onresize = updateLogoSize;

function updateLogoSize() {
    var w = window.innerWidth;
    //console.log("Width " , w);
    if (w < 830) {
        document.getElementById('logo-image').src = "images/short-logo.png";
    } else {
        document.getElementById('logo-image').src = "images/logo-long.png";
    }
}