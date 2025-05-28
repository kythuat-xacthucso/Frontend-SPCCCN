function initDetailPage(profileId) {
    const unitName = document.getElementById('unitName');
    const taxCode = document.getElementById('taxCode');
    const certificationGoal = document.getElementById('certificationGoal');
    const mainProductGroup = document.getElementById('mainProductGroup');
    const operationScope = document.getElementById('operationScope');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const status = document.getElementById('status');
    const legalDocuments = document.getElementById('legalDocuments');
    const reason = document.getElementById('reason');
    const reasonError = document.getElementById('reasonError');
    const acceptBtn = document.getElementById('acceptBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const backBtn = document.getElementById('backBtn');

    // Sample data (replace with API call if needed)
    const profiles = [
        {
            id: 1,
            unitName: 'Công ty TNHH ABC',
            taxCode: '1234567890',
            certificationGoal: 'Chứng nhận ISO 9001',
            mainProductGroup: 'Sản phẩm điện tử',
            operationScope: 'Sản xuất và phân phối thiết bị điện tử',
            email: 'abc@example.com',
            phone: '0123456789',
            status: 'Chờ duyệt',
            submittedDate: '2025-05-01',
            legalDocuments: ['Giấy phép kinh doanh.pdf', 'Chứng nhận ISO.pdf'],
            reason: ''
        },
        {
            id: 2,
            unitName: 'Công ty CP XYZ',
            taxCode: '0987654321',
            certificationGoal: 'Chứng nhận an toàn thực phẩm',
            mainProductGroup: 'Thực phẩm chế biến',
            operationScope: 'Sản xuất thực phẩm đóng gói',
            email: 'xyz@example.com',
            phone: '0987654321',
            status: 'Đã duyệt',
            submittedDate: '2025-05-02',
            legalDocuments: ['Giấy phép vệ sinh ATTP.pdf'],
            reason: 'Hồ sơ hợp lệ'
        },
        {
            id: 3,
            unitName: 'Công ty TNHH DEF',
            taxCode: '1122334455',
            certificationGoal: 'Chứng nhận môi trường',
            mainProductGroup: 'Hóa chất công nghiệp',
            operationScope: 'Sản xuất và kinh doanh hóa chất',
            email: 'def@example.com',
            phone: '0912345678',
            status: 'Từ chối',
            submittedDate: '2025-05-03',
            legalDocuments: ['Giấy phép môi trường.pdf'],
            reason: 'Thiếu tài liệu bổ sung'
        },
        {
            id: 4,
            unitName: 'Công ty CP GHI',
            taxCode: '5566778899',
            certificationGoal: 'Chứng nhận chất lượng sản phẩm',
            mainProductGroup: 'Nội thất gỗ',
            operationScope: 'Sản xuất và xuất khẩu nội thất',
            email: 'ghi@example.com',
            phone: '0932145678',
            status: 'Chờ duyệt',
            submittedDate: '2025-05-04',
            legalDocuments: ['Chứng nhận xuất khẩu.pdf'],
            reason: ''
        }
    ];

    // Find profile by ID
    const profile = profiles.find(p => p.id === parseInt(profileId)) || profiles[0];

    // Populate profile data
    unitName.textContent = profile.unitName;
    taxCode.textContent = profile.taxCode;
    certificationGoal.textContent = profile.certificationGoal;
    mainProductGroup.textContent = profile.mainProductGroup;
    operationScope.textContent = profile.operationScope;
    email.textContent = profile.email;
    phone.textContent = profile.phone;
    status.textContent = profile.status;

    // Render legal documents
    legalDocuments.innerHTML = '';
    profile.legalDocuments.forEach(doc => {
        const link = document.createElement('a');
        link.href = '#'; // Replace with actual file URL
        link.className = 'list-group-item list-group-item-action';
        link.textContent = doc;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Previewing ${doc}`); // Replace with actual preview logic
        });
        legalDocuments.appendChild(link);
    });

    // Handle status-based UI
    function updateUIByStatus() {
        const statusBadgeClass = {
            'Chờ duyệt': 'text-warning',
            'Đã duyệt': 'text-success',
            'Từ chối': 'text-danger'
        }[profile.status] || 'text-secondary';
        status.classList.add(statusBadgeClass);

        if (profile.status === 'Đã duyệt' || profile.status === 'Từ chối') {
            reason.disabled = true;
            reason.value = profile.reason || '';
            acceptBtn.style.display = 'none';
            rejectBtn.style.display = 'none';
            reasonError.style.display = 'none';
        } else {
            reason.disabled = false;
            acceptBtn.style.display = 'inline-block';
            acceptBtn.disabled = false;
            rejectBtn.style.display = 'inline-block';
            reason.value = profile.reason || '';
            validateReason();
        }
    }

    // Validate reason input (only for Reject button)
    function validateReason() {
        const isValid = reason.value.trim().length > 0;
        rejectBtn.disabled = !isValid;
        reasonError.style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    // Event listeners
    reason.addEventListener('input', () => validateReason());
    acceptBtn.addEventListener('click', () => {
        alert(`Chấp nhận hồ sơ ID: ${profileId}`); // Replace with actual acceptance logic
        backToList();
    });
    rejectBtn.addEventListener('click', () => {
        if (validateReason()) {
            alert(`Từ chối hồ sơ ID: ${profileId} với lý do: ${reason.value}`); // Replace with actual rejection logic
            backToList();
        }
    });
    backBtn.addEventListener('click', backToList);

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