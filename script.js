//Menu bar overlaying
function openNav() {
    document.getElementById("mySidenav").style.left= "30vw";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").addEventListener('click', closeNav);
}
function closeNav() {
    document.getElementById("mySidenav").style.left = "100%";
    document.getElementById("overlay").style.display = "none";
}

//Initial line for search categories
var first = document.querySelector('#first');
function underline_first() {
    marker.style.left = first.offsetLeft + 'px';
    marker.style.width = first.offsetWidth + 'px';
}

 //Line movement for search categories
var marker = document.querySelector('#marker');
var item = document.querySelectorAll('.search_categories button');
var search_input= document.querySelector('#search_input');

function underline(e) {
    marker.style.left = e.offsetLeft + 'px';
    marker.style.width = e.offsetWidth + 'px';
    search_input.placeholder = "Search " + e.innerHTML.toLowerCase();
}

item.forEach(link => {
    link.addEventListener('click', (e) => {
        underline(e.target)
    });
});


//Categories swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 8,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var clickableImage = document.querySelectorAll('.swiper-slide .name');

function goTOCheckOut() {
    window.location.href = 'check_out.html';
}

clickableImage.forEach(link => {
    link.addEventListener('click', (e) => {
        goTOCheckOut(e.target);
    })
})


var aboutText = document.querySelector('.about-text p');
var backdrop = document.querySelector('.about-text .about-backdrop');
var readButton = document.querySelector('.about button')

function aboutSLideDown () {
    if (aboutText.style.maxHeight == '12vh') {
        aboutText.style.maxHeight = '500px';
        backdrop.style.display = 'none';
        readButton.innerHTML = 'Read Less';
    }
    else {
        aboutText.style.maxHeight = '12vh';
        readButton.innerHTML = 'Read More';
        backdrop.style.display = 'block';
    }
}