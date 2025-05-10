document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const mainContent = document.getElementById('main-content');
    const dropdownIcon = document.getElementById('dropdownIcon');
    const userDropdown = document.getElementById('userDropdown');
    const spcccnOption = document.getElementById('registerSpcccnOption');

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
    function loadContent(menuType) {
        let pagePath, cssPath, scriptPath;

        // Define paths based on menu type (to be filled by user)
        switch (menuType) {
            case 'home':
                pagePath = '../../certificateCompany/index.html'; // Path to home.html
                cssPath = '';  // Path to home.css
                scriptPath = ''; // Path to home.js
                break;
            case 'product-management':
                pagePath = ''; // Path to product-management.html
                cssPath = '';  // Path to product-management.css
                scriptPath = ''; // Path to product-management.js
                break;
            case 'nsxkd-approval':
                pagePath = ''; // Path to nsxkd-approval.html
                cssPath = '';  // Path to nsxkd-approval.css
                scriptPath = ''; // Path to nsxkd-approval.js
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
            case 'internal-users':
                pagePath = ''; // Path to internal-users.html
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

    // Function to load modal content
    function loadModal(page) {
        let pagePath, scriptPath;

        // Define paths for the modal
        if (page === 'register') {
            pagePath = `../../authenticatedUser/${page}.html`;
            scriptPath = `../../authenticatedUser/${page}.js`;
        } else {
            console.error('Invalid page for modal:', page);
            return;
        }

        // Check if modal already exists to avoid duplicates
        let modalElement = document.getElementById('registerSubjectModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
            return;
        }

        // Fetch modal content
        fetch(pagePath)
            .then(response => {
                if (!response.ok) throw new Error(`Không tìm thấy modal: ${pagePath}`);
                return response.text();
            })
            .then(data => {
                // Append modal HTML to body
                document.body.insertAdjacentHTML('beforeend', data);
                modalElement = document.getElementById('registerSubjectModal');

                // Remove any existing modal-specific JS to avoid conflicts
                const existingScript = document.querySelector('script[data-modal-js]');
                if (existingScript) existingScript.remove();

                // Add JS for the modal
                const script = document.createElement('script');
                script.src = scriptPath;
                script.setAttribute('data-modal-js', page);
                document.body.appendChild(script);

                // Show the modal
                if (modalElement) {
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                } else {
                    console.error('Modal element not found after loading');
                }
            })
            .catch(error => {
                console.error('Error loading modal:', error);
            });
    }

    // Handle "Đăng ký chủ thể SPCCCN" click to show modal
    if (spcccnOption) {
        spcccnOption.addEventListener('click', (e) => {
            e.preventDefault();
            loadModal('register');
        });
    } else {
        console.error('SPCCCN option not found in the DOM');
    }

    // Load default content (Home)
    const defaultLink = document.querySelector('.sidebar-link[data-menu="home"]');
    if (defaultLink) {
        defaultLink.classList.add('active');
        loadContent('home');
    }
});