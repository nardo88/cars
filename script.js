const table = document.querySelector('.content-items');
const mark = document.querySelector('.mark-add');
const model = document.querySelector('.model-add');
const year = document.querySelector('.year-add');
const mileage = document.querySelector('.mileage-add');
const filterMark = document.querySelector('.filter__mark')
const filterModel = document.querySelector('.filter__model')
const filterYear = document.querySelector('.filter__year')
const filterMileage = document.querySelector('.filter__mileage');
const filter = document.querySelector('.filter');

const base = [{
        mark: 'Mazda',
        model: '3/bk',
        year: '2006',
        mileage: 120000
    },
    {
        mark: 'BMW',
        model: 'x7',
        year: '2020',
        mileage: 15
    },
    {
        mark: 'OPEL',
        model: 'GRANDLAND X',
        year: '2019',
        mileage: 17245
    },
    {
        mark: 'Reno',
        model: 'Duster',
        year: '2018',
        mileage: 50000
    },
    {
        mark: 'Reno',
        model: 'Logan',
        year: '2014',
        mileage: 100400
    },
]

let newBase = [...base]

const render = base => {
    table.innerHTML = `
        <tr>
        <td id="number">№</td>
        <td id="mark">Марка</td>
        <td id="model">Модель</td>
        <td id="year">Год выпуска</td>
        <td id="mileage">Пробег</td>
        </tr>
    `
    base.forEach((item, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${item.mark}</td>
            <td>${item.model}</td>
            <td>${item.year}</td>
            <td>${item.mileage}</td>
        `
        table.insertAdjacentElement('beforeend', tr)

    })
}

const addItem = () => {
    const newItem = {
        mark: mark.value,
        model: model.value,
        year: year.value,
        mileage: Number(mileage.value),
    }
    base.push(newItem);
    mark.value = ''
    model.value = ''
    year.value = ''
    mileage.value = ''
    newBase = [...base]
    render(base)
}

function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}


render(base)

document.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.add-car__btn')) {
        if (mark.value && model.value && year.value && mileage.value) {
            addItem();
        } else alert('Заполните поля перед добавлением')
    }

    if (target.closest('.filter__reset')) {
        newBase = [...base]
        render(base)
        filterMark.value = ''
        filterModel.value = ''
        filterYear.value = ''
        filterMileage.value = ''
    }

    if (target.id === 'mark'){
        newBase = newBase.sort(byField('mark'));
        render(newBase)
    }

    if (target.id === 'model'){
        newBase = newBase.sort(byField('model'));
        render(newBase)
    }

    if (target.id === 'year'){
        newBase = newBase.sort(byField('year'));
        render(newBase)
    }
    if (target.id === 'mileage'){
        newBase = newBase.sort(byField('mileage'));
        render(newBase)
    }
})


filter.addEventListener('change', (e) => {
    const options = {}

    if (filterMark.value){
        options.mark = filterMark.value
    }
    if (filterModel.value){
        options.model = filterModel.value
    }

    if (filterYear.value){
        options.year = filterYear.value
    }

    if (filterMileage.value){
        options.mileage = filterMileage.value
    }

    newBase = base.filter(item => {
        let count = 0
        for (let key in options){
           if (options[key].toLowerCase() === item[key].toLowerCase()){
               count ++
           }
        }
        return count === Object.keys(options).length ? item : null
    })

    render(newBase)
})