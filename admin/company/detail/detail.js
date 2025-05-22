(function initCompanyDetailPage(entityId) {
    const entityName = document.getElementById('entityName');
    const entityCode = document.getElementById('entityCode');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const businessRegNumber = document.getElementById('businessRegNumber');
    const status = document.getElementById('status');
    const createdDate = document.getElementById('createdDate');
    const adminEmailContainer = document.getElementById('adminEmailContainer');
    const adminEmailText = document.getElementById('adminEmailText');
    const adminEmailInput = document.getElementById('adminEmailInput');
    const editEmailBtn = document.getElementById('editEmailBtn');
    const emailActionButtons = document.getElementById('emailActionButtons');
    const confirmEmailBtn = document.getElementById('confirmEmailBtn');
    const cancelEmailBtn = document.getElementById('cancelEmailBtn');
    const emailError = document.getElementById('emailError');
    const adminNameRow = document.getElementById('adminNameRow');
    const adminNameText = document.getElementById('adminNameText');
    const adminNameInput = document.getElementById('adminNameInput');
    const adminPhoneRow = document.getElementById('adminPhoneRow');
    const adminPhoneText = document.getElementById('adminPhoneText');
    const adminPhoneInput = document.getElementById('adminPhoneInput');
    const backBtn = document.getElementById('backBtn');

    // Sample data (replace with API call if needed)
    const entities = [
        { id: 1, entityName: 'Chủ thể A', entityCode: 'CT001', phone: '0912345678', address: '123 Đường A, Quận 1, TP.HCM', businessRegNumber: '123456789', status: 'Hoạt động', createdDate: '2025-05-01', admin: { email: 'admin1@example.com', name: 'Nguyễn Văn A', phone: '0987654321' } },
        { id: 2, entityName: 'Chủ thể B', entityCode: 'CT002', phone: '0987654321', address: '456 Đường B, Quận 2, TP.HCM', businessRegNumber: '987654321', status: 'Khóa', createdDate: '2025-05-02', admin: null },
        { id: 3, entityName: 'Chủ thể C', entityCode: 'CT003', phone: '0931234567', address: '789 Đường C, Quận 3, TP.HCM', businessRegNumber: '456789123', status: 'Hoạt động', createdDate: '2025-05-03', admin: { email: 'admin3@example.com', name: 'Trần Thị B', phone: '0918765432' } },
        { id: 4, entityName: 'Chủ thể D', entityCode: 'CT004', phone: '0978765432', address: '321 Đường D, Quận 4, TP.HCM', businessRegNumber: '321654987', status: 'Hoạt động', createdDate: '2025-05-04', admin: null },
    ];

    // Find entity by ID
    const entity = entities.find(e => e.id === parseInt(entityId)) || entities[0];
    let originalAdminData = entity.admin ? { ...entity.admin } : null; // Store original admin data for cancel action

    // Populate entity information
    entityName.textContent = entity.entityName;
    entityCode.textContent = entity.entityCode;
    phone.textContent = entity.phone;
    address.textContent = entity.address;
    businessRegNumber.textContent = entity.businessRegNumber;
    status.textContent = entity.status;
    createdDate.textContent = entity.createdDate;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to validate email
    function validateEmail(email) {
        const isValid = emailRegex.test(email);
        adminEmailInput.classList.toggle('is-invalid', !isValid);
        emailError.style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    // Function to update UI based on admin data
    function updateAdminUI() {
        if (!entity.admin) {
            // No admin assigned: Show email input
            adminEmailText.classList.add('d-none');
            adminEmailInput.classList.remove('d-none');
            editEmailBtn.classList.add('d-none');
            emailActionButtons.classList.remove('d-none');
            confirmEmailBtn.classList.remove('d-none');
            cancelEmailBtn.classList.add('d-none'); // No cancel button when adding new admin
            adminNameRow.classList.add('d-none');
            adminPhoneRow.classList.add('d-none');
        } else {
            // Admin exists: Show admin info in read-only mode
            adminEmailText.textContent = entity.admin.email;
            adminEmailText.classList.remove('d-none');
            adminEmailInput.classList.add('d-none');
            editEmailBtn.classList.remove('d-none');
            emailActionButtons.classList.add('d-none');
            adminNameRow.classList.remove('d-none');
            adminPhoneRow.classList.remove('d-none');
            adminNameText.textContent = entity.admin.name || '';
            adminNameText.classList.remove('d-none');
            adminNameInput.classList.add('d-none');
            adminPhoneText.textContent = entity.admin.phone || '';
            adminPhoneText.classList.remove('d-none');
            adminPhoneInput.classList.add('d-none');
        }
    }

    // Function to switch to edit mode
    function switchToEditMode() {
        adminEmailText.classList.add('d-none');
        adminEmailInput.classList.remove('d-none');
        adminEmailInput.value = entity.admin ? entity.admin.email : '';
        editEmailBtn.classList.add('d-none');
        emailActionButtons.classList.remove('d-none');
        confirmEmailBtn.classList.remove('d-none');
        cancelEmailBtn.classList.remove('d-none');
        adminNameText.classList.add('d-none');
        adminNameInput.classList.remove('d-none');
        adminNameInput.value = ''; // Clear name
        adminPhoneText.classList.add('d-none');
        adminPhoneInput.classList.remove('d-none');
        adminPhoneInput.value = ''; // Clear phone
    }

    // Event listeners
    editEmailBtn.addEventListener('click', switchToEditMode);

    confirmEmailBtn.addEventListener('click', () => {
        const newEmail = adminEmailInput.value.trim();
        if (validateEmail(newEmail)) {
            entity.admin = {
                email: newEmail,
                name: adminNameInput.value.trim() || '',
                phone: adminPhoneInput.value.trim() || ''
            };
            originalAdminData = { ...entity.admin }; // Update original data after confirmation
            updateAdminUI();
            alert('Cập nhật thông tin người quản trị thành công!'); // Replace with actual save logic
        }
    });

    cancelEmailBtn.addEventListener('click', () => {
        entity.admin = originalAdminData ? { ...originalAdminData } : null; // Revert to original data
        adminEmailInput.value = entity.admin ? entity.admin.email : '';
        adminEmailInput.classList.remove('is-invalid');
        emailError.style.display = 'none';
        updateAdminUI();
    });

    backBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-management');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });

    // Initial UI update
    updateAdminUI();
})(typeof entityId !== 'undefined' ? entityId : null);