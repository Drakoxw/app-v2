window.onload = () => {
    fetch('https://v3ra.drakoxw.now.sh/api/platos')
        .then(response => response.json())
        .then(data => {
            const platosList = document.getElementById('list-platos')
            const submit = document.getElementById('submit')
            const template = data.map(x => '<li>' + x.name + '</li>').join('')
            platosList.innerHTML = template
            submit.removeAttribute('disabled')
        })
}