document.addEventListener('DOMContentLoaded', () => {
    const headerMenus = document.querySelectorAll('.nav-link');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const mainContent = document.getElementById('main-content');
    const dropdownIcon = document.getElementById('dropdownIcon');
    const userDropdown = document.getElementById('userDropdown');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.querySelector('.sidebar');

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Sidebar content templates
    const sidebarTemplates = {
        desktop: {
            overview: '',
            traceability: `
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link text-dark fs-6 sidebar-link active" href="#" data-menu="product-management">Quản lý sản phẩm</a>
                    </li>
                </ul>
            `,
            services: `
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link text-dark fs-6 sidebar-link active" href="#" data-menu="resource-management">Quản lý tài nguyên</a>
                    </li>
                </ul>
            `,
            administration: `
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link text-dark fs-6 sidebar-link active" href="#" data-menu="nsxkd-approval">Mời NSXKD</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark fs-6 sidebar-link" href="#" data-menu="internal-users">Nhân viên</a>
                    </li>
                </ul>
            `
        },
        mobile: `
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-dark fs-6 sidebar-link active" href="#" data-menu="overview">Tổng quan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fs-6 sidebar-link" href="#" data-menu="product-management">Quản lý sản phẩm</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fs-6 sidebar-link" href="#" data-menu="resource-management">Quản lý tài nguyên</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fs-6 sidebar-link" href="#" data-menu="nsxkd-approval">Mời NSXKD</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fs-6 sidebar-link" href="#" data-menu="internal-users">Nhân viên</a>
                </li>
            </ul>
        `
    };

    // Function to load content dynamically
    function loadContent(menuType, params = {}) {
        let pagePath, cssPath, scriptPath;

        switch (menuType) {
            case 'overview':
                pagePath = '../../certificateCompany/index.html';
                cssPath = '';
                scriptPath = '';
                break;
            case 'product-management':
                pagePath = '../../certificateCompany/product/list/list.html';
                cssPath = '../../certificateCompany/product/list/list.css';
                scriptPath = '../../certificateCompany/product/list/list.js';
                break;
            case 'product-details':
                pagePath = '../../certificateCompany/product/detail/detail.html';
                cssPath = '';
                scriptPath = '../../certificateCompany/product/detail/detail.js';
                break;
            case 'product-edit':
                pagePath = '../../certificateCompany/product/edit/edit.html';
                cssPath = '';
                scriptPath = '../../certificateCompany/product/edit/edit.js';
                break;
            case 'product-add-new':
                pagePath = '../../certificateCompany/product/add/add.html';
                cssPath = '';
                scriptPath = '../../certificateCompany/product/add/add.js';
                break;
            case 'resource-management':
                pagePath = '';
                cssPath = '';
                scriptPath = '';
                break;
            case 'nsxkd-approval':
                pagePath = '../../certificateCompany/company/list/list.html';
                cssPath = '../../certificateCompany/company/list/list.css';
                scriptPath = '../../certificateCompany/company/list/list.js';
                break;
            case 'company-details':
                pagePath = '../../certificateCompany/company/detail/detail.html';
                cssPath = '';
                scriptPath = '../../certificateCompany/company/detail/detail.js';
                break;
            case 'company-add-new':
                pagePath = '../../certificateCompany/company/add/add.html';
                cssPath = '';
                scriptPath = '../../certificateCompany/company/add/add.js';
                break;
            case 'internal-users':
                pagePath = '../../certificateCompany/user/list/list.html';
                cssPath = '';
                scriptPath = '';
                break;
            default:
                console.error('Unknown menu type:', menuType);
                return;
        }

        fetch(pagePath)
            .then(response => {
                if (!response.ok) throw new Error(`Không tìm thấy trang: ${pagePath}`);
                return response.text();
            })
            .then(data => {
                mainContent.innerHTML = data;

                const existingStyle = document.querySelector('link[data-content-css]');
                if (existingStyle) existingStyle.remove();
                const existingScript = document.querySelector('script[data-content-js]');
                if (existingScript) existingScript.remove();

                if (cssPath) {
                    const style = document.createElement('link');
                    style.rel = 'stylesheet';
                    style.href = cssPath;
                    style.setAttribute('data-content-css', menuType);
                    document.head.appendChild(style);
                }

                if (scriptPath) {
                    const script = document.createElement('script');
                    script.src = scriptPath;
                    script.setAttribute('data-content-js', menuType);
                    script.onload = () => {
                        if (menuType === 'product-management' && typeof initProductList === 'function') {
                            initProductList();
                        } else if (menuType === 'product-details' && typeof initProductDetailPage === 'function') {
                            initProductDetailPage(params.productId);
                        } else if (menuType === 'product-edit' && typeof initProductEditPage === 'function') {
                            initProductEditPage(params.productId);
                        } else if (menuType === 'product-add-new' && typeof initProductAddNewPage === 'function') {
                            initProductAddNewPage();
                        } else if (menuType === 'nsxkd-approval' && typeof initCompanyList === 'function') {
                            initCompanyList();
                        } else if (menuType === 'company-details' && typeof initCompanyDetailPage === 'function') {
                            initCompanyDetailPage(params.entityId);
                        } else if (menuType === 'company-add-new' && typeof initCompanyAddNewPage === 'function') {
                            initCompanyAddNewPage();
                        }
                    };
                    document.body.appendChild(script);
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
                mainContent.innerHTML = '<p>Lỗi khi tải nội dung. Vui lòng thử lại.</p>';
            });
    }

    // Expose loadContent globally
    window.loadContent = loadContent;

    // Function to update sidebar based on device
    function updateSidebar(menuType) {
        if (window.innerWidth <= 767.98) {
            sidebarMenu.innerHTML = sidebarTemplates.mobile;
        } else {
            sidebarMenu.innerHTML = sidebarTemplates.desktop[menuType] || '';
        }

        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const sidebarMenuType = link.getAttribute('data-menu');
                loadContent(sidebarMenuType);
                if (window.innerWidth <= 767.98) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                }
            });
        });
    }

    // Handle header menu clicks (desktop only)
    headerMenus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.preventDefault();
            headerMenus.forEach(m => m.classList.remove('active'));
            menu.classList.add('active');
            const menuType = menu.getAttribute('data-menu');
            updateSidebar(menuType);

            let defaultMenuType = menuType;
            if (menuType === 'traceability') {
                defaultMenuType = 'product-management';
            } else if (menuType === 'services') {
                defaultMenuType = 'resource-management';
            } else if (menuType === 'administration') {
                defaultMenuType = 'nsxkd-approval';
            }
            loadContent(defaultMenuType);
        });
    });

    // Handle dropdown icon toggle
    if (userDropdown && dropdownIcon) {
        userDropdown.addEventListener('show.bs.dropdown', () => {
            dropdownIcon.classList.remove('bi-chevron-down');
            dropdownIcon.classList.add('bi-chevron-up');
            userDropdown.classList.add('active');
        });
        userDropdown.addEventListener('hide.bs.dropdown', () => {
            dropdownIcon.classList.remove('bi-chevron-up');
            dropdownIcon.classList.add('bi-chevron-down');
            userDropdown.classList.remove('active');
        });
    }

    // Handle hamburger menu and sidebar toggle
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Handle window resize to update sidebar
    window.addEventListener('resize', () => {
        const activeHeaderMenu = document.querySelector('.nav-link.active');
        const menuType = activeHeaderMenu ? activeHeaderMenu.getAttribute('data-menu') : 'overview';
        updateSidebar(menuType);
    });

    // Load default content (Tổng quan)
    const defaultHeaderMenu = document.querySelector('.nav-link[data-menu="overview"]');
    if (defaultHeaderMenu) {
        defaultHeaderMenu.classList.add('active');
    }
    updateSidebar('overview');
    loadContent('overview');
});