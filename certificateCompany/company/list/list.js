(function () {
    const companies = [
        { id: 1, name: 'Công ty TNHH ABC', phone: '0912345678', representative: 'Nguyễn Văn A', createdTime: '2025-05-16 15:00', status: 'Chờ duyệt' },
        { id: 2, name: 'Công ty CP XYZ', phone: '0987654321', representative: 'Trần Thị B', createdTime: '2025-05-15 09:30', status: 'Đã duyệt' },
        { id: 3, name: 'Công ty TNHH DEF', phone: '0931234567', representative: 'Lê Văn C', createdTime: '2025-05-14 14:20', status: 'Từ chối' },
        { id: 4, name: 'Công ty CP GHI', phone: '0978765432', representative: 'Phạm Thị D', createdTime: '2025-05-13 11:10', status: 'Chờ duyệt' },
        { id: 5, name: 'Công ty TNHH JKL', phone: '0901234567', representative: 'Hoàng Văn E', createdTime: '2025-05-12 10:00', status: 'Đã duyệt' },
        { id: 6, name: 'Công ty CP MNO', phone: '0945678901', representative: 'Vũ Thị F', createdTime: '2025-05-11 08:45', status: 'Từ chối' }
    ];

    function initCompanyList() {
        const elements = {
            tableBody: document.getElementById('entityTableBody'),
            cardList: document.querySelector('.card-list'),
            searchName: document.getElementById('searchEntityName'),
            searchPhone: document.getElementById('searchPhone'),
            searchStatus: document.getElementById('searchStatus'),
            searchBtn: document.getElementById('searchBtn'),
            clearBtn: document.getElementById('clearFilterBtn'),
            inviteBtn: document.getElementById('inviteBtn'),
            pagination: document.getElementById('pagination'),
            resultCount: document.getElementById('resultCount'),
            itemsPerPage: document.getElementById('itemsPerPage')
        };

        let state = {
            filteredCompanies: [...companies],
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
            paginatedData.forEach((company, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="text-center">${start + index + 1}</td>
                    <td>${company.name}</td>
                    <td>${company.phone}</td>
                    <td>${company.representative}</td>
                    <td>${company.createdTime}</td>
                    <td><span class="badge ${getStatusClass(company.status)}">${company.status}</span></td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary view-details-btn" title="Xem chi tiết" data-id="${company.id}">
                            <i class="bi bi-eye"></i>
                        </button>
                        ${company.status === 'Chờ duyệt' ? `
                            <button class="btn btn-sm btn-outline-danger cancel-invite-btn" title="Hủy lời mời" data-id="${company.id}">
                                <i class="bi bi-x-circle"></i>
                            </button>
                        ` : ''}
                    </td>
                `;
                fragment.appendChild(row);
            });
            elements.tableBody.appendChild(fragment);

            renderCards(data, page);
            renderPagination(data.length);
            if (elements.resultCount) {
                elements.resultCount.textContent = `${data.length}/${companies.length} kết quả`;
            }
        }

        function renderCards(data, page) {
            if (!elements.cardList) return;
            elements.cardList.innerHTML = '';
            const start = (page - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            const paginatedData = data.slice(start, end);

            const fragment = document.createDocumentFragment();
            paginatedData.forEach((company) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-body">
                        <h6 class="card-title">${company.name}</h6>
                        <p class="card-text mb-1"><strong>Số điện thoại:</strong> ${company.phone}</p>
                        <p class="card-text mb-1"><strong>Người đại diện:</strong> ${company.representative}</p>
                        <p class="card-text mb-1"><strong>Thời gian:</strong> ${company.createdTime}</p>
                        <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${getStatusClass(company.status)}">${company.status}</span></p>
                        <div class="d-flex gap-1 mt-2">
                            <button class="btn btn-sm btn-outline-primary view-details-btn" title="Xem chi tiết" data-id="${company.id}">
                                <i class="bi bi-eye"></i>
                            </button>
                            ${company.status === 'Chờ duyệt' ? `
                                <button class="btn btn-sm btn-outline-danger cancel-invite-btn" title="Hủy lời mời" data-id="${company.id}">
                                    <i class="bi bi-x-circle"></i>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `;
                fragment.appendChild(card);
            });
            elements.cardList.appendChild(fragment);
        }

        function getStatusClass(status) {
            switch (status) {
                case 'Chờ duyệt': return 'bg-warning text-dark';
                case 'Đã duyệt': return 'bg-success';
                case 'Từ chối': return 'bg-danger';
                default: return 'bg-secondary';
            }
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
                    renderTable(state.filteredCompanies, state.currentPage);
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
                    renderTable(state.filteredCompanies, state.currentPage);
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
                    renderTable(state.filteredCompanies, state.currentPage);
                }
            });
            fragment.appendChild(nextLi);

            elements.pagination.appendChild(fragment);
        }

        function handleSearch() {
            const name = elements.searchName?.value.trim().toLowerCase() || '';
            const phone = elements.searchPhone?.value.trim().toLowerCase() || '';
            const status = elements.searchStatus?.value || '';

            state.filteredCompanies = companies.filter(company =>
                (!name || company.name.toLowerCase().includes(name)) &&
                (!phone || company.phone.includes(phone)) &&
                (!status || company.status === status)
            );
            state.currentPage = 1;
            renderTable(state.filteredCompanies, state.currentPage);
        }

        function clearFilters() {
            if (elements.searchName) elements.searchName.value = '';
            if (elements.searchPhone) elements.searchPhone.value = '';
            if (elements.searchStatus) elements.searchStatus.value = '';
            state.filteredCompanies = [...companies];
            state.currentPage = 1;
            renderTable(state.filteredCompanies, state.currentPage);
        }

        function loadDetails(companyId) {
            if (typeof window.loadContent === 'function') {
                window.loadContent('company-details', { companyId });
            } else {
                console.error('loadContent not found');
            }
        }

        function cancelInvite(companyId) {
            if (typeof window.loadContent === 'function') {
                window.loadContent('company-cancel-invite', { companyId });
            } else {
                console.error('loadContent not found');
            }
        }

        function loadInvitePage() {
            if (typeof window.loadContent === 'function') {
                window.loadContent('company-invite');
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
            if (elements.inviteBtn) {
                elements.inviteBtn.addEventListener('click', loadInvitePage);
            }
            if (elements.itemsPerPage) {
                elements.itemsPerPage.addEventListener('change', () => {
                    state.itemsPerPage = parseInt(elements.itemsPerPage.value);
                    state.currentPage = 1;
                    renderTable(state.filteredCompanies, state.currentPage);
                });
            }

            elements.tableBody?.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target) return;
                const companyId = target.dataset.id;
                if (target.classList.contains('view-details-btn')) {
                    loadDetails(companyId);
                } else if (target.classList.contains('cancel-invite-btn')) {
                    cancelInvite(companyId);
                }
            });

            elements.cardList?.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target) return;
                const companyId = target.dataset.id;
                if (target.classList.contains('view-details-btn')) {
                    loadDetails(companyId);
                } else if (target.classList.contains('cancel-invite-btn')) {
                    cancelInvite(companyId);
                }
            });
        }

        console.log('list.js loaded, initializing initCompanyList');
        addEventListeners();
        renderTable(state.filteredCompanies, state.currentPage);
    }

    window.initCompanyList = initCompanyList;
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded, calling initCompanyList');
        initCompanyList();
    });
})();