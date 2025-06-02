const initProductList = () => {
    const elements = {
        tableView: document.getElementById('tableView'),
        cardGridView: document.getElementById('cardGridView'),
        productTableBody: document.getElementById('productTableBody'),
        filterStatus: document.getElementById('filter_status'),
        filterProductName: document.getElementById('filter_product_name'),
        filterDateRangeStart: document.getElementById('filter_date_range_start'),
        filterDateRangeEnd: document.getElementById('filter_date_range_end'),
        filterStatusMobile: document.getElementById('filter_status_mobile'),
        filterProductNameMobile: document.getElementById('filter_product_name_mobile'),
        filterDateRangeStartMobile: document.getElementById('filter_date_range_start_mobile'),
        filterDateRangeEndMobile: document.getElementById('filter_date_range_end_mobile'),
        applyFilterBtn: document.getElementById('applyFilterBtn'),
        applyFilterMobileBtn: document.getElementById('applyFilterMobileBtn'),
        clearFilterBtn: document.getElementById('clearFilterBtn'),
        clearFilterMobileBtn: document.getElementById('clearFilterMobileBtn'),
        reloadMobileBtn: document.getElementById('reloadMobileBtn'),
        retryBtn: document.getElementById('retryBtn'),
        errorBanner: document.getElementById('errorBanner'),
        emptyState: document.getElementById('emptyState'),
        pagination: document.getElementById('pagination'),
        resultCount: document.getElementById('resultCount'),
        itemsPerPageSelect: document.getElementById('itemsPerPage'),
        toggleTableViewBtn: document.getElementById('toggleTableViewBtn'),
        toggleCardViewBtn: document.getElementById('toggleCardViewBtn'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        addNewProductBtn: document.getElementById('addNewProductBtn'), // Thêm nút Thêm mới
    };

    let products = [], filteredProducts = [], itemsPerPage = 10, currentPage = 1, isTableView = true;
    const statusBadgeClass = { 'Hoạt động': 'badge-active', 'Khóa': 'badge-locked' };

    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    };

    // Fetch products with mock data
    const fetchProducts = async () => {
        elements.loadingSpinner.classList.remove('d-none');
        try {
            await new Promise((resolve) =>
                setTimeout(() => resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 1, productName: 'SP điện TTCB không điện NVTD 3', creator: 'Phongigi', createdDate: '2025-05-07', status: 'Hoạt động' },
                        { id: 2, productName: 'SP điện TTCB không điện NVTD 2', creator: 'Anonymous', createdDate: '2025-05-05', status: 'Hoạt động' },
                        { id: 3, productName: 'SP điện TTCB không điện NVTD 1', creator: 'Phongigi', createdDate: '2025-05-07', status: 'Hoạt động' },
                        { id: 4, productName: 'SP điện NVTD không điện TTCB', creator: 'Phongigi', createdDate: '2025-05-07', status: 'Khóa' },
                        { id: 5, productName: 'Sp không điện NVTD và TTCB', creator: 'Anonymous', createdDate: '2025-05-07', status: 'Hoạt động' },
                        { id: 6, productName: 'Kombucha Hồng trà - Đào tuyết', creator: 'Phongigi', createdDate: '2025-05-06', status: 'Hoạt động' },
                        { id: 7, productName: 'Kombucha sorn trà xanh', creator: 'Phongigi', createdDate: '2025-01-03', status: 'Hoạt động' },
                        { id: 8, productName: 'Kombucha cà phê robusta', creator: 'Anonymous', createdDate: '2025-01-03', status: 'Khóa' },
                    ]),
                }), 1000)
            );
            products = [
                { id: 1, productName: 'SP điện TTCB không điện NVTD 3', creator: 'Phongigi', createdDate: '2025-05-07', status: 'Hoạt động' },
                { id: 2, productName: 'SP điện TTCB không điện NVTD 2', creator: 'Anonymous', createdDate: '2025-05-05', status: 'Hoạt động' },
                { id: 3, productName: 'SP điện TTCB không điện NVTD 1', creator: 'Phongigi', createdDate: '2025-05-07', status: 'Hoạt động' },
                { id: 4, productName: 'SP điện NVTD không điện TTCB', creator: 'Phongigi', createdDate: '2025-05-07', status: 'Khóa' },
                { id: 5, productName: 'Sp không điện NVTD và TTCB', creator: 'Anonymous', createdDate: '2025-05-07', status: 'Hoạt động' },
                { id: 6, productName: 'Kombucha Hồng trà - Đào tuyết', creator: 'Phongigi', createdDate: '2025-05-06', status: 'Hoạt động' },
                { id: 7, productName: 'Kombucha sorn trà xanh', creator: 'Phongigi', createdDate: '2025-01-03', status: 'Hoạt động' },
                { id: 8, productName: 'Kombucha cà phê robusta', creator: 'Anonymous', createdDate: '2025-01-03', status: 'Khóa' },
            ];
            filteredProducts = [...products];
            elements.errorBanner.classList.add('d-none');
            renderData();
        } catch (error) {
            console.error('Fetch error:', error);
            elements.errorBanner.classList.remove('d-none');
            elements.emptyState.classList.add('d-none');
            [elements.productTableBody, elements.cardGridView, elements.pagination].forEach(el => el && (el.innerHTML = ''));
        } finally {
            elements.loadingSpinner.classList.add('d-none');
        }
    };

    const updateProductStatus = async (productId, newStatus) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const productIndex = products.findIndex(p => p.id === parseInt(productId));
            if (productIndex !== -1) {
                products[productIndex].status = newStatus;
                filteredProducts = [...products];
                renderData();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating product status:', error);
            return false;
        }
    };

    const renderTableRow = (product, index, start) => `
        <tr>
            <td class="text-center">${start + index + 1}</td>
            <td><span data-bs-toggle="tooltip" data-bs-title="Tên sản phẩm: ${product.productName}\nNgày tạo: ${formatDate(product.createdDate)}">${product.productName}</span></td>
            <td>${product.creator}</td>
            <td><span class="badge ${statusBadgeClass[product.status]}">${product.status === 'Hoạt động' ? 'Đang hoạt động' : 'Khóa'}</span></td>
            <td>${formatDate(product.createdDate)}</td>
            <td class="text-center action-buttons">
                <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${product.id}"><i class="bi bi-eye"></i></button>
                <button class="btn btn-sm btn-outline-warning edit-btn" data-id="${product.id}"><i class="bi bi-pencil"></i></button>
                ${product.status === 'Hoạt động' ? `<button class="btn btn-sm btn-outline-danger lock-btn" data-id="${product.id}"><i class="bi bi-lock"></i></button>` : ''}
                ${product.status === 'Khóa' ? `<button class="btn btn-sm btn-outline-success unlock-btn" data-id="${product.id}"><i class="bi bi-unlock"></i></button>` : ''}
            </td>
        </tr>
    `;

    const renderCardItem = (product) => `
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">${product.productName}</h6>
                    <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${statusBadgeClass[product.status]}">${product.status === 'Hoạt động' ? 'Đang hoạt động' : 'Khóa'}</span></p>
                    <p class="card-text mb-1"><strong>Ngày tạo:</strong> ${formatDate(product.createdDate)}</p>
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${product.id}"><i class="bi bi-eye"></i> Xem chi tiết</button>
                        <button class="btn btn-sm btn-outline-warning edit-btn" data-id="${product.id}"><i class="bi bi-pencil"></i> Sửa</button>
                        ${product.status === 'Hoạt động' ? `<button class="btn btn-sm btn-outline-danger lock-btn" data-id="${product.id}"><i class="bi bi-lock"></i> Khóa</button>` : ''}
                        ${product.status === 'Khóa' ? `<button class="btn btn-sm btn-outline-success unlock-btn" data-id="${product.id}"><i class="bi bi-unlock"></i> Mở khóa</button>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    const renderData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = filteredProducts.slice(start, end);

        if (filteredProducts.length === 0) {
            elements.emptyState.classList.remove('d-none');
            [elements.productTableBody, elements.cardGridView, elements.pagination].forEach(el => el && (el.innerHTML = ''));
            elements.resultCount.textContent = '0/0 kết quả';
            return;
        }
        elements.emptyState.classList.add('d-none');

        const isDesktopTableView = isTableView && window.innerWidth >= 768;
        [elements.tableView, elements.cardGridView].forEach(el => {
            el.classList.toggle('active', el === (isDesktopTableView ? elements.tableView : elements.cardGridView));
            el.classList.toggle('d-none', !el.classList.contains('active'));
        });

        if (isDesktopTableView) {
            elements.productTableBody.innerHTML = paginatedData.map((product, index) => renderTableRow(product, index, start)).join('');
        } else {
            elements.cardGridView.innerHTML = paginatedData.map(renderCardItem).join('');
        }

        renderPagination(filteredProducts.length);
        elements.resultCount.textContent = `${filteredProducts.length}/${products.length} kết quả`;
        addActionListeners();
        initTooltips();
    };

    const initTooltips = () => document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

    const renderPagination = (totalItems) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        elements.pagination.innerHTML = `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" aria-label="Previous"><span>«</span></a></li>
            ${Array.from({ length: totalPages }, (_, i) => `<li class="page-item ${i + 1 === currentPage ? 'active' : ''}"><a class="page-link" href="#">${i + 1}</a></li>`).join('')}
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" aria-label="Next"><span>»</span></a></li>
        `;
        elements.pagination.querySelectorAll('.page-link').forEach(link => link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = parseInt(link.textContent) || (link.getAttribute('aria-label') === 'Previous' ? currentPage - 1 : currentPage + 1);
            if (targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage) {
                currentPage = targetPage;
                renderData();
            }
        }));
    };

    const applyFilters = () => {
        const status = elements.filterStatus.value || elements.filterStatusMobile.value;
        const productName = (elements.filterProductName.value || elements.filterProductNameMobile.value).trim().toLowerCase();
        const dateStart = elements.filterDateRangeStart.value || elements.filterDateRangeStartMobile.value;
        const dateEnd = elements.filterDateRangeEnd.value || elements.filterDateRangeEndMobile.value;

        filteredProducts = products.filter(product => {
            const matchesStatus = !status || product.status === status;
            const matchesName = !productName || product.productName.toLowerCase().includes(productName);
            const matchesDate = !dateStart || !dateEnd || (new Date(product.createdDate) >= new Date(dateStart) && new Date(product.createdDate) <= new Date(dateEnd));
            return matchesStatus && matchesName && matchesDate;
        });

        currentPage = 1;
        renderData();
    };

    const clearFilters = () => {
        [elements.filterStatus, elements.filterProductName, elements.filterDateRangeStart, elements.filterDateRangeEnd,
        elements.filterStatusMobile, elements.filterProductNameMobile, elements.filterDateRangeStartMobile, elements.filterDateRangeEndMobile]
            .forEach(el => el.value = '');
        applyFilters();
    };

    const handleLock = (productId) => {
        if (window.Popup && typeof window.Popup.showApproveConfirm === 'function') {
            window.Popup.showApproveConfirm(
                productId,
                async (id) => {
                    const success = await updateProductStatus(id, 'Khóa');
                    if (success && window.Toast && typeof window.Toast.showSuccess === 'function') {
                        window.Toast.showSuccess('Khóa sản phẩm thành công!');
                    }
                },
                'Bạn có chắc chắn muốn khóa sản phẩm này không?'
            );
        }
    };

    const handleUnlock = (productId) => {
        if (window.Popup && typeof window.Popup.showApproveConfirm === 'function') {
            window.Popup.showApproveConfirm(
                productId,
                async (id) => {
                    const success = await updateProductStatus(id, 'Hoạt động');
                    if (success && window.Toast && typeof window.Toast.showSuccess === 'function') {
                        window.Toast.showSuccess('Mở khóa sản phẩm thành công!');
                    }
                },
                'Bạn có chắc chắn muốn mở khóa sản phẩm này không?'
            );
        }
    };

    const addActionListeners = () => {
        // Xử lý sự kiện cho nút Thêm mới
        elements.addNewProductBtn.addEventListener('click', () => {
            window.loadContent('product-add-new');
        });

        document.querySelectorAll('.view-details-btn').forEach(btn => btn.addEventListener('click', () => {
            const productId = btn.dataset.id;
            window.loadContent('product-details', { productId });
        }));

        document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', () => {
            const productId = btn.dataset.id;
            window.loadContent('product-edit', { productId });
        }));

        document.querySelectorAll('.lock-btn').forEach(btn => btn.addEventListener('click', () => {
            const productId = btn.dataset.id;
            handleLock(productId);
        }));

        document.querySelectorAll('.unlock-btn').forEach(btn => btn.addEventListener('click', () => {
            const productId = btn.dataset.id;
            handleUnlock(productId);
        }));
    };

    const debouncedApplyFilters = debounce(applyFilters, 300);
    [elements.toggleTableViewBtn, elements.toggleCardViewBtn].forEach(btn => btn.addEventListener('click', () => {
        isTableView = btn === elements.toggleTableViewBtn;
        renderData();
    }));
    [elements.applyFilterBtn, elements.applyFilterMobileBtn].forEach(btn => btn.addEventListener('click', applyFilters));
    [elements.clearFilterBtn, elements.clearFilterMobileBtn].forEach(btn => btn.addEventListener('click', clearFilters));
    [elements.reloadMobileBtn, elements.retryBtn].forEach(btn => btn.addEventListener('click', fetchProducts));
    elements.itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(elements.itemsPerPageSelect.value);
        currentPage = 1;
        renderData();
    });
    [elements.filterProductName, elements.filterProductNameMobile].forEach(el => el.addEventListener('input', debouncedApplyFilters));

    fetchProducts();
};

document.addEventListener('DOMContentLoaded', initProductList);