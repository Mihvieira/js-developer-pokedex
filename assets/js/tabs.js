const heart = document.querySelector(".heart")
const tabs = document.querySelectorAll(".botao-detalhe")

tabs.forEach(tab => tab.addEventListener("click", ()=> tabClicked(tab)))

const tabClicked = (tab)=> {
    tabs.forEach(tab => tab.classList.remove("active"))
    tab.classList.add("active")

    const contents = document.querySelectorAll(".subdetails")
    contents.forEach(content => content.classList.remove("show"))

    const contentId = tab.getAttribute("content-id")
    const content = document.getElementById(contentId)

    content.classList.add("show")
}

const currentActiveTab = document.querySelector('.botao-detalhe.active')
tabClicked(currentActiveTab)



