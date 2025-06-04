document.addEventListener('DOMContentLoaded', () => {
    const menus = document.querySelectorAll('.nav-link[data-menu]');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const mainContent = document.getElementById('main-content');
    const dropdownIcon = document.getElementById('dropdownIcon');
    const dropdownIconMobile = document.getElementById('dropdownIconMobile');
    const userDropdown = document.getElementById('userDropdown');
    const userDropdownMobile = document.getElementById('userDropdownMobile');
    const spcccnOption = document.getElementById('registerSpcccnOption');
    const spcccnOptionMobile = document.getElementById('registerSpcccnOptionMobile');
    const invitationListOption = document.getElementById('invitationListOption');
    const invitationListOptionMobile = document.getElementById('invitationListOptionMobile');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Sidebar content templates
    const sidebarTemplates = {
        tongquan: `
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Tổng quan</a>
                </li>
            </ul>
        `,
        truyxuat: `
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Sản phẩm</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Mẫu tem</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">In tem</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Kích hoạt</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Bán</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Hủy</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Tra cứu</a>
                </li>
            </ul>
        `,
        quantri: `
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Chủ thể</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Đối tác</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Điểm bán</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Người dùng nội bộ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Lời mời đã gửi</a>
                </li>
            </ul>
        `
    };

    // Main content templates
    const mainTemplates = {
        tongquan: '<h2>Tổng quan</h2><p>Nội dung tổng quan sẽ được tải ở đây.</p>',
        truyxuat: '<h2>Truy xuất</h2><p>Nội dung truy xuất sẽ được tải ở đây.</p>',
        quantri: '<h2>Quản trị</h2><p>Nội dung quản trị sẽ được tải ở đây.</p>'
    };

    // Toggle sidebar on mobile
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('d-none');
    }

    // Close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.add('d-none');
    }

    // Handle hamburger button click
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleSidebar);
    }

    // Handle close button click
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }

    // Handle overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Handle header and sidebar menu clicks
    menus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.preventDefault();
            menus.forEach(m => m.classList.remove('active'));
            menu.classList.add('active');
            const menuType = menu.getAttribute('data-menu');
            sidebarMenu.innerHTML = sidebarTemplates[menuType] || '';
            mainContent.innerHTML = mainTemplates[menuType] || '';
            closeSidebar(); // Close sidebar on mobile after selection
        });
    });

    // Handle dropdown icon toggle
    function handleDropdown(dropdown, icon) {
        if (dropdown && icon) {
            dropdown.addEventListener('show.bs.dropdown', () => {
                icon.classList.remove('bi-chevron-down');
                icon.classList.add('bi-chevron-up');
                dropdown.classList.add('active');
            });
            dropdown.addEventListener('hide.bs.dropdown', () => {
                icon.classList.remove('bi-chevron-up');
                icon.classList.add('bi-chevron-down');
                dropdown.classList.remove('active');
            });
        }
    }

    handleDropdown(userDropdown, dropdownIcon);
    handleDropdown(userDropdownMobile, dropdownIconMobile);

    // Load modal content
    function loadModal(page) {
        let pagePath, scriptPath, cssPath;
        if (page === 'register') {
            pagePath = `../../authenticatedUser/register.html`;
            scriptPath = `../../authenticatedUser/register.js`;
        } else if (page === 'invitationList') {
            pagePath = `../../authenticatedUser/myInvitation/list/invitationList.html`;
            scriptPath = `../../authenticatedUser/myInvitation/list/invitationList.js`;
            cssPath = `../../authenticatedUser/myInvitation/list/invitationList.css`;
        } else {
            console.error('Invalid page for modal:', page);
            return;
        }

        let modalElement = document.getElementById('registerSubjectModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
            // If the modal already exists, reinitialize the invitation list if needed
            if (page === 'invitationList' && window.initInvitationList) {
                window.initInvitationList();
            }
            return;
        }

        fetch(pagePath)
            .then(response => {
                if (!response.ok) throw new Error(`Không tìm thấy modal: ${pagePath}`);
                return response.text();
            })
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
                modalElement = document.getElementById('registerSubjectModal');
                const existingScript = document.querySelector('script[data-modal-js]');
                if (existingScript) existingScript.remove();
                const script = document.createElement('script');
                script.src = scriptPath;
                script.setAttribute('data-modal-js', page);
                script.onload = () => {
                    if (modalElement) {
                        const modal = new bootstrap.Modal(modalElement);
                        modal.show();
                        // Call the initialization function after the modal is shown
                        if (page === 'invitationList' && window.initInvitationList) {
                            window.initInvitationList();
                        } else {
                            console.error('initInvitationList function not found');
                        }
                    } else {
                        console.error('Modal element not found after loading');
                    }
                };
                document.body.appendChild(script);
                if (cssPath) {
                    const existingCss = document.querySelector('link[href="' + cssPath + '"]');
                    if (!existingCss) {
                        const cssLink = document.createElement('link');
                        cssLink.rel = 'stylesheet';
                        cssLink.href = cssPath;
                        document.head.appendChild(cssLink);
                    }
                }
            })
            .catch(error => {
                console.error('Error loading modal:', error);
            });
    }

    // Handle "Đăng ký chủ thể SPCCCN" click
    if (spcccnOption) {
        spcccnOption.addEventListener('click', (e) => {
            e.preventDefault();
            loadModal('register');
            closeSidebar();
        });
    }
    if (spcccnOptionMobile) {
        spcccnOptionMobile.addEventListener('click', (e) => {
            e.preventDefault();
            loadModal('register');
            closeSidebar();
        });
    }

    // Handle "Danh sách lời mời liên kết" click
    if (invitationListOption) {
        invitationListOption.addEventListener('click', (e) => {
            e.preventDefault();
            loadModal('invitationList');
            closeSidebar();
        });
    }
    if (invitationListOptionMobile) {
        invitationListOptionMobile.addEventListener('click', (e) => {
            e.preventDefault();
            loadModal('invitationList');
            closeSidebar();
        });
    }

    // Load default content (Tổng quan)
    sidebarMenu.innerHTML = sidebarTemplates.tongquan;
    mainContent.innerHTML = mainTemplates.tongquan;
});