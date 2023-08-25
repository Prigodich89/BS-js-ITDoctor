if(!localStorage.getItem('goods')) {
    localStorage.setItem('goods', JSON.stringify([]))
}

let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
})

document.querySelector('button.add-new').addEventListener('click', function(e) {
    let name = document.getElementById('good-name').value 
    let price = document.getElementById('good-price').value 
    let count = document.getElementById('good-count').value 
    if(name && price && count) {
         document.getElementById('good-name').value = ''
         document.getElementById('good-price').value = ''
         document.getElementById('good-count').value = '1'
         let goods = JSON.parse(localStorage.getItem('goods'))
         goods.push(['good-'+goods.length, name, price,count, 0, 0, 0])
         localStorage.setItem('goods', JSON.stringify(goods))
         update_goods()
         myModal.hide()
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка...',
            text: 'Пожалуйстаб заполните все поля!',
        })
    }
})

update_goods()

function update_goods() {
    let result_price = 0
    let tbody = document.querySelector('.list')
    tbody.innerHTML = ""
    document.querySelector('.cart').innerHTML = ""
    let goods = JSON.parse(localStorage.getItem('goods'))
    if(goods.length) {
        table1.hidden = false
        table2.hidden = false
        for(let i=0; i<goods.length; i++) {
            tbody.insertAdjacentHTML('beforeend',
            `
            <tr class="align-middle">
            <td>${i+1}</td>
            <td class="name">${goods[i][1]}</td>
            <td class="price">${goods[i][2]}</td>
            <td>${goods[i][3]}</td>
            <td><button class="good-delete btn  btn-danger" data-delete="${goods[i][0]}">&#10006;</button></td>
            <td><button class="good-delete btn  btn-primary" data-goods="${goods[i][0]}">&#10149;</button></td>
            </tr>
            `
            )
            if(goods[i][4]>0) {
                goods[i][6] = goods[i][4]*goods[i][2] - goods[i][4]*goods[i][2]*goods[i][5]*0.01
                result_price +=goods[i][6]
                document.querySelector('.cart').insertAdjacentHTML('beforeend',
                `
                <tr class="align-middle">
                <td>${i+1}</td>
                <td class="price-name">${goods[i][1]}</td>
                <td class="price-one">${goods[i][2]}</td>
                <td class="price-count">${goods[i][4]}</td>
                <td class="price-discount"><input data-goodid="${goods[i][0]}" type="text" value="${goods[i][5]}" min="0" max="100"></td>
                <td><button class="good-delete btn  btn-danger" data-delete="${goods[i][0]}">&#10006;</button></td>
                </tr>
                `
                )
            }
        }
        //userlist = new List('goods', options);
    } else {
        table1.hidden = true
        table2.hidden = true
    }
    document.querySelector('.price_result').innerHTML = result_price + '&#8381;'
}