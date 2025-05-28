(function () {
    function initProductList() {
        const productTableBody = document.getElementById('productTableBody');
        const cardList = document.querySelector('.card-list');
        const searchProductName = document.getElementById('searchProductName');
        const searchProductGroup = document.getElementById('searchProductGroup');
        const searchStatus = document.getElementById('searchStatus');
        const searchBtn = document.getElementById('searchBtn');
        const clearFilterBtn = document.getElementById('clearFilterBtn');
        const addNewBtn = document.getElementById('addNewBtn');
        const pagination = document.getElementById('pagination');
        const resultCount = document.getElementById('resultCount');
        const itemsPerPageSelect = document.getElementById('itemsPerPage');

        // Sample data
        const products = [
            { id: 1, name: 'SP điện TTCB không điện NVTD 3', group: 'Điện tử', creator: 'PhongDD', createdTime: '2025-05-07 14:27', status: 'Hoạt động' },
            { id: 2, name: 'SP điện TTCB không điện NVTD 2', group: 'Điện tử', creator: 'PhongDD', createdTime: '2025-05-07 14:25', status: 'Hoạt động' },
            { id: 3, name: 'SP điện TTCB không điện NVTD 1', group: 'Điện tử', creator: 'PhongDD', createdTime: '2025-05-07 14:25', status: 'Hoạt động' },
            { id: 4, name: 'SP điện NVTD không điện TTCB', group: 'Điện tử', creator: 'PhongDD', createdTime: '2025-05-07 14:23', status: 'Khóa' },
            { id: 5, name: 'Sp không điện NVTD và TTCB', group: 'Điện tử', creator: 'PhongDD', createdTime: '2025-05-07 14:23', status: 'Hoạt động' },
            { id: 6, name: 'Kombucha Hồng trà - Đào tuyết', group: 'Đồ uống', creator: 'PhongDD', createdTime: '2025-05-06 18:31', status: 'Hoạt động' },
            { id: 7, name: 'Kombucha sorn trà xanh', group: 'Đồ uống', creator: 'PhongDD', createdTime: '2025-01-03 15:58', status: 'Hoạt động' },
            { id: 8, name: 'Kombucha cà phê robusta', group: 'Đồ uống', creator: 'PhongDD', createdTime: '2025-01-03 15:54', status: 'Khóa' }
        ];

        let filteredProducts = [...products];
        let itemsPerPage = itemsPerPageSelect ? parseInt(itemsPerPageSelect.value) : 10;
        let currentPage = 1;

        // Function to render table data
        function renderTable(data, page) {
            if (!productTableBody) return;
            productTableBody.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedData = data.slice(start, end);

            paginatedData.forEach((product, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="text-center">${start + index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.group}</td>
                    <td>${product.creator}</td>
                    <td>${product.createdTime}</td>
                    <td><span class="badge ${product.status === 'Hoạt động' ? 'bg-success' : 'bg-danger'}">${product.status}</span></td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary me-1 view-details-btn" title="Xem chi tiết" data-id="${product.id}">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-primary edit-btn" title="Sửa" data-id="${product.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </td>
                `;
                productTableBody.appendChild(row);
            });

            renderCards(data, page);
            addActionListeners();
            renderPagination(data.length);
            if (resultCount) {
                resultCount.textContent = `${data.length}/${products.length} kết quả`;
            }
        }

        // Function to render card view for mobile
        function renderCards(data, page) {
            if (!cardList) return;
            cardList.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedData = data.slice(start, end);

            paginatedData.forEach((product, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-body">
                        <h6 class="card-title">${product.name}</h6>
                        <p class="card-text mb-1"><strong>Nhóm sản phẩm:</strong> ${product.group}</p>
                        <p class="card-text mb-1"><strong>Người tạo:</strong> ${product.creator}</p>
                        <p class="card-text mb-1"><strong>Thời gian tạo:</strong> ${product.createdTime}</p>
                        <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${product.status === 'Hoạt động' ? 'bg-success' : 'bg-danger'}">${product.status}</span></p>
                        <div class="d-flex gap-1 mt-2">
                            <button class="btn btn-sm btn-outline-primary me-1 view-details-btn" title="Xem chi tiết" data-id="${product.id}">
                                <i class="bi bi-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-primary edit-btn" title="Sửa" data-id="${product.id}">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </div>
                    </div>
                `;
                cardList.appendChild(card);
            });
        }

        // Function to add action listeners
        function addActionListeners() {
            document.querySelectorAll('.view-details-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const productId = btn.getAttribute('data-id');
                    loadDetails(productId);
                });
            });

            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const productId = btn.getAttribute('data-id');
                    loadEditPage(productId);
                });
            });
        }

        // Function to render pagination
        function renderPagination(totalItems) {
            if (!pagination) return;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            pagination.innerHTML = '';

            const prevLi = document.createElement('li');
            prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
            prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a>`;
            prevLi.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    renderTable(filteredProducts, currentPage);
                }
            });
            pagination.appendChild(prevLi);

            for (let i = 1; i <= totalPages; i++) {
                const pageLi = document.createElement('li');
                pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
                pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
                pageLi.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentPage = i;
                    renderTable(filteredProducts, currentPage);
                });
                pagination.appendChild(pageLi);
            }

            const nextLi = document.createElement('li');
            nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
            nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a>`;
            nextLi.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    renderTable(filteredProducts, currentPage);
                }
            });
            pagination.appendChild(nextLi);
        }

        // Function to load details page
        function loadDetails(productId) {
            if (typeof window.loadContent === 'function') {
                window.loadContent('product-details', { productId: productId });
            } else {
                console.error('loadContent function not found in layout.js');
            }
        }

        // Function to load edit page
        function loadEditPage(productId) {
            if (typeof window.loadContent === 'function') {
                window.loadContent('product-edit', { productId: productId });
            } else {
                console.error('loadContent function not found in layout.js');
            }
        }

        // Function to load add new page
        function loadAddNewPage() {
            if (typeof window.loadContent === 'function') {
                window.loadContent('product-add-new');
            } else {
                console.error('loadContent function not found in layout.js');
            }
        }

        // Search functionality
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const productName = searchProductName ? searchProductName.value.trim().toLowerCase() : '';
                const productGroup = searchProductGroup ? searchProductGroup.value.trim().toLowerCase() : '';
                const status = searchStatus ? searchStatus.value : '';

                filteredProducts = products.filter(product =>
                    (productName === '' || product.name.toLowerCase().includes(productName)) &&
                    (productGroup === '' || product.group.toLowerCase().includes(productGroup)) &&
                    (status === '' || product.status === status)
                );
                currentPage = 1;
                renderTable(filteredProducts, currentPage);
            });
        }

        // Clear filter functionality
        if (clearFilterBtn) {
            clearFilterBtn.addEventListener('click', () => {
                if (searchProductName) searchProductName.value = '';
                if (searchProductGroup) searchProductGroup.value = '';
                if (searchStatus) searchStatus.value = '';
                filteredProducts = [...products];
                currentPage = 1;
                renderTable(filteredProducts, currentPage);
            });
        }

        // Add new button functionality
        if (addNewBtn) {
            addNewBtn.addEventListener('click', () => {
                loadAddNewPage();
            });
        }

        // Items per page change
        if (itemsPerPageSelect) {
            itemsPerPageSelect.addEventListener('change', () => {
                itemsPerPage = parseInt(itemsPerPageSelect.value);
                currentPage = 1;
                renderTable(filteredProducts, currentPage);
            });
        }

        // Initial render
        renderTable(filteredProducts, currentPage);
    }

    // Expose initProductList globally
    window.initProductList = initProductList;

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initProductList();
    });
})();