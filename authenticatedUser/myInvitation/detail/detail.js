// Function to initialize and populate the detail modal
function initDetailModal(invitation) {
    console.log("initDetailModal called with:", invitation);

    // Retry mechanism to ensure DOM elements are found
    function initializeWithRetry(attempts = 10, delay = 50) {
        // List of required element IDs
        const elementIds = ['managerCode', 'managerName', 'phone', 'email', 'businessRegNum', 'address', 'note', 'date', 'status', 'logo', 'businessRegImg1', 'businessRegImg2'];
        const elements = elementIds.map(id => document.getElementById(id));
        const footer = document.querySelector('.modal-footer');

        // Check if all elements are found
        if (elements.every(el => el !== null) && footer) {
            // Populate fields
            document.getElementById('managerCode').textContent = invitation.managerCode || "N/A";
            document.getElementById('managerName').textContent = invitation.managerName || "N/A";
            document.getElementById('phone').textContent = invitation.phone || "N/A";
            document.getElementById('email').textContent = invitation.email || "N/A";
            document.getElementById('businessRegNum').textContent = invitation.businessRegNum || "N/A";
            document.getElementById('address').textContent = invitation.address || "N/A";
            document.getElementById('note').textContent = invitation.note || "N/A";
            document.getElementById('date').textContent = invitation.date || "N/A";
            document.getElementById('status').textContent = invitation.status || "N/A";

            // Set images (using placeholder URLs for demo)
            document.getElementById('logo').src = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPAKF0yrzL00Y2amdFjlFzHQpRukwbBqXIg&s`;
            document.getElementById('businessRegImg1').src = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPAKF0yrzL00Y2amdFjlFzHQpRukwbBqXIg&s`;
            document.getElementById('businessRegImg2').src = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPAKF0yrzL00Y2amdFjlFzHQpRukwbBqXIg&s`;

            // Handle buttons based on status
            footer.innerHTML = ''; // Clear existing buttons
            const backButton = document.createElement('button');
            backButton.type = 'button';
            backButton.className = 'btn btn-secondary';
            backButton.setAttribute('data-bs-dismiss', 'modal');
            backButton.textContent = 'Quay lại';
            footer.appendChild(backButton);

            if (invitation.status === "Chờ duyệt") {
                const acceptButton = document.createElement('button');
                acceptButton.type = 'button';
                acceptButton.className = 'btn btn-success ms-2';
                acceptButton.textContent = 'Duyệt';
                acceptButton.addEventListener('click', () => {
                    console.log(`Accepted invitation with ID: ${invitation.id}`);
                    const modal = bootstrap.Modal.getInstance(document.getElementById('detailModal'));
                    modal.hide();
                });

                const rejectButton = document.createElement('button');
                rejectButton.type = 'button';
                rejectButton.className = 'btn btn-danger ms-2';
                rejectButton.textContent = 'Từ chối';
                rejectButton.addEventListener('click', () => {
                    console.log(`Rejected invitation with ID: ${invitation.id}`);
                    const modal = bootstrap.Modal.getInstance(document.getElementById('detailModal'));
                    modal.hide();
                });

                footer.appendChild(acceptButton);
                footer.appendChild(rejectButton);
            }

            // Show the modal
            const modalElement = document.getElementById('detailModal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.error('Detail modal element not found');
            }
        } else if (attempts > 0) {
            console.warn(`Some DOM elements not found, retrying... (${attempts} attempts left)`);
            setTimeout(() => initializeWithRetry(attempts - 1, delay), delay);
        } else {
            console.error('Failed to find required DOM elements after retries:', elementIds.filter(id => !document.getElementById(id)).concat(footer ? [] : ['.modal-footer']));
        }
    }

    // Start the initialization with retry
    initializeWithRetry();
}

// Expose the function globally for use from invitationList.js
window.initDetailModal = initDetailModal;