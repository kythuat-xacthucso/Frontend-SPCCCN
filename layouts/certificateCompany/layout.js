document.addEventListener('DOMContentLoaded', () => {
    const headerMenus = document.querySelectorAll('.nav-link');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const mainContent = document.getElementById('main-content');
    const dropdownIcon = document.getElementById('dropdownIcon');
    const userDropdown = document.getElementById('userDropdown');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');

    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Load Popup và Toast modules đồng bộ
    const loadPopupAndToast = () => {
        return new Promise((resolve) => {
            // Load popup.js
            const popupScript = document.createElement('script');
            popupScript.src = '../../certificateCompany/shared/popup.js';
            popupScript.setAttribute('data-module', 'popup');
            popupScript.onload = () => {
                // Load toast.js after popup.js
                const toastScript = document.createElement('script');
                toastScript.src = '../../certificateCompany/shared/toast.js';
                toastScript.setAttribute('data-module', 'toast');
                toastScript.onload = resolve;
                toastScript.onerror = () => resolve();
                document.body.appendChild(toastScript);
            };
            popupScript.onerror = () => resolve();
            document.body.appendChild(popupScript);
        });
    };

    // Load Popup và Toast trước khi load nội dung
    loadPopupAndToast().then(() => {
        initializeLayout();
    });

    function initializeLayout() {
        function loadContent(menuType, params = {}) {
            const paths = {
                'overview': {
                    page: '../../certificateCompany/index.html',
                    css: '',
                    script: ''
                },
                'product-management': {
                    page: '../../certificateCompany/product/list/list.html',
                    css: '../../certificateCompany/product/list/list.css',
                    script: '../../certificateCompany/product/list/list.js',
                    init: () => {
                        if (typeof initProductList === 'function') {
                            initProductList();
                        }
                    }
                },
                'product-details': {
                    page: '../../certificateCompany/product/detail/detail.html',
                    css: '../../certificateCompany/product/detail/detail.css',
                    script: '../../certificateCompany/product/detail/detail.js',
                    init: () => typeof initProductDetailPage === 'function' && initProductDetailPage(params.productId)
                },
                'product-edit': {
                    page: '../../certificateCompany/product/edit/edit.html',
                    css: '../../certificateCompany/product/edit/edit.css',
                    script: '../../certificateCompany/product/edit/edit.js',
                    init: () => typeof initProductEditPage === 'function' && initProductEditPage(params.productId)
                },
                'product-add-new': {
                    page: '../../certificateCompany/product/add/add.html',
                    css: '../../certificateCompany/product/add/add.css',
                    script: '../../certificateCompany/product/add/add.js',
                    init: () => typeof initProductAddNewPage === 'function' && initProductAddNewPage()
                },
                'resource-management': {
                    page: '',
                    css: '',
                    script: ''
                },
                'nsxkd-approval': {
                    page: '../../certificateCompany/company/list/list.html',
                    css: '../../certificateCompany/company/list/list.css',
                    script: '../../certificateCompany/company/list/list.js',
                    init: () => typeof initCompanyList === 'function' && initCompanyList()
                },
                'company-details': {
                    page: '../../certificateCompany/company/detail/detail.html',
                    css: '../../certificateCompany/company/detail/detail.css',
                    script: '../../certificateCompany/company/detail/detail.js',
                    init: () => typeof initCompanyDetailPage === 'function' && initCompanyDetailPage()
                },
                'company-add-new': {
                    page: '../../certificateCompany/company/add/add.html',
                    css: '../../certificateCompany/company/add/add.css',
                    script: '../../certificateCompany/company/add/add.js',
                    init: () => typeof initCompanyAddNewPage === 'function' && initCompanyAddNewPage()
                },
                'company-edit': {
                    page: '../../certificateCompany/company/edit/edit.html',
                    css: '../../certificateCompany/company/edit/edit.css',
                    script: '../../certificateCompany/company/edit/edit.js',
                    init: () => typeof initCompanyEditPage === 'function' && initCompanyEditPage(params.entityId)
                },
                'nsxkd-management': {
                    page: '../../certificateCompany/nsxkd/list/list.html',
                    css: '../../certificateCompany/nsxkd/list/list.css',
                    script: '../../certificateCompany/nsxkd/list/list.js',
                    init: () => typeof initNsxkdList === 'function' && initNsxkdList()
                },
                'nsxkd-details': {
                    page: '../../certificateCompany/nsxkd/detail/detail.html',
                    css: '../../certificateCompany/nsxkd/detail/detail.css',
                    script: '../../certificateCompany/nsxkd/detail/detail.js',
                    init: () => typeof initNsxkdDetailPage === 'function' && initNsxkdDetailPage()
                },
                'nsxkd-edit': {
                    page: '../../certificateCompany/nsxkd/edit/edit.html',
                    css: '../../certificateCompany/nsxkd/edit/edit.css',
                    script: '../../certificateCompany/nsxkd/edit/edit.js',
                    init: () => typeof initNsxkdEditPage === 'function' && initNsxkdEditPage(params.entityId)
                },
                'internal-users': {
                    page: '../../certificateCompany/user/list/list.html',
                    css: '',
                    script: ''
                }
            };

            const { page: pagePath, css: cssPath, script: scriptPath, init } = paths[menuType] || {};
            if (!pagePath) {
                return;
            }

            fetch(pagePath)
                .then(response => {
                    if (!response.ok) throw new Error(`Không tìm thấy trang: ${pagePath}`);
                    return response.text();
                })
                .then(data => {
                    mainContent.innerHTML = data;
                    document.querySelector('link[data-content-css]')?.remove();
                    document.querySelector('script[data-content-js]')?.remove();

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
                            if (init) init();
                        };
                        script.onerror = () => {};
                        document.body.appendChild(script);
                    }
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    mainContent.innerHTML = '<p>Lỗi khi tải nội dung. Vui lòng thử lại.</p>';
                });
        }

        window.loadContent = loadContent;

        function updateSidebar(menuType) {
            sidebarMenu.innerHTML = window.innerWidth <= 767.98 ? sidebarTemplates.mobile : (sidebarTemplates.desktop[menuType] || '');
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    const menu = link.getAttribute('data-menu');
                    loadContent(menu);
                    if (window.innerWidth <= 767.98) {
                        sidebar.classList.remove('active');
                        overlay.classList.remove('active');
                    }
                });
            });
        }

        const sidebarTemplates = {
            desktop: {
                overview: '',
                traceability: `
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link text-dark sidebar-link active" href="#" data-menu="product-management">Sản phẩm</a>
                        </li>
                    </ul>
                `,
                services: `
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link text-dark sidebar-link active" href="#" data-menu="resource-management">Tài nguyên</a>
                        </li>
                    </ul>
                `,
                administration: `
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link text-dark sidebar-link" href="#" data-menu="nsxkd-approval">Mời NSXKD</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark sidebar-link active" href="#" data-menu="nsxkd-management">NSXKD</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark sidebar-link" href="#" data-menu="internal-users">Nhân viên</a>
                        </li>
                    </ul>
                `
            },
            mobile: `
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link text-dark sidebar-link active" href="#" data-menu="overview">Tổng quan</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark sidebar-link" href="#" data-menu="product-management">Quản lý sản phẩm</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark sidebar-link" href="#" data-menu="resource-management">Quản lý tài nguyên</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark sidebar-link" href="#" data-menu="nsxkd-approval">Mời NSXKD</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark sidebar-link" href="#" data-menu="nsxkd-management">NSXKD</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark sidebar-link" href="#" data-menu="internal-users">Nhân viên</a>
                    </li>
                </ul>
            `
        };

        headerMenus.forEach(menu => {
            menu.addEventListener('click', e => {
                e.preventDefault();
                headerMenus.forEach(m => m.classList.remove('active'));
                menu.classList.add('active');
                const menuType = menu.getAttribute('data-menu');
                updateSidebar(menuType);
                const defaultMenuType = {
                    traceability: 'product-management',
                    services: 'resource-management',
                    administration: 'nsxkd-approval'
                }[menuType] || menuType;
                loadContent(defaultMenuType);
            });
        });

        if (userDropdown && dropdownIcon) {
            userDropdown.addEventListener('show.bs.dropdown', () => {
                dropdownIcon.classList.replace('bi-chevron-down', 'bi-chevron-up');
                userDropdown.classList.add('active');
            });
            userDropdown.addEventListener('hide.bs.dropdown', () => {
                dropdownIcon.classList.replace('bi-chevron-up', 'bi-chevron-down');
                userDropdown.classList.remove('active');
            });
        }

        hamburgerBtn?.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        closeSidebarBtn?.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });

        window.addEventListener('resize', () => {
            const activeHeaderMenu = document.querySelector('.nav-link.active');
            updateSidebar(activeHeaderMenu?.getAttribute('data-menu') || 'overview');
        });

        const defaultHeaderMenu = document.querySelector('.nav-link[data-menu="overview"]');
        if (defaultHeaderMenu) defaultHeaderMenu.classList.add('active');
        updateSidebar('overview');
        loadContent('overview');
    }
});