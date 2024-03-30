function set_permissions() {
    chrome.permissions.request({ origins: ["http://192.168.50.161:8888/#/"] })
        .then((granted) => {
            if (granted) {
                alert("granted.Thanks")
            } else {
                alert("not granted.")
            }
        })
}

function get_permissions() {
    chrome.permissions.getAll()
        .then((permissions) => {
            console.log(permissions.origins)
        })
}

function rm_permissions() {
    chrome.permissions.getAll()
        .then((permissions) => {
            chrome.permissions.remove({ origins: permissions.origins })
                .then((removed) => {
                    if (removed) alert("removed.")
                })
        })
}

document.getElementById("req-btn").addEventListener("click", set_permissions)
document.getElementById("getall-btn").addEventListener("click", get_permissions)
document.getElementById("rm-btn").addEventListener("click", rm_permissions)