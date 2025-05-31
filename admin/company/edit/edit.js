const initCompanyEditPage = (entityId) => {
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
        logoUploadBtn: document.getElementById('logoUploadBtn'),
        logoUpload: document.getElementById('logoUpload'),
        deleteLogoBtn: document.getElementById('deleteLogoBtn'),
        previewLogoBtn: document.getElementById('previewLogoBtn'),
        businessRegImage1: document.getElementById('businessRegImage1'),
        businessRegImage2: document.getElementById('businessRegImage2'),
        businessRegImageUploadBtn: document.getElementById('businessRegImageUploadBtn'),
        businessRegImageUpload: document.getElementById('businessRegImageUpload'),
        deleteBusinessRegImage1Btn: document.getElementById('deleteBusinessRegImage1Btn'),
        deleteBusinessRegImage2Btn: document.getElementById('deleteBusinessRegImage2Btn'),
        previewBusinessRegImage1Btn: document.getElementById('previewBusinessRegImage1Btn'),
        previewBusinessRegImage2Btn: document.getElementById('previewBusinessRegImage2Btn'),
        status: document.getElementById('status'),
        createdDate: document.getElementById('createdDate'),
        createdBy: document.getElementById('createdBy'),
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
        logoUploadBtnWeb: document.getElementById('logoUploadBtnWeb'),
        logoUploadWeb: document.getElementById('logoUploadWeb'),
        deleteLogoBtnWeb: document.getElementById('deleteLogoBtnWeb'),
        previewLogoBtnWeb: document.getElementById('previewLogoBtnWeb'),
        businessRegImage1Web: document.getElementById('businessRegImage1Web'),
        businessRegImage2Web: document.getElementById('businessRegImage2Web'),
        businessRegImageUploadBtnWeb: document.getElementById('businessRegImageUploadBtnWeb'),
        businessRegImageUploadWeb: document.getElementById('businessRegImageUploadWeb'),
        deleteBusinessRegImage1BtnWeb: document.getElementById('deleteBusinessRegImage1BtnWeb'),
        deleteBusinessRegImage2BtnWeb: document.getElementById('deleteBusinessRegImage2BtnWeb'),
        previewBusinessRegImage1BtnWeb: document.getElementById('previewBusinessRegImage1BtnWeb'),
        previewBusinessRegImage2BtnWeb: document.getElementById('previewBusinessRegImage2BtnWeb'),
        statusWeb: document.getElementById('statusWeb'),
        createdDateWeb: document.getElementById('createdDateWeb'),
        createdByWeb: document.getElementById('createdByWeb'),
        // Action buttons
        confirmBtn: document.getElementById('confirmBtn'),
        backBtn: document.getElementById('backBtn'),
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
        // ... (other entities remain the same as previous version)
    ];

    // Find entity by ID
    let entity = entities.find(e => e.id === parseInt(entityId)) || entities[0];
    let originalEntity = { ...entity }; // Backup for cancel

    // Update image buttons visibility
    const updateImageButtons = () => {
        // Logo
        const hasLogo = entity.logo && entity.logo !== 'https://via.placeholder.com/150';
        elements.deleteLogoBtn.style.display = hasLogo ? 'block' : 'none';
        elements.deleteLogoBtnWeb.style.display = hasLogo ? 'block' : 'none';
        elements.previewLogoBtn.style.display = hasLogo ? 'block' : 'none';
        elements.previewLogoBtnWeb.style.display = hasLogo ? 'block' : 'none';
        elements.logoUploadBtn.style.display = hasLogo ? 'none' : 'inline-block';
        elements.logoUploadBtnWeb.style.display = hasLogo ? 'none' : 'inline-block';

        // Business Reg Images
        const regImages = entity.businessRegImages.filter(img => img && img !== 'https://via.placeholder.com/150');
        const regImageCount = regImages.length;
        elements.deleteBusinessRegImage1Btn.style.display = entity.businessRegImages[0] && entity.businessRegImages[0] !== 'https://via.placeholder.com/150' ? 'block' : 'none';
        elements.deleteBusinessRegImage2Btn.style.display = entity.businessRegImages[1] && entity.businessRegImages[1] !== 'https://via.placeholder.com/150' ? 'block' : 'none';
        elements.previewBusinessRegImage1Btn.style.display = entity.businessRegImages[0] && entity.businessRegImages[0] !== 'https://via.placeholder.com/150' ? 'block' : 'none';
        elements.previewBusinessRegImage2Btn.style.display = entity.businessRegImages[1] && entity.businessRegImages[1] !== 'https://via.placeholder.com/150' ? 'block' : 'none';
        elements.deleteBusinessRegImage1BtnWeb.style.display = entity.businessRegImages[0] && entity.businessRegImages[0] !== 'https://via.placeholder.com/150' ? 'block' : 'none';
        elements.deleteBusinessRegImage2BtnWeb.style.display = entity.businessRegImages[1] && entity.businessRegImages[1] !== 'https://via.placeholder.com/150' ? 'block' : 'none';
        elements.previewBusinessRegImage1BtnWeb.style.display = entity.businessRegImages[0] && entity.businessRegImages[0] !== 'https://via.placeholder.com/150' ? 'block' : 'none';
        elements.previewBusinessRegImage2BtnWeb.style.display = entity.businessRegImages[1] && entity.businessRegImages[1] !== 'https://via.placeholder.com/150' ? 'block' : 'none';
        elements.businessRegImageUploadBtn.style.display = regImageCount >= 2 ? 'none' : 'inline-block';
        elements.businessRegImageUploadBtnWeb.style.display = regImageCount >= 2 ? 'none' : 'inline-block';
    };

    // Populate entity information for both mobile and web
    const populateFields = (prefix = '') => {
        Object.keys(elements).forEach(key => {
            const elementKey = key.replace(prefix, '');
            if ([
                'logoImage', 'logoImageWeb', 'logoUpload', 'logoUploadWeb', 'logoUploadBtn', 'logoUploadBtnWeb',
                'deleteLogoBtn', 'deleteLogoBtnWeb', 'previewLogoBtn', 'previewLogoBtnWeb',
                'businessRegImage1', 'businessRegImage1Web', 'businessRegImage2', 'businessRegImage2Web',
                'businessRegImageUpload', 'businessRegImageUploadWeb', 'businessRegImageUploadBtn', 'businessRegImageUploadBtnWeb',
                'deleteBusinessRegImage1Btn', 'deleteBusinessRegImage1BtnWeb', 'deleteBusinessRegImage2Btn', 'deleteBusinessRegImage2BtnWeb',
                'previewBusinessRegImage1Btn', 'previewBusinessRegImage1BtnWeb', 'previewBusinessRegImage2Btn', 'previewBusinessRegImage2BtnWeb',
                'modalImage', 'modalTitle', 'confirmBtn', 'backBtn'
            ].includes(key)) return;

            if (key === 'createdDate' || key === 'createdBy' || key === 'createdDateWeb' || key === 'createdByWeb') {
                elements[key].textContent = entity[elementKey] || 'N/A';
            } else {
                elements[key].value = entity[elementKey] || '';
            }
        });
    };

    // Populate images and inputs
    const populateImages = () => {
        elements.logoImage.src = entity.logo || 'https://via.placeholder.com/150';
        elements.logoImageWeb.src = entity.logo || 'https://via.placeholder.com/150';
        elements.businessRegImage1.src = entity.businessRegImages?.[0] || 'https://via.placeholder.com/150';
        elements.businessRegImage2.src = entity.businessRegImages?.[1] || 'https://via.placeholder.com/150';
        elements.businessRegImage1Web.src = entity.businessRegImages?.[0] || 'https://via.placeholder.com/150';
        elements.businessRegImage2Web.src = entity.businessRegImages?.[1] || 'https://via.placeholder.com/150';
        updateImageButtons(); // Now safe to call after definition
    };

    // Populate fields for mobile and web
    populateFields();
    populateFields('Web');
    populateImages();

    // Update entity data (mock API call)
    const updateEntity = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            originalEntity = { ...entity };
            elements.createdDate.textContent = entity.createdDate;
            elements.createdDateWeb.textContent = entity.createdDate;
            elements.createdBy.textContent = entity.createdBy;
            elements.createdByWeb.textContent = entity.createdBy;
            return true;
        } catch (error) {
            console.error('Error updating entity:', error);
            return false;
        }
    };

    // Handle image upload
    const handleImageUpload = (input, imageElement, maxFiles, isLogo = false) => {
        input.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (isLogo && files.length > maxFiles) {
                alert(`Chỉ được tải lên tối đa ${maxFiles} ảnh cho logo.`);
                input.value = '';
                return;
            }
            if (!isLogo && files.length > (maxFiles - entity.businessRegImages.filter(img => img && img !== 'https://via.placeholder.com/150').length)) {
                alert(`Chỉ được tải lên tối đa ${maxFiles} ảnh giấy ĐKKD.`);
                input.value = '';
                return;
            }

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (isLogo) {
                        entity.logo = event.target.result;
                        elements.logoImage.src = event.target.result;
                        elements.logoImageWeb.src = event.target.result;
                    } else {
                        const emptyIndex = entity.businessRegImages.findIndex(img => !img || img === 'https://via.placeholder.com/150');
                        if (emptyIndex !== -1) {
                            entity.businessRegImages[emptyIndex] = event.target.result;
                            if (emptyIndex === 0) {
                                elements.businessRegImage1.src = event.target.result;
                                elements.businessRegImage1Web.src = event.target.result;
                            } else {
                                elements.businessRegImage2.src = event.target.result;
                                elements.businessRegImage2Web.src = event.target.result;
                            }
                        }
                    }
                    updateImageButtons();
                };
                reader.readAsDataURL(file);
            });
            input.value = ''; // Reset input to allow re-uploading the same file
        });
    };

    // Handle image delete
    const handleImageDelete = (button, imageElement, isLogo = false) => {
        button.addEventListener('click', () => {
            if (isLogo) {
                entity.logo = 'https://via.placeholder.com/150';
                elements.logoImage.src = entity.logo;
                elements.logoImageWeb.src = entity.logo;
            } else {
                const index = imageElement === elements.businessRegImage1 || imageElement === elements.businessRegImage1Web ? 0 : 1;
                entity.businessRegImages[index] = 'https://via.placeholder.com/150';
                if (index === 0) {
                    elements.businessRegImage1.src = entity.businessRegImages[0];
                    elements.businessRegImage1Web.src = entity.businessRegImages[0];
                } else {
                    elements.businessRegImage2.src = entity.businessRegImages[1];
                    elements.businessRegImage2Web.src = entity.businessRegImages[1];
                }
            }
            updateImageButtons();
        });
    };

    // Initialize image upload buttons
    elements.logoUploadBtn.addEventListener('click', () => elements.logoUpload.click());
    elements.logoUploadBtnWeb.addEventListener('click', () => elements.logoUploadWeb.click());
    elements.businessRegImageUploadBtn.addEventListener('click', () => elements.businessRegImageUpload.click());
    elements.businessRegImageUploadBtnWeb.addEventListener('click', () => elements.businessRegImageUploadWeb.click());

    // Initialize image handlers
    handleImageUpload(elements.logoUpload, elements.logoImage, 1, true);
    handleImageUpload(elements.logoUploadWeb, elements.logoImageWeb, 1, true);
    handleImageUpload(elements.businessRegImageUpload, elements.businessRegImage1, 2);
    handleImageUpload(elements.businessRegImageUploadWeb, elements.businessRegImage1Web, 2);
    handleImageDelete(elements.deleteLogoBtn, elements.logoImage, true);
    handleImageDelete(elements.deleteLogoBtnWeb, elements.logoImageWeb, true);
    handleImageDelete(elements.deleteBusinessRegImage1Btn, elements.businessRegImage1);
    handleImageDelete(elements.deleteBusinessRegImage2Btn, elements.businessRegImage2);
    handleImageDelete(elements.deleteBusinessRegImage1BtnWeb, elements.businessRegImage1Web);
    handleImageDelete(elements.deleteBusinessRegImage2BtnWeb, elements.businessRegImage2Web);

    // Image preview handler
    [elements.previewLogoBtn, elements.previewLogoBtnWeb].forEach(btn => {
        btn.addEventListener('click', () => {
            elements.modalImage.src = elements.logoImage.src;
            elements.modalTitle.textContent = elements.logoImage.alt;
        });
    });
    [elements.previewBusinessRegImage1Btn, elements.previewBusinessRegImage1BtnWeb].forEach(btn => {
        btn.addEventListener('click', () => {
            elements.modalImage.src = elements.businessRegImage1.src;
            elements.modalTitle.textContent = elements.businessRegImage1.alt;
        });
    });
    [elements.previewBusinessRegImage2Btn, elements.previewBusinessRegImage2BtnWeb].forEach(btn => {
        btn.addEventListener('click', () => {
            elements.modalImage.src = elements.businessRegImage2.src;
            elements.modalTitle.textContent = elements.businessRegImage2.alt;
        });
    });

    // Sync inputs between mobile and web
    const syncInputs = (source, target) => {
        source.addEventListener('input', () => {
            target.value = source.value;
        });
        target.addEventListener('input', () => {
            source.value = target.value;
        });
    };

    syncInputs(elements.entityCode, elements.entityCodeWeb);
    syncInputs(elements.entityName, elements.entityNameWeb);
    syncInputs(elements.phone, elements.phoneWeb);
    syncInputs(elements.shortName, elements.shortNameWeb);
    syncInputs(elements.fullName, elements.fullNameWeb);
    syncInputs(elements.englishName, elements.englishNameWeb);
    syncInputs(elements.email, elements.emailWeb);
    syncInputs(elements.taxCode, elements.taxCodeWeb);
    syncInputs(elements.businessRegDate, elements.businessRegDateWeb);
    syncInputs(elements.businessRegPlace, elements.businessRegPlaceWeb);
    syncInputs(elements.businessAddress, elements.businessAddressWeb);
    syncInputs(elements.gcpCode, elements.gcpCodeWeb);
    syncInputs(elements.website, elements.websiteWeb);
    syncInputs(elements.coordinates, elements.coordinatesWeb);
    syncInputs(elements.youtube, elements.youtubeWeb);
    syncInputs(elements.description, elements.descriptionWeb);
    syncInputs(elements.status, elements.statusWeb);

    // Handle confirm action
    const handleConfirm = () => {
        // Update entity object with new values
        entity.entityCode = elements.entityCode.value;
        entity.entityName = elements.entityName.value;
        entity.phone = elements.phone.value;
        entity.shortName = elements.shortName.value;
        entity.fullName = elements.fullName.value;
        entity.englishName = elements.englishName.value;
        entity.email = elements.email.value;
        entity.taxCode = elements.taxCode.value;
        entity.businessRegDate = elements.businessRegDate.value;
        entity.businessRegPlace = elements.businessRegPlace.value;
        entity.businessAddress = elements.businessAddress.value;
        entity.gcpCode = elements.gcpCode.value;
        entity.website = elements.website.value;
        entity.coordinates = elements.coordinates.value;
        entity.youtube = elements.youtube.value;
        entity.description = elements.description.value;
        entity.status = elements.status.value;

        if (window.Popup && typeof window.Popup.showApproveConfirm === 'function') {
            window.Popup.showApproveConfirm(entityId, async () => {
                const success = await updateEntity();
                if (success) {
                    if (window.Toast && typeof window.Toast.showSuccess === 'function') {
                        window.Toast.showSuccess('Cập nhật chủ thể thành công!');
                    } else {
                        console.warn('Toast module not loaded, falling back to alert');
                        alert('Cập nhật chủ thể thành công!');
                    }
                    if (typeof window.loadContent === 'function') {
                        window.loadContent('company-details', { entityId });
                    } else {
                        console.error('loadContent function not found in layout.js');
                    }
                } else {
                    console.error('Failed to update entity');
                }
            });
        } else {
            console.warn('Popup module not loaded, proceeding without confirmation');
            updateEntity().then(success => {
                if (success) {
                    if (window.Toast && typeof window.Toast.showSuccess === 'function') {
                        window.Toast.showSuccess('Cập nhật chủ thể thành công!');
                    } else {
                        alert('Cập nhật chủ thể thành công!');
                    }
                    if (typeof window.loadContent === 'function') {
                        window.loadContent('company-details', { entityId });
                    } else {
                        console.error('loadContent function not found in layout.js');
                    }
                }
            });
        }
    };

    // Handle back action
    const handleBack = () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-details', { entityId });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    };

    // Attach event listeners for confirm and back buttons
    elements.confirmBtn.removeEventListener('click', handleConfirm);
    elements.confirmBtn.addEventListener('click', handleConfirm);

    elements.backBtn.removeEventListener('click', handleBack);
    elements.backBtn.addEventListener('click', handleBack);
};