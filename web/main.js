const stringToHTML = (s) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(s, 'text/html')

    return doc.body.firstChild
}

const renderItem = (item) => {
    const element = stringToHTML(`<li data-id="${item._id}">${item.name}</li>`)

    element.addEventListener('click', () => {
        const platosList = document.getElementById('list-platos')
        Array.from(platosList.children).forEach(x => x.classList.remove('select'))
        element.classList.add('select')
        const platosIdInput = document.getElementById('plato-id')
        platosIdInput.value = item._id
    })

    return element
}

window.onload = () => {
    const orderForm = document.getElementById('order')
    orderForm.onsubmit = (e) => {
        e.preventDefault()
        const platoId = document.getElementById('plato-id')
        const platoIdValue = platoId.value
        if (!platoIdValue) {
            alert('Debe seleccionar al menos un plato!')
            return
        }

        const order = {
            meal_id: platoIdValue,
            user_id: 'pepito',
        }
        fetch('https://v3ra.drakoxw.now.sh/api/ordenes',{
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json',
            },
            body: JSON.stringify(order)
        }).then(x => console.log(x))
    }

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