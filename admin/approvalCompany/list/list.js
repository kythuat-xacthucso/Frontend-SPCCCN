function initProfileList() {
    const profileTableBody = document.getElementById('profileTableBody');
    const cardList = document.querySelector('.card-list');
    const searchUnitName = document.getElementById('searchUnitName');
    const searchTaxCode = document.getElementById('searchTaxCode');
    const searchEmail = document.getElementById('searchEmail');
    const searchPhone = document.getElementById('searchPhone');
    const searchStatus = document.getElementById('searchStatus');
    const searchBtn = document.getElementById('searchBtn');
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    const addNewBtn = document.getElementById('addNewBtn');
    const pagination = document.getElementById('pagination');
    const resultCount = document.getElementById('resultCount');
    const itemsPerPageSelect = document.getElementById('itemsPerPage');

    // Sample data (replace with API call if needed)
    const profiles = [
        { id: 1, unitName: 'Công ty TNHH ABC', taxCode: '1234567890', email: 'abc@example.com', phone: '0123456789', status: 'Chờ duyệt', submittedDate: '2025-05-01' },
        { id: 2, unitName: 'Công ty CP XYZ', taxCode: '0987654321', email: 'xyz@example.com', phone: '0987654321', status: 'Đã duyệt', submittedDate: '2025-05-02' },
        { id: 3, unitName: 'Công ty TNHH DEF', taxCode: '1122334455', email: 'def@example.com', phone: '0912345678', status: 'Từ chối', submittedDate: '2025-05-03' },
        { id: 4, unitName: 'Công ty CP GHI', taxCode: '5566778899', email: 'ghi@example.com', phone: '0932145678', status: 'Chờ duyệt', submittedDate: '2025-05-04' },
    ];

    let filteredProfiles = [...profiles];
    let itemsPerPage = parseInt(itemsPerPageSelect.value);
    let currentPage = 1;

    // Function to render table data
    function renderTable(data, page) {
        profileTableBody.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((profile, index) => {
            const row = document.createElement('tr');
            const statusBadgeClass = {
                'Chờ duyệt': 'bg-warning text-dark',
                'Đã duyệt': 'bg-success text-white',
                'Từ chối': 'bg-danger text-white'
            }[profile.status] || 'bg-secondary';
            
            let actionButtons = `
                <button class="btn btn-sm btn-outline-primary me-1 view-details-btn" title="Xem chi tiết" data-id="${profile.id}">
                    <i class="bi bi-eye"></i>
                </button>
            `;
            if (profile.status === 'Chờ duyệt') {
                actionButtons += `
                    <button class="btn btn-sm btn-outline-success me-1 approve-btn" title="Duyệt" data-id="${profile.id}">
                        <i class="bi bi-check-circle"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger reject-btn" title="Từ chối" data-id="${profile.id}">
                        <i class="bi bi-x-circle"></i>
                    </button>
                `;
            }

            row.innerHTML = `
                <td class="text-center">${start + index + 1}</td>
                <td>${profile.unitName}</td>
                <td>${profile.taxCode}</td>
                <td>${profile.email}</td>
                <td>${profile.phone}</td>
                <td><span class="badge ${statusBadgeClass}">${profile.status}</span></td>
                <td class="text-center">${actionButtons}</td>
            `;
            profileTableBody.appendChild(row);
        });

        renderCards(data, page);
        addActionListeners();
        renderPagination(data.length);
        resultCount.textContent = `${data.length}/${profiles.length} kết quả`;
    }

    // Function to render card view for mobile
    function renderCards(data, page) {
        cardList.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((profile, index) => {
            const statusBadgeClass = {
                'Chờ duyệt': 'bg-warning text-dark',
                'Đã duyệt': 'bg-success text-white',
                'Từ chối': 'bg-danger text-white'
            }[profile.status] || 'bg-secondary';

            let actionButtons = `
                <button class="btn btn-sm btn-outline-primary me-1 view-details-btn" title="Xem chi tiết" data-id="${profile.id}">
                    <i class="bi bi-eye"></i>
                </button>
            `;
            if (profile.status === 'Chờ duyệt') {
                actionButtons += `
                    <button class="btn btn-sm btn-outline-success me-1 approve-btn" title="Duyệt" data-id="${profile.id}">
                        <i class="bi bi-check-circle"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger reject-btn" title="Từ chối" data-id="${profile.id}">
                        <i class="bi bi-x-circle"></i>
                    </button>
                `;
            }

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-body">
                    <h6 class="card-title">${profile.unitName}</h6>
                    <p class="card-text mb-1"><strong>Mã số thuế:</strong> ${profile.taxCode}</p>
                    <p class="card-text mb-1"><strong>Email:</strong> ${profile.email}</p>
                    <p class="card-text mb-1"><strong>Số điện thoại:</strong> ${profile.phone}</p>
                    <p class="card-text mb-1"><strong>Trạng thái:</strong> <span class="badge ${statusBadgeClass}">${profile.status}</span></p>
                    <p class="card-text mb-1"><strong>Ngày gửi:</strong> ${profile.submittedDate}</p>
                    <div class="d-flex gap-1 mt-2">${actionButtons}</div>
                </div>
            `;
            cardList.appendChild(card);
        });
    }

    // Function to add action listeners
    function addActionListeners() {
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const profileId = btn.getAttribute('data-id');
                loadDetails(profileId);
            });
        });

        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const profileId = btn.getAttribute('data-id');
                alert(`Duyệt hồ sơ ID: ${profileId}`); // Replace with actual approval logic
            });
        });

        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const profileId = btn.getAttribute('data-id');
                alert(`Từ chối hồ sơ ID: ${profileId}`); // Replace with actual rejection logic
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
                renderTable(filteredProfiles, currentPage);
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
                renderTable(filteredProfiles, currentPage);
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
                renderTable(filteredProfiles, currentPage);
            }
        });
        pagination.appendChild(nextLi);
    }

    // Function to load details page
    function loadDetails(profileId) {
        if (typeof window.loadContent === 'function') {
            window.loadContent('subject-details', { profileId: profileId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Function to load add new page
    function loadAddNewPage() {
        if (typeof window.loadContent === 'function') {
            window.loadContent('subject-add-new');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Search functionality
    searchBtn.addEventListener('click', () => {
        const unitName = searchUnitName.value.trim().toLowerCase();
        const taxCode = searchTaxCode.value.trim().toLowerCase();
        const email = searchEmail.value.trim().toLowerCase();
        const phone = searchPhone.value.trim().toLowerCase();
        const status = searchStatus.value;

        filteredProfiles = profiles.filter(profile =>
            (unitName === '' || profile.unitName.toLowerCase().includes(unitName)) &&
            (taxCode === '' || profile.taxCode.toLowerCase().includes(taxCode)) &&
            (email === '' || profile.email.toLowerCase().includes(email)) &&
            (phone === '' || profile.phone.toLowerCase().includes(phone)) &&
            (status === '' || profile.status === status)
        );
        currentPage = 1;
        renderTable(filteredProfiles, currentPage);
    });

    // Clear filter functionality
    clearFilterBtn.addEventListener('click', () => {
        searchUnitName.value = '';
        searchTaxCode.value = '';
        searchEmail.value = '';
        searchPhone.value = '';
        searchStatus.value = '';
        filteredProfiles = [...profiles];
        currentPage = 1;
        renderTable(filteredProfiles, currentPage);
    });

    // Add new button functionality
    addNewBtn.addEventListener('click', () => {
        loadAddNewPage();
    });

    // Items per page change
    itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(itemsPerPageSelect.value);
        currentPage = 1;
        renderTable(filteredProfiles, currentPage);
    });

    // Initial render
    renderTable(filteredProfiles, currentPage);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProfileList);