const stringToHTML = (s) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(s, 'text/html')

    return doc.body.firstChild
}

const renderItem = (item) => {
    const element = stringToHTML(`<li data-id="${item._id}">${item.name}</li>`)
    return element
}

window.onload = () => {
    fetch('https://v3ra.drakoxw.now.sh/api/platos')
        .then(response => response.json())
        .then(data => {
            const platosList = document.getElementById('list-platos')
            const submit = document.getElementById('submit')
            const listItems = data.map(renderItem)
            platosList.removeChild(platosList.firstElementChild)
            listItems.forEach(element => platosList.appendChild(element))
            submit.removeAttribute('disabled')
        })
}