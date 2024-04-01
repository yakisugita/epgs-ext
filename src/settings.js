const dom_script = {
    id: "dom-script",
    js: ["main.js"],
    matches: ["http://192.168.50.161:8888/*"],
    world: "MAIN",
    allFrames: true
};

function set_pers_scripts() {
    chrome.permissions.request({ origins: ["http://192.168.50.161:8888/"] })
        .then((granted) => {
            if (granted) {
                alert("granted.Thanks")
                chrome.scripting.registerContentScripts([dom_script])
            } else {
                alert("not granted.")
            }
        })
}

function get_pers_scripts() {
    chrome.permissions.getAll()
        .then((permissions) => {
            console.log(permissions.origins)
        })
    
    chrome.scripting.getRegisteredContentScripts()
        .then((scripts) => {
            console.log(scripts)
        })
}

function rm_pers_scripts() {
    chrome.scripting.unregisterContentScripts()
    chrome.permissions.getAll()
        .then((permissions) => {
            chrome.permissions.remove({ origins: permissions.origins })
                .then((removed) => {
                    if (removed) alert("removed.")
                })
        })
}

function refresh() {
    chrome.scripting.unregisterContentScripts()
    chrome.permissions.getAll()
        .then((permissions) => {
            chrome.permissions.remove({ origins: permissions.origins })
        })
    
    setTimeout(() => {
        chrome.permissions.request({ origins: ["http://192.168.50.161:8888/"] })
            .then((granted) => {
                if (granted) {
                    chrome.scripting.registerContentScripts([dom_script])
                } else {
                    alert("not granted.")
                }
            })
    }, 50);
}

document.getElementById("req-btn").addEventListener("click", set_pers_scripts)
document.getElementById("getall-btn").addEventListener("click", get_pers_scripts)
document.getElementById("rm-btn").addEventListener("click", rm_pers_scripts)
document.getElementById("refresh-btn").addEventListener("click", refresh)