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
  spaceBetween: 10,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


//Slide descriptions up when clicked
var text = document.querySelectorAll('.description');
var image = document.querySelector('.swiper-wrapper img');

function showDescription (e) {
    if (e.style.height == '100%') {
        e.style.overflow = 'hidden';
        e.style.whiteSpace = 'nowrap';
        e.style.height = 'auto';
    }
    else {
        e.style.overflow = 'auto';
        e.style.whiteSpace = 'wrap';
        e.style.height = '100%';
    }
}

text.forEach(link => {
    link.addEventListener('click', (e) => {
        showDescription(e.target.parentNode)
    });
});

var clickableImage = document.querySelectorAll('.swiper-slide img');

function goTOCheckOut() {
    window.location.href = 'https://samanseso.github.io/122Project/check_out.html';
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