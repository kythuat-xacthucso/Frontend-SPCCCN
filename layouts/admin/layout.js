document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const mainContent = document.getElementById('main-content');
    const dropdownIcon = document.getElementById('dropdownIcon');
    const userDropdown = document.getElementById('userDropdown');

    // Handle sidebar menu clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all sidebar links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            // Load content dynamically
            const menuType = link.getAttribute('data-menu');
            loadContent(menuType);
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

    // Function to load content dynamically
    function loadContent(menuType, params = {}) {
        let pagePath, cssPath, scriptPath;

        // Define paths based on menu type
        switch (menuType) {
            case 'home':
                pagePath = '../../admin/index.html'; // Path to home.html
                cssPath = '';  // Path to home.css
                scriptPath = ''; // Path to home.js
                break;
            case 'service-packages':
                pagePath = ''; // Path to service-packages.html
                cssPath = '';  // Path to service-packages.css
                scriptPath = ''; // Path to service-packages.js
                break;
            case 'subject-approval':
                pagePath = '../../admin/approvalCompany/list/list.html'; // Path to subject-approval.html
                cssPath = '';  // Path to subject-approval.css
                scriptPath = '../../admin/approvalCompany/list/list.js'; // Path to subject-approval.js
                break;
            case 'subject-details':
                pagePath = '../../admin/approvalCompany/detail/detail.html'; // Path to detail.html
                cssPath = '';  // Path to detail.css
                scriptPath = '../../admin/approvalCompany/detail/detail.js'; // Path to detail.js
                break;
            case 'resource-monitoring':
                pagePath = ''; // Path to resource-monitoring.html
                cssPath = '';  // Path to resource-monitoring.css
                scriptPath = ''; // Path to resource-monitoring.js
                break;
            case 'payment-management':
                pagePath = ''; // Path to payment-management.html
                cssPath = '';  // Path to payment-management.css
                scriptPath = ''; // Path to payment-management.js
                break;
            case 'company-management':
                pagePath = '../../admin/company/list/list.html'; // Path to company-management.html
                cssPath = '';  // Path to company-management.css
                scriptPath = '../../admin/company/list/list.js'; // Path to company-management.js
                break;
            case 'company-details':
                pagePath = '../../admin/company/detail/detail.html'; // Path to detail.html
                cssPath = '';  // Path to detail.css
                scriptPath = '../../admin/company/detail/detail.js'; // Path to detail.js
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
                    script.onload = () => {
                        // Call initialization functions based on menuType
                        if (menuType === 'subject-approval' && typeof initProfileList === 'function') {
                            initProfileList();
                        } else if (menuType === 'subject-details' && typeof initDetailPage === 'function') {
                            initDetailPage(params.profileId); // Pass profileId to detail page
                        } else if (menuType === 'company-management' && typeof initCompanyList === 'function') {
                            initCompanyList();
                        } else if (menuType === 'company-details' && typeof initCompanyDetailPage === 'function') {
                            initCompanyDetailPage(params.entityId); // Pass entityId to detail page
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

    // Expose loadContent globally so it can be called from other scripts
    window.loadContent = loadContent;

    // Load default content (Home)
    const defaultLink = document.querySelector('.sidebar-link[data-menu="home"]');
    if (defaultLink) {
        defaultLink.classList.add('active');
        loadContent('home');
    }
});