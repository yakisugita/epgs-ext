// ストレージ情報取得
// const headers = new Headers()
// headers.append('content-type', 'application/json; Charset=UTF-8')
// const body = {urls:urls, custom:object["custom"], is_strict:false, client:"ext", client_ver:"2.0"}
// const body_json = JSON.stringify(body)
// const init = { method:'POST', headers:headers2, body:body_json}
// fetch('https://api.8jsv.com/', init)

fetch("/api/storages")
.then((response) => {
    console.log(`status : ${response.status}`)
    return response.json()
    
})
.then((data) => {
    console.log("catch data",data)
    const storages = {}
    data.items.forEach(storage => {
        console.log(storage)
        storages[storage.name] = storage.used / storage.total
    });
    console.log(storages)
    // 左のナビメニューを取得、コピーを下に追加
    const navi = document.querySelector("div[role='listbox'].v-item-group.v-list-item-group")
    const extendMenuCount = 2
    const beforeLen = navi.children.length
    const icons = []
    const title = []
    navi.append(navi.firstElementChild.cloneNode(true))
    navi.append(navi.firstElementChild.cloneNode(true))
    console.log(navi.children)
    // 選択状態を外す
    for (let i = 0; i < extendMenuCount; i++) {
        navi.children[beforeLen+i].classList.remove("selected")
        icons[i] = navi.children[beforeLen+i].querySelector(".v-list-item__icon").firstElementChild
        icons[i].classList.remove("mdi", "mdi-view-dashboard")
        icons[i].classList.add("material-icons")

        title[i] = navi.children[beforeLen+i].querySelector(".v-list-item__content").firstElementChild
    }
    console.log(icons)
    console.log(title)
    // ナビメニューの中身を書き換え
    // 1.ストレージ容量
    icons[0].innerHTML = "storage"
    title[0].innerHTML = `<progress value="${storages["recorded"]}"></progress>`
    return
})
.catch((error) => {
    console.log(error.message)
});