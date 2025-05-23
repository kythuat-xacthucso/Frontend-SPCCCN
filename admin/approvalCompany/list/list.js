function initProfileList() {
    const profileTableBody = document.getElementById('profileTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    const addNewBtn = document.getElementById('addNewBtn');
    const pagination = document.getElementById('pagination');
    const resultCount = document.getElementById('resultCount');

    // Sample data (replace with API call if needed)
    const profiles = [
        { id: 1, unitName: 'Công ty TNHH ABC', taxCode: '1234567890', status: 'Chờ duyệt', submittedDate: '2025-05-01' },
        { id: 2, unitName: 'Công ty CP XYZ', taxCode: '0987654321', status: 'Chờ duyệt', submittedDate: '2025-05-02' },
        { id: 3, unitName: 'Công ty TNHH DEF', taxCode: '1122334455', status: 'Chờ duyệt', submittedDate: '2025-05-03' },
        { id: 4, unitName: 'Công ty CP GHI', taxCode: '5566778899', status: 'Chờ duyệt', submittedDate: '2025-05-04' },
    ];

    let filteredProfiles = [...profiles];
    const itemsPerPage = 2;
    let currentPage = 1;

    // Function to render table data
    function renderTable(data, page) {
        profileTableBody.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((profile, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center">${start + index + 1}</td>
                <td>${profile.unitName}</td>
                <td>${profile.taxCode}</td>
                <td><span class="badge bg-warning text-dark">${profile.status}</span></td>
                <td>${profile.submittedDate}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1 view-details-btn" title="Xem chi tiết" data-id="${profile.id}">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success me-1 approve-btn" title="Duyệt" data-id="${profile.id}">
                        <i class="bi bi-check-circle"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger reject-btn" title="Từ chối" data-id="${profile.id}">
                        <i class="bi bi-x-circle"></i>
                    </button>
                </td>
            `;
            profileTableBody.appendChild(row);
        });

        // Add event listeners for action buttons
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

        renderPagination(data.length);
        resultCount.textContent = `${data.length}/${profiles.length} kết quả`;
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
                renderTable(filteredProfiles, currentPage);
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
                renderTable(filteredProfiles, currentPage);
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
                renderTable(filteredProfiles, currentPage);
            }
        });
        pagination.appendChild(nextLi);
    }

    // Function to load details page
    function loadDetails(profileId) {
        // Use layout.js's loadContent to load the details page
        if (typeof window.loadContent === 'function') {
            window.loadContent('subject-details', { profileId: profileId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Function to load add new page
    function loadAddNewPage() {
        // Use layout.js's loadContent to load the add new page
        if (typeof window.loadContent === 'function') {
            window.loadContent('subject-add-new'); // Define this in layout.js
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Search functionality
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredProfiles = profiles.filter(profile =>
            profile.unitName.toLowerCase().includes(searchTerm) ||
            profile.taxCode.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        renderTable(filteredProfiles, currentPage);
    });

    // Clear filter functionality
    clearFilterBtn.addEventListener('click', () => {
        searchInput.value = '';
        filteredProfiles = [...profiles];
        currentPage = 1;
        renderTable(filteredProfiles, currentPage);
    });

    // Add new button functionality
    addNewBtn.addEventListener('click', () => {
        loadAddNewPage();
    });

    // Initial render
    renderTable(filteredProfiles, currentPage);
}