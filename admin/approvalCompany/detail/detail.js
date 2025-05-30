function initDetailPage(profileId) {
    const unitName = document.getElementById('unitName');
    const taxCode = document.getElementById('taxCode');
    const representative = document.getElementById('representative');
    const contactInfo = document.getElementById('contactInfo');
    const address = document.getElementById('address');
    const submittedDate = document.getElementById('submittedDate');
    const status = document.getElementById('status');
    const legalDocuments = document.getElementById('legalDocuments');
    const reason = document.getElementById('reason');
    const reasonError = document.getElementById('reasonError');
    const desktopActionButtons = document.getElementById('desktopActionButtons');

    const unitNameMobile = document.getElementById('unitNameMobile');
    const taxCodeMobile = document.getElementById('taxCodeMobile');
    const representativeMobile = document.getElementById('representativeMobile');
    const contactInfoMobile = document.getElementById('contactInfoMobile');
    const addressMobile = document.getElementById('addressMobile');
    const submittedDateMobile = document.getElementById('submittedDateMobile');
    const statusMobile = document.getElementById('statusMobile');
    const legalDocumentsMobile = document.getElementById('legalDocumentsMobile');
    const reasonMobile = document.getElementById('reasonMobile');
    const reasonErrorMobile = document.getElementById('reasonErrorMobile');
    const mobileActionButtons = document.getElementById('mobileActionButtons');

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
            status: 'Chờ duyệt',
            legalDocuments: ['Giấy phép kinh doanh.pdf', 'Chứng nhận ISO.pdf'],
            reason: ''
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
            status: 'Đã duyệt',
            legalDocuments: ['Giấy phép vệ sinh ATTP.pdf'],
            reason: 'Hồ sơ hợp lệ'
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
            status: 'Từ chối',
            legalDocuments: ['Giấy phép môi trường.pdf'],
            reason: 'Thiếu tài liệu bổ sung'
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
            status: 'Đã tạo chủ thể',
            legalDocuments: ['Chứng nhận xuất khẩu.pdf'],
            reason: ''
        }
    ];

    // Find profile by ID
    const profile = profiles.find(p => p.id === parseInt(profileId)) || profiles[0];

    // Populate profile data (Desktop)
    unitName.textContent = profile.unitName;
    taxCode.textContent = profile.taxCode;
    representative.textContent = profile.representative;
    contactInfo.innerHTML = `<i class="bi bi-telephone"></i> ${profile.phone} / <i class="bi bi-envelope"></i> ${profile.email}`;
    address.textContent = profile.address;
    submittedDate.textContent = new Date(profile.submittedDate).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    status.innerHTML = `<span class="badge ${getStatusBadgeClass(profile.status)}">${profile.status}</span>`;

    // Populate profile data (Mobile)
    unitNameMobile.textContent = profile.unitName;
    taxCodeMobile.textContent = profile.taxCode;
    representativeMobile.textContent = profile.representative;
    contactInfoMobile.innerHTML = `<i class="bi bi-telephone"></i> ${profile.phone} / <i class="bi bi-envelope"></i> ${profile.email}`;
    addressMobile.textContent = profile.address;
    submittedDateMobile.textContent = new Date(profile.submittedDate).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    statusMobile.innerHTML = `<span class="badge ${getStatusBadgeClass(profile.status)}">${profile.status}</span>`;

    // Render legal documents (Desktop and Mobile)
    [legalDocuments, legalDocumentsMobile].forEach(el => {
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

    // Update UI based on status
    function updateUIByStatus() {
        [reason, reasonMobile].forEach(r => {
            r.disabled = profile.status !== 'Chờ duyệt';
            r.value = profile.reason || '';
        });
        [reasonError, reasonErrorMobile].forEach(re => re.style.display = 'none');
        [desktopActionButtons, mobileActionButtons].forEach(container => container.innerHTML = '');

        const createButton = (text, className, clickHandler, disabled = false) => {
            const btn = document.createElement('button');
            btn.className = `btn ${className}`;
            btn.textContent = text;
            btn.addEventListener('click', clickHandler);
            btn.disabled = disabled;
            return btn;
        };

        if (profile.status === 'Chờ duyệt') {
            desktopActionButtons.appendChild(createButton('Quay lại', 'btn-secondary', backToList));
            desktopActionButtons.appendChild(createButton('Duyệt', 'btn-success', handleApprove));
            desktopActionButtons.appendChild(createButton('Từ chối', 'btn-danger', handleReject));
            mobileActionButtons.appendChild(createButton('Quay lại', 'btn-secondary', backToList));
            mobileActionButtons.appendChild(createButton('Duyệt', 'btn-success', handleApprove));
            mobileActionButtons.appendChild(createButton('Từ chối', 'btn-danger', handleReject));
        } else if (profile.status === 'Đã duyệt') {
            desktopActionButtons.appendChild(createButton('Quay lại', 'btn-secondary', backToList));
            desktopActionButtons.appendChild(createButton('Tạo chủ thể', 'btn-info', handleCreateEntity));
            mobileActionButtons.appendChild(createButton('Quay lại', 'btn-secondary', backToList));
            mobileActionButtons.appendChild(createButton('Tạo chủ thể', 'btn-info', handleCreateEntity));
        } else if (profile.status === 'Từ chối') {
            desktopActionButtons.appendChild(createButton('Quay lại', 'btn-secondary', backToList));
            mobileActionButtons.appendChild(createButton('Quay lại', 'btn-secondary', backToList));
        } else if (profile.status === 'Đã tạo chủ thể') {
            desktopActionButtons.appendChild(createButton('Quay lại', 'btn-secondary', backToList));
            desktopActionButtons.appendChild(createButton('Xem chi tiết chủ thể', 'btn-secondary', handleViewEntityDetails));
            mobileActionButtons.appendChild(createButton('Quay lại', 'btn-secondary', backToList));
            mobileActionButtons.appendChild(createButton('Xem chi tiết chủ thể', 'btn-secondary', handleViewEntityDetails));
        }

        validateReason();
    }

    // Get badge class based on status
    function getStatusBadgeClass(status) {
        return {
            'Chờ duyệt': 'badge-warning',
            'Đã duyệt': 'badge-success',
            'Từ chối': 'badge-danger',
            'Đã tạo chủ thể': 'badge-created'
        }[status] || 'badge-secondary';
    }

    // Validate reason input based on device
    function validateReason() {
        const isMobile = window.innerWidth < 768;
        const activeReasonField = isMobile ? reasonMobile : reason;
        const activeReasonError = isMobile ? reasonErrorMobile : reasonError;
        const activeRejectBtn = isMobile ? mobileActionButtons.querySelector('.btn-danger') : desktopActionButtons.querySelector('.btn-danger');

        const isValid = activeReasonField.value.trim().length > 0 || profile.status !== 'Chờ duyệt';
        if (activeRejectBtn) {
            activeRejectBtn.disabled = !isValid;
        }
        activeReasonError.style.display = isValid ? 'none' : 'block';

        return isValid;
    }

    // Update profile status (mock API call)
    const updateProfileStatus = async (newStatus) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const profileIndex = profiles.findIndex(p => p.id === parseInt(profileId));
            if (profileIndex !== -1) {
                profiles[profileIndex].status = newStatus;
                profiles[profileIndex].reason = newStatus === 'Từ chối' ? (reason.value || reasonMobile.value) : '';
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating profile status:', error);
            return false;
        }
    };

    // Handle approve action
    const handleApprove = () => {
        window.Popup.showApproveConfirm(profileId, async () => {
            const success = await updateProfileStatus('Đã duyệt');
            if (success) {
                window.Toast.showSuccess('Duyệt hồ sơ thành công!');
                if (typeof window.loadContent === 'function') {
                    window.loadContent('subject-add-new', { profileId });
                } else {
                    console.error('loadContent function not found in layout.js');
                }
            }
        });
    };

    // Handle reject action
    const handleReject = () => {
        if (validateReason()) {
            window.Popup.showRejectConfirm(profileId, async () => {
                const success = await updateProfileStatus('Từ chối');
                if (success) {
                    window.Toast.showSuccess('Từ chối hồ sơ thành công!');
                    backToList();
                }
            });
        }
    };

    // Handle create entity action
    const handleCreateEntity = () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('subject-add-new', { profileId });
        } else {
            console.error('loadContent function not found');
        }
    };

    // Handle view entity details action
    const handleViewEntityDetails = () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('company-details', { profileId });
        } else {
            console.error('loadContent function not found');
        }
    };

    // Event listeners (Desktop)
    reason.addEventListener('input', () => validateReason());

    // Event listeners (Mobile)
    reasonMobile.addEventListener('input', () => validateReason());

    // Function to go back to list
    function backToList() {
        if (typeof window.loadContent === 'function') {
            window.loadContent('subject-approval');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    }

    // Initial UI update
    updateUIByStatus();
}