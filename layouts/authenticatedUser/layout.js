document.addEventListener('DOMContentLoaded', () => {
    const menus = document.querySelectorAll('.nav-link');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const mainContent = document.getElementById('main-content');
    const dropdownIcon = document.getElementById('dropdownIcon');
    const userDropdown = document.getElementById('userDropdown');
    const spcccnOption = document.getElementById('registerSpcccnOption');

    // Sidebar content templates
    const sidebarTemplates = {
        tongquan: '',
        truyxuat: `
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Sản phẩm</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Tem và mã</a>
                    <ul class="nav flex-column ps-3">
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Mẫu tem</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">In tem</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Nghiệp vụ</a>
                    <ul class="nav flex-column ps-3">
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Kích hoạt</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Bán</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Hủy</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Tra cứu</a>
                        </li>
                    </ul>
                </li>
            </ul>
        `,
        quantri: `
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Chủ thể</a>
                    <ul class="nav flex-column ps-3">
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Chủ thể</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Đối tác</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Điểm bán</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark fw-medium fs-6" href="#">Người dùng</a>
                    <ul class="nav flex-column ps-3">
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Người dùng nội bộ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark fs-6" href="#">Lời mời đã gửi</a>
                        </li>
                    </ul>
                </li>
            </ul>
        `
    };

    // Main content templates (simplified for demo)
    const mainTemplates = {
        tongquan: '<h2>Tổng quan</h2><p>Nội dung tổng quan sẽ được tải ở đây.</p>',
        truyxuat: '<h2>Truy xuất</h2><p>Nội dung truy xuất sẽ được tải ở đây.</p>',
        quantri: '<h2>Quản trị</h2><p>Nội dung quản trị sẽ được tải ở đây.</p>'
    };

    // Handle header menu clicks
    menus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all menu items
            menus.forEach(m => m.classList.remove('active'));
            // Add active class to clicked menu
            menu.classList.add('active');
            // Update sidebar and main content
            const menuType = menu.getAttribute('data-menu');
            sidebarMenu.innerHTML = sidebarTemplates[menuType] || '';
            mainContent.innerHTML = mainTemplates[menuType] || '';
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

    // Function to load modal content (adapted from loadPage)
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

    // Load default content (Tổng quan)
    sidebarMenu.innerHTML = sidebarTemplates.tongquan;
    mainContent.innerHTML = mainTemplates.tongquan;
});