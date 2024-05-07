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

function updateBars(value) {
    const sheet = document.styleSheets[0];
    const rule = `.progress-bar-${value}{width: ${value}%; height: 100%;     background-color: #007bff; transition: width 0.5s ease;}`
    sheet.insertRule(rule)
}

function barsNumber() {
    const number =  document.querySelectorAll(".statNumber")
    number.forEach(num => {
        const text = num.textContent
        updateBars(text)
        
    })
}

barsNumber()


