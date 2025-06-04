const initNsxkdEditPage = () => {
    const elements = {
        nsxkdCode: document.getElementById('nsxkdCode'),
        nsxkdName: document.getElementById('nsxkdName'),
        phoneNumber: document.getElementById('phoneNumber'),
        email: document.getElementById('email'),
        mst: document.getElementById('mst'),
        address: document.getElementById('address'),
        note: document.getElementById('note'),
        logo: document.getElementById('logo'),
        logoInput: document.getElementById('logoInput'),
        logoContainer: document.getElementById('logoContainer'),
        removeLogoBtn: document.getElementById('removeLogoBtn'),
        dkkd1: document.getElementById('dkkd1'),
        dkkd2: document.getElementById('dkkd2'),
        dkkdInput: document.getElementById('dkkdInput'),
        dkkdContainer: document.getElementById('dkkdContainer'),
        removeDkkdBtn1: document.getElementById('removeDkkdBtn1'),
        removeDkkdBtn2: document.getElementById('removeDkkdBtn2'),
        status: document.getElementById('status'),
        linkedDate: document.getElementById('linkedDate'),
        tableView: document.getElementById('tableView'),
        cardGridView: document.getElementById('cardGridView'),
        productTableBody: document.getElementById('productTableBody'),
        addProductBtn: document.getElementById('addProductBtn'),
        filterStatus: document.getElementById('filterStatus'),
        pagination: document.getElementById('pagination'),
        resultCount: document.getElementById('resultCount'),
        itemsPerPageSelect: document.getElementById('itemsPerPage'),
        toggleTableViewBtn: document.getElementById('toggleTableViewBtn'),
        toggleCardViewBtn: document.getElementById('toggleCardViewBtn'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        backBtn: document.getElementById('backBtn'),
        confirmBtn: document.getElementById('confirmBtn'),
    };

    let nsxkd = null, products = [], availableProducts = [], itemsPerPage = 10, currentPage = 1, isTableView = true;
    const statusBadgeClass = {
        'Đang hoạt động': 'badge-active',
        'Khóa': 'badge-locked'
    };

    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const fetchNsxkdDetails = async () => {
        elements.loadingSpinner.classList.remove('d-none');
        try {
            await new Promise((resolve) =>
                setTimeout(() => resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        nsxkdCode: 'NSX001',
                        nsxkdName: 'Công ty ABC',
                        phoneNumber: '0901234567',
                        email: 'abc@example.com',
                        mst: '0901234567',
                        address: 'Số 1, Đường ABC, Quận 1, TP.HCM',
                        note: 'Ghi chú mẫu cho NSXKD',
                        logo: 'https://test-upload-6cb06c7f-5200-4c62-963b-d17d711b61a0.s3.amazonaws.com/u6-fbfa7849-b260-44e0-937e-7ccd06f48a10.jpg',
                        dkkd: ['https://via.placeholder.com/150', 'https://via.placeholder.com/151'],
                        status: 'Đang hoạt động',
                        linkedDate: '2025-05-07',
                        products: [
                            { id: 1, productCode: 'SP001', productName: 'Sản phẩm A', productType: 'Loại A', authDate: '2025-05-01', status: 'Đang hoạt động' },
                            { id: 2, productCode: 'SP002', productName: 'Sản phẩm B', productType: 'Loại B', authDate: '2025-05-02', status: 'Khóa' },
                            { id: 3, productCode: 'SP003', productName: 'Sản phẩm C', productType: 'Loại A', authDate: '2025-05-03', status: 'Đang hoạt động' },
                        ],
                        availableProducts: [
                            { id: 4, productCode: 'SP004', productName: 'Sản phẩm D', productType: 'Loại D', authDate: '2025-05-04', status: 'Đang hoạt động' },
                            { id: 5, productCode: 'SP005', productName: 'Sản phẩm E', productType: 'Loại E', authDate: '2025-05-05', status: 'Đang hoạt động' },
                        ]
                    }),
                }), 1000)
            );
            nsxkd = {
                nsxkdCode: 'NSX001',
                nsxkdName: 'Công ty ABC',
                phoneNumber: '0901234567',
                email: 'abc@example.com',
                mst: '0901234567',
                address: 'Số 1, Đường ABC, Quận 1, TP.HCM',
                note: 'Ghi chú mẫu cho NSXKD',
                logo: 'https://test-upload-6cb06c7f-5200-4c62-963b-d17d711b61a0.s3.amazonaws.com/u6-fbfa7849-b260-44e0-937e-7ccd06f48a10.jpg',
                dkkd: ['https://via.placeholder.com/150', 'https://via.placeholder.com/151'],
                status: 'Đang hoạt động',
                linkedDate: '2025-05-07',
            };
            products = [
                { id: 1, productCode: 'SP001', productName: 'Sản phẩm A', productType: 'Loại A', authDate: '2025-05-01', status: 'Đang hoạt động' },
                { id: 2, productCode: 'SP002', productName: 'Sản phẩm B', productType: 'Loại B', authDate: '2025-05-02', status: 'Khóa' },
                { id: 3, productCode: 'SP003', productName: 'Sản phẩm C', productType: 'Loại A', authDate: '2025-05-03', status: 'Đang hoạt động' },
            ];
            availableProducts = [
                { id: 4, productCode: 'SP004', productName: 'Sản phẩm D', productType: 'Loại D', authDate: '2025-05-04', status: 'Đang hoạt động' },
                { id: 5, productCode: 'SP005', productName: 'Sản phẩm E', productType: 'Loại E', authDate: '2025-05-05', status: 'Đang hoạt động' },
            ];
            renderNsxkdDetails();
            renderProducts();
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            elements.loadingSpinner.classList.add('d-none');
        }
    };

    const renderNsxkdDetails = () => {
        if (!nsxkd) return;
        Object.entries({
            nsxkdCode: nsxkd.nsxkdCode,
            nsxkdName: nsxkd.nsxkdName,
            phoneNumber: nsxkd.phoneNumber,
            email: nsxkd.email,
            mst: nsxkd.mst,
            address: nsxkd.address,
            note: nsxkd.note,
            status: nsxkd.status
        }).forEach(([key, value]) => elements[key].value = value);

        elements.logoContainer.innerHTML = nsxkd.logo
            ? `<img id="logo" src="${nsxkd.logo}" alt="Logo" style="max-height: 100px; max-width: 100%;">`
            : 'Không có logo';
        elements.removeLogoBtn.style.display = nsxkd.logo ? 'block' : 'none';

        if (nsxkd.dkkd?.length) {
            elements.dkkd1.src = nsxkd.dkkd[0] || '';
            elements.dkkd2.src = nsxkd.dkkd[1] || '';
            elements.removeDkkdBtn1.style.display = !!nsxkd.dkkd[0] ? 'block' : 'none';
            elements.removeDkkdBtn2.style.display = !!nsxkd.dkkd[1] ? 'block' : 'none';
        } else {
            elements.dkkd1.src = elements.dkkd2.src = '';
            elements.removeDkkdBtn1.style.display = elements.removeDkkdBtn2.style.display = 'none';
        }

        elements.linkedDate.textContent = formatDate(nsxkd.linkedDate);
    };

    const renderTableRow = (product, index, start) => {
        if (product.isNew) {
            return `
                <tr data-index="${index}">
                    <td class="text-center">${start + index + 1}</td>
                    <td>-</td>
                    <td>
                        <select class="form-select product-select" data-index="${index}">
                            <option value="">Chọn sản phẩm</option>
                            ${availableProducts.map(p => `<option value="${p.id}" data-product='${JSON.stringify(p)}'>${p.productName} (${p.productCode})</option>`).join('')}
                        </select>
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td class="text-center"></td>
                </tr>
            `;
        }
        const actionButton = product.status === 'Đang hoạt động'
            ? `<button class="btn btn-sm btn-warning lock-btn" data-index="${index}"><i class="bi bi-lock"></i> Khóa</button>`
            : `<button class="btn btn-sm btn-success unlock-btn" data-index="${index}"><i class="bi bi-unlock"></i> Mở khóa</button>`;
        return `
            <tr data-index="${index}">
                <td class="text-center">${start + index + 1}</td>
                <td>${product.productCode}</td>
                <td>${product.productName}</td>
                <td>${product.productType}</td>
                <td>${formatDate(product.authDate)}</td>
                <td><span class="badge ${statusBadgeClass[product.status]}">${product.status}</span></td>
                <td class="text-center">${actionButton}</td>
            </tr>
        `;
    };

    const renderCardItem = (product, index) => {
        if (product.isNew) {
            return `
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title">Sản phẩm mới</h6>
                            <select class="form-select product-select" data-index="${index}">
                                <option value="">Chọn sản phẩm</option>
                                ${availableProducts.map(p => `<option value="${p.id}" data-product='${JSON.stringify(p)}'>${p.productName} (${p.productCode})</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }
        return `
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">${product.productName}</h6>
                        <p class="card-text mb-1"><strong>Mã sản phẩm:</strong> ${product.productCode}</p>
                        <p class="card-text mb-1"><strong>Loại sản phẩm:</strong> ${product.productType}</p>
                        <p class="card-text mb-1"><strong>Ngày phân quyền:</strong> ${formatDate(product.authDate)}</p>
                        <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${statusBadgeClass[product.status]}">${product.status}</span></p>
                        <div class="d-flex gap-2 flex-wrap">
                            ${product.status === 'Đang hoạt động'
                                ? `<button class="btn btn-sm btn-warning lock-btn" data-index="${index}"><i class="bi bi-lock"></i> Khóa</button>`
                                : `<button class="btn btn-sm btn-success unlock-btn" data-index="${index}"><i class="bi bi-unlock"></i> Mở khóa</button>`}
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const renderProducts = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const filter = elements.filterStatus.value;
        const filteredProducts = filter ? products.filter(p => p.status === filter) : products;
        const paginatedData = filteredProducts.slice(start, end);

        const isDesktopTableView = isTableView && window.innerWidth >= 768;
        [elements.tableView, elements.cardGridView].forEach(el => {
            el.classList.toggle('active', el === (isDesktopTableView ? elements.tableView : elements.cardGridView));
            el.classList.toggle('d-none', !el.classList.contains('active'));
        });

        if (isDesktopTableView) {
            elements.productTableBody.innerHTML = paginatedData.map((product, index) => renderTableRow(product, index, start)).join('');
            initializeSelect2();
        } else {
            elements.cardGridView.innerHTML = paginatedData.map((product, index) => renderCardItem(product, index)).join('');
            initializeSelect2(); // Khởi tạo Select2 cho card view trên mobile
        }

        renderPagination(filteredProducts.length);
        elements.resultCount.textContent = `${filteredProducts.length}/${products.length} kết quả`;
        attachEventListeners();
    };

    const initializeSelect2 = () => {
        if (typeof $ === 'undefined') {
            console.error('jQuery is not loaded. Please ensure jQuery is included before Select2.');
            return;
        }

        $('.product-select').each(function() {
            if (!$(this).hasClass('select2-hidden-accessible')) {
                $(this).select2({
                    placeholder: "Tìm kiếm sản phẩm",
                    allowClear: true,
                    width: '100%'
                }).on('select2:select', function(e) {
                    const index = parseInt($(this).data('index'));
                    const productId = $(this).val();
                    if (productId) {
                        const selectedProduct = availableProducts.find(p => p.id == parseInt(productId));
                        if (selectedProduct) {
                            products[index] = { ...selectedProduct, isNew: false };
                            availableProducts = availableProducts.filter(p => p.id != parseInt(productId));
                            renderProducts();
                        }
                    }
                });
            }
        });
    };

    const attachEventListeners = () => {
        document.querySelectorAll('.lock-btn, .unlock-btn').forEach(btn => {
            btn.removeEventListener('click', handleToggleStatus);
            btn.addEventListener('click', handleToggleStatus);
        });

        elements.removeLogoBtn.removeEventListener('click', handleRemoveLogo);
        elements.removeLogoBtn.addEventListener('click', handleRemoveLogo);

        elements.removeDkkdBtn1.removeEventListener('click', handleRemoveDkkd1);
        elements.removeDkkdBtn1.addEventListener('click', handleRemoveDkkd1);
        elements.removeDkkdBtn2.removeEventListener('click', handleRemoveDkkd2);
        elements.removeDkkdBtn2.addEventListener('click', handleRemoveDkkd2);
    };

    const handleRemoveLogo = () => {
        nsxkd.logo = null;
        renderNsxkdDetails();
    };

    const handleRemoveDkkd1 = () => {
        if (nsxkd.dkkd?.length > 1) {
            nsxkd.dkkd[0] = nsxkd.dkkd[1];
            nsxkd.dkkd[1] = null;
        } else {
            nsxkd.dkkd = [];
        }
        renderNsxkdDetails();
    };

    const handleRemoveDkkd2 = () => {
        if (nsxkd.dkkd?.length > 1) {
            nsxkd.dkkd[1] = null;
        }
        renderNsxkdDetails();
    };

    const renderPagination = (totalItems) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        elements.pagination.innerHTML = `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" aria-label="Previous"><span>«</span></a></li>
            ${Array.from({ length: totalPages }, (_, i) => `<li class="page-item ${i + 1 === currentPage ? 'active' : ''}"><a class="page-link" href="#">${i + 1}</a></li>`).join('')}
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" aria-label="Next"><span>»</span></a></li>
        `;
        elements.pagination.querySelectorAll('.page-link').forEach(link => {
            link.removeEventListener('click', handlePaginationClick);
            link.addEventListener('click', handlePaginationClick);
        });
    };

    const handlePaginationClick = (e) => {
        e.preventDefault();
        const targetPage = parseInt(e.currentTarget.textContent) || (e.currentTarget.getAttribute('aria-label') === 'Previous' ? currentPage - 1 : currentPage + 1);
        const totalPages = Math.ceil(products.length / itemsPerPage);
        if (targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage) {
            currentPage = targetPage;
            renderProducts();
        }
    };

    elements.logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                nsxkd.logo = reader.result;
                renderNsxkdDetails();
            };
            reader.readAsDataURL(file);
        }
    });

    elements.dkkdInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files).slice(0, 2);
        if (files.length > 0) {
            Promise.all(files.map(file => new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file);
            }))).then(results => {
                nsxkd.dkkd = results;
                renderNsxkdDetails();
            });
        }
    });

    elements.toggleTableViewBtn.addEventListener('click', () => {
        isTableView = true;
        renderProducts();
    });

    elements.toggleCardViewBtn.addEventListener('click', () => {
        isTableView = false;
        renderProducts();
    });

    elements.itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(elements.itemsPerPageSelect.value);
        currentPage = 1;
        renderProducts();
    });

    elements.addProductBtn.addEventListener('click', () => {
        if (availableProducts.length === 0) {
            if (window.Toast?.showWarning) {
                window.Toast.showWarning('Không còn sản phẩm nào để thêm!');
            }
            return;
        }
        products.push({ isNew: true });
        renderProducts();
    });

    elements.filterStatus.addEventListener('change', () => {
        currentPage = 1;
        renderProducts();
    });

    elements.backBtn.addEventListener('click', () => {
        window.loadContent('nsxkd-management');
    });

    elements.confirmBtn.addEventListener('click', () => {
        if (window.Popup?.showApproveConfirm) {
            window.Popup.showApproveConfirm(
                null,
                async () => {
                    nsxkd.nsxkdCode = elements.nsxkdCode.value;
                    nsxkd.nsxkdName = elements.nsxkdName.value;
                    nsxkd.phoneNumber = elements.phoneNumber.value;
                    nsxkd.email = elements.email.value;
                    nsxkd.mst = elements.mst.value;
                    nsxkd.address = elements.address.value;
                    nsxkd.note = elements.note.value;
                    nsxkd.status = elements.status.value;
                    if (window.Toast?.showSuccess) {
                        window.Toast.showSuccess('Cập nhật thành công!');
                    }
                    setTimeout(() => window.loadContent('nsxkd-management'), 1000);
                },
                'Bạn có chắc chắn muốn cập nhật thông tin NSXKD này không?'
            );
        }
    });

    const handleToggleStatus = (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        const product = products[index];
        const newStatus = product.status === 'Đang hoạt động' ? 'Khóa' : 'Đang hoạt động';
        const action = newStatus === 'Khóa' ? 'khóa' : 'mở khóa';

        if (window.Popup?.showApproveConfirm) {
            window.Popup.showApproveConfirm(
                null,
                () => {
                    product.status = newStatus;
                    renderProducts();
                    if (window.Toast?.showSuccess) {
                        window.Toast.showSuccess(`Sản phẩm đã được ${action} thành công!`);
                    }
                },
                `Bạn có chắc chắn muốn ${action} sản phẩm "${product.productName}" không?`
            );
        }
    };

    fetchNsxkdDetails();
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.initNsxkdEditPage === 'function') {
        window.initNsxkdEditPage();
    }
});