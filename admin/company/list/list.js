function initCompanyList() {
    const entityTableBody = document.getElementById('entityTableBody');
    const cardList = document.querySelector('.card-list');
    const searchEntityName = document.getElementById('searchEntityName');
    const searchEntityCode = document.getElementById('searchEntityCode');
    const searchPhone = document.getElementById('searchPhone');
    const searchStatus = document.getElementById('searchStatus');
    const searchBtn = document.getElementById('searchBtn');
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    const addNewBtn = document.getElementById('addNewBtn');
    const pagination = document.getElementById('pagination');
    const resultCount = document.getElementById('resultCount');
    const itemsPerPageSelect = document.getElementById('itemsPerPage');

    // Sample data (replace with API call if needed)
    const entities = [
        { id: 1, entityName: 'Chủ thể A', entityCode: 'CT001', phone: '0912345678', status: 'Hoạt động', createdDate: '2025-05-01' },
        { id: 2, entityName: 'Chủ thể B', entityCode: 'CT002', phone: '0987654321', status: 'Khóa', createdDate: '2025-05-02' },
        { id: 3, entityName: 'Chủ thể C', entityCode: 'CT003', phone: '0931234567', status: 'Hoạt động', createdDate: '2025-05-03' },
        { id: 4, entityName: 'Chủ thể D', entityCode: 'CT004', phone: '0978765432', status: 'Hoạt động', createdDate: '2025-05-04' },
    ];

    let filteredEntities = [...entities];
    let itemsPerPage = parseInt(itemsPerPageSelect.value);
    let currentPage = 1;

    // Function to render table data
    function renderTable(data, page) {
        entityTableBody.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((entity, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center">${start + index + 1}</td>
                <td>${entity.entityName}</td>
                <td>${entity.entityCode}</td>
                <td>${entity.phone}</td>
                <td><span class="badge ${entity.status === 'Hoạt động' ? 'bg-success' : 'bg-danger'}">${entity.status}</span></td>
                <td>${entity.createdDate}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary view-details-btn" title="Xem chi tiết" data-id="${entity.id}">
                        <i class="bi bi-eye"></i>
                    </button>
                </td>
            `;
            entityTableBody.appendChild(row);
        });

        renderCards(data, page);
        addActionListeners();
        renderPagination(data.length);
        resultCount.textContent = `${data.length}/${entities.length} kết quả`;
    }

    // Function to render card view for mobile
    function renderCards(data, page) {
        cardList.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((entity, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-body">
                    <h6 class="card-title">${entity.entityName}</h6>
                    <p class="card-text mb-1"><strong>Mã chủ thể:</strong> ${entity.entityCode}</p>
                    <p class="card-text mb-1"><strong>Số điện thoại:</strong> ${entity.phone}</p>
                    <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${entity.status === 'Hoạt động' ? 'bg-success' : 'bg-danger'}">${entity.status}</span></p>
                    <p class="card-text mb-1"><strong>Ngày tạo:</strong> ${entity.createdDate}</p>
                    <div class="d-flex gap-1 mt-2">
                        <button class="btn btn-sm btn-outline-primary view-details-btn" title="Xem chi tiết" data-id="${entity.id}">
                            <i class="bi bi-eye"></i>
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
                const entityId = btn.getAttribute('data-id');
                loadDetails(entityId);
            });
        });
    }

    // Function to render pagination
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        pagination.innerHTML = '';

        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a>`;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderTable(filteredEntities, currentPage);
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
                renderTable(filteredEntities, currentPage);
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
                renderTable(filteredEntities, currentPage);
            }
        });
        pagination.appendChild(nextLi);
    }

    // Function to load details page
    function loadDetails(entityId) {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-details', { entityId: entityId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Function to load add new page
    function loadAddNewPage() {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-add-new');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Search functionality
    searchBtn.addEventListener('click', () => {
        const entityName = searchEntityName.value.trim().toLowerCase();
        const entityCode = searchEntityCode.value.trim().toLowerCase();
        const phone = searchPhone.value.trim().toLowerCase();
        const status = searchStatus.value;

        filteredEntities = entities.filter(entity =>
            (entityName === '' || entity.entityName.toLowerCase().includes(entityName)) &&
            (entityCode === '' || entity.entityCode.toLowerCase().includes(entityCode)) &&
            (phone === '' || entity.phone.toLowerCase().includes(phone)) &&
            (status === '' || entity.status === status)
        );
        currentPage = 1;
        renderTable(filteredEntities, currentPage);
    });

    // Clear filter functionality
    clearFilterBtn.addEventListener('click', () => {
        searchEntityName.value = '';
        searchEntityCode.value = '';
        searchPhone.value = '';
        searchStatus.value = '';
        filteredEntities = [...entities];
        currentPage = 1;
        renderTable(filteredEntities, currentPage);
    });

    // Add new button functionality
    addNewBtn.addEventListener('click', () => {
        loadAddNewPage();
    });

    // Items per page change
    itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(itemsPerPageSelect.value);
        currentPage = 1;
        renderTable(filteredEntities, currentPage);
    });

    // Initial render
    renderTable(filteredEntities, currentPage);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCompanyList);