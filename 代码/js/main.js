// 自定义光标
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 轮播图功能
const slides = [
    {
        image: 'images/slide1.jpg',
        title: 'LIU LIAN',
        subtitle: '在琴弦上雕刻时光'
    },
    {
        image: 'images/slide2.jpg',
        title: '音乐创作',
        subtitle: '用音符描绘世界'
    },
    {
        image: 'images/slide3.jpg',
        title: '现场演出',
        subtitle: '让音乐在现场绽放'
    }
];

let currentSlide = 0;
const sliderContainer = document.querySelector('.slider-container');
const prevButton = document.querySelector('.prev-slide');
const nextButton = document.querySelector('.next-slide');

function createSlides() {
    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
        slideElement.style.backgroundImage = `url(${slide.image})`;
        
        const content = document.createElement('div');
        content.className = 'slide-content';
        content.innerHTML = `
            <h1 class="main-title">${slide.title}</h1>
            <p class="subtitle">${slide.subtitle}</p>
        `;
        
        slideElement.appendChild(content);
        sliderContainer.appendChild(slideElement);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// 自动轮播
let slideInterval = setInterval(nextSlide, 8000);

// 鼠标悬停时暂停轮播
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 8000);
});

// 按钮控制
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// 初始化轮播图
createSlides();

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
}); 