console.log(JSON.stringify(data));

$(function () {
    $("#healthBar").append(createHealthBar(data.health));
    $("#armourBar").append(createProgressBar(data.armour));
    $("#connectionTime").html(parseUptime(data.connected))
});

function alertNotImplemented() {
    alert("Not implemented (yet)");
}

function parseUptime(time) {
    if (time) {
        return new Date(time * 1000).toISOString().substr(11, 8);
    }
    return "unknown";
}

function createHealthBar(health) {
    const perc = (health <= 100) ? 0 : (health - 100);
    return createProgressBar(perc);
}

function createProgressBar(percentage) {
    const cont = createElement("div", ["progress-bar", "bg-danger"], [
        {
            key: "role",
            value: "progress"
        },
        {
            key: "aria-valuenow",
            value: percentage
        },
        {
            key: "aria-valuemax",
            value: "100"
        },
        {
            key: "style",
            value: `width: ${percentage}%`
        }]);
    const lab = createElement("span", ["sr-only"]);
    lab.innerHTML = `${percentage}/100`
    cont.appendChild(lab);
    return cont;
}

/**
 * createElement
 * @description Create HTML element with given classes and tags
 * @param {string} tagType the tag to add the classes to
 * @param {string[]} classes classes to add
 * @param {object[]} attributes the attributes to add {key, value}
 * @returns {Element}
 */
function createElement(tagType = "div", classes = [], attributes = []) {
    const element = document.createElement(tagType);
    classes.forEach((className) => element.classList.add(className));
    if (attributes && typeof attributes === "object") {
        attributes.forEach((attr) => {
            element.setAttribute(attr.key, attr.value);
        });
    }
    return element;
}