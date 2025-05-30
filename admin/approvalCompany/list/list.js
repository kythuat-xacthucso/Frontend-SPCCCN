const initProfileList = () => {
    // DOM Elements
    const elements = {
        profileTableBody: document.getElementById('profileTableBody'),
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
        reloadBtn: document.getElementById('reloadBtn'),
        reloadMobileBtn: document.getElementById('reloadMobileBtn'),
        retryBtn: document.getElementById('retryBtn'),
        errorBanner: document.getElementById('errorBanner'),
        emptyState: document.getElementById('emptyState'),
        pagination: document.getElementById('pagination'),
        resultCount: document.getElementById('resultCount'),
        itemsPerPageSelect: document.getElementById('itemsPerPage'),
        toggleTableViewBtn: document.getElementById('toggleTableViewBtn'),
        toggleCardViewBtn: document.getElementById('toggleCardViewBtn'),
    };

    let profiles = [];
    let filteredProfiles = [];
    let itemsPerPage = 10;
    let currentPage = 1;
    let isTableView = true;

    const statusBadgeClass = {
        'Chờ duyệt': 'badge-pending',
        'Đã duyệt': 'badge-approved',
        'Từ chối': 'badge-rejected',
        'Đã tạo chủ thể': 'badge-created',
    };

    // Utility: Format date to dd/mm/yyyy
    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    // Fetch profiles from API
    const fetchProfiles = async () => {
        try {
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 1, unitName: 'Công ty TNHH ABC', taxCode: '1234567890', email: 'abc@example.com', submittedDate: '2025-05-01', status: 'Chờ duyệt' },
                        { id: 2, unitName: 'Công ty CP XYZ', taxCode: '0987654321', email: 'xyz@example.com', submittedDate: '2025-05-02', status: 'Đã duyệt' },
                        { id: 3, unitName: 'Công ty TNHH DEF', taxCode: '1122334455', email: 'def@example.com', submittedDate: '2025-05-03', status: 'Từ chối' },
                        { id: 4, unitName: 'Công ty CP GHI', taxCode: '5566778899', email: 'ghi@example.com', submittedDate: '2025-05-04', status: 'Đã tạo chủ thể' },
                    ]),
                }), 1000)
            );

            if (!response.ok) throw new Error('Network error');
            profiles = await response.json();
            filteredProfiles = [...profiles];
            elements.errorBanner.classList.add('d-none');
            renderData();
        } catch (error) {
            elements.errorBanner.classList.remove('d-none');
            elements.emptyState.classList.add('d-none');
            if (elements.profileTableBody) elements.profileTableBody.innerHTML = '';
            if (elements.cardGridView) elements.cardGridView.innerHTML = '';
            if (elements.pagination) elements.pagination.innerHTML = '';
        }
    };

    // Update profile status (mock API call)
    const updateProfileStatus = async (profileId, newStatus) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const profileIndex = profiles.findIndex(p => p.id === parseInt(profileId));
            if (profileIndex !== -1) {
                profiles[profileIndex].status = newStatus;
                filteredProfiles = [...profiles];
                renderData();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating profile status:', error);
            return false;
        }
    };

    // Handle approve action
    const handleApprove = (profileId) => {
        window.Popup.showApproveConfirm(profileId, async () => {
            const success = await updateProfileStatus(profileId, 'Đã duyệt');
            if (success) {
                window.Toast.showSuccess('Duyệt hồ sơ thành công!');
            }
        });
    };

    // Handle reject action
    const handleReject = (profileId) => {
        window.Popup.showRejectConfirm(profileId, async () => {
            const success = await updateProfileStatus(profileId, 'Từ chối');
            if (success) {
                window.Toast.showSuccess('Từ chối hồ sơ thành công!');
            }
        });
    };

    // Handle create entity action
    const handleCreateEntity = (profileId) => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('subject-add-new', { profileId });
        } else {
            console.error('loadContent function not found');
        }
    };

    // Handle view entity details action
    const handleViewEntityDetails = (profileId) => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-details', { profileId });
        } else {
            console.error('loadContent function not found');
        }
    };

    // Render table row
    const renderTableRow = (profile, index, start) => `
        <tr>
            <td class="text-center">${start + index + 1}</td>
            <td><span data-bs-toggle="tooltip" data-bs-title="Tên pháp lý: ${profile.unitName}\nNgày gửi: ${formatDate(profile.submittedDate)}">${profile.unitName}</span></td>
            <td>${profile.taxCode}</td>
            <td>${profile.email}</td>
            <td>${formatDate(profile.submittedDate)}</td>
            <td><span class="badge ${statusBadgeClass[profile.status] || 'badge-secondary'}">${profile.status}</span></td>
            <td class="text-center action-buttons">
                <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${profile.id}">
                    <i class="bi bi-eye"></i> Xem chi tiết
                </button>
                ${profile.status === 'Chờ duyệt' ? `
                    <button class="btn btn-sm btn-outline-success approve-btn" data-id="${profile.id}">
                        <i class="bi bi-check-circle"></i> Duyệt
                    </button>
                    <button class="btn btn-sm btn-outline-danger reject-btn" data-id="${profile.id}">
                        <i class="bi bi-x-circle"></i> Từ chối
                    </button>
                ` : ''}
                ${profile.status === 'Đã duyệt' ? `
                    <button class="btn btn-sm btn-outline-info create-entity-btn" data-id="${profile.id}">
                        <i class="bi bi-plus-circle"></i> Tạo chủ thể
                    </button>
                ` : ''}
                ${profile.status === 'Đã tạo chủ thể' ? `
                    <button class="btn btn-sm btn-outline-secondary view-entity-details-btn" data-id="${profile.id}">
                        <i class="bi bi-eye"></i> Xem chi tiết chủ thể
                    </button>
                ` : ''}
            </td>
        </tr>
    `;

    // Render card item
    const renderCardItem = (profile) => `
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">${profile.unitName}</h6>
                    <p class="card-text mb-1"><strong>Mã số thuế:</strong> <span data-bs-toggle="tooltip" data-bs-title="Tên pháp lý: ${profile.unitName}\nNgày gửi: ${formatDate(profile.submittedDate)}">${profile.taxCode}</span></p>
                    <p class="card-text mb-1"><strong>Ngày gửi:</strong> ${formatDate(profile.submittedDate)}</p>
                    <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${statusBadgeClass[profile.status] || 'badge-secondary'}">${profile.status}</span></p>
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-outline-primary view-details-btn" data-id="${profile.id}">
                            <i class="bi bi-eye"></i> Xem chi tiết
                        </button>
                        ${profile.status === 'Chờ duyệt' ? `
                            <button class="btn btn-sm btn-outline-success approve-btn" data-id="${profile.id}">
                                <i class="bi bi-check-circle"></i> Duyệt
                            </button>
                            <button class="btn btn-sm btn-outline-danger reject-btn" data-id="${profile.id}">
                                <i class="bi bi-x-circle"></i> Từ chối
                            </button>
                        ` : ''}
                        ${profile.status === 'Đã duyệt' ? `
                            <button class="btn btn-sm btn-outline-info create-entity-btn" data-id="${profile.id}">
                                <i class="bi bi-plus-circle"></i> Tạo chủ thể
                            </button>
                        ` : ''}
                        ${profile.status === 'Đã tạo chủ thể' ? `
                            <button class="btn btn-sm btn-outline-secondary view-entity-details-btn" data-id="${profile.id}">
                                <i class="bi bi-eye"></i> Xem chi tiết chủ thể
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
        const paginatedData = filteredProfiles.slice(start, end);

        if (filteredProfiles.length === 0) {
            elements.emptyState.classList.remove('d-none');
            if (elements.profileTableBody) elements.profileTableBody.innerHTML = '';
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

        if (isDesktopTableView && elements.profileTableBody) {
            elements.profileTableBody.innerHTML = paginatedData
                .map((profile, index) => renderTableRow(profile, index, start))
                .join('');
        }

        if (!isDesktopTableView && elements.cardGridView) {
            elements.cardGridView.innerHTML = paginatedData
                .map((profile) => renderCardItem(profile))
                .join('');
        }

        if (elements.pagination) renderPagination(filteredProfiles.length);
        if (elements.resultCount) elements.resultCount.textContent = `${filteredProfiles.length}/${profiles.length} kết quả`;
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

        filteredProfiles = profiles.filter((profile) => {
            const matchesStatus = !status || profile.status === status;
            const matchesName = !spcName || profile.unitName.toLowerCase().includes(spcName);
            const matchesDate = !dateStart || !dateEnd || (
                new Date(profile.submittedDate) >= new Date(dateStart) &&
                new Date(profile.submittedDate) <= new Date(dateEnd)
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

    // Add action listeners for view details, approve, reject, create entity, and view entity details
    const addActionListeners = () => {
        // View details
        document.querySelectorAll('.view-details-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const profileId = btn.getAttribute('data-id');
                if (typeof window.loadContent === 'function') {
                    window.loadContent('subject-details', { profileId });
                } else {
                    console.error('loadContent function not found');
                }
            });
        });

        // Approve
        document.querySelectorAll('.approve-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const profileId = btn.getAttribute('data-id');
                handleApprove(profileId);
            });
        });

        // Reject
        document.querySelectorAll('.reject-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const profileId = btn.getAttribute('data-id');
                handleReject(profileId);
            });
        });

        // Create entity
        document.querySelectorAll('.create-entity-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const profileId = btn.getAttribute('data-id');
                handleCreateEntity(profileId);
            });
        });

        // View entity details
        document.querySelectorAll('.view-entity-details-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const profileId = btn.getAttribute('data-id');
                handleViewEntityDetails(profileId);
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
    elements.reloadBtn.addEventListener('click', fetchProfiles);
    elements.reloadMobileBtn.addEventListener('click', fetchProfiles);
    elements.retryBtn.addEventListener('click', fetchProfiles);
    elements.itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(elements.itemsPerPageSelect.value);
        currentPage = 1;
        renderData();
    });
    elements.filterSpcName.addEventListener('input', applyFilters);
    elements.filterSpcNameMobile.addEventListener('input', applyFilters);

    fetchProfiles();
};

document.addEventListener('DOMContentLoaded', initProfileList);