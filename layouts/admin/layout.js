document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const mainContent = document.getElementById('main-content');
    const dropdownIcon = document.getElementById('dropdownIcon');
    const userDropdown = document.getElementById('userDropdown');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // Load Popup and Toast modules
    const loadSharedModules = () => {
        const existingToastStyle = document.querySelector('link[data-toast-css]');
        if (!existingToastStyle) {
            const toastStyle = document.createElement('link');
            toastStyle.rel = 'stylesheet';
            toastStyle.href = '../../admin/shared/toast.css';
            toastStyle.setAttribute('data-toast-css', 'toast');
            document.head.appendChild(toastStyle);
        }

        const existingPopupScript = document.querySelector('script[data-popup-js]');
        if (!existingPopupScript) {
            const popupScript = document.createElement('script');
            popupScript.src = '../../admin/shared/popup.js';
            popupScript.setAttribute('data-popup-js', 'popup');
            document.body.appendChild(popupScript);
        }

        const existingToastScript = document.querySelector('script[data-toast-js]');
        if (!existingToastScript) {
            const toastScript = document.createElement('script');
            toastScript.src = '../../admin/shared/toast.js';
            toastScript.setAttribute('data-toast-js', 'toast');
            document.body.appendChild(toastScript);
        }
    };

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    function closeSidebarAndOverlay() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    overlay.addEventListener('click', closeSidebarAndOverlay);

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebarAndOverlay);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const menuType = link.getAttribute('data-menu');
            loadContent(menuType);
            if (window.innerWidth < 768) closeSidebarAndOverlay();
        });
    });

    if (userDropdown) {
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

    function loadContent(menuType, params = {}) {
        let pagePath, cssPath, scriptPath;

        switch (menuType) {
            case 'home':
                pagePath = '../../admin/index.html';
                cssPath = '';
                scriptPath = '';
                break;
            case 'service-packages':
                pagePath = '../../admin/service/list/list.html';
                cssPath = '';
                scriptPath = '../../admin/service/list/list.js';
                break;
            case 'subject-approval':
                pagePath = '../../admin/approvalCompany/list/list.html';
                cssPath = '../../admin/approvalCompany/list/list.css';
                scriptPath = '../../admin/approvalCompany/list/list.js';
                break;
            case 'subject-details':
                pagePath = '../../admin/approvalCompany/detail/detail.html';
                cssPath = '../../admin/approvalCompany/detail/detail.css';
                scriptPath = '../../admin/approvalCompany/detail/detail.js';
                break;
            case 'resource-monitoring':
                pagePath = '';
                cssPath = '';
                scriptPath = '';
                break;
            case 'payment-management':
                pagePath = '';
                cssPath = '';
                scriptPath = '';
                break;
            case 'company-management':
                pagePath = '../../admin/company/list/list.html';
                cssPath = '../../admin/company/list/list.css';
                scriptPath = '../../admin/company/list/list.js';
                break;
            case 'company-details':
                pagePath = '../../admin/company/detail/detail.html';
                cssPath = '../../admin/company/detail/detail.css';
                scriptPath = '../../admin/company/detail/detail.js';
                break;
            case 'company-edit':
                pagePath = '../../admin/company/edit/edit.html';
                cssPath = '../../admin/company/edit/edit.css';
                scriptPath = '../../admin/company/edit/edit.js';
                break;
            case 'company-searchUser':
                pagePath = '../../admin/company/searchUser/searchUser.html';
                cssPath = '../../admin/company/searchUser/searchUser.css';
                scriptPath = '../../admin/company/searchUser/searchUser.js';
                break;
            case 'service-add-new':
                pagePath = '../../admin/service/add/add.html';
                cssPath = '';
                scriptPath = '../../admin/service/add/add.js';
                break;
            case 'service-details':
                pagePath = '../../admin/service/detail/detail.html';
                cssPath = '';
                scriptPath = '../../admin/service/detail/detail.js';
                break;
            case 'service-edit':
                pagePath = '../../admin/service/edit/edit.html';
                cssPath = '';
                scriptPath = '../../admin/service/edit/edit.js';
                break;
            case 'subject-add-new':
                pagePath = '../../admin/approvalCompany/add/add.html';
                cssPath = '../../admin/approvalCompany/add/add.css';
                scriptPath = '../../admin/approvalCompany/add/add.js';
                break;
            default:
                console.error('Unknown menu type:', menuType);
                return;
        }

        // Handle company-searchUser as a popup
        if (menuType === 'company-searchUser') {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.classList.add('modal-backdrop', 'fade', 'show');
            overlay.style.opacity = '0.5';
            overlay.id = 'searchUserOverlay';
            document.body.appendChild(overlay);

            // Create container for popup
            const popupContainer = document.createElement('div');
            popupContainer.id = 'searchUserPopupContainer';
            document.body.appendChild(popupContainer);

            fetch(pagePath)
                .then(response => {
                    if (!response.ok) throw new Error(`Không tìm thấy trang: ${pagePath}`);
                    return response.text();
                })
                .then(data => {
                    popupContainer.innerHTML = data;

                    // Load CSS
                    const existingStyle = document.querySelector('link[data-content-css]');
                    if (existingStyle) existingStyle.remove();
                    if (cssPath) {
                        const style = document.createElement('link');
                        style.rel = 'stylesheet';
                        style.href = cssPath;
                        style.setAttribute('data-content-css', menuType);
                        document.head.appendChild(style);
                    }

                    // Load Script
                    const existingScript = document.querySelector('script[data-content-js]');
                    if (existingScript) existingScript.remove();
                    if (scriptPath) {
                        const script = document.createElement('script');
                        script.src = scriptPath;
                        script.setAttribute('data-content-js', menuType);
                        script.onload = () => {
                            if (typeof initSearchUserPage === 'function') {
                                initSearchUserPage(params.entityId);
                                // Show the modal
                                const searchUserModal = document.getElementById('searchUserModal');
                                if (searchUserModal) {
                                    const modalInstance = new bootstrap.Modal(searchUserModal);
                                    modalInstance.show();
                                } else {
                                    console.error('Search user modal not found in the DOM');
                                }
                            }
                        };
                        document.body.appendChild(script);
                    }
                })
                .catch(error => {
                    console.error('Error loading popup:', error);
                    popupContainer.innerHTML = '<p>Lỗi khi tải popup. Vui lòng thử lại.</p>';
                });
        } else {
            // Existing logic for other pages
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
                            if (window.innerWidth < 768) closeSidebarAndOverlay();

                            if (menuType === 'subject-approval' && typeof initProfileList === 'function') {
                                initProfileList();
                            } else if (menuType === 'subject-details' && typeof initDetailPage === 'function') {
                                initDetailPage(params.profileId);
                            } else if (menuType === 'company-management' && typeof initCompanyList === 'function') {
                                initCompanyList();
                            } else if (menuType === 'company-details' && typeof initCompanyDetailPage === 'function') {
                                initCompanyDetailPage(params.entityId);
                            } else if (menuType === 'company-edit' && typeof initCompanyEditPage === 'function') {
                                initCompanyEditPage(params.entityId);
                            } else if (menuType === 'service-packages' && typeof initServiceList === 'function') {
                                initServiceList();
                            } else if (menuType === 'service-details' && typeof initServiceDetailPage === 'function') {
                                initServiceDetailPage(params.serviceId);
                            } else if (menuType === 'service-edit' && typeof initServiceEditPage === 'function') {
                                initServiceEditPage(params.serviceId);
                            } else if (menuType === 'subject-add-new' && typeof initAddNewPage === 'function') {
                                initAddNewPage(params.profileId);
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
    }

    window.loadContent = loadContent;
    loadSharedModules();

    const defaultLink = document.querySelector('.sidebar-link[data-menu="home"]');
    if (defaultLink) {
        defaultLink.classList.add('active');
        loadContent('home');
    }

    if (window.innerWidth < 768) closeSidebarAndOverlay();
});