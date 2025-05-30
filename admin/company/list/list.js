const initCompanyList = () => {
    // DOM Elements
    const elements = {
        entityTableBody: document.getElementById('entityTableBody'),
        cardGridView: document.getElementById('cardGridView'),
        tableView: document.getElementById('tableView'),
        filterStatus: document.getElementById('filter_status'),
        filterSpcName: document.getElementById('filter_spc_name'),
        filterDateRangeStart: document.getElementById('filter_date_range_start'),
        filterDateRangeEnd: document.getElementById('filter_date_range_end'),
        filterStatusMobile: document.getElementById('filter_status_mobile'),
        filterSpcNameMobile: document.getElementById('filter_spc_name_mobile'),
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
    };

    let entities = [];
    let filteredEntities = [];
    let itemsPerPage = 10;
    let currentPage = 1;
    let isTableView = true;

    const statusBadgeClass = {
        'Đang hoạt động': 'badge-active',
        'Khóa': 'badge-locked',
        'Mới tạo': 'badge-new',
    };

    // Utility: Format date to dd/mm/yyyy
    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    // Fetch entities from API
    const fetchEntities = async () => {
        elements.loadingSpinner.classList.remove('d-none');
        try {
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 1, entityName: 'Chủ thể A', entityCode: 'CT001', phone: '0912345678', admin: 'Nguyễn Văn A', status: 'Đang hoạt động', createdDate: '2025-05-01' },
                        { id: 2, entityName: 'Chủ thể B', entityCode: 'CT002', phone: '0987654321', admin: 'Trần Thị B', status: 'Khóa', createdDate: '2025-05-02' },
                        { id: 3, entityName: 'Chủ thể C', entityCode: 'CT003', phone: '0931234567', admin: 'Lê Văn C', status: 'Mới tạo', createdDate: '2025-05-03' },
                        { id: 4, entityName: 'Chủ thể D', entityCode: 'CT004', phone: '0978765432', admin: 'Phạm Thị D', status: 'Đang hoạt động', createdDate: '2025-05-04' },
                    ]),
                }), 1000)
            );

            if (!response.ok) throw new Error('Network error');
            entities = await response.json();
            filteredEntities = [...entities];
            elements.errorBanner.classList.add('d-none');
            renderData();
        } catch (error) {
            elements.errorBanner.classList.remove('d-none');
            elements.emptyState.classList.add('d-none');
            if (elements.entityTableBody) elements.entityTableBody.innerHTML = '';
            if (elements.cardGridView) elements.cardGridView.innerHTML = '';
            if (elements.pagination) elements.pagination.innerHTML = '';
        } finally {
            elements.loadingSpinner.classList.add('d-none');
        }
    };

    // Update entity status (mock API call)
    const updateEntityStatus = async (entityId, newStatus) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const entityIndex = entities.findIndex(e => e.id === parseInt(entityId));
            if (entityIndex !== -1) {
                entities[entityIndex].status = newStatus;
                filteredEntities = [...entities];
                renderData();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating entity status:', error);
            return false;
        }
    };

    // Handle lock action
    const handleLock = (entityId) => {
        window.Popup.showConfirm('Xác nhận khóa', 'Bạn có chắc chắn muốn khóa chủ thể này?', async () => {
            const success = await updateEntityStatus(entityId, 'Khóa');
            if (success) {
                window.Toast.showSuccess('Khóa chủ thể thành công!');
            }
        });
    };

    // Handle unlock action
    const handleUnlock = (entityId) => {
        window.Popup.showConfirm('Xác nhận mở khóa', 'Bạn có chắc chắn muốn mở khóa chủ thể này?', async () => {
            const success = await updateEntityStatus(entityId, 'Đang hoạt động');
            if (success) {
                window.Toast.showSuccess('Mở khóa chủ thể thành công!');
            }
        });
    };

    // Handle assign admin action
    const handleAssignAdmin = (entityId) => {
        window.Popup.showConfirm('Gán quyền quản trị', 'Bạn có muốn gán quyền quản trị cho chủ thể này?', async () => {
            const success = await updateEntityStatus(entityId, 'Đang hoạt động');
            if (success) {
                window.Toast.showSuccess('Gán quyền quản trị thành công!');
            }
        });
    };

    // Render table row
    const renderTableRow = (entity, index, start) => `
        <tr>
            <td class="text-center">${start + index + 1}</td>
            <td><span data-bs-toggle="tooltip" data-bs-title="Tên pháp lý: ${entity.entityName}\nNgày tạo: ${formatDate(entity.createdDate)}">${entity.entityName}</span></td>
            <td>${entity.entityCode}</td>
            <td>${entity.phone}</td>
            <td>${entity.admin}</td>
            <td><span class="badge ${statusBadgeClass[entity.status] || 'badge-secondary'}">${entity.status}</span></td>
            <td>${formatDate(entity.createdDate)}</td>
            <td class="text-center action-buttons">
                <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${entity.id}">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-warning edit-btn" data-id="${entity.id}">
                    <i class="bi bi-pencil"></i>
                </button>
                ${entity.status === 'Đang hoạt động' || entity.status === 'Mới tạo' ? `
                    <button class="btn btn-sm btn-outline-danger lock-btn" data-id="${entity.id}">
                        <i class="bi bi-lock"></i>
                    </button>
                ` : ''}
                ${entity.status === 'Khóa' ? `
                    <button class="btn btn-sm btn-outline-success unlock-btn" data-id="${entity.id}">
                        <i class="bi bi-unlock"></i>
                    </button>
                ` : ''}
                ${entity.status === 'Mới tạo' ? `
                    <button class="btn btn-sm btn-outline-info assign-admin-btn" data-id="${entity.id}">
                        <i class="bi bi-person-plus"></i>
                    </button>
                ` : ''}
            </td>
        </tr>
    `;

    // Render card item
    const renderCardItem = (entity) => `
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">${entity.entityName}</h6>
                    <p class="card-text mb-1"><strong>Mã chủ thể:</strong> <span data-bs-toggle="tooltip" data-bs-title="Tên pháp lý: ${entity.entityName}\nNgày tạo: ${formatDate(entity.createdDate)}">${entity.entityCode}</span></p>
                    <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${statusBadgeClass[entity.status] || 'badge-secondary'}">${entity.status}</span></p>
                    <p class="card-text mb-1"><strong>Ngày tạo:</strong> ${formatDate(entity.createdDate)}</span></p>
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${entity.id}">
                            <i class="bi bi-eye"></i> Xem chi tiết
                        </button>
                        <button class="btn btn-sm btn-outline-warning edit-btn" data-id="${entity.id}">
                            <i class="bi bi-pencil"></i> Sửa
                        </button>
                        ${entity.status === 'Đang hoạt động' || entity.status === 'Mới tạo' ? `
                            <button class="btn btn-sm btn-outline-danger lock-btn" data-id="${entity.id}">
                                <i class="bi bi-lock"></i> Khóa
                            </button>
                        ` : ''}
                        ${entity.status === 'Khóa' ? `
                            <button class="btn btn-sm btn-outline-success unlock-btn" data-id="${entity.id}">
                                <i class="bi bi-unlock"></i> Mở khóa
                            </button>
                        ` : ''}
                        ${entity.status === 'Mới tạo' ? `
                            <button class="btn btn-sm btn-outline-info assign-admin-btn" data-id="${entity.id}">
                                <i class="bi bi-person-plus"></i> Gán quyền
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Render data
    const renderData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = filteredEntities.slice(start, end);

        if (filteredEntities.length === 0) {
            elements.emptyState.classList.remove('d-none');
            if (elements.entityTableBody) elements.entityTableBody.innerHTML = '';
            if (elements.cardGridView) elements.cardGridView.innerHTML = '';
            if (elements.pagination) elements.pagination.innerHTML = '';
            if (elements.resultCount) elements.resultCount.textContent = '0/0 kết quả';
            return;
        }
        elements.emptyState.classList.add('d-none');

        const isDesktopTableView = isTableView && window.innerWidth >= 768;
        if (elements.tableView && elements.cardGridView) {
            elements.tableView.classList.toggle('active', isDesktopTableView);
            elements.tableView.classList.toggle('d-none', !isDesktopTableView);
            elements.cardGridView.classList.toggle('active', !isDesktopTableView);
            elements.cardGridView.classList.toggle('d-none', isDesktopTableView);
        }

        if (isDesktopTableView && elements.entityTableBody) {
            elements.entityTableBody.innerHTML = paginatedData
                .map((entity, index) => renderTableRow(entity, index, start))
                .join('');
        }

        if (!isDesktopTableView && elements.cardGridView) {
            elements.cardGridView.innerHTML = paginatedData
                .map((entity) => renderCardItem(entity))
                .join('');
        }

        if (elements.pagination) renderPagination(filteredEntities.length);
        if (elements.resultCount) elements.resultCount.textContent = `${filteredEntities.length}/${entities.length} kết quả`;
        addActionListeners();
        initTooltips();
    };

    // Initialize tooltips
    const initTooltips = () => {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(
            (el) => new bootstrap.Tooltip(el)
        );
    };

    // Render pagination
    const renderPagination = (totalItems) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (!elements.pagination) return;

        elements.pagination.innerHTML = `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a>
            </li>
            ${Array.from({ length: totalPages }, (_, i) => `
                <li class="page-item ${i + 1 === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#">${i + 1}</a>
                </li>
            `).join('')}
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a>
            </li>
        `;

        elements.pagination.querySelectorAll('.page-link').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = parseInt(link.textContent) || (link.getAttribute('aria-label') === 'Previous' ? currentPage - 1 : currentPage + 1);
                if (targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage) {
                    currentPage = targetPage;
                    renderData();
                }
            });
        });
    };

    // Apply filters
    const applyFilters = () => {
        const status = elements.filterStatus.value || elements.filterStatusMobile.value;
        const spcName = (elements.filterSpcName.value || elements.filterSpcNameMobile.value).trim().toLowerCase();
        const dateStart = elements.filterDateRangeStart.value || elements.filterDateRangeStartMobile.value;
        const dateEnd = elements.filterDateRangeEnd.value || elements.filterDateRangeEndMobile.value;

        filteredEntities = entities.filter((entity) => {
            const matchesStatus = !status || entity.status === status;
            const matchesName = !spcName || entity.entityName.toLowerCase().includes(spcName);
            const matchesDate = !dateStart || !dateEnd || (
                new Date(entity.createdDate) >= new Date(dateStart) &&
                new Date(entity.createdDate) <= new Date(dateEnd)
            );
            return matchesStatus && matchesName && matchesDate;
        });

        currentPage = 1;
        renderData();
    };

    // Clear filters
    const clearFilters = () => {
        elements.filterStatus.value = '';
        elements.filterSpcName.value = '';
        elements.filterDateRangeStart.value = '';
        elements.filterDateRangeEnd.value = '';
        elements.filterStatusMobile.value = '';
        elements.filterSpcNameMobile.value = '';
        elements.filterDateRangeStartMobile.value = '';
        elements.filterDateRangeEndMobile.value = '';
        applyFilters();
    };

    // Add action listeners for view details, edit, lock, unlock, and assign admin buttons
    const addActionListeners = () => {
        // View details
        document.querySelectorAll('.view-details-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const entityId = btn.getAttribute('data-id');
                if (typeof window.loadContent === 'function') {
                    window.loadContent('company-details', { entityId });
                } else {
                    console.error('loadContent function not found');
                }
            });
        });

        // Edit
        document.querySelectorAll('.edit-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const entityId = btn.getAttribute('data-id');
                if (typeof window.loadContent === 'function') {
                    window.loadContent('company-edit', { entityId });
                } else {
                    console.error('loadContent function not found');
                }
            });
        });

        // Lock
        document.querySelectorAll('.lock-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const entityId = btn.getAttribute('data-id');
                handleLock(entityId);
            });
        });

        // Unlock
        document.querySelectorAll('.unlock-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const entityId = btn.getAttribute('data-id');
                handleUnlock(entityId);
            });
        });

        // Assign admin
        document.querySelectorAll('.assign-admin-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const entityId = btn.getAttribute('data-id');
                handleAssignAdmin(entityId);
            });
        });
    };

    // Event listeners
    elements.toggleTableViewBtn.addEventListener('click', () => {
        isTableView = true;
        renderData();
    });

    elements.toggleCardViewBtn.addEventListener('click', () => {
        isTableView = false;
        renderData();
    });

    elements.applyFilterBtn.addEventListener('click', applyFilters);
    elements.applyFilterMobileBtn.addEventListener('click', applyFilters);
    elements.clearFilterBtn.addEventListener('click', clearFilters);
    elements.clearFilterMobileBtn.addEventListener('click', clearFilters);
    elements.reloadMobileBtn.addEventListener('click', fetchEntities);
    elements.retryBtn.addEventListener('click', fetchEntities);
    elements.itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(elements.itemsPerPageSelect.value);
        currentPage = 1;
        renderData();
    });
    elements.filterSpcName.addEventListener('input', applyFilters);
    elements.filterSpcNameMobile.addEventListener('input', applyFilters);

    fetchEntities();
};

document.addEventListener('DOMContentLoaded', initCompanyList);