const initCompanyList = () => {
    const elements = {
        tableView: document.getElementById('tableView'),
        cardGridView: document.getElementById('cardGridView'),
        companyTableBody: document.getElementById('companyTableBody'),
        filterStatus: document.getElementById('filter_status'),
        filterCompanyCode: document.getElementById('filter_company_code'),
        filterCompanyName: document.getElementById('filter_company_name'),
        filterPhoneNumber: document.getElementById('filter_phone_number'),
        filterStatusMobile: document.getElementById('filter_status_mobile'),
        filterCompanyCodeMobile: document.getElementById('filter_company_code_mobile'),
        filterCompanyNameMobile: document.getElementById('filter_company_name_mobile'),
        filterPhoneNumberMobile: document.getElementById('filter_phone_number_mobile'),
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
        addNewCompanyBtn: document.getElementById('addNewCompanyBtn'),
    };

    let companies = [], filteredCompanies = [], itemsPerPage = 10, currentPage = 1, isTableView = true;
    const statusBadgeClass = {
        'Chờ duyệt': 'badge-pending',
        'Đã duyệt': 'badge-approved',
        'Từ chối': 'badge-rejected',
        'Đã hủy': 'badge-cancelled'
    };

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

    // Fetch companies with mock data
    const fetchCompanies = async () => {
        elements.loadingSpinner.classList.remove('d-none');
        try {
            await new Promise((resolve) =>
                setTimeout(() => resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 1, companyCode: 'CT001', companyName: 'Công ty A', phoneNumber: '0901234567', createdDate: '2025-05-07', status: 'Chờ duyệt' },
                        { id: 2, companyCode: 'CT002', companyName: 'Công ty B', phoneNumber: '0912345678', createdDate: '2025-05-05', status: 'Đã duyệt' },
                        { id: 3, companyCode: 'CT003', companyName: 'Công ty C', phoneNumber: '0923456789', createdDate: '2025-05-07', status: 'Chờ duyệt' },
                        { id: 4, companyCode: 'CT004', companyName: 'Công ty D', phoneNumber: '0934567890', createdDate: '2025-05-07', status: 'Từ chối' },
                        { id: 5, companyCode: 'CT005', companyName: 'Công ty E', phoneNumber: '0945678901', createdDate: '2025-05-07', status: 'Chờ duyệt' },
                        { id: 6, companyCode: 'CT006', companyName: 'Công ty F', phoneNumber: '0956789012', createdDate: '2025-05-06', status: 'Đã duyệt' },
                        { id: 7, companyCode: 'CT007', companyName: 'Công ty G', phoneNumber: '0967890123', createdDate: '2025-01-03', status: 'Chờ duyệt' },
                        { id: 8, companyCode: 'CT008', companyName: 'Công ty H', phoneNumber: '0978901234', createdDate: '2025-01-03', status: 'Đã hủy' },
                    ]),
                }), 1000)
            );
            companies = [
                { id: 1, companyCode: 'CT001', companyName: 'Công ty A', phoneNumber: '0901234567', createdDate: '2025-05-07', status: 'Chờ duyệt' },
                { id: 2, companyCode: 'CT002', companyName: 'Công ty B', phoneNumber: '0912345678', createdDate: '2025-05-05', status: 'Đã duyệt' },
                { id: 3, companyCode: 'CT003', companyName: 'Công ty C', phoneNumber: '0923456789', createdDate: '2025-05-07', status: 'Chờ duyệt' },
                { id: 4, companyCode: 'CT004', companyName: 'Công ty D', phoneNumber: '0934567890', createdDate: '2025-05-07', status: 'Từ chối' },
                { id: 5, companyCode: 'CT005', companyName: 'Công ty E', phoneNumber: '0945678901', createdDate: '2025-05-07', status: 'Chờ duyệt' },
                { id: 6, companyCode: 'CT006', companyName: 'Công ty F', phoneNumber: '0956789012', createdDate: '2025-05-06', status: 'Đã duyệt' },
                { id: 7, companyCode: 'CT007', companyName: 'Công ty G', phoneNumber: '0967890123', createdDate: '2025-01-03', status: 'Chờ duyệt' },
                { id: 8, companyCode: 'CT008', companyName: 'Công ty H', phoneNumber: '0978901234', createdDate: '2025-01-03', status: 'Đã hủy' },
            ];
            filteredCompanies = [...companies];
            elements.errorBanner.classList.add('d-none');
            renderData();
        } catch (error) {
            console.error('Fetch error:', error);
            elements.errorBanner.classList.remove('d-none');
            elements.emptyState.classList.add('d-none');
            [elements.companyTableBody, elements.cardGridView, elements.pagination].forEach(el => el && (el.innerHTML = ''));
        } finally {
            elements.loadingSpinner.classList.add('d-none');
        }
    };

    const updateCompanyStatus = async (companyId, newStatus) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const companyIndex = companies.findIndex(c => c.id === parseInt(companyId));
            if (companyIndex !== -1) {
                companies[companyIndex].status = newStatus;
                filteredCompanies = [...companies];
                renderData();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating company status:', error);
            return false;
        }
    };

    const renderTableRow = (company, index, start) => `
        <tr>
            <td class="text-center">${start + index + 1}</td>
            <td><span data-bs-toggle="tooltip" data-bs-title="Mã chủ thể: ${company.companyCode}\nTên chủ thể: ${company.companyName}">${company.companyCode}</span></td>
            <td>${company.companyName}</td>
            <td>${company.phoneNumber}</td>
            <td>${formatDate(company.createdDate)}</td>
            <td><span class="badge ${statusBadgeClass[company.status]}">${company.status}</span></td>
            <td class="text-center action-buttons">
                <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${company.id}"><i class="bi bi-eye"></i></button>
                ${company.status === 'Chờ duyệt' ? `<button class="btn btn-sm btn-outline-danger cancel-btn" data-id="${company.id}"><i class="bi bi-x-circle"></i></button>` : ''}
            </td>
        </tr>
    `;

    const renderCardItem = (company) => `
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">${company.companyName}</h6>
                    <p class="card-text mb-1"><strong>Mã chủ thể:</strong> ${company.companyCode}</p>
                    <p class="card-text mb-1"><strong>Số điện thoại:</strong> ${company.phoneNumber}</p>
                    <p class="card-text mb-1"><strong>Thời gian tạo:</strong> ${formatDate(company.createdDate)}</p>
                    <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${statusBadgeClass[company.status]}">${company.status}</span></p>
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${company.id}"><i class="bi bi-eye"></i> Xem chi tiết</button>
                        ${company.status === 'Chờ duyệt' ? `<button class="btn btn-sm btn-outline-danger cancel-btn" data-id="${company.id}"><i class="bi bi-x-circle"></i> Hủy lời mời</button>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    const renderData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = filteredCompanies.slice(start, end);

        if (filteredCompanies.length === 0) {
            elements.emptyState.classList.remove('d-none');
            [elements.companyTableBody, elements.cardGridView, elements.pagination].forEach(el => el && (el.innerHTML = ''));
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
            elements.companyTableBody.innerHTML = paginatedData.map((company, index) => renderTableRow(company, index, start)).join('');
        } else {
            elements.cardGridView.innerHTML = paginatedData.map(renderCardItem).join('');
        }

        renderPagination(filteredCompanies.length);
        elements.resultCount.textContent = `${filteredCompanies.length}/${companies.length} kết quả`;
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
        const companyCode = (elements.filterCompanyCode.value || elements.filterCompanyCodeMobile.value).trim().toLowerCase();
        const companyName = (elements.filterCompanyName.value || elements.filterCompanyNameMobile.value).trim().toLowerCase();
        const phoneNumber = (elements.filterPhoneNumber.value || elements.filterPhoneNumberMobile.value).trim().toLowerCase();

        filteredCompanies = companies.filter(company => {
            const matchesStatus = !status || company.status === status;
            const matchesCode = !companyCode || company.companyCode.toLowerCase().includes(companyCode);
            const matchesName = !companyName || company.companyName.toLowerCase().includes(companyName);
            const matchesPhone = !phoneNumber || company.phoneNumber.toLowerCase().includes(phoneNumber);
            return matchesStatus && matchesCode && matchesName && matchesPhone;
        });

        currentPage = 1;
        renderData();
    };

    const clearFilters = () => {
        [elements.filterStatus, elements.filterCompanyCode, elements.filterCompanyName, elements.filterPhoneNumber,
        elements.filterStatusMobile, elements.filterCompanyCodeMobile, elements.filterCompanyNameMobile, elements.filterPhoneNumberMobile]
            .forEach(el => el.value = '');
        applyFilters();
    };

    const handleCancel = (companyId) => {
        if (window.Popup && typeof window.Popup.showApproveConfirm === 'function') {
            window.Popup.showApproveConfirm(
                companyId,
                async (id) => {
                    const success = await updateCompanyStatus(id, 'Đã hủy');
                    if (success && window.Toast && typeof window.Toast.showSuccess === 'function') {
                        window.Toast.showSuccess('Hủy lời mời liên kết thành công!');
                    }
                },
                'Bạn có chắc chắn muốn hủy lời mời liên kết này không?'
            );
        }
    };

    const addActionListeners = () => {
        // Xử lý sự kiện cho nút Thêm mới
        elements.addNewCompanyBtn.addEventListener('click', () => {
            window.loadContent('company-add-new');
        });

        document.querySelectorAll('.view-details-btn').forEach(btn => btn.addEventListener('click', () => {
            const companyId = btn.dataset.id;
            window.loadContent('company-details', { companyId });
        }));

        document.querySelectorAll('.cancel-btn').forEach(btn => btn.addEventListener('click', () => {
            const companyId = btn.dataset.id;
            handleCancel(companyId);
        }));
    };

    const debouncedApplyFilters = debounce(applyFilters, 300);
    [elements.toggleTableViewBtn, elements.toggleCardViewBtn].forEach(btn => btn.addEventListener('click', () => {
        isTableView = btn === elements.toggleTableViewBtn;
        renderData();
    }));
    [elements.applyFilterBtn, elements.applyFilterMobileBtn].forEach(btn => btn.addEventListener('click', applyFilters));
    [elements.clearFilterBtn, elements.clearFilterMobileBtn].forEach(btn => btn.addEventListener('click', clearFilters));
    [elements.reloadMobileBtn, elements.retryBtn].forEach(btn => btn.addEventListener('click', fetchCompanies));
    elements.itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(elements.itemsPerPageSelect.value);
        currentPage = 1;
        renderData();
    });
    [elements.filterCompanyCode, elements.filterCompanyName, elements.filterPhoneNumber,
    elements.filterCompanyCodeMobile, elements.filterCompanyNameMobile, elements.filterPhoneNumberMobile]
        .forEach(el => el.addEventListener('input', debouncedApplyFilters));

    fetchCompanies();
};

document.addEventListener('DOMContentLoaded', initCompanyList);