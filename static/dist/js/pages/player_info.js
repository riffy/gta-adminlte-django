console.log(JSON.stringify(data));

/*
<div class="progress-bar bg-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0"
                                        aria-valuemax="100" style="width: 100%">
                                        <span>{{data.health}} / 200</span>
                                    </div>
*/

$(function() {

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