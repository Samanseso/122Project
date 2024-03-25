function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.querySelector('#search_input');
    filter = input.value.toUpperCase();
    ul = document.querySelector(".search_items");
    li = ul.getElementsByTagName('li');

    if(filter.length > 0) {
        ul.style.display = "block";
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
    
    
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
    else {
        ul.style.display = "none";
    }

    // Loop through all list items, and hide those who don't match the search query
    
  }

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
  spaceBetween: 100,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

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

var main = document.querySelector('main');


function showSignUp() {
    main.style.transform = 'translate(100%, 0)';
}

function showLogInBtn() {
    main.style.transform = 'translate(50%, 0)';
}


var login_marker = document.querySelector('header .login-marker');
var login_item = document.querySelectorAll('header button');

login_item.forEach(link => {
    link.addEventListener('click', (e) => {
        login_underline(e.target)
    });
});


var first_login = document.querySelector('header #first_login');
function underline_first_login() {
    login_marker.style.left = first_login.offsetLeft + 'px';
    login_marker.style.width = first_login.offsetWidth + 'px';
}

function login_underline(e) {
    login_marker.style.left = e.offsetLeft + 'px';
    login_marker.style.width = e.offsetWidth + 'px';
}