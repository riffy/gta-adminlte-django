function serverSelection() {
    let x = Number(document.getElementById("serverSelect").value);
    if (x > 0) {
        window.location.href = "/" + window.location.href.split("/")[3] + "/" + x + "/";
    } else {
        window.location.href = "/";
    }
}