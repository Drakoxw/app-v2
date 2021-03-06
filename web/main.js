let platosState = []

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

const renderOrder = (order, plato) => {
    const plat = plato.find(x => x._id === order.meal_id)
    const element = stringToHTML(`<li data-id="${order._id}">${plat.name} - ${order.user_id} </li>`)

    return element
}

window.onload = () => {
    const orderForm = document.getElementById('order')
    orderForm.onsubmit = (e) => {
        e.preventDefault()
        const submit = document.getElementById('submit')
        submit.setAttribute('disabled',true)
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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        }).then(x => x.json())
            .then(respuesta => {
                const renderdeOrder = renderOrder(respuesta,platosState )
                const ordersList = document.getElementById('list-ordenes')
                ordersList.appendChild(renderdeOrder)
                submit.removeAttribute('disabled')
            })
    }

    fetch('https://v3ra.drakoxw.now.sh/api/platos',)
        .then(response => response.json())
        .then(data => {
            platosState = data
            const platosList = document.getElementById('list-platos')
            const submit = document.getElementById('submit')
            const listItems = data.map(renderItem)
            platosList.removeChild(platosList.firstElementChild)
            listItems.forEach(element => platosList.appendChild(element))
            submit.removeAttribute('disabled')
            fetch('https://v3ra.drakoxw.now.sh/api/ordenes')
                .then(response => response.json())
                .then(ordersData => {
                    const ordersList = document.getElementById('list-ordenes')
                    const listOrders = ordersData.map(ordersData => renderOrder(ordersData,data))
                    
                    ordersList.removeChild(ordersList.firstElementChild)
                    listOrders.forEach(element => ordersList.appendChild(element))
                    
                }) 
        })
}