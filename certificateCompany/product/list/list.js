(function () {
    const products = [
        { id: 1, name: 'SP điện TTCB không điện NVTD 3', group: 'Điện tử', creator: 'Phongigi', createdTime: '2025-05-07 14:27', status: 'Hoạt động' },
        { id: 2, name: 'SP điện TTCB không điện NVTD 2', group: 'Điện tử', creator: 'Anonymous', createdTime: '2025-05-05 14:25', status: 'Hoạt động' },
        { id: 3, name: 'SP điện TTCB không điện NVTD 1', group: 'Điện tử', creator: 'Phongigi', createdTime: '2025-05-07 14:25', status: 'Hoạt động' },
        { id: 4, name: 'SP điện NVTD không điện TTCB', group: 'Điện tử', creator: 'Phongigi', createdTime: '2025-05-07 14:23', status: 'Khóa' },
        { id: 5, name: 'Sp không điện NVTD và TTCB', group: 'Điện tử', creator: 'Anonymous', createdTime: '2025-05-07 14:23', status: 'Hoạt động' },
        { id: 6, name: 'Kombucha Hồng trà - Đào tuyết', group: 'Đồ uống', creator: 'Phongigi', createdTime: '2025-05-06 18:31', status: 'Hoạt động' },
        { id: 7, name: 'Kombucha sorn trà xanh', group: 'Đồ uống', creator: 'Phongigi', createdTime: '2025-01-03 15:58', status: 'Hoạt động' },
        { id: 8, name: 'Kombucha cà phê robusta', group: 'Đồ uống', creator: 'Anonymous', createdTime: '2025-01-03 15:54', status: 'Khóa' }
    ];

    function initProductList() {
        const elements = {
            tableBody: document.getElementById('productTableBody'),
            cardList: document.querySelector('.card-list'),
            searchName: document.getElementById('searchProductName'),
            searchGroup: document.getElementById('searchProductGroup'),
            searchStatus: document.getElementById('searchStatus'),
            searchBtn: document.getElementById('searchBtn'),
            clearBtn: document.getElementById('clearFilterBtn'),
            addBtn: document.getElementById('addNewBtn'),
            pagination: document.getElementById('pagination'),
            resultCount: document.getElementById('resultCount'),
            itemsPerPage: document.getElementById('itemsPerPage')
        };

        let state = {
            filteredProducts: [...products],
            itemsPerPage: elements.itemsPerPage ? parseInt(elements.itemsPerPage.value) : 10,
            currentPage: 1
        };

        function renderTable(data, page) {
            if (!elements.tableBody) return;
            elements.tableBody.innerHTML = '';
            const start = (page - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            const paginatedData = data.slice(start, end);

            const fragment = document.createDocumentFragment();
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
                fragment.appendChild(row);
            });
            elements.tableBody.appendChild(fragment);

            renderCards(data, page);
            renderPagination(data.length);
            if (elements.resultCount) {
                elements.resultCount.textContent = `${data.length}/${products.length} kết quả`;
            }
        }

        function renderCards(data, page) {
            if (!elements.cardList) return;
            elements.cardList.innerHTML = '';
            const start = (page - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            const paginatedData = data.slice(start, end);

            const fragment = document.createDocumentFragment();
            paginatedData.forEach((product) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-body">
                        <h6 class="card-title">${product.name}</h6>
                        <p class="card-text mb-1"><strong>Nhóm:</strong> ${product.group}</p>
                        <p class="card-text mb-1"><strong>Người tạo:</strong> ${product.creator}</p>
                        <p class="card-text mb-1"><strong>Thời gian:</strong> ${product.createdTime}</p>
                        <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${product.status === 'Hoạt động' ? 'bg-success' : 'bg-danger'}">${product.status}</span></p>
                        <div class="d-flex gap-1 mt-2">
                            <button class="btn btn-sm btn-outline-primary view-details-btn" title="Xem chi tiết" data-id="${product.id}">
                                <i class="bi bi-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-primary edit-btn" title="Sửa" data-id="${product.id}">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </div>
                    </div>
                `;
                fragment.appendChild(card);
            });
            elements.cardList.appendChild(fragment);
        }

        function renderPagination(totalItems) {
            if (!elements.pagination) return;
            elements.pagination.innerHTML = '';
            const totalPages = Math.ceil(totalItems / state.itemsPerPage);
            const fragment = document.createDocumentFragment();

            const prevLi = document.createElement('li');
            prevLi.className = `page-item ${state.currentPage === 1 ? 'disabled' : ''}`;
            prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a>`;
            prevLi.addEventListener('click', (e) => {
                e.preventDefault();
                if (state.currentPage > 1) {
                    state.currentPage--;
                    renderTable(state.filteredProducts, state.currentPage);
                }
            });
            fragment.appendChild(prevLi);

            for (let i = 1; i <= totalPages; i++) {
                const pageLi = document.createElement('li');
                pageLi.className = `page-item ${i === state.currentPage ? 'active' : ''}`;
                pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
                pageLi.addEventListener('click', (e) => {
                    e.preventDefault();
                    state.currentPage = i;
                    renderTable(state.filteredProducts, state.currentPage);
                });
                fragment.appendChild(pageLi);
            }

            const nextLi = document.createElement('li');
            nextLi.className = `page-item ${state.currentPage === totalPages ? 'disabled' : ''}`;
            nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a>`;
            nextLi.addEventListener('click', (e) => {
                e.preventDefault();
                if (state.currentPage < totalPages) {
                    state.currentPage++;
                    renderTable(state.filteredProducts, state.currentPage);
                }
            });
            fragment.appendChild(nextLi);

            elements.pagination.appendChild(fragment);
        }

        function handleSearch() {
            const name = elements.searchName?.value.trim().toLowerCase() || '';
            const group = elements.searchGroup?.value.trim().toLowerCase() || '';
            const status = elements.searchStatus?.value || '';

            state.filteredProducts = products.filter(product =>
                (!name || product.name.toLowerCase().includes(name)) &&
                (!group || product.group.toLowerCase().includes(group)) &&
                (!status || product.status === status)
            );
            state.currentPage = 1;
            renderTable(state.filteredProducts, state.currentPage);
        }

        function clearFilters() {
            if (elements.searchName) elements.searchName.value = '';
            if (elements.searchGroup) elements.searchGroup.value = '';
            if (elements.searchStatus) elements.searchStatus.value = '';
            state.filteredProducts = [...products];
            state.currentPage = 1;
            renderTable(state.filteredProducts, state.currentPage);
        }

        function loadDetails(productId) {
            if (typeof window.loadContent === 'function') {
                window.loadContent('product-details', { productId });
            } else {
                console.error('loadContent not found');
            }
        }

        function loadEditPage(productId) {
            if (typeof window.loadContent === 'function') {
                window.loadContent('product-edit', { productId });
            } else {
                console.error('loadContent not found');
            }
        }

        function loadAddNewPage() {
            if (typeof window.loadContent === 'function') {
                window.loadContent('product-add-new');
            } else {
                console.error('loadContent not found');
            }
        }

        function addEventListeners() {
            if (elements.searchBtn) {
                elements.searchBtn.addEventListener('click', handleSearch);
            }
            if (elements.clearBtn) {
                elements.clearBtn.addEventListener('click', clearFilters);
            }
            if (elements.addBtn) {
                elements.addBtn.addEventListener('click', loadAddNewPage);
            }
            if (elements.itemsPerPage) {
                elements.itemsPerPage.addEventListener('change', () => {
                    state.itemsPerPage = parseInt(elements.itemsPerPage.value);
                    state.currentPage = 1;
                    renderTable(state.filteredProducts, state.currentPage);
                });
            }

            elements.tableBody?.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target) return;
                const productId = target.dataset.id;
                if (target.classList.contains('view-details-btn')) {
                    loadDetails(productId);
                } else if (target.classList.contains('edit-btn')) {
                    loadEditPage(productId);
                }
            });

            elements.cardList?.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target) return;
                const productId = target.dataset.id;
                if (target.classList.contains('view-details-btn')) {
                    loadDetails(productId);
                } else if (target.classList.contains('edit-btn')) {
                    loadEditPage(productId);
                }
            });
        }

        addEventListeners();
        renderTable(state.filteredProducts, state.currentPage);
    }

    window.initProductList = initProductList;
    document.addEventListener('DOMContentLoaded', initProductList);
})();