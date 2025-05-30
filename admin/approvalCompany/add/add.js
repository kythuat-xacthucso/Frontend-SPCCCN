function initAddNewPage(profileId) {
    const unitName = document.getElementById('unitName');
    const taxCode = document.getElementById('taxCode');
    const representative = document.getElementById('representative');
    const contactInfo = document.getElementById('contactInfo');
    const address = document.getElementById('address');
    const submittedDate = document.getElementById('submittedDate');
    const legalDocuments = document.getElementById('legalDocuments');
    const slogan = document.getElementById('slogan');
    const introArticle = document.getElementById('introArticle');
    const logoFile = document.getElementById('logoFile');
    const internalCode = document.getElementById('internalCode');
    const sloganError = document.getElementById('sloganError');
    const introArticleError = document.getElementById('introArticleError');
    const logoFileError = document.getElementById('logoFileError');
    const internalCodeError = document.getElementById('internalCodeError');
    const createProfileBtn = document.getElementById('createProfileBtn');
    const createLaterBtn = document.getElementById('createLaterBtn');

    const unitNameMobile = document.getElementById('unitNameMobile');
    const taxCodeMobile = document.getElementById('taxCodeMobile');
    const representativeMobile = document.getElementById('representativeMobile');
    const contactInfoMobile = document.getElementById('contactInfoMobile');
    const addressMobile = document.getElementById('addressMobile');
    const submittedDateMobile = document.getElementById('submittedDateMobile');
    const legalDocumentsMobile = document.getElementById('legalDocumentsMobile');
    const sloganMobile = document.getElementById('sloganMobile');
    const introArticleMobile = document.getElementById('introArticleMobile');
    const logoFileMobile = document.getElementById('logoFileMobile');
    const internalCodeMobile = document.getElementById('internalCodeMobile');
    const sloganErrorMobile = document.getElementById('sloganErrorMobile');
    const introArticleErrorMobile = document.getElementById('introArticleErrorMobile');
    const logoFileErrorMobile = document.getElementById('logoFileErrorMobile');
    const internalCodeErrorMobile = document.getElementById('internalCodeErrorMobile');
    const createProfileBtnMobile = document.getElementById('createProfileBtnMobile');
    const createLaterBtnMobile = document.getElementById('createLaterBtnMobile');

    // Initialize Bootstrap Modal only on Desktop
    const addProfileModal = document.getElementById('addProfileModal');
    let bootstrapModal = null;
    if (addProfileModal && window.innerWidth >= 768) {
        bootstrapModal = new bootstrap.Modal(addProfileModal, {
            backdrop: 'static',
            keyboard: false
        });
        bootstrapModal.show();

        // Handle modal close
        addProfileModal.addEventListener('hidden.bs.modal', () => {
            backToList();
        });
    }

    // Sample data (replace with API call if needed)
    const profiles = [
        {
            id: 1,
            unitName: 'Công ty TNHH ABC',
            taxCode: '1234567890',
            representative: 'Nguyễn Văn A - Giám đốc',
            phone: '0123456789',
            email: 'abc@example.com',
            address: '123 Đường ABC, Quận 1, TP.HCM\n456 Đường XYZ, Quận 2, TP.HCM\n789 Đường DEF, Quận 3, TP.HCM',
            submittedDate: '2025-05-01',
            legalDocuments: ['Giấy phép kinh doanh.pdf', 'Chứng nhận ISO.pdf']
        },
        {
            id: 2,
            unitName: 'Công ty CP XYZ',
            taxCode: '0987654321',
            representative: 'Trần Văn B - Phó giám đốc',
            phone: '0987654321',
            email: 'xyz@example.com',
            address: '321 Đường XYZ, Quận 5, TP.HCM\n654 Đường ABC, Quận 6, TP.HCM\n987 Đường DEF, Quận 7, TP.HCM',
            submittedDate: '2025-05-02',
            legalDocuments: ['Giấy phép vệ sinh ATTP.pdf']
        },
        {
            id: 3,
            unitName: 'Công ty TNHH DEF',
            taxCode: '1122334455',
            representative: 'Lê Thị C - Giám đốc',
            phone: '0912345678',
            email: 'def@example.com',
            address: '147 Đường DEF, Quận 9, TP.HCM\n258 Đường GHI, Quận 10, TP.HCM\n369 Đường JKL, Quận 11, TP.HCM',
            submittedDate: '2025-05-03',
            legalDocuments: ['Giấy phép môi trường.pdf']
        },
        {
            id: 4,
            unitName: 'Công ty CP GHI',
            taxCode: '5566778899',
            representative: 'Phạm Văn D - Trưởng phòng',
            phone: '0932145678',
            email: 'ghi@example.com',
            address: '741 Đường GHI, Quận 12, TP.HCM\n852 Đường JKL, Quận 13, TP.HCM\n963 Đường MNO, Quận 14, TP.HCM',
            submittedDate: '2025-05-04',
            legalDocuments: ['Chứng nhận xuất khẩu.pdf']
        }
    ];

    // Find profile by ID
    const profile = profiles.find(p => p.id === parseInt(profileId)) || profiles[0];

    // Populate profile data (Desktop)
    if (unitName) unitName.textContent = profile.unitName;
    if (taxCode) taxCode.textContent = profile.taxCode;
    if (representative) representative.textContent = profile.representative;
    if (contactInfo) contactInfo.innerHTML = `<i class="bi bi-telephone"></i> ${profile.phone} / <i class="bi bi-envelope"></i> ${profile.email}`;
    if (address) address.textContent = profile.address;
    if (submittedDate) submittedDate.textContent = new Date(profile.submittedDate).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Populate profile data (Mobile)
    if (unitNameMobile) unitNameMobile.textContent = profile.unitName;
    if (taxCodeMobile) taxCodeMobile.textContent = profile.taxCode;
    if (representativeMobile) representativeMobile.textContent = profile.representative;
    if (contactInfoMobile) contactInfoMobile.innerHTML = `<i class="bi bi-telephone"></i> ${profile.phone} / <i class="bi bi-envelope"></i> ${profile.email}`;
    if (addressMobile) addressMobile.textContent = profile.address;
    if (submittedDateMobile) submittedDateMobile.textContent = new Date(profile.submittedDate).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Render legal documents (Desktop and Mobile)
    [legalDocuments, legalDocumentsMobile].forEach(el => {
        if (!el) return;
        el.innerHTML = '';
        profile.legalDocuments.forEach(doc => {
            const link = document.createElement('a');
            link.href = '#'; // Replace with actual file URL
            link.className = 'list-group-item list-group-item-action';
            link.innerHTML = `<i class="bi bi-download"></i> ${doc}`;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Tải xuống ${doc}`); // Replace with actual download logic
            });
            el.appendChild(link);
        });
    });

    // Validate form inputs
    function validateForm() {
        const isMobile = window.innerWidth < 768;
        const activeSlogan = isMobile ? sloganMobile : slogan;
        const activeIntroArticle = isMobile ? introArticleMobile : introArticle;
        const activeLogoFile = isMobile ? logoFileMobile : logoFile;
        const activeInternalCode = isMobile ? internalCodeMobile : internalCode;
        const activeSloganError = isMobile ? sloganErrorMobile : sloganError;
        const activeIntroArticleError = isMobile ? introArticleErrorMobile : introArticleError;
        const activeLogoFileError = isMobile ? logoFileErrorMobile : logoFileError;
        const activeInternalCodeError = isMobile ? internalCodeErrorMobile : internalCodeError;

        if (!activeSlogan || !activeIntroArticle || !activeLogoFile || !activeInternalCode) return false;

        let isValid = true;

        // Validate Slogan (optional, max 100 chars)
        if (activeSlogan.value.length > 100) {
            activeSlogan.classList.add('is-invalid');
            activeSloganError.textContent = 'Slogan không được vượt quá 100 ký tự.';
            isValid = false;
        } else {
            activeSlogan.classList.remove('is-invalid');
            activeSloganError.textContent = '';
        }

        // Validate Intro Article (optional, no specific rules)
        activeIntroArticle.classList.remove('is-invalid');
        activeIntroArticleError.textContent = '';

        // Validate Logo File (optional, PNG/JPG, <2MB)
        if (activeLogoFile.files.length > 0) {
            const file = activeLogoFile.files[0];
            const validTypes = ['image/png', 'image/jpeg'];
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (!validTypes.includes(file.type)) {
                activeLogoFile.classList.add('is-invalid');
                activeLogoFileError.textContent = 'Chỉ chấp nhận định dạng PNG hoặc JPG.';
                isValid = false;
            } else if (file.size > maxSize) {
                activeLogoFile.classList.add('is-invalid');
                activeLogoFileError.textContent = 'Kích thước file không được vượt quá 2MB.';
                isValid = false;
            } else {
                activeLogoFile.classList.remove('is-invalid');
                activeLogoFileError.textContent = '';
            }
        } else {
            activeLogoFile.classList.remove('is-invalid');
            activeLogoFileError.textContent = '';
        }

        // Validate Internal Code (optional, max 20 chars)
        if (activeInternalCode.value.length > 20) {
            activeInternalCode.classList.add('is-invalid');
            activeInternalCodeError.textContent = 'Mã nội bộ không được vượt quá 20 ký tự.';
            isValid = false;
        } else {
            activeInternalCode.classList.remove('is-invalid');
            activeInternalCodeError.textContent = '';
        }

        return isValid;
    }

    // Create official profile (mock API call)
    const createOfficialProfile = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return true;
        } catch (error) {
            console.error('Error creating official profile:', error);
            return false;
        }
    };

    // Handle create profile action
    const handleCreateProfile = () => {
        if (validateForm()) {
            window.Popup.showApproveConfirm(profileId, async () => {
                const success = await createOfficialProfile();
                if (success) {
                    window.Toast.showSuccess('Tạo hồ sơ chính thức thành công!');
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    } else {
                        backToList();
                    }
                }
            }, 'Xác nhận tạo hồ sơ', 'Bạn có chắc chắn muốn tạo hồ sơ chính thức?');
        }
    };

    // Event listeners (Desktop)
    if (slogan) slogan.addEventListener('input', validateForm);
    if (introArticle) introArticle.addEventListener('input', validateForm);
    if (logoFile) logoFile.addEventListener('change', validateForm);
    if (internalCode) internalCode.addEventListener('input', validateForm);
    if (createProfileBtn) createProfileBtn.addEventListener('click', handleCreateProfile);
    if (createLaterBtn) createLaterBtn.addEventListener('click', () => {
        if (bootstrapModal) {
            bootstrapModal.hide();
        } else {
            backToList();
        }
    });

    // Event listeners (Mobile)
    if (sloganMobile) sloganMobile.addEventListener('input', validateForm);
    if (introArticleMobile) introArticleMobile.addEventListener('input', validateForm);
    if (logoFileMobile) logoFileMobile.addEventListener('change', validateForm);
    if (internalCodeMobile) internalCodeMobile.addEventListener('input', validateForm);
    if (createProfileBtnMobile) createProfileBtnMobile.addEventListener('click', handleCreateProfile);
    if (createLaterBtnMobile) createLaterBtnMobile.addEventListener('click', backToList);

    // Function to go back to list
    function backToList() {
        if (typeof window.loadContent === 'function') {
            window.loadContent('subject-approval');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Initial form validation
    validateForm();
}