const initCompanyDetailPage = (entityId) => {
    // DOM Elements
    const elements = {
        // Mobile elements
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
        editEmailBtn: document.getElementById('editEmailBtn'),
        adminNameRow: document.getElementById('adminNameRow'),
        adminNameText: document.getElementById('adminNameText'),
        adminPhoneRow: document.getElementById('adminPhoneRow'),
        adminPhoneText: document.getElementById('adminPhoneText'),
        // Web elements
        entityCodeWeb: document.getElementById('entityCodeWeb'),
        entityNameWeb: document.getElementById('entityNameWeb'),
        phoneWeb: document.getElementById('phoneWeb'),
        shortNameWeb: document.getElementById('shortNameWeb'),
        fullNameWeb: document.getElementById('fullNameWeb'),
        englishNameWeb: document.getElementById('englishNameWeb'),
        emailWeb: document.getElementById('emailWeb'),
        taxCodeWeb: document.getElementById('taxCodeWeb'),
        businessRegDateWeb: document.getElementById('businessRegDateWeb'),
        businessRegPlaceWeb: document.getElementById('businessRegPlaceWeb'),
        businessAddressWeb: document.getElementById('businessAddressWeb'),
        gcpCodeWeb: document.getElementById('gcpCodeWeb'),
        websiteWeb: document.getElementById('websiteWeb'),
        coordinatesWeb: document.getElementById('coordinatesWeb'),
        youtubeWeb: document.getElementById('youtubeWeb'),
        descriptionWeb: document.getElementById('descriptionWeb'),
        logoImageWeb: document.getElementById('logoImageWeb'),
        businessRegImage1Web: document.getElementById('businessRegImage1Web'),
        businessRegImage2Web: document.getElementById('businessRegImage2Web'),
        statusWeb: document.getElementById('statusWeb'),
        createdDateWeb: document.getElementById('createdDateWeb'),
        createdByWeb: document.getElementById('createdByWeb'),
        adminEmailContainerWeb: document.getElementById('adminEmailContainerWeb'),
        adminEmailTextWeb: document.getElementById('adminEmailTextWeb'),
        editEmailBtnWeb: document.getElementById('editEmailBtnWeb'),
        adminNameRowWeb: document.getElementById('adminNameRowWeb'),
        adminNameTextWeb: document.getElementById('adminNameTextWeb'),
        adminPhoneRowWeb: document.getElementById('adminPhoneRowWeb'),
        adminPhoneTextWeb: document.getElementById('adminPhoneTextWeb'),
        // Action buttons
        backBtn: document.getElementById('backBtn'),
        editBtn: document.getElementById('editBtn'),
        lockBtn: document.getElementById('lockBtn'),
        unlockBtn: document.getElementById('unlockBtn'),
        assignAdminBtn: document.getElementById('assignAdminBtn'),
        modalImage: document.getElementById('modalImage'),
        modalTitle: document.getElementById('imageModalLabel'),
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
            status: 'Đang hoạt động',
            createdDate: '2025-05-01',
            createdBy: 'System Admin',
            admin: { email: 'admin1@example.com', name: 'Nguyễn Văn A', phone: '0987654321' },
        },
        {
            id: 2,
            entityCode: 'CT002',
            entityName: 'Chủ thể B',
            phone: '0987654321',
            shortName: 'CTB',
            fullName: 'Công ty TNHH Chủ thể B',
            englishName: 'Entity B Co., Ltd',
            email: 'contact@entityb.com',
            taxCode: '0987654321',
            businessRegDate: '2025-05-02',
            businessRegPlace: 'Hà Nội',
            businessAddress: '456 Đường B, Quận Ba Đình, Hà Nội',
            gcpCode: 'GCP002',
            website: 'https://entityb.com',
            coordinates: '21.0285, 105.8542',
            youtube: 'https://youtube.com/entityb',
            description: 'Mô tả về chủ thể B',
            logo: 'https://via.placeholder.com/150',
            businessRegImages: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
            status: 'Khóa',
            createdDate: '2025-05-02',
            createdBy: 'System Admin',
            admin: { email: 'admin2@example.com', name: 'Trần Thị B', phone: '0912345678' },
        },
        {
            id: 3,
            entityCode: 'CT003',
            entityName: 'Chủ thể C',
            phone: '0931234567',
            shortName: 'CTC',
            fullName: 'Công ty TNHH Chủ thể C',
            englishName: 'Entity C Co., Ltd',
            email: 'contact@entityc.com',
            taxCode: '1122334455',
            businessRegDate: '2025-05-03',
            businessRegPlace: 'Đà Nẵng',
            businessAddress: '789 Đường C, Quận Hải Châu, Đà Nẵng',
            gcpCode: 'GCP003',
            website: 'https://entityc.com',
            coordinates: '16.0471, 108.2062',
            youtube: 'https://youtube.com/entityc',
            description: 'Mô tả về chủ thể C',
            logo: 'https://via.placeholder.com/150',
            businessRegImages: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
            status: 'Mới tạo',
            createdDate: '2025-05-03',
            createdBy: 'System Admin',
            admin: null,
        },
    ];

    // Find entity by ID
    const entity = entities.find(e => e.id === parseInt(entityId)) || entities[0];

    // Populate entity information for both mobile and web
    const populateFields = (prefix = '') => {
        Object.keys(elements).forEach(key => {
            const elementKey = key.replace(prefix, '');
            if ([
                'logoImage', 'logoImageWeb',
                'businessRegImage1', 'businessRegImage1Web',
                'businessRegImage2', 'businessRegImage2Web',
                'modalImage', 'modalTitle',
                'adminEmailContainer', 'adminEmailContainerWeb',
                'adminEmailText', 'adminEmailTextWeb',
                'editEmailBtn', 'editEmailBtnWeb',
                'adminNameRow', 'adminNameRowWeb',
                'adminNameText', 'adminNameTextWeb',
                'adminPhoneRow', 'adminPhoneRowWeb',
                'adminPhoneText', 'adminPhoneTextWeb',
                'backBtn', 'editBtn', 'lockBtn', 'unlockBtn', 'assignAdminBtn'
            ].includes(key)) return;
            elements[key].textContent = entity[elementKey] || 'N/A';
        });
    };

    // Populate fields for mobile and web
    populateFields();
    populateFields('Web');

    // Populate images
    elements.logoImage.src = entity.logo || 'https://via.placeholder.com/150';
    elements.businessRegImage1.src = entity.businessRegImages?.[0] || 'https://via.placeholder.com/150';
    elements.businessRegImage2.src = entity.businessRegImages?.[1] || 'https://via.placeholder.com/150';
    elements.logoImageWeb.src = entity.logo || 'https://via.placeholder.com/150';
    elements.businessRegImage1Web.src = entity.businessRegImages?.[0] || 'https://via.placeholder.com/150';
    elements.businessRegImage2Web.src = entity.businessRegImages?.[1] || 'https://via.placeholder.com/150';

    // Function to update admin UI
    function updateAdminUI() {
        if (!entity.admin) {
            elements.adminEmailText.classList.add('d-none');
            elements.editEmailBtn.classList.remove('d-none');
            elements.adminNameRow.classList.add('d-none');
            elements.adminPhoneRow.classList.add('d-none');
            elements.adminEmailTextWeb.classList.add('d-none');
            elements.editEmailBtnWeb.classList.remove('d-none');
            elements.adminNameRowWeb.classList.add('d-none');
            elements.adminPhoneRowWeb.classList.add('d-none');
        } else {
            elements.adminEmailText.textContent = entity.admin.email;
            elements.adminEmailText.classList.remove('d-none');
            elements.editEmailBtn.classList.remove('d-none');
            elements.adminNameRow.classList.remove('d-none');
            elements.adminPhoneRow.classList.remove('d-none');
            elements.adminNameText.textContent = entity.admin.name || 'N/A';
            elements.adminPhoneText.textContent = entity.admin.phone || 'N/A';
            elements.adminEmailTextWeb.textContent = entity.admin.email;
            elements.adminEmailTextWeb.classList.remove('d-none');
            elements.editEmailBtnWeb.classList.remove('d-none');
            elements.adminNameRowWeb.classList.remove('d-none');
            elements.adminPhoneRowWeb.classList.remove('d-none');
            elements.adminNameTextWeb.textContent = entity.admin.name || 'N/A';
            elements.adminPhoneTextWeb.textContent = entity.admin.phone || 'N/A';
        }
    }

    // Update entity status (mock API call)
    const updateEntityStatus = async (newStatus) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            entity.status = newStatus;
            elements.status.textContent = newStatus;
            elements.statusWeb.textContent = newStatus;
            updateActionButtons();
            return true;
        } catch (error) {
            console.error('Error updating entity status:', error);
            return false;
        }
    };

    // Handle lock action
    const handleLock = () => {
        if (window.Popup && typeof window.Popup.showApproveConfirm === 'function') {
            window.Popup.showApproveConfirm(entityId, async () => {
                const success = await updateEntityStatus('Khóa');
                if (success && window.Toast && typeof window.Toast.showSuccess === 'function') {
                    window.Toast.showSuccess('Khóa chủ thể thành công!');
                } else if (!window.Toast) {
                    console.error('Toast module not loaded');
                }
            });
        } else {
            console.error('Popup module not loaded or showApproveConfirm not found');
        }
    };

    // Handle unlock action
    const handleUnlock = () => {
        if (window.Popup && typeof window.Popup.showApproveConfirm === 'function') {
            window.Popup.showApproveConfirm(entityId, async () => {
                const success = await updateEntityStatus('Đang hoạt động');
                if (success && window.Toast && typeof window.Toast.showSuccess === 'function') {
                    window.Toast.showSuccess('Mở khóa chủ thể thành công!');
                } else if (!window.Toast) {
                    console.error('Toast module not loaded');
                }
            });
        } else {
            console.error('Popup module not loaded or showApproveConfirm not found');
        }
    };

    // Update action buttons based on status
    const updateActionButtons = () => {
        elements.editBtn.classList.add('d-none');
        elements.lockBtn.classList.add('d-none');
        elements.unlockBtn.classList.add('d-none');
        elements.assignAdminBtn.classList.add('d-none');

        if (entity.status === 'Đang hoạt động') {
            elements.editBtn.classList.remove('d-none');
            elements.lockBtn.classList.remove('d-none');
        } else if (entity.status === 'Khóa') {
            elements.editBtn.classList.remove('d-none');
            elements.unlockBtn.classList.remove('d-none');
        } else if (entity.status === 'Mới tạo') {
            elements.editBtn.classList.remove('d-none');
            elements.lockBtn.classList.remove('d-none');
            elements.assignAdminBtn.classList.remove('d-none');
        }
    };

    // Image preview handler
    [elements.logoImage, elements.businessRegImage1, elements.businessRegImage2, elements.logoImageWeb, elements.businessRegImage1Web, elements.businessRegImage2Web].forEach(img => {
        img.addEventListener('click', () => {
            elements.modalImage.src = img.src;
            elements.modalTitle.textContent = img.alt;
        });
    });

    // Event listeners
    elements.editEmailBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-searchUser', { entityId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });

    elements.editEmailBtnWeb.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-searchUser', { entityId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
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
            window.loadContent('company-edit', { entityId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });

    elements.lockBtn.addEventListener('click', handleLock);

    elements.unlockBtn.addEventListener('click', handleUnlock);

    elements.assignAdminBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-searchUser', { entityId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });

    // Initial UI update
    updateAdminUI();
    updateActionButtons();
};