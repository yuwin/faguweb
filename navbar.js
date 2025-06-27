// 載入導航欄
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const navbarHtml = await response.text();
        
        // 插入導航欄到頁面
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            navbarContainer.innerHTML = navbarHtml;
            
            // 設置當前頁面的active狀態
            setActiveNavItem();
        }
    } catch (error) {
        console.error('載入導航欄失敗:', error);
    }
}

// 設置當前頁面的active狀態
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // 檢查是否為當前頁面
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        
        // 如果是首頁且當前頁面是index.html或空
        if (currentPage === 'index.html' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });
}

// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();

    // 載入 carouselConfig.js
    const script = document.createElement('script');
    script.src = 'carouselConfig.js';
    document.body.appendChild(script);

    script.onload = function() {
        if (window.carouselConfig) {
            renderCarousel('worksCarousel', window.carouselConfig.works);
            renderCarousel('researchCarousel', window.carouselConfig.research);
            renderCarousel('citationCarousel', window.carouselConfig.citation);
        }
    };

    // 返回頂端按鈕
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.title = '返回頂端';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.display = 'none';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
});

function renderCarousel(carouselId, items) {
    const carousel = document.getElementById(carouselId);
    if (!carousel || !items || !items.length) return;
    let inner = '';
    items.forEach((item, idx) => {
        inner += `
            <div class="carousel-item${idx === 0 ? ' active' : ''}">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-4 text-center">
                        <img src="${item.img}" class="img-fluid shadow book-cover" alt="${item.title}">
                    </div>
                    <div class="col-md-6">
                        <h4 class="fw-bold mb-2">${item.title}</h4>
                        <div class="mb-2">${item.subtitle || ''}</div>
                        <div class="mb-2">${item.pubinfo || ''}</div>
                        <div class="mb-2">${item.date || ''}</div>
                    </div>
                </div>
            </div>
        `;
    });
    carousel.innerHTML = `
        <div class="carousel-inner">
            ${inner}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon bg-white rounded-circle shadow" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon bg-white rounded-circle shadow" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    `;
} 