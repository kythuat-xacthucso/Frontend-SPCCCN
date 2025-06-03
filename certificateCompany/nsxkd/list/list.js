const initNsxkdList = () => {
    const elements = {
        tableView: document.getElementById('tableView'),
        cardGridView: document.getElementById('cardGridView'),
        nsxkdTableBody: document.getElementById('nsxkdTableBody'),
        filterNsxkdCode: document.getElementById('filter_nsxkd_code'),
        filterNsxkdName: document.getElementById('filter_nsxkd_name'),
        filterMst: document.getElementById('filter_mst'),
        filterPhoneNumber: document.getElementById('filter_phone_number'),
        filterEmail: document.getElementById('filter_email'),
        filterStatus: document.getElementById('filter_status'),
        filterStatusMobile: document.getElementById('filter_status_mobile'),
        filterNsxkdCodeMobile: document.getElementById('filter_nsxkd_code_mobile'),
        filterNsxkdNameMobile: document.getElementById('filter_nsxkd_name_mobile'),
        filterMstMobile: document.getElementById('filter_mst_mobile'),
        filterPhoneNumberMobile: document.getElementById('filter_phone_number_mobile'),
        filterEmailMobile: document.getElementById('filter_email_mobile'),
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
    };

    let nsxkds = [], filteredNsxkds = [], itemsPerPage = 10, currentPage = 1, isTableView = true;
    const statusBadgeClass = {
        'Đang hoạt động': 'badge-active',
        'Khóa': 'badge-locked'
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

    // Fetch NSXKD with mock data
    const fetchNsxkds = async () => {
        elements.loadingSpinner.classList.remove('d-none');
        try {
            await new Promise((resolve) =>
                setTimeout(() => resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 1, nsxkdCode: 'NSX001', nsxkdName: 'Công ty A', mst: '0901234567', phoneNumber: '0901234567', email: 'a@example.com', linkedDate: '2025-05-07', status: 'Đang hoạt động' },
                        { id: 2, nsxkdCode: 'NSX002', nsxkdName: 'Công ty B', mst: '0912345678', phoneNumber: '0912345678', email: 'b@example.com', linkedDate: '2025-05-05', status: 'Khóa' },
                        { id: 3, nsxkdCode: 'NSX003', nsxkdName: 'Công ty C', mst: '0923456789', phoneNumber: '0923456789', email: 'c@example.com', linkedDate: '2025-05-07', status: 'Đang hoạt động' },
                        { id: 4, nsxkdCode: 'NSX004', nsxkdName: 'Công ty D', mst: '0934567890', phoneNumber: '0934567890', email: 'd@example.com', linkedDate: '2025-05-07', status: 'Khóa' },
                        { id: 5, nsxkdCode: 'NSX005', nsxkdName: 'Công ty E', mst: '0945678901', phoneNumber: '0945678901', email: 'e@example.com', linkedDate: '2025-05-07', status: 'Đang hoạt động' },
                        { id: 6, nsxkdCode: 'NSX006', nsxkdName: 'Công ty F', mst: '0956789012', phoneNumber: '0956789012', email: 'f@example.com', linkedDate: '2025-05-06', status: 'Khóa' },
                        { id: 7, nsxkdCode: 'NSX007', nsxkdName: 'Công ty G', mst: '0967890123', phoneNumber: '0967890123', email: 'g@example.com', linkedDate: '2025-01-03', status: 'Đang hoạt động' },
                        { id: 8, nsxkdCode: 'NSX008', nsxkdName: 'Công ty H', mst: '0978901234', phoneNumber: '0978901234', email: 'h@example.com', linkedDate: '2025-01-03', status: 'Khóa' },
                    ]),
                }), 1000)
            );
            nsxkds = [
                { id: 1, nsxkdCode: 'NSX001', nsxkdName: 'Công ty A', mst: '0901234567', phoneNumber: '0901234567', email: 'a@example.com', linkedDate: '2025-05-07', status: 'Đang hoạt động' },
                { id: 2, nsxkdCode: 'NSX002', nsxkdName: 'Công ty B', mst: '0912345678', phoneNumber: '0912345678', email: 'b@example.com', linkedDate: '2025-05-05', status: 'Khóa' },
                { id: 3, nsxkdCode: 'NSX003', nsxkdName: 'Công ty C', mst: '0923456789', phoneNumber: '0923456789', email: 'c@example.com', linkedDate: '2025-05-07', status: 'Đang hoạt động' },
                { id: 4, nsxkdCode: 'NSX004', nsxkdName: 'Công ty D', mst: '0934567890', phoneNumber: '0934567890', email: 'd@example.com', linkedDate: '2025-05-07', status: 'Khóa' },
                { id: 5, nsxkdCode: 'NSX005', nsxkdName: 'Công ty E', mst: '0945678901', phoneNumber: '0945678901', email: 'e@example.com', linkedDate: '2025-05-07', status: 'Đang hoạt động' },
                { id: 6, nsxkdCode: 'NSX006', nsxkdName: 'Công ty F', mst: '0956789012', phoneNumber: '0956789012', email: 'f@example.com', linkedDate: '2025-05-06', status: 'Khóa' },
                { id: 7, nsxkdCode: 'NSX007', nsxkdName: 'Công ty G', mst: '0967890123', phoneNumber: '0967890123', email: 'g@example.com', linkedDate: '2025-01-03', status: 'Đang hoạt động' },
                { id: 8, nsxkdCode: 'NSX008', nsxkdName: 'Công ty H', mst: '0978901234', phoneNumber: '0978901234', email: 'h@example.com', linkedDate: '2025-01-03', status: 'Khóa' },
            ];
            filteredNsxkds = [...nsxkds];
            elements.errorBanner.classList.add('d-none');
            renderData();
        } catch (error) {
            console.error('Fetch error:', error);
            elements.errorBanner.classList.remove('d-none');
            elements.emptyState.classList.add('d-none');
            [elements.nsxkdTableBody, elements.cardGridView, elements.pagination].forEach(el => el && (el.innerHTML = ''));
        } finally {
            elements.loadingSpinner.classList.add('d-none');
        }
    };

    const updateNsxkdStatus = async (nsxkdId, newStatus) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const nsxkdIndex = nsxkds.findIndex(n => n.id === parseInt(nsxkdId));
            if (nsxkdIndex !== -1) {
                nsxkds[nsxkdIndex].status = newStatus;
                filteredNsxkds = [...nsxkds];
                renderData();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating NSXKD status:', error);
            return false;
        }
    };

    const renderTableRow = (nsxkd, index, start) => `
        <tr>
            <td class="text-center">${start + index + 1}</td>
            <td><span data-bs-toggle="tooltip" data-bs-title="Mã NSXKD: ${nsxkd.nsxkdCode}\nTên NSXKD: ${nsxkd.nsxkdName}">${nsxkd.nsxkdCode}</span></td>
            <td>${nsxkd.nsxkdName}</td>
            <td>${nsxkd.mst}</td>
            <td>${nsxkd.phoneNumber}</td>
            <td>${nsxkd.email}</td>
            <td>${formatDate(nsxkd.linkedDate)}</td>
            <td><span class="badge ${statusBadgeClass[nsxkd.status]}">${nsxkd.status}</span></td>
            <td class="text-center action-buttons">
                <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${nsxkd.id}"><i class="bi bi-eye"></i></button>
                <button class="btn btn-sm btn-outline-secondary edit-btn" data-id="${nsxkd.id}"><i class="bi bi-pencil"></i></button>
            </td>
        </tr>
    `;

    const renderCardItem = (nsxkd) => `
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">${nsxkd.nsxkdName}</h6>
                    <p class="card-text mb-1"><strong>Mã NSXKD:</strong> ${nsxkd.nsxkdCode}</p>
                    <p class="card-text mb-1"><strong>MST:</strong> ${nsxkd.mst}</p>
                    <p class="card-text mb-1"><strong>Số điện thoại:</strong> ${nsxkd.phoneNumber}</p>
                    <p class="card-text mb-1"><strong>Email:</strong> ${nsxkd.email}</p>
                    <p class="card-text mb-1"><strong>Thời gian liên kết:</strong> ${formatDate(nsxkd.linkedDate)}</p>
                    <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${statusBadgeClass[nsxkd.status]}">${nsxkd.status}</span></p>
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${nsxkd.id}"><i class="bi bi-eye"></i> Xem chi tiết</button>
                        <button class="btn btn-sm btn-outline-secondary edit-btn" data-id="${nsxkd.id}"><i class="bi bi-pencil"></i> Sửa</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const renderData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = filteredNsxkds.slice(start, end);

        if (filteredNsxkds.length === 0) {
            elements.emptyState.classList.remove('d-none');
            [elements.nsxkdTableBody, elements.cardGridView, elements.pagination].forEach(el => el && (el.innerHTML = ''));
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
            elements.nsxkdTableBody.innerHTML = paginatedData.map((nsxkd, index) => renderTableRow(nsxkd, index, start)).join('');
        } else {
            elements.cardGridView.innerHTML = paginatedData.map(renderCardItem).join('');
        }

        renderPagination(filteredNsxkds.length);
        elements.resultCount.textContent = `${filteredNsxkds.length}/${nsxkds.length} kết quả`;
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
        const nsxkdCode = (elements.filterNsxkdCode.value || elements.filterNsxkdCodeMobile.value).trim().toLowerCase();
        const nsxkdName = (elements.filterNsxkdName.value || elements.filterNsxkdNameMobile.value).trim().toLowerCase();
        const mst = (elements.filterMst.value || elements.filterMstMobile.value).trim().toLowerCase();
        const phoneNumber = (elements.filterPhoneNumber.value || elements.filterPhoneNumberMobile.value).trim().toLowerCase();
        const email = (elements.filterEmail.value || elements.filterEmailMobile.value).trim().toLowerCase();

        filteredNsxkds = nsxkds.filter(nsxkd => {
            const matchesStatus = !status || nsxkd.status === status;
            const matchesCode = !nsxkdCode || nsxkd.nsxkdCode.toLowerCase().includes(nsxkdCode);
            const matchesName = !nsxkdName || nsxkd.nsxkdName.toLowerCase().includes(nsxkdName);
            const matchesMst = !mst || nsxkd.mst.toLowerCase().includes(mst);
            const matchesPhone = !phoneNumber || nsxkd.phoneNumber.toLowerCase().includes(phoneNumber);
            const matchesEmail = !email || nsxkd.email.toLowerCase().includes(email);
            return matchesStatus && matchesCode && matchesName && matchesMst && matchesPhone && matchesEmail;
        });

        currentPage = 1;
        renderData();
    };

    const clearFilters = () => {
        [elements.filterNsxkdCode, elements.filterNsxkdName, elements.filterMst, elements.filterPhoneNumber, elements.filterEmail, elements.filterStatus,
        elements.filterStatusMobile, elements.filterNsxkdCodeMobile, elements.filterNsxkdNameMobile, elements.filterMstMobile, elements.filterPhoneNumberMobile, elements.filterEmailMobile]
            .forEach(el => el.value = '');
        applyFilters();
    };

    const handleViewDetails = (nsxkdId) => {
        window.loadContent('nsxkd-details', { entityId: nsxkdId });
    };

    const handleEdit = (nsxkdId) => {
        window.loadContent('nsxkd-edit', { entityId: nsxkdId });
    };

    const addActionListeners = () => {
        document.querySelectorAll('.view-details-btn').forEach(btn => btn.addEventListener('click', () => {
            const nsxkdId = btn.dataset.id;
            handleViewDetails(nsxkdId);
        }));

        document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', () => {
            const nsxkdId = btn.dataset.id;
            handleEdit(nsxkdId);
        }));
    };

    const debouncedApplyFilters = debounce(applyFilters, 300);
    [elements.toggleTableViewBtn, elements.toggleCardViewBtn].forEach(btn => btn.addEventListener('click', () => {
        isTableView = btn === elements.toggleTableViewBtn;
        renderData();
    }));
    [elements.applyFilterBtn, elements.applyFilterMobileBtn].forEach(btn => btn.addEventListener('click', applyFilters));
    [elements.clearFilterBtn, elements.clearFilterMobileBtn].forEach(btn => btn.addEventListener('click', clearFilters));
    [elements.reloadMobileBtn, elements.retryBtn].forEach(btn => btn.addEventListener('click', fetchNsxkds));
    elements.itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(elements.itemsPerPageSelect.value);
        currentPage = 1;
        renderData();
    });
    [elements.filterNsxkdCode, elements.filterNsxkdName, elements.filterMst, elements.filterPhoneNumber, elements.filterEmail,
    elements.filterNsxkdCodeMobile, elements.filterNsxkdNameMobile, elements.filterMstMobile, elements.filterPhoneNumberMobile, elements.filterEmailMobile]
        .forEach(el => el.addEventListener('input', debouncedApplyFilters));

    fetchNsxkds();
};

document.addEventListener('DOMContentLoaded', initNsxkdList);