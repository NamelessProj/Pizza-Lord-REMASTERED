// GET THE CURRENT YEAR FOR THE COPYRIGHT
document.querySelector('[data-current-year]').innerText = new Date().getFullYear();



// CHECK IF USER PREFER REDUCED-MOTION
let scrollBehavior = 'smooth';
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) scrollBehavior = 'instant';



// ======== BTN SCROLL TO TOP ========
const btnScrollToTop = document.getElementById('scrollToTop');
btnScrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: scrollBehavior
    });
});



// ======== FILTER LIST ========

if(document.querySelector('.filter')){
    const filterList = document.querySelector('.filter');
    const filterButtons = filterList.querySelectorAll('.filter-btn');
    const pizzaAll = document.querySelectorAll('.pizza-item');

    let pizzaIndex = 0;

    pizzaAll.forEach(pizza => {
        pizza.style.viewTransitionName = `pizza-${++pizzaIndex}`;
        pizza.classList.add('visible');
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');

            if(!document.startViewTransition || scrollBehavior !== 'smooth'){
                updateActiveButton(e.target);
                filterPizza(filter);
            }

            document.startViewTransition(() => {
                updateActiveButton(e.target);
                filterPizza(filter);
            });
        });
    });

    function updateActiveButton(newButton){
        // Find the previously active button
        // Remove active class
        filterList.querySelector('.active').classList.remove('active');
        // Add active class to new btn
        newButton.classList.add('active');
    }

    function filterPizza(pizzaFilter){
        // Get each pizza category
        pizzaAll.forEach(pizza => {
            pizza.classList.remove('visible');
            // Check category match filter
            if(pizzaFilter === 'all' || pizza.hasAttribute(`data-category-${pizzaFilter}`)){
                // If match, show pizza
                pizza.removeAttribute('hidden');
                pizza.classList.add('visible');
            }else{
                // If not, hide pizza
                pizza.setAttribute('hidden', '');
            }
        });
    }
}



// EMAIL FORM
if(document.querySelector('input[type="email"]#email')){
    const emailInput = document.querySelector('input[type="email"]#email');
    emailInput.addEventListener('change', () => {
        emailInput.classList.toggle('not-empty', emailInput.value !== '');
    });
}

// TEL FORM
if(document.querySelector('input[type="tel"]#tel')){
    const emailInput = document.querySelector('input[type="tel"]#tel');
    emailInput.addEventListener('change', () => {
        emailInput.classList.toggle('not-empty', emailInput.value !== '');
    });
}



// ======== SAVE POSITION FOR THE RETURN OF THE MENU ========
// ======== MAKE THE MENU GO HIDE WHEN SCROLL ========
const navbar = document.getElementById('mainMenu');
var prevScrollPos = window.scrollY;

window.onscroll = () => {
    navbar.classList.toggle('scroll', window.scrollY > 100);

    var currentScrollPos = window.scrollY;
    navbar.classList.toggle('scrolled', prevScrollPos < currentScrollPos);

    prevScrollPos = currentScrollPos;

    // Make the btn scrollToTop appear
    btnScrollToTop.classList.toggle('scroll', window.scrollY > 100);
}



// GET THE MIN & MAX DATE FOR THE INPUT DATE

if(document.querySelector('input[type="date"]#date')){
    // 86'400'000 = 24 * 60 * 60 * 1000
    const tomorrow = new Date(Date.now() + 86_400_000).toLocaleDateString('en-Gb');

    const tomorrowDay = tomorrow.split('/')[0];
    const tomorrowMonth = tomorrow.split('/')[1];
    const tomorrowYear = Number(tomorrow.split('/')[2]);

    const tomorrowFull = tomorrowYear + '-' + tomorrowMonth + '-' + tomorrowDay;
    const aYearAhead = (tomorrowYear + 1) + '-' + tomorrowMonth + '-' + tomorrowDay;

    document.getElementById('date').setAttribute('min', tomorrowFull);
    document.getElementById('date').setAttribute('max', aYearAhead);
}



// ======== MENU NAV ========

const btnsToggleMenu = document.querySelectorAll('[data-btn-toggle-menu]');
let pxToTop = 0;

btnsToggleMenu.forEach(btn => {
    btn.addEventListener('click', function(){
        // Open the menu
        if(!document.body.classList.contains('menu-open')){
            pxToTop = window.scrollY;

            // I don't know why,  but without the setTimeout function the code wouldn't work.
            setTimeout(() => {
                document.getElementById('container').scrollTo({
                    top: pxToTop,
                    left: 0,
                    behavior: "instant",
                });
            }, 1);

        // Close the menu
        }else{
            document.body.classList.toggle('menu-open');

            window.scrollTo({
                top: pxToTop,
                left: 0,
                behavior: "instant",
            });
            setTimeout(() => {
                navbar.classList.remove('scrolled');
            }, 1);
            return false;
        }

        document.body.classList.toggle('menu-open');
    });
});


// ======== ARROW HEADER ========
if(document.getElementById('arrows-hero')){
    document.getElementById('arrows-hero').addEventListener('click', () => {
        document.querySelector('#mainContent main').scrollIntoView();
    });
}
