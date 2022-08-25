document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('tmp-clipboard').onclick = function () {
        chrome.tabs.executeScript(null, {
            file: "script.js"
        });
    }
});