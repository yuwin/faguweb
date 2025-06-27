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
}); 