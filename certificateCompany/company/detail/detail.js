const initCompanyDetailPage = () => {
    const elements = {
        errorBanner: document.getElementById('errorBanner'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        companyLogo: document.getElementById('companyLogo'),
        companyCode: document.getElementById('companyCode'),
        companyName: document.getElementById('companyName'),
        phoneNumber: document.getElementById('phoneNumber'),
        email: document.getElementById('email'),
        businessRegNumber: document.getElementById('businessRegNumber'),
        businessRegImage1: document.getElementById('businessRegImage1'),
        businessRegImage2: document.getElementById('businessRegImage2'),
        address: document.getElementById('address'),
        note: document.getElementById('note'),
        status: document.getElementById('status'),
        backBtn: document.getElementById('backBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
    };

    // Mock API to fetch company details
    const fetchCompanyDetails = async () => {
        elements.loadingSpinner.classList.remove('d-none');
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Fixed mock data for testing
            const company = {
                id: 1,
                companyCode: 'CT001',
                companyName: 'Công ty TNHH Alpha',
                phoneNumber: '0901234567',
                email: 'contact@alpha.com',
                businessRegNumber: 'BR001',
                businessRegImage1: 'https://via.placeholder.com/150?text=DKKD1',
                businessRegImage2: 'https://via.placeholder.com/150?text=DKKD2',
                address: '123 Đường Láng, Hà Nội',
                note: 'Lời mời liên kết đầu tiên',
                status: 'Chờ duyệt'
            };
            return company;
        } catch (error) {
            throw new Error('Không thể tải thông tin lời mời liên kết');
        } finally {
            elements.loadingSpinner.classList.add('d-none');
        }
    };

    // Mock API to update company status
    const updateCompanyStatus = async (companyId) => {
        elements.loadingSpinner.classList.remove('d-none');
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return true;
        } finally {
            elements.loadingSpinner.classList.add('d-none');
        }
    };

    // Display company details
    const displayCompanyDetails = (company) => {
        elements.companyLogo.src = company.businessRegImage1; // Use businessRegImage1 as logo
        elements.companyCode.value = company.companyCode;
        elements.companyName.value = company.companyName;
        elements.phoneNumber.value = company.phoneNumber;
        elements.email.value = company.email;
        elements.businessRegNumber.value = company.businessRegNumber;
        elements.businessRegImage1.src = company.businessRegImage1;
        elements.businessRegImage2.src = company.businessRegImage2;
        elements.address.value = company.address;
        elements.note.value = company.note || '';
        elements.status.value = company.status;
        elements.cancelBtn.classList.toggle('d-none', company.status !== 'Chờ duyệt');
    };

    // Show error message
    const showError = (message) => {
        elements.errorBanner.textContent = message;
        elements.errorBanner.classList.remove('d-none');
        setTimeout(() => elements.errorBanner.classList.add('d-none'), 5000);
    };

    // Handle cancel invite
    const handleCancel = (companyId) => {
        if (window.Popup && typeof window.Popup.showApproveConfirm === 'function') {
            window.Popup.showApproveConfirm(
                companyId,
                async (id) => {
                    const success = await updateCompanyStatus(id, 'Đã hủy');
                    if (success && window.Toast && typeof window.Toast.showSuccess === 'function') {
                        window.Toast.showSuccess('Hủy lời mời liên kết thành công!');
                        window.loadContent('nsxkd-approval');
                    }
                },
                'Bạn có chắc chắn muốn hủy lời mời liên kết này không?'
            );
        }
    };

    // Initialize page
    const init = async () => {
        try {
            const company = await fetchCompanyDetails();
            displayCompanyDetails(company);
        } catch (error) {
            showError(error.message);
        }
    };

    // Event listeners
    elements.backBtn.addEventListener('click', () => {
        window.loadContent('nsxkd-approval');
    });

    elements.cancelBtn.addEventListener('click', () => {
        handleCancel(1); // Fixed ID for mock data
    });

    // Start initialization
    init();
};

document.addEventListener('DOMContentLoaded', initCompanyDetailPage);