(function initServiceList() {
    const serviceTableBody = document.getElementById('serviceTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addNewBtn = document.getElementById('addNewBtn');
    const pagination = document.getElementById('pagination');
    const resultCount = document.getElementById('resultCount');

    // Sample data (replace with API call if needed)
    const services = [
        { id: 1, name: 'Gói Cơ Bản', price: 1000000, unit: 'Tháng', status: 'Hoạt động', createdDate: '2025-05-01', createdBy: 'Nguyễn Văn A' },
        { id: 2, name: 'Gói Nâng Cao', price: 2000000, unit: 'Tháng', status: 'Tạm ngưng', createdDate: '2025-05-02', createdBy: 'Trần Thị B' },
        { id: 3, name: 'Gói Cao Cấp', price: 3000000, unit: 'Năm', status: 'Hoạt động', createdDate: '2025-05-03', createdBy: 'Lê Văn C' },
        { id: 4, name: 'Gói Đặc Biệt', price: 5000000, unit: 'Năm', status: 'Hoạt động', createdDate: '2025-05-04', createdBy: 'Phạm Thị D' },
    ];

    let filteredServices = [...services];
    let currentPage = 1;
    const itemsPerPage = 10; // Fixed value

    // Function to render table data
    function renderTable(data, page) {
        serviceTableBody.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((service, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center">${start + index + 1}</td>
                <td>${service.name}</td>
                <td>${service.price.toLocaleString('vi-VN')} VNĐ</td>
                <td>${service.unit}</td>
                <td><span class="badge ${service.status === 'Hoạt động' ? 'bg-success' : 'bg-warning'}">${service.status}</span></td>
                <td>${service.createdDate}</td>
                <td>${service.createdBy}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1 view-details-btn" title="Xem chi tiết" data-id="${service.id}">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary edit-btn" title="Sửa" data-id="${service.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            `;
            serviceTableBody.appendChild(row);
        });

        // Add event listeners for action buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const serviceId = btn.getAttribute('data-id');
                loadDetails(serviceId);
            });
        });
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const serviceId = btn.getAttribute('data-id');
                loadEdit(serviceId);
            });
        });

        renderPagination(data.length);
        resultCount.textContent = `${data.length}/${services.length} kết quả`;
    }

    // Function to render pagination
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        pagination.innerHTML = '';

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a>`;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderTable(filteredServices, currentPage);
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
                renderTable(filteredServices, currentPage);
            });
            pagination.appendChild(pageLi);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a>`;
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(filteredServices, currentPage);
            }
        });
        pagination.appendChild(nextLi);
    }

    // Function to load details page
    function loadDetails(serviceId) {
        if (typeof window.loadContent === 'function') {
            window.loadContent('service-details', { serviceId: serviceId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Function to load edit page
    function loadEdit(serviceId) {
        if (typeof window.loadContent === 'function') {
            window.loadContent('service-edit', { serviceId: serviceId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Function to load add new page
    function loadAddNewPage() {
        if (typeof window.loadContent === 'function') {
            window.loadContent('service-add-new');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Search functionality
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredServices = services.filter(service =>
            service.name.toLowerCase().includes(searchTerm) ||
            service.createdBy.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        renderTable(filteredServices, currentPage);
    });

    // Add new button functionality
    addNewBtn.addEventListener('click', () => {
        loadAddNewPage();
    });

    // Initial render
    renderTable(filteredServices, currentPage);
})();