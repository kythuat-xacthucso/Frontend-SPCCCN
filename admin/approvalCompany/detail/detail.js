function initDetailPage(profileId) {
    const unitName = document.getElementById('unitName');
    const taxCode = document.getElementById('taxCode');
    const representative = document.getElementById('representative');
    const zaloManager = document.getElementById('zaloManager');
    const status = document.getElementById('status');
    const submittedDate = document.getElementById('submittedDate');
    const attachments = document.getElementById('attachments');
    const reason = document.getElementById('reason');
    const reasonError = document.getElementById('reasonError');
    const acceptBtn = document.getElementById('acceptBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const backBtn = document.getElementById('backBtn');

    // Sample data (replace with API call if needed)
    const profiles = [
        { id: 1, unitName: 'Công ty TNHH ABC', taxCode: '1234567890', representative: 'Nguyễn Văn A - 0912345678', zaloManager: 'Trần Thị B - 0987654321', status: 'Chờ duyệt', submittedDate: '2025-05-01', attachments: ['file1.pdf', 'file2.jpg'], reason: '' },
        { id: 2, unitName: 'Công ty CP XYZ', taxCode: '0987654321', representative: 'Lê Văn C - 0931234567', zaloManager: 'Phạm Thị D - 0978765432', status: 'Đã duyệt', submittedDate: '2025-05-02', attachments: ['file3.pdf'], reason: 'Hồ sơ hợp lệ' },
        { id: 3, unitName: 'Công ty TNHH DEF', taxCode: '1122334455', representative: 'Hoàng Văn E - 0918765432', zaloManager: 'Ngô Thị F - 0981234567', status: 'Đã từ chối', submittedDate: '2025-05-03', attachments: ['file4.pdf'], reason: 'Thiếu tài liệu' },
        { id: 4, unitName: 'Công ty CP GHI', taxCode: '5566778899', representative: 'Trần Văn G - 0934567890', zaloManager: 'Lê Thị H - 0971234567', status: 'Chờ duyệt', submittedDate: '2025-05-04', attachments: ['file5.jpg'], reason: '' },
    ];

    // Find profile by ID
    const profile = profiles.find(p => p.id === parseInt(profileId)) || profiles[0];
    unitName.textContent = profile.unitName;
    taxCode.textContent = profile.taxCode;
    representative.textContent = profile.representative;
    zaloManager.textContent = profile.zaloManager;
    status.textContent = profile.status;
    submittedDate.textContent = profile.submittedDate;

    // Render attachments
    attachments.innerHTML = '';
    profile.attachments.forEach(file => {
        const link = document.createElement('a');
        link.href = '#'; // Replace with actual file URL
        link.className = 'list-group-item list-group-item-action';
        link.textContent = file;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Previewing ${file}`); // Replace with actual preview logic
        });
        attachments.appendChild(link);
    });

    // Handle status-based UI
    function updateUIByStatus() {
        if (profile.status === 'Đã duyệt' || profile.status === 'Đã từ chối') {
            reason.disabled = true;
            reason.value = profile.reason || '';
            acceptBtn.style.display = 'none';
            rejectBtn.style.display = 'none';
            reasonError.style.display = 'none';
        } else {
            reason.disabled = false;
            acceptBtn.style.display = 'inline-block';
            acceptBtn.disabled = false; // Always enable Accept button
            rejectBtn.style.display = 'inline-block';
            reason.value = profile.reason || '';
            validateReason();
        }
    }

    // Validate reason input (only for Reject button)
    function validateReason() {
        const isValid = reason.value.trim().length > 0;
        rejectBtn.disabled = !isValid; // Only disable Reject button if no reason
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