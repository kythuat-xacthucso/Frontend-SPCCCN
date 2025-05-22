document.addEventListener('DOMContentLoaded', () => {
    const headerMenus = document.querySelectorAll('.nav-link');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const mainContent = document.getElementById('main-content');
    const dropdownIcon = document.getElementById('dropdownIcon');
    const userDropdown = document.getElementById('userDropdown');

    // Sidebar content templates
    const sidebarTemplates = {
        overview: '',
        traceability: `
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-dark fs-6 sidebar-link active" href="#" data-menu="product-management">Quản lý sản phẩm</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fs-6 sidebar-link" href="#" data-menu="media-management">Quản lý truyền thông</a>
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
                    <a class="nav-link text-dark fs-6 sidebar-link active" href="#" data-menu="nsxkd-approval">Duyệt NSXKD</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fs-6 sidebar-link" href="#" data-menu="internal-users">Người nội bộ</a>
                </li>
            </ul>
        `
    };

    // Function to load content dynamically
    function loadContent(menuType) {
        let pagePath, cssPath, scriptPath;

        // Define paths based on menu type (to be filled by user except for overview)
        switch (menuType) {
            case 'overview':
                pagePath = '../../certificateCompany/index.html';
                cssPath = '';  // Path to overview.css
                scriptPath = ''; // Path to overview.js
                break;
            case 'product-management':
                pagePath = '../../certificateCompany/product/list/list.html'; // Path to product-management.html
                cssPath = '';  // Path to product-management.css
                scriptPath = ''; // Path to product-management.js
                break;
            case 'media-management':
                pagePath = ''; // Path to media-management.html
                cssPath = '';  // Path to media-management.css
                scriptPath = ''; // Path to media-management.js
                break;
            case 'resource-management':
                pagePath = ''; // Path to resource-management.html
                cssPath = '';  // Path to resource-management.css
                scriptPath = ''; // Path to resource-management.js
                break;
            case 'nsxkd-approval':
                pagePath = '../../certificateCompany/company/list/list.html'; // Path to nsxkd-approval.html
                cssPath = '';  // Path to nsxkd-approval.css
                scriptPath = ''; // Path to nsxkd-approval.js
                break;
            case 'internal-users':
                pagePath = '../../certificateCompany/user/list/list.html'; // Path to internal-users.html
                cssPath = '';  // Path to internal-users.css
                scriptPath = ''; // Path to internal-users.js
                break;
            default:
                console.error('Unknown menu type:', menuType);
                return;
        }

        // Fetch HTML content
        fetch(pagePath)
            .then(response => {
                if (!response.ok) throw new Error(`Không tìm thấy trang: ${pagePath}`);
                return response.text();
            })
            .then(data => {
                // Update main content
                mainContent.innerHTML = data;

                // Remove existing CSS and JS to avoid conflicts
                const existingStyle = document.querySelector('link[data-content-css]');
                if (existingStyle) existingStyle.remove();
                const existingScript = document.querySelector('script[data-content-js]');
                if (existingScript) existingScript.remove();

                // Add CSS if provided
                if (cssPath) {
                    const style = document.createElement('link');
                    style.rel = 'stylesheet';
                    style.href = cssPath;
                    style.setAttribute('data-content-css', menuType);
                    document.head.appendChild(style);
                }

                // Add JS if provided
                if (scriptPath) {
                    const script = document.createElement('script');
                    script.src = scriptPath;
                    script.setAttribute('data-content-js', menuType);
                    document.body.appendChild(script);
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
                mainContent.innerHTML = '<p>Lỗi khi tải nội dung. Vui lòng thử lại.</p>';
            });
    }

    // Handle header menu clicks
    headerMenus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all header menu items
            headerMenus.forEach(m => m.classList.remove('active'));
            // Add active class to clicked menu
            menu.classList.add('active');
            // Update sidebar and main content
            const menuType = menu.getAttribute('data-menu');
            sidebarMenu.innerHTML = sidebarTemplates[menuType] || '';
            
            // Load default content based on header menu
            let defaultMenuType = menuType;
            if (menuType === 'traceability') {
                defaultMenuType = 'product-management';
            } else if (menuType === 'services') {
                defaultMenuType = 'resource-management';
            } else if (menuType === 'administration') {
                defaultMenuType = 'nsxkd-approval';
            }
            loadContent(defaultMenuType);

            // Add event listeners to sidebar links
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Remove active class from all sidebar links
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    link.classList.add('active');
                    // Load content
                    const sidebarMenuType = link.getAttribute('data-menu');
                    loadContent(sidebarMenuType);
                });
            });
        });
    });

    // Handle dropdown icon toggle and active state
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

    // Load default content (Tổng quan)
    const defaultHeaderMenu = document.querySelector('.nav-link[data-menu="overview"]');
    if (defaultHeaderMenu) {
        defaultHeaderMenu.classList.add('active');
        sidebarMenu.innerHTML = sidebarTemplates.overview;
        loadContent('overview');
    }
});