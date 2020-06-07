function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()})
    .then ( states => {

        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

      
    } )
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectionState = event.target.selectedIndex
    stateInputvalue = event.target.options[indexOfSelectionState]

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => {return res.json()})
    .then ( cities => {

        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//ITENS DE COLETA

const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){

    const itemLi = event.target

    // Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //verificar se itens seleciondos, se sim pegar os itens seleciondos

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })


    //se já estiver selecionda, tirar da seleção

    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
    
        selectedItems = filteredItems
    } else {
        //se não estiver seleciondado. adicionar à seleção
        // adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar os campo escondifo com os itens selecionados
    collectedItems.value = selectedItems   

}