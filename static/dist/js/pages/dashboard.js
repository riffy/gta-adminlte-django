$(function () {
    function parseUptime() {
        let uptime = data.uptime
        if (uptime != undefined) {
            let label = document.getElementById("onlineUptimeLabel");
            if (label) {
                let hms = new Date(uptime * 1000).toISOString().substr(11, 8);
                label.innerHTML = "Online<br>Since: " + (hms) + " (hh:mm:ss)";
            }
        }
    }
    parseUptime();
})
