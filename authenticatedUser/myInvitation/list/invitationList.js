// Fake data
const invitations = [
    { id: 1, name: "GoldField", phone: "0888.****.****", address: "Tòa CienCo 1, đường Hoàng Đạo Thúy, Phường Nhân Chính, Quận Thanh Xuân, Thành phố Hà Nội", date: "2025-06-03", status: "Chờ duyệt" },
    { id: 2, name: "Mộc An", phone: "0888.****.****", address: "Tòa CienCo 1, đường Hoàng Đạo Thúy, Phường Nhân Chính, Quận Thanh Xuân, Thành phố Hà Nội", date: "2025-06-02", status: "Chấp nhận" },
    { id: 3, name: "An Lành", phone: "0888.****.****", address: "Tòa CienCo 1, đường Hoàng Đạo Thúy, Phường Nhân Chính, Quận Thanh Xuân, Thành phố Hà Nội", date: "2025-06-01", status: "Từ chối" },
    { id: 4, name: "Nike", phone: "0888.****.****", address: "Tòa CienCo 1, đường Hoàng Đạo Thúy, Phường Nhân Chính, Quận Thanh Xuân, Thành phố Hà Nội", date: "2025-06-04", status: "Chờ duyệt" }
];

// Log to confirm script is loaded

// Define the initialization function globally
window.initInvitationList = function() {

    // Retry mechanism to ensure DOM elements are found
    function initializeWithRetry(attempts = 5, delay = 100) {
        const modalElement = document.getElementById('registerSubjectModal');
        if (!modalElement) {
            console.error("Modal element with ID 'registerSubjectModal' not found in the DOM");
            return;
        }

        const invitationList = document.getElementById('invitationList');
        const nameFilter = document.getElementById('nameFilter');
        const phoneFilter = document.getElementById('phoneFilter');
        const statusFilter = document.getElementById('statusFilter');
        const dateFilter = document.getElementById('dateFilter');
        const searchBtn = document.getElementById('searchBtn');
        const clearBtn = document.getElementById('clearBtn');

        if (!invitationList || !nameFilter || !phoneFilter || !statusFilter || !dateFilter || !searchBtn || !clearBtn) {
            if (attempts > 0) {
                console.warn(`Required elements not found, retrying... (${attempts} attempts left)`);
                setTimeout(() => initializeWithRetry(attempts - 1, delay), delay);
            } else {
                console.error("One or more required elements not found in the DOM after retries");
            }
            return;
        }

        // Render invitation list
        function renderInvitations(data) {
            invitationList.innerHTML = '';
            data.forEach(invitation => {
                const card = document.createElement('div');
                card.className = 'card mb-3';
                card.innerHTML = `
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex align-items-center">
                            <img src="https://via.placeholder.com/50" alt="${invitation.name} Logo" class="me-3">
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${invitation.name}</h6>
                                <p class="mb-1">${invitation.phone}</p>
                                <p class="mb-0 text-muted">${invitation.address}</p>
                                <p class="date mb-0">Ngày gửi: ${invitation.date}</p>
                                <p class="status mb-0">Trạng thái: ${invitation.status}</p>
                            </div>
                        </div>
                        <div class="card-buttons">
                            <button class="btn btn-info btn-sm detail-btn" data-id="${invitation.id}">Xem chi tiết</button>
                            ${invitation.status === "Chờ duyệt" ? `
                                <button class="btn btn-success btn-sm accept-btn" data-id="${invitation.id}">Duyệt</button>
                                <button class="btn btn-danger btn-sm reject-btn" data-id="${invitation.id}">Từ chối</button>
                            ` : ''}
                        </div>
                    </div>
                `;
                invitationList.appendChild(card);
            });

            // Attach event listeners to newly created buttons
            attachButtonListeners();
        }

        // Attach event listeners to buttons
        function attachButtonListeners() {
            document.querySelectorAll('.detail-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    // Find the corresponding invitation from the invitations array
                    const invitation = invitations.find(inv => inv.id === parseInt(id));
                    if (invitation) {
                        // Load the detail modal dynamically
                        fetch('../../authenticatedUser/myInvitation/detail/detail.html')
                            .then(response => {
                                if (!response.ok) throw new Error(`Failed to fetch detail.html: ${response.status}`);
                                return response.text();
                            })
                            .then(data => {
                                // Check if the detail modal already exists
                                let detailModal = document.getElementById('detailModal');
                                if (detailModal) {
                                    detailModal.remove(); // Remove existing modal to avoid duplicates
                                }
                                document.body.insertAdjacentHTML('beforeend', data);
                                detailModal = document.getElementById('detailModal');
                                if (!detailModal) throw new Error('Detail modal not found after insertion');

                                const existingScript = document.querySelector('script[data-modal-js="detail"]');
                                if (existingScript) existingScript.remove();
                                const script = document.createElement('script');
                                script.src = '../../authenticatedUser/myInvitation/detail/detail.js';
                                script.setAttribute('data-modal-js', 'detail');
                                document.body.appendChild(script);

                                const existingCss = document.querySelector('link[href="../../authenticatedUser/myInvitation/detail/detail.css"]');
                                if (!existingCss) {
                                    const cssLink = document.createElement('link');
                                    cssLink.rel = 'stylesheet';
                                    cssLink.href = '../../authenticatedUser/myInvitation/detail/detail.css';
                                    document.head.appendChild(cssLink);
                                }

                                // Wait for the script to load and then initialize the modal
                                script.onload = () => {
                                    if (window.initDetailModal) {
                                        window.initDetailModal(invitation);
                                    } else {
                                        console.error('initDetailModal function not found after script load');
                                    }
                                };
                            })
                            .catch(error => console.error('Error loading detail modal:', error));
                    } else {
                        console.error(`Invitation with ID ${id} not found`);
                    }
                });
            });
            document.querySelectorAll('.accept-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    e.target.closest('.card').remove();
                });
            });
            document.querySelectorAll('.reject-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    e.target.closest('.card').remove();
                });
            });
        }
        renderInvitations(invitations);

        // Filter function
        function filterInvitations() {
            let filtered = [...invitations];
            const name = nameFilter.value.toLowerCase();
            const phone = phoneFilter.value;
            const status = statusFilter.value;
            const date = dateFilter.value;

            if (name) filtered = filtered.filter(inv => inv.name.toLowerCase().includes(name));
            if (phone) filtered = filtered.filter(inv => inv.phone.includes(phone));
            if (status) filtered = filtered.filter(inv => inv.status === status);
            if (date) filtered = filtered.filter(inv => inv.date === date);

            renderInvitations(filtered);
        }

        // Event listeners for filter
        searchBtn.addEventListener('click', filterInvitations);
        clearBtn.addEventListener('click', () => {
            nameFilter.value = '';
            phoneFilter.value = '';
            statusFilter.value = '';
            dateFilter.value = '';
            renderInvitations(invitations);
        });
    }

    // Start the initialization with retry
    initializeWithRetry();
};