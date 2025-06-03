const initNsxkdDetailPage = () => {
    const elements = {
        nsxkdCode: document.getElementById('nsxkdCode'),
        nsxkdName: document.getElementById('nsxkdName'),
        phoneNumber: document.getElementById('phoneNumber'),
        email: document.getElementById('email'),
        mst: document.getElementById('mst'),
        address: document.getElementById('address'),
        note: document.getElementById('note'),
        logo: document.getElementById('logo'),
        logoContainer: document.getElementById('logoContainer'),
        dkkd: document.getElementById('dkkd'),
        dkkdContainer: document.getElementById('dkkdContainer'),
        status: document.getElementById('status'),
        linkedDate: document.getElementById('linkedDate'),
        tableView: document.getElementById('tableView'),
        cardGridView: document.getElementById('cardGridView'),
        productTableBody: document.getElementById('productTableBody'),
        pagination: document.getElementById('pagination'),
        resultCount: document.getElementById('resultCount'),
        itemsPerPageSelect: document.getElementById('itemsPerPage'),
        toggleTableViewBtn: document.getElementById('toggleTableViewBtn'),
        toggleCardViewBtn: document.getElementById('toggleCardViewBtn'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        backBtn: document.getElementById('backBtn'),
        editBtn: document.getElementById('editBtn'),
    };

    let nsxkd = null, products = [], itemsPerPage = 10, currentPage = 1, isTableView = true;
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
                        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPAKF0yrzL00Y2amdFjlFzHQpRukwbBqXIg&s',
                        dkkd: 'https://via.placeholder.com/150',
                        status: 'Đang hoạt động',
                        linkedDate: '2025-05-07',
                        products: [
                            { id: 1, productCode: 'SP001', productName: 'Sản phẩm A', productType: 'Loại A', authDate: '2025-05-01', status: 'Đang hoạt động' },
                            { id: 2, productCode: 'SP002', productName: 'Sản phẩm B', productType: 'Loại B', authDate: '2025-05-02', status: 'Khóa' },
                            { id: 3, productCode: 'SP003', productName: 'Sản phẩm C', productType: 'Loại A', authDate: '2025-05-03', status: 'Đang hoạt động' },
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
                logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPAKF0yrzL00Y2amdFjlFzHQpRukwbBqXIg&s',
                dkkd: 'https://via.placeholder.com/150',
                status: 'Đang hoạt động',
                linkedDate: '2025-05-07',
            };
            products = [
                { id: 1, productCode: 'SP001', productName: 'Sản phẩm A', productType: 'Loại A', authDate: '2025-05-01', status: 'Đang hoạt động' },
                { id: 2, productCode: 'SP002', productName: 'Sản phẩm B', productType: 'Loại B', authDate: '2025-05-02', status: 'Khóa' },
                { id: 3, productCode: 'SP003', productName: 'Sản phẩm C', productType: 'Loại A', authDate: '2025-05-03', status: 'Đang hoạt động' },
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
        elements.nsxkdCode.textContent = nsxkd.nsxkdCode;
        elements.nsxkdName.textContent = nsxkd.nsxkdName;
        elements.phoneNumber.textContent = nsxkd.phoneNumber;
        elements.email.textContent = nsxkd.email;
        elements.mst.textContent = nsxkd.mst;
        elements.address.textContent = nsxkd.address;
        elements.note.textContent = nsxkd.note;
        if (nsxkd.logo) {
            elements.logo.src = nsxkd.logo;
        } else {
            elements.logoContainer.textContent = 'Không có logo';
        }
        if (nsxkd.dkkd) {
            elements.dkkd.src = nsxkd.dkkd;
        } else {
            elements.dkkdContainer.textContent = 'Không có ảnh ĐKKD';
        }
        elements.status.innerHTML = `<span class="badge ${statusBadgeClass[nsxkd.status]}">${nsxkd.status}</span>`;
        elements.linkedDate.textContent = formatDate(nsxkd.linkedDate);
    };

    const renderTableRow = (product, index, start) => `
        <tr>
            <td class="text-center">${start + index + 1}</td>
            <td>${product.productCode}</td>
            <td>${product.productName}</td>
            <td>${product.productType}</td>
            <td>${formatDate(product.authDate)}</td>
            <td><span class="badge ${statusBadgeClass[product.status]}">${product.status}</span></td>
        </tr>
    `;

    const renderCardItem = (product) => `
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">${product.productName}</h6>
                    <p class="card-text mb-1"><strong>Mã sản phẩm:</strong> ${product.productCode}</p>
                    <p class="card-text mb-1"><strong>Loại sản phẩm:</strong> ${product.productType}</p>
                    <p class="card-text mb-1"><strong>Ngày phân quyền:</strong> ${formatDate(product.authDate)}</p>
                    <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${statusBadgeClass[product.status]}">${product.status}</span></p>
                </div>
            </div>
        </div>
    `;

    const renderProducts = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = products.slice(start, end);

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

        renderPagination(products.length);
        elements.resultCount.textContent = `${products.length}/${products.length} kết quả`;
    };

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
                renderProducts();
            }
        }));
    };

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

    elements.backBtn.addEventListener('click', () => {
        window.loadContent('nsxkd-management');
    });

    elements.editBtn.addEventListener('click', () => {
        window.loadContent('nsxkd-edit');
    });

    fetchNsxkdDetails();
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.initNsxkdDetailPage === 'function') {
        window.initNsxkdDetailPage();
    }
});