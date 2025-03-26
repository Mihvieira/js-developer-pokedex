import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  standalone: true
})
export class TabsComponent {

  heart = document.querySelector(".heart")
  tabs = document.querySelectorAll(".botao-detalhe")
  currentActiveTab = document.querySelector('.botao-detalhe.active')

  constructor(){}

  get tabs():void{
    this.tabs.forEach(tab => tab.addEventListener("click", ()=> tabClicked(tab)))
  }


  tabClicked = (tab)=> {
    tabs.forEach(tab => tab.classList.remove("active"))
    tab.classList.add("active")

    const contents = document.querySelectorAll(".subdetails")
    contents.forEach(content => content.classList.remove("show"))

    const contentId = tab.getAttribute("content-id")
    const content = document.getElementById(contentId)

    content.classList.add("show")
}


tabClicked(currentActiveTab)

function updateBars(value) {
    const sheet = document.styleSheets[0];
    const rule = `.progress-bar-${value}{width: ${value}%; height: 100%;     background-color: #007bff; transition: width 0.5s ease;}`
    sheet.insertRule(rule)
}

   barsNumber() {
    const number =  document.querySelectorAll(".statNumber")
    number.forEach(num => {
        const text = num.textContent
        updateBars(text)

    })
}

 updateColors(type) {
    const pokemonClass = document.querySelector(".pokemon")
    pokemonClass.classList.add(`${type}`)
    //const sheet = document.styleSheets[0];
    //const rule = `.${type}{background-color: var(--cor-${type});}`
}

 colorType() {
    const color =  document.querySelector(".type")
    const type = color.textContent
    console.log(type)
    updateColors(type)
}


}
