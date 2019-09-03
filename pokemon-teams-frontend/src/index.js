const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(POKEMONS_URL)
    .then(resp => resp.json())
    .then(json => createCards(json))

function createCards(json){
    json.forEach(trainer => {
        const div = document.createElement('div')
        div.className = 'card'
        const p = document.createElement('p')
        p.innerText = trainer.name
        const ul = document.createElement('ul')
        ul.id = trainer.name

        trainer.pokemons.forEach(pokemon => {
            const li = document.createElement('li')
            li.innerText = `${pokemon.nickname} : ${pokemon.species}`

            const deleteButton = document.createElement('button')
            deleteButton.innerText = 'Delete'
            deleteButton.style.float = 'right'
            deleteButton.addEventListener('click', function(){
                li.parentNode.removeChild(li)
                deletePokemon(pokemon.id)
            })

            li.appendChild(deleteButton)
            ul.appendChild(li)
        })

        const button = document.createElement('button')
        button.innerText = "Add Pokemon"
        button.style.color = 'black'
        button.addEventListener('click', function(){
            addPokemon(trainer)
        })

        p.appendChild(button)

        div.append(p, ul)
        document.body.appendChild(div)
        button.style.float = 'right'
    })
}

function addPokemon(trainer){
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({trainer_id: trainer.id})
    })
        .then(resp => resp.json())
        .then(json => {
            if (json){
                addToTeam(trainer, json)
            }
        })
}

function addToTeam(trainer, pokemon){
    let li = document.createElement('li')
    li.innerText = `${pokemon.nickname} : ${pokemon.species}`
    document.getElementById(trainer.name).appendChild(li)
    const button = document.createElement('button')
    button.innerText = 'Delete'
    button.style.float = 'right'
    button.addEventListener('click', function(){
        li.parentNode.removeChild(li)
        deletePokemon(pokemon.id)
    })
    
    li.appendChild(button)
}

function deletePokemon(id){
    fetch(POKEMONS_URL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id})
    })
    .then(resp => resp.json())
    .then(pokemon => {
        console.log(pokemon)
    })
}