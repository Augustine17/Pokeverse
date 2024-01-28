let cardContainer = document.getElementById("cardContainer");
let filterBtn = document.getElementById("filter");
let reset = document.getElementById("reset");
let inputSearch = document.getElementById("inputSearch");
let loader = document.getElementById("sub")
inputSearch.addEventListener("click", searchPok);
filterBtn.addEventListener("click",fetchPokemonOnType)
reset.addEventListener("click",fetchPoks)
const NameURLMap = {}

function searchPok(){
    loader.style.display="block";
    const pokemonName = document.getElementById("search").value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(parsedResponse =>{
        cardContainer.innerText="";
        console.log(parsedResponse);
        document.getElementById("search").value = ""
        const abilities = parsedResponse.abilities.map(elem=>{
            const {name}  = elem.ability;
            return name
            })

    let card = document.createElement("div");
    card.classList.add("card")
    card.innerHTML = `<div class="front" id="${parsedResponse.types[0].type.name}>
                         <img src="${parsedResponse.sprites.front_default}" class="frontImg"/>
                         <p class="front-heading">${parsedResponse.name}</p>
                         <p>${parsedResponse.types[0].type.name}</p>
                      </div>
                      <div class="back" id="${parsedResponse.types[0].type.name}>
                      <img src="${parsedResponse.sprites.back_default}" class="backImg" />
                        <p class="back-heading">${parsedResponse.name}</p>
                        <p>Abilities: ${abilities}</p>
                      </div>`

    cardContainer.appendChild(card)
    loader.style.display="none";
    })
    .catch(err => {
        alert("No Pokemon Found")
        document.getElementById("search").value = ""
        loader.style.display="none";
    })
}

async function fetchPoks(){
    loader.style.display="block";
    const nums = 100;
    cardContainer.innerText="";
    for (let i = 1; i <= nums; i++) {   
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

            const data = await response.json();
            
            const abilities = data.abilities.map(elem=>{
                    const {name}  = elem.ability;
                    return name
                    })

            let card = document.createElement("div");
            card.classList.add("card")
            card.innerHTML = `<div class="front" id="${data.types[0].type.name}">
                                 <img src="${data.sprites.front_default}" class="frontImg"/>
                                 <p class="front-heading">${data.name}</p>
                                 <p>${data.types[0].type.name}</p>
                              </div>
                              <div class="back" id="${data.types[0].type.name}">
                              <img src="${data.sprites.back_default}" class="backImg" />
                                <p class="back-heading">${data.name}</p>
                                <p>Abilities: ${abilities}</p>
                              </div>`

            cardContainer.appendChild(card)
            loader.style.display="none";
        }catch(err){
            console.log("error!!!!!");
            loader.style.display="none";
        }
        
    }
}

async function fetchPokenmonType () {

    const response = await fetch('https://pokeapi.co/api/v2/type/')

    const parsedResponse = await response.json()
    
    const select = document.getElementById('pokemon-types')

    for (let i = 0; i < parsedResponse.results.length; i++) {
        
        const type = parsedResponse.results[i];
        const typeName = type.name
        const typeURL = type.url
        NameURLMap[typeName] = typeURL

        const option = document.createElement('option')
        option.innerText = typeName
        option.setAttribute('value', typeName)
        option.setAttribute('data-url', typeURL)
        select.append(option)

    }  

}

async function fetchPokemonOnType () {
    loader.style.display="block";
    cardContainer.innerText="";
    const selectValue = document.getElementById('pokemon-types').value

    const response = await  fetch(NameURLMap[selectValue])
    const data = await response.json()

    const pokemonsListLength = data.pokemon.length > 10 ? 10 : data.pokemon.length

    for (let i = 0; i < pokemonsListLength; i++) {

        const pokemon = data.pokemon[i].pokemon
        const single = await fetch(pokemon.url);

            const parsedResponse = await single.json();
            const abilities = parsedResponse.abilities.map(elem=>{
                    const {name}  = elem.ability;
                    return name
                    })

            let card = document.createElement("div");
            card.classList.add("card")
            card.innerHTML = `<div class="front" id="${parsedResponse.types[0].type.name}">
                                 <img src="${parsedResponse.sprites.front_default}" class="frontImg"/>
                                 <p class="front-heading">${parsedResponse.name}</p>
                                 <p>${parsedResponse.types[0].type.name}</p>
                              </div>
                              <div class="back" id="${parsedResponse.types[0].type.name}">
                              <img src="${parsedResponse.sprites.back_default}" class="backImg" />
                                <p class="back-heading">${parsedResponse.name}</p>
                                <p>Abilities: ${abilities}</p>
                              </div>`

            cardContainer.appendChild(card)
    }
    loader.style.display="none";
}


window.onload= () =>{
    fetchPokenmonType()
    fetchPoks()
    }
    