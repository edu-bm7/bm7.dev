import * as Turbo from "@hotwired/turbo"
import '../../lib/css/bootstrap.min.css'
import '../css/style.css'
import '../img/fdf_img.png'
import '../img/fdfgen.png'
import '../img/photo2_bw.jpg'
import '../img/minishell_img.png'
import '../img/philo_img.png'
import '../img/thumbnail.png'
import '../pdf/CV_Eduardo.pdf'
import '../pdf/CV_Eduardo_English.pdf'
import '../../lib/js/bootstrap.bundle.min.js'

const pagesMap = [
    'about.html',
    'fdf.html',
    'index.html',
    'minishell.html',
    'philosophers.html',
    'projects.html',
]

function animateOut(frame) {
    return new Promise((resolve) => {
        frame.classList.add('fadeOut');

        function handleAnimationEnd(){
                frame.classList.remove('fadeOut');
                frame.removeEventListener('animationend', handleAnimationEnd);
                resolve();
            }
        frame.addEventListener('animationend', handleAnimationEnd, {once: true});
    });
}

document.addEventListener("turbo:before-frame-render", async (event) => {
    if (event.target.id === 'main_content' || event.target.id === 'main_content_pt') {
        event.preventDefault();

        await animateOut(event.target);
        event.target.classList.add('fadeIn');

        event.detail.resume();
    }
});

function handleAnimationEnd(event) {
    if (event.animationName === 'fadeIn') {
        event.target.classList.remove('fadeIn');
    }
}

const englishContent = document.getElementById('main_content');
const portugueseContent = document.getElementById('main_content_pt');

if (englishContent) {
    englishContent.addEventListener('animationend', handleAnimationEnd);
}

if (portugueseContent) {
    portugueseContent.addEventListener('animationend', handleAnimationEnd);
}

// Add 'active' class to Navigation bar
function updateActiveNavLink(contentId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' class to the nav link that matches the current page
    let currentPage = window.location.pathname.split('/').pop().replace('.html', ''); // Get the current page name from URL
    if (currentPage === '') {
        currentPage = 'index'; // Default to 'index' for the root path
    }
    const activeLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function updateSvgLink() {
    const translateButton = document.querySelector('#translateButton');
    const translateButtonPt = document.querySelector('#translateButtonPt');
    const currentPath = window.location.pathname.split('/');
    const pageName = currentPath.pop();

    // Update the href based on the current URL

    if (currentPath.includes('pt-BR')) {
        if (pagesMap.includes(pageName)) {

            translateButton.href = `../${pageName}`;// link to the English version
            translateButtonPt.href = `${pageName}`
        }
        else if (pageName === '') {
            translateButton.href = '../';
            translateButtonPt.href = './';
        }
    } else {
        if (pagesMap.includes(pageName)) {
            translateButton.href = `${pageName}`;// link to the English version
            translateButtonPt.href = `pt-BR/${pageName}`;
        }
        else if (pageName === '') {
            translateButton.href = `/`;
            translateButtonPt.href = `pt-BR/`;
        }
    }
}

document.addEventListener('turbo:load', function () {
    updateActiveNavLink();
    updateSvgLink();
});
document.addEventListener('turbo:frame-render', function () {
    updateActiveNavLink();
    updateSvgLink();
});

document.addEventListener("DOMContentLoaded", function() {
    updateActiveNavLink();
});
