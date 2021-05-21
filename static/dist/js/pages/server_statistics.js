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

function changeElementById(id, value) {
    let label = document.getElementById(id);
    if (label) label.innerHTML = value;
}

function changeClassById(id, className) {
    let el = document.getElementById(id);
    el.classList.add(className);
}

function parseVisits() {
    let visits = data.visits
    function uniqueSocials() {
        let ret = [];
        for (visit in visits) {
            if (!ret.includes(visit.socialId)) ret.push(visit.socialId);
        }
        return ret;
    }

    function uniqueIps() {
        let ret = [];
        for (visit in visits) {
            if (!ret.includes(visit.ip)) ret.push(visit.ip);
        }
        return ret;
    }
    if (visits != undefined) {
        changeElementById("totalVisits", visits.length);
        changeElementById("socialIds", uniqueSocials().length);
        changeElementById("ips", uniqueIps().length);
    }
}

$(function () {
    let ticksStyle = {
        fontColor: '#495057',
        fontStyle: 'bold'
    };

    let mode = 'index';
    let intersect = true;
    let $visitorsChart = $('#visitors-chart');
    let thisWeek = [0, 0, 0, 0, 0, 0, 0];
    let maxTw = 0;
    let lastWeek = [0, 0, 0, 0, 0, 0, 0];
    let maxLw = 0;
    let maxScale = 1;

    function isDateInThisWeek(date) {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();

        // get first date of week
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

        // get last date of week
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

        // if date is equal or within the first and last dates of the week
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }

    // takes a dates array, adds to the thisweek (or last week) array based on day of week (0: Monday, ... 6: Sunday)
    function filterByDay(data, tw = true) {
        data.forEach((data) => {
            let dateO = new Date(data.connected);
            let day = dateO.getDay();
            if (day === 0) {
                if (tw) {
                    thisWeek[6]++;
                }
                else {
                    lastWeek[6]++;
                }
            }
            else {
                if (tw) {
                    thisWeek[day-1]++;
                }
                else {
                    lastWeek[day-1]++;
                }
            }
        });
    }

    //finds the biggest value of thisweek and lastweek. At least 1
    function calcMaxes() {
        maxTw = Math.max.apply(Math, thisWeek);
        maxLw = Math.max.apply(Math, lastWeek);
        maxScale = (maxTw > maxLw) ? maxTw : maxLw;
    }

    // calculates the gain/loss from thisweek to last week
    function calcGainLoss() {
        let sumLw = lastWeek.reduce((a, b) => a + b, 0);
        let sumTw = thisWeek.reduce((a, b) => a + b, 0);
        if (sumLw == sumTw) {
            changeElementById("indicatorText", "0 %");
        }
        else {
            if (sumLw == 0) {
                changeClassById("indicator", "text-success");
                changeClassById("indicatorText", "fas");
                changeClassById("indicatorText", "fa-arrow-up");
                changeElementById("indicatorText", '&#8734; %');
            }
            else {
                if (sumTw == 0) {
                    changeElementById("indicatorText", '100 %');
                    changeClassById("indicatorText", "fas");
                    changeClassById("indicatorText", "fa-arrow-down");
                }
                else {
                    let percentage = Math.floor(((maxTw / maxLw) * 100) - 100);
                    if (percentage < 0) {
                        changeClassById("indicator", "text-danger");
                        changeClassById("indicatorText", "fas");
                    changeClassById("indicatorText", "fa-arrow-down");
                    }
                    else {
                        changeClassById("indicator", "text-success");
                        changeClassById("indicatorText", "fas");
                        changeClassById("indicatorText", "fa-arrow-up");
                    }
                    changeElementById("indicatorText",  percentage + '%');
                }
            }
        }
    }

    filterByDay(data.visits.filter((visit) => {
        return isDateInThisWeek(new Date(visit.connected));
    }), true);

    changeElementById("totalConnectionsChart", "Total this Week: " + thisWeek.reduce((a, b) => a + b, 0));
    calcMaxes();
    calcGainLoss();

    // eslint-disable-next-line no-unused-vars
    let visitorsChart = new Chart($visitorsChart, {
        data: {
            labels: ['Mo', 'Tue', 'Wed', 'Thu', 'Fri', 'Sa', 'Su'],
            datasets: [{
                type: 'line',
                data: thisWeek,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                pointBorderColor: '#007bff',
                pointBackgroundColor: '#007bff',
                fill: false
                // pointHoverBackgroundColor: '#007bff',
                // pointHoverBorderColor    : '#007bff'
            },
            {
                type: 'line',
                data: lastWeek,
                backgroundColor: 'tansparent',
                borderColor: '#ced4da',
                pointBorderColor: '#ced4da',
                pointBackgroundColor: '#ced4da',
                fill: false
                // pointHoverBackgroundColor: '#ced4da',
                // pointHoverBorderColor    : '#ced4da'
            }]
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                mode: mode,
                intersect: intersect
            },
            hover: {
                mode: mode,
                intersect: intersect
            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    // display: false,
                    gridLines: {
                        display: true,
                        lineWidth: '4px',
                        color: 'rgba(0, 0, 0, .2)',
                        zeroLineColor: 'transparent'
                    },
                    ticks: $.extend({
                        beginAtZero: true,
                        suggestedMax: maxScale > 0 ? maxScale : 1
                    }, ticksStyle)
                }],
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false
                    },
                    ticks: ticksStyle
                }]
            }
        }
    });
});

window.onload = function () {
    parseUptime();
    parseVisits();
}