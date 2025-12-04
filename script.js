function json(){
    let value = localStorage.getItem('language')
    let file = './englishContent.json'
    if(value == 'eng'){
        file = './englishContent.json'
    }
    else if(value == 'rus'){
        file = './russianContent.json'
    }
    else if(value == 'arm'){
        file = './armenianContent.json'
    }
    fetch(file).then(res => res.json()).then(data => {
        contentRender(data)

    }).catch()
}
json()




function language(){
    const box = document.querySelector('.select-box')
    const selected = box.querySelector('.selected')
    const options = box.querySelector('.options')

    selected.addEventListener('click', () => {
        options.style.display = options.style.display === 'block' ? 'none' : 'block'
    })
    
    options.querySelectorAll('div').forEach(opt => {
        if(opt.getAttribute('data-lang') == localStorage.getItem('language')){
            selected.innerHTML = opt.innerHTML
        }
        opt.addEventListener('click', () => {
            selected.innerHTML = opt.innerHTML
            options.style.display = 'none'
            let value = opt.getAttribute('data-lang')
            localStorage.setItem('language', value)
            json()
            console.log(value)
        })
    })
}
language()

const menu = document.querySelector(".menu")
localStorage.setItem('hotelFilter', 'all')
function contentRender(data){
    
    ///////////       Navbar   ////////// 
    
    let menuItem = menu.querySelectorAll("a")
    index = 0  
    for(key in data.navbar){
        menuItem[index].innerHTML = data.navbar[key]
        index++
    }

    

    navActive()

    
    // //////// Home /////// 

    const homeBg = document.querySelector("#home")
    const homeContent = document.querySelector(".home-content")

    homeBg.style.backgroundImage = `url('${data.home.image}')`
    homeContent.innerHTML = ''
    homeContent.innerHTML = `
        <div class="home-content d-flex flex-column justify-content-center">
            <h1 class='home-head'>${data.home.head}</h1>
            <h3>${data.home.secondaryHead}</h3>
            <p>${data.home.text}</p>
            <button class="text-uppercase">${data.home.button}</button>
        </div>
    `


    
    // ///////// To-Do List /////////

    const toDo = document.querySelector("#To-Do")
    const toDoHead = toDo.querySelector(".to-do-head")
    toDoHead.innerHTML = `
        <h1>${data.ToDo.head}</h1>
        <h4>${data.ToDo.secondaryHead}</h4>
    `
    const toDoCards = toDo.querySelector(".to-do-cards")
    toDoCards.innerHTML = ''
    for(let key in data.ToDo.cards){
        let card = `
            <div class="card shadow ">
                <img src="${data.ToDo.cards[key].image}" alt="">
                <h2>${data.ToDo.cards[key].head}</h2>
                <p>${data.ToDo.cards[key].text}</p>
            </div>
        `
        toDoCards.innerHTML += card
    }


    // ///////// Video /////////

    const video = document.querySelector("#video")
    const videoPlay = document.querySelector(".video")
    const videoHead = video.querySelector(".video-head")
    const closeBtn = document.querySelector(".video-close")
    const playBtn = document.querySelector(".fa-play")
    const frame = document.getElementById("yt")
    video.style.backgroundImage = `url('${data.video.image}')`

    videoHead.innerHTML = `
        <h1>${data.video.head}</h1>
        <h4>${data.video.text}</h4>
    `

    playBtn.addEventListener('click', () => {
        videoPlay.classList.add('Active')
        document.body.classList.add("no-scroll")
    })
    closeBtn.addEventListener('click', () => {
        videoPlay.classList.remove('Active')
        document.body.classList.remove("no-scroll")
        frame.src = 'https://www.youtube.com/embed/AQ6GmpMu5L8?si=BiwrCg1NomMa-cd2'
    })


    // ///////// Top Locations /////////


    const locationHead = document.querySelector(".locations-head")
    locationHead.innerHTML = `
        <h1>${data.topLocations.head}</h1>
        <h4 class="text-secondary">${data.topLocations.secondaryHead}</h4>
    `
    const locationCards = document.querySelector(".locations-cards")
    locationCards.innerHTML = ''
    for(let key in data.topLocations.cards){
        let card = `
            <div class="loc-card">
                <img src="${data.topLocations.cards[key].image}" alt="" >
                <div class="location-content">
                        <h2>${data.topLocations.cards[key].head}</h2>
                        <p>${data.topLocations.cards[key].text}</p>
                        <button class="text-capitalize">${data.topLocations.cards[key].button}</button>
                </div>
            </div>
        `
        locationCards.innerHTML += card
    }





    // ///////// Hotels /////////
    
    const hotelsHead = document.querySelector(".hotels-head")
    hotelsHead.innerHTML = `
        <h1>${data.hotels.head}</h1>
        <h3 class="text-secondary fw-light">${data.hotels.secondaryHead}</h3>
    `

    const hotelsFilter = document.querySelector(".hotels-filter")
    hotelsFilter.innerHTML = ''
    for(let key in data.hotels.hotelsFilter){
        let btn = `
            <button data = '${data.hotels.hotelsFilter[key][1]}' class = 'filter-btn' >${data.hotels.hotelsFilter[key][0]}</button>
        `
        hotelsFilter.innerHTML += btn
    }


    const hotelsCards = document.querySelector(".hotels-cards")
    hotelsCards.innerHTML = ''
    for(let key in data.hotels.hotelCards){
        if(data.hotels.hotelCards[key].filter == localStorage.getItem('hotelFilter')){
            let card = `
                <div class="card border-0 text-center">
                    <img src="${data.hotels.hotelCards[key].image}" alt="">
                    <h2>${data.hotels.hotelCards[key].hotelName}</h2>
                </div>
            `
            hotelsCards.innerHTML += card
        }else if(localStorage.getItem('hotelFilter') == 'all'){
             let card = `
                <div class="card border-0 text-center">
                    <img src="${data.hotels.hotelCards[key].image}" alt="">
                    <h2>${data.hotels.hotelCards[key].hotelName}</h2>
                </div>
            `
            hotelsCards.innerHTML += card
        }
    }




    // /////////     Contact         ///////// //


    const contact = document.querySelector("#contact")
    contact.style.backgroundImage = `url('${data.stayInTouch.image}')`
    const contactCont = contact.querySelector(".container")
    contactCont.innerHTML = `
        <div class="contact-head text-center">
            <h1>${data.stayInTouch.head}</h1>
            <h4 class="fw-light">${data.stayInTouch.secondaryHead}</h4>
        </div>


        <div class="contact-form">
            <form action="">
                <div class="input-box">
                    <input type="text" id="name" required>
                    <label for="name">${data.stayInTouch.nameInput}</label>
                </div>
                <div class="input-box">
                    <input type="number" id="phone" required>
                    <label for="phone">${data.stayInTouch.phoneInput}</label>
                </div>
                <div class="input-box">
                    <input type="email" id="email1" required>
                    <label for="email1">${data.stayInTouch.emailInput}</label>
                </div>
                <div class="textarea" >
                    <textarea name="" id="email2" required></textarea>
                    <label for="email2">${data.stayInTouch.emailTextArea}</label>
                </div>
                <button>${data.stayInTouch.button}</button>
            </form>
        </div>
    `


    filter(data)

}



let menuLi = menu.querySelectorAll("li")
function navActive(){
    menuLi.forEach(item => {
        item.addEventListener('click', ( ) => {
            for(let i = 0; i < menuLi.length; i++){
                menuLi[i].classList.remove('active')
            }
            item.classList.add('active')
        })
    })

}
navActive()


function filter(data){
    const filterBtn = document.querySelectorAll(".filter-btn")
    filterBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.setItem('hotelFilter', btn.getAttribute('data'))
            contentRender(data)
        })
    })
}



const Menu = document.querySelector('.menu')
const menuOverlay =document.querySelector('.nav-overlay')
function bars(){
    const Bars = document.querySelector(".bars")
    Bars.addEventListener('click', () => {
        Menu.classList.add('menu-active')
        menuOverlay.classList.add('menu-active')
        
    })
}
bars()

function menuClose(){
    const close = document.querySelector(".menu-close")
    close.addEventListener('click', () => {
        Menu.classList.remove('menu-active')
        menuOverlay.classList.remove('menu-active')  
    }) 
}
menuClose()
