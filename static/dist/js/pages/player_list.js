
$(function () {
    data.forEach((player) => {
        addRowToTable(createRowFromPlayerInfo(player));
    });
    $("#playerlisttable").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": []
    });
});

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

/**
 * @param  {} info
 * @description Creates a row from given player info
 */
function createRowFromPlayerInfo(info) {
    const row = createElement("tr");
    row.appendChild(createTableData(info.id));
    row.appendChild(createTableData(info.name));
    row.appendChild(createTableData(info.socialId));
    row.appendChild(createTableData(info.ip));
    row.appendChild(createTableData(info.ping));
    row.appendChild(createActionData(info.id));
    return row;
}

function createTableData(d) {
    const cell = createElement("td");
    cell.innerHTML = d;
    return cell;
}

function createActionData(playerid) {
    const cell = createElement("td");
    cell.appendChild(createAction("a", ["text-muted"], [{key: "href", value: "www.google.de"}], "fas", "fa-info-circle"));
    return cell;
}

function createAction(tag, classes, attributes, icontype, icon) {
    const action = createElement(tag, classes, attributes);
    action.appendChild(createElement("i", [icontype, icon]));
    return action;
}

/**
 * @param  {} rowElement
 * @description Adds a row to a specific table
 */
function addRowToTable(rowElement) {
    const tableBody = document.getElementById("playerlistbody");
    if (tableBody) {
        tableBody.appendChild(rowElement);
    }
}