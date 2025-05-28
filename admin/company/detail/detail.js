(function initCompanyDetailPage(entityId) {
    // DOM Elements
    const elements = {
        entityCode: document.getElementById('entityCode'),
        entityName: document.getElementById('entityName'),
        phone: document.getElementById('phone'),
        shortName: document.getElementById('shortName'),
        fullName: document.getElementById('fullName'),
        englishName: document.getElementById('englishName'),
        email: document.getElementById('email'),
        taxCode: document.getElementById('taxCode'),
        businessRegDate: document.getElementById('businessRegDate'),
        businessRegPlace: document.getElementById('businessRegPlace'),
        businessAddress: document.getElementById('businessAddress'),
        gcpCode: document.getElementById('gcpCode'),
        website: document.getElementById('website'),
        coordinates: document.getElementById('coordinates'),
        youtube: document.getElementById('youtube'),
        description: document.getElementById('description'),
        logoImage: document.getElementById('logoImage'),
        businessRegImage1: document.getElementById('businessRegImage1'),
        businessRegImage2: document.getElementById('businessRegImage2'),
        status: document.getElementById('status'),
        createdDate: document.getElementById('createdDate'),
        createdBy: document.getElementById('createdBy'),
        adminEmailContainer: document.getElementById('adminEmailContainer'),
        adminEmailText: document.getElementById('adminEmailText'),
        adminEmailInput: document.getElementById('adminEmailInput'),
        editEmailBtn: document.getElementById('editEmailBtn'),
        emailActionButtons: document.getElementById('emailActionButtons'),
        confirmEmailBtn: document.getElementById('confirmEmailBtn'),
        cancelEmailBtn: document.getElementById('cancelEmailBtn'),
        emailError: document.getElementById('emailError'),
        adminNameRow: document.getElementById('adminNameRow'),
        adminNameText: document.getElementById('adminNameText'),
        adminNameInput: document.getElementById('adminNameInput'),
        adminPhoneRow: document.getElementById('adminPhoneRow'),
        adminPhoneText: document.getElementById('adminPhoneText'),
        adminPhoneInput: document.getElementById('adminPhoneInput'),
        editBtn: document.getElementById('editBtn'),
        backBtn: document.getElementById('backBtn'),
        modalImage: document.getElementById('modalImage'),
        modalTitle: document.getElementById('imageModalLabel')
    };

    // Sample data (replace with API call if needed)
    const entities = [
        {
            id: 1,
            entityCode: 'CT001',
            entityName: 'Chủ thể A',
            phone: '0912345678',
            shortName: 'CTA',
            fullName: 'Công ty TNHH Chủ thể A',
            englishName: 'Entity A Co., Ltd',
            email: 'contact@entitya.com',
            taxCode: '1234567890',
            businessRegDate: '2025-05-01',
            businessRegPlace: 'TP.HCM',
            businessAddress: '123 Đường A, Quận 1, TP.HCM',
            gcpCode: 'GCP001',
            website: 'https://entitya.com',
            coordinates: '10.7769, 106.7009',
            youtube: 'https://youtube.com/entitya',
            description: 'Mô tả về chủ thể A',
            logo: 'https://via.placeholder.com/150',
            businessRegImages: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
            status: 'Hoạt động',
            createdDate: '2025-05-01',
            createdBy: 'System Admin',
            admin: { email: 'admin1@example.com', name: 'Nguyễn Văn A', phone: '0987654321' }
        }
    ];

    // Find entity by ID
    const entity = entities.find(e => e.id === parseInt(entityId)) || entities[0];
    let originalAdminData = entity.admin ? { ...entity.admin } : null;

    // Populate entity information
    Object.keys(elements).forEach(key => {
        if (['logoImage', 'businessRegImage1', 'businessRegImage2', 'modalImage', 'modalTitle', 'adminEmailContainer', 'adminEmailText', 'adminEmailInput', 'editEmailBtn', 'emailActionButtons', 'confirmEmailBtn', 'cancelEmailBtn', 'emailError', 'adminNameRow', 'adminNameText', 'adminNameInput', 'adminPhoneRow', 'adminPhoneText', 'adminPhoneInput', 'editBtn', 'backBtn'].includes(key)) return;
        elements[key].textContent = entity[key] || 'N/A';
    });

    // Populate images
    elements.logoImage.src = entity.logo || 'https://via.placeholder.com/150';
    elements.businessRegImage1.src = entity.businessRegImages?.[0] || 'https://via.placeholder.com/150';
    elements.businessRegImage2.src = entity.businessRegImages?.[1] || 'https://via.placeholder.com/150';

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to validate email
    function validateEmail(email) {
        const isValid = emailRegex.test(email);
        elements.adminEmailInput.classList.toggle('is-invalid', !isValid);
        elements.emailError.style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    // Function to update admin UI
    function updateAdminUI() {
        if (!entity.admin) {
            elements.adminEmailText.classList.add('d-none');
            elements.adminEmailInput.classList.remove('d-none');
            elements.editEmailBtn.classList.add('d-none');
            elements.emailActionButtons.classList.remove('d-none');
            elements.confirmEmailBtn.classList.remove('d-none');
            elements.cancelEmailBtn.classList.add('d-none');
            elements.adminNameRow.classList.add('d-none');
            elements.adminPhoneRow.classList.add('d-none');
        } else {
            elements.adminEmailText.textContent = entity.admin.email;
            elements.adminEmailText.classList.remove('d-none');
            elements.adminEmailInput.classList.add('d-none');
            elements.editEmailBtn.classList.remove('d-none');
            elements.emailActionButtons.classList.add('d-none');
            elements.adminNameRow.classList.remove('d-none');
            elements.adminPhoneRow.classList.remove('d-none');
            elements.adminNameText.textContent = entity.admin.name || '';
            elements.adminNameText.classList.remove('d-none');
            elements.adminNameInput.classList.add('d-none');
            elements.adminPhoneText.textContent = entity.admin.phone || '';
            elements.adminPhoneText.classList.remove('d-none');
            elements.adminPhoneInput.classList.add('d-none');
        }
    }

    // Function to switch to edit mode
    function switchToEditMode() {
        elements.adminEmailText.classList.add('d-none');
        elements.adminEmailInput.classList.remove('d-none');
        elements.adminEmailInput.value = entity.admin ? entity.admin.email : '';
        elements.editEmailBtn.classList.add('d-none');
        elements.emailActionButtons.classList.remove('d-none');
        elements.confirmEmailBtn.classList.remove('d-none');
        elements.cancelEmailBtn.classList.remove('d-none');
        elements.adminNameText.classList.add('d-none');
        elements.adminNameInput.classList.remove('d-none');
        elements.adminNameInput.value = entity.admin?.name || '';
        elements.adminPhoneText.classList.add('d-none');
        elements.adminPhoneInput.classList.remove('d-none');
        elements.adminPhoneInput.value = entity.admin?.phone || '';
    }

    // Image preview handler
    [elements.logoImage, elements.businessRegImage1, elements.businessRegImage2].forEach(img => {
        img.addEventListener('click', () => {
            elements.modalImage.src = img.src;
            elements.modalTitle.textContent = img.alt;
        });
    });

    // Event listeners
    elements.editEmailBtn.addEventListener('click', switchToEditMode);

    elements.confirmEmailBtn.addEventListener('click', () => {
        const newEmail = elements.adminEmailInput.value.trim();
        if (validateEmail(newEmail)) {
            entity.admin = {
                email: newEmail,
                name: elements.adminNameInput.value.trim() || '',
                phone: elements.adminPhoneInput.value.trim() || ''
            };
            originalAdminData = { ...entity.admin };
            updateAdminUI();
            alert('Cập nhật thông tin người quản trị thành công!');
        }
    });

    elements.cancelEmailBtn.addEventListener('click', () => {
        entity.admin = originalAdminData ? { ...originalAdminData } : null;
        elements.adminEmailInput.value = entity.admin ? entity.admin.email : '';
        elements.adminEmailInput.classList.remove('is-invalid');
        elements.emailError.style.display = 'none';
        updateAdminUI();
    });

    elements.backBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-management');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });

    elements.editBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-edit', entityId);
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });

    // Initial UI update
    updateAdminUI();
})(typeof entityId !== 'undefined' ? entityId : null);