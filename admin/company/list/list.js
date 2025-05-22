(function initCompanyList() {
    const entityTableBody = document.getElementById('entityTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    const addNewBtn = document.getElementById('addNewBtn');
    const pagination = document.getElementById('pagination');
    const resultCount = document.getElementById('resultCount');

    // Sample data (replace with API call if needed)
    const entities = [
        { id: 1, entityName: 'Chủ thể A', entityCode: 'CT001', phone: '0912345678', status: 'Hoạt động', createdDate: '2025-05-01' },
        { id: 2, entityName: 'Chủ thể B', entityCode: 'CT002', phone: '0987654321', status: 'Khóa', createdDate: '2025-05-02' },
        { id: 3, entityName: 'Chủ thể C', entityCode: 'CT003', phone: '0931234567', status: 'Hoạt động', createdDate: '2025-05-03' },
        { id: 4, entityName: 'Chủ thể D', entityCode: 'CT004', phone: '0978765432', status: 'Hoạt động', createdDate: '2025-05-04' },
    ];

    let filteredEntities = [...entities];
    let currentPage = 1;
    const itemsPerPage = 10; // Fixed value

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

        // Add event listeners for action buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const entityId = btn.getAttribute('data-id');
                loadDetails(entityId);
            });
        });

        renderPagination(data.length);
        resultCount.textContent = `${data.length}/${entities.length} kết quả`;
    }

    // Function to render pagination
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        pagination.innerHTML = '';

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
            </a>
        `;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderTable(filteredEntities, currentPage);
            }
        });
        pagination.appendChild(prevLi);

        // Page numbers
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

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">»</span>
            </a>
        `;
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
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredEntities = entities.filter(entity =>
            entity.entityName.toLowerCase().includes(searchTerm) ||
            entity.entityCode.toLowerCase().includes(searchTerm) ||
            entity.phone.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        renderTable(filteredEntities, currentPage);
    });

    // Clear filter functionality
    clearFilterBtn.addEventListener('click', () => {
        searchInput.value = '';
        filteredEntities = [...entities];
        currentPage = 1;
        renderTable(filteredEntities, currentPage);
    });

    // Add new button functionality
    addNewBtn.addEventListener('click', () => {
        loadAddNewPage();
    });

    // Initial render
    renderTable(filteredEntities, currentPage);
})();