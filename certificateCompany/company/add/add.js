const initCompanyAddNewPage = () => {
    const elements = {
        searchTypeRadios: document.querySelectorAll('input[name="searchType"]'),
        searchInput: document.getElementById('searchInput'),
        checkBtn: document.getElementById('checkBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        sendInviteBtn: document.getElementById('sendInviteBtn'),
        resetBtn: document.getElementById('resetBtn'),
        errorBanner: document.getElementById('errorBanner'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        companyInfo: document.getElementById('companyInfo'),
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
    };

    let currentSearchType = 'code';

    // Update placeholder based on selected radio
    const updatePlaceholder = () => {
        const placeholders = {
            code: 'Nhập mã chủ thể',
            phone: 'Nhập số điện thoại',
            email: 'Nhập email'
        };
        elements.searchInput.placeholder = placeholders[currentSearchType];
    };

    // Validate input and toggle check button
    const validateInput = () => {
        const isValid = elements.searchInput.value.trim().length > 0;
        elements.checkBtn.disabled = !isValid;
    };

    // Mock API to check company info
    const checkCompanyInfo = async (value, type) => {
        elements.loadingSpinner.classList.remove('d-none');
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Mock data for testing TH2 and TH3
            const mockCompanies = [
                { 
                    companyCode: 'CT001', 
                    companyName: 'Công ty TNHH Alpha', 
                    phoneNumber: '0901234567', 
                    email: 'contact@alpha.com', 
                    businessRegNumber: 'BR001', 
                    businessRegImage1: 'https://via.placeholder.com/150?text=DKKD1', 
                    businessRegImage2: 'https://via.placeholder.com/150?text=DKKD2', 
                    address: '123 Đường Láng, Hà Nội', 
                    isLinked: false // TH3: Hợp lệ, chưa liên kết
                },
                { 
                    companyCode: 'CT002', 
                    companyName: 'Công ty CP Beta', 
                    phoneNumber: '0912345678', 
                    email: 'contact@beta.com', 
                    businessRegNumber: 'BR002', 
                    businessRegImage1: 'https://via.placeholder.com/150?text=DKKD1', 
                    businessRegImage2: 'https://via.placeholder.com/150?text=DKKD2', 
                    address: '456 Đường Giải Phóng, Hà Nội', 
                    isLinked: true // TH2: Đã liên kết
                },
                { 
                    companyCode: 'CT003', 
                    companyName: 'Công ty TNHH Gamma', 
                    phoneNumber: '0923456789', 
                    email: 'contact@gamma.com', 
                    businessRegNumber: 'BR003', 
                    businessRegImage1: 'https://via.placeholder.com/150?text=DKKD1', 
                    businessRegImage2: 'https://via.placeholder.com/150?text=DKKD2', 
                    address: '789 Đường Cầu Giấy, Hà Nội', 
                    isLinked: false // TH3: Hợp lệ, chưa liên kết
                },
                { 
                    companyCode: 'CT004', 
                    companyName: 'Công ty CP Delta', 
                    phoneNumber: '0934567890', 
                    email: 'contact@delta.com', 
                    businessRegNumber: 'BR004', 
                    businessRegImage1: 'https://via.placeholder.com/150?text=DKKD1', 
                    businessRegImage2: 'https://via.placeholder.com/150?text=DKKD2', 
                    address: '101 Đường Nguyễn Trãi, Hà Nội', 
                    isLinked: true // TH2: Đã liên kết
                },
                { 
                    companyCode: 'CT005', 
                    companyName: 'Công ty TNHH Epsilon', 
                    phoneNumber: '0945678901', 
                    email: 'contact@epsilon.com', 
                    businessRegNumber: 'BR005', 
                    businessRegImage1: 'https://via.placeholder.com/150?text=DKKD1', 
                    businessRegImage2: 'https://via.placeholder.com/150?text=DKKD2', 
                    address: '222 Đường Trần Duy Hưng, Hà Nội', 
                    isLinked: false // TH3: Hợp lệ, chưa liên kết
                }
            ];

            const company = mockCompanies.find(c => 
                (type === 'code' && c.companyCode === value) ||
                (type === 'phone' && c.phoneNumber === value) ||
                (type === 'email' && c.email === value)
            );

            if (!company) {
                throw new Error(`Chủ thể với ${type === 'code' ? 'Mã chủ thể' : type === 'phone' ? 'Số điện thoại' : 'Email'} ${value} không tồn tại trên hệ thống. Bạn vui lòng kiểm tra lại và nhập ${type === 'code' ? 'Mã chủ thể' : type === 'phone' ? 'Số điện thoại' : 'Email'} khác`);
            }

            if (company.isLinked) {
                throw new Error(`Chủ thể ${company.companyName} với ${type === 'code' ? 'Mã chủ thể' : type === 'phone' ? 'Số điện thoại' : 'Email'} ${value} đã được liên kết với bạn trước đó rồi. Bạn vui lòng kiểm tra thông tin chủ thể trong danh sách chủ thể đã liên kết`);
            }

            return company;
        } finally {
            elements.loadingSpinner.classList.add('d-none');
        }
    };

    // Mock API to send invite
    const sendInvite = async (companyData, note) => {
        elements.loadingSpinner.classList.remove('d-none');
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return true;
        } finally {
            elements.loadingSpinner.classList.add('d-none');
        }
    };

    // Display company info
    const displayCompanyInfo = (company) => {
        elements.companyLogo.src = company.businessRegImage1; // Use businessRegImage1 as logo for demo
        elements.companyCode.value = company.companyCode;
        elements.companyName.value = company.companyName;
        elements.phoneNumber.value = company.phoneNumber;
        elements.email.value = company.email;
        elements.businessRegNumber.value = company.businessRegNumber;
        elements.businessRegImage1.src = company.businessRegImage1;
        elements.businessRegImage2.src = company.businessRegImage2;
        elements.address.value = company.address;
        elements.companyInfo.classList.remove('d-none');
        elements.searchInput.disabled = true;
        elements.checkBtn.classList.add('d-none');
        elements.sendInviteBtn.classList.remove('d-none');
        elements.resetBtn.classList.remove('d-none');
    };

    // Reset form
    const resetForm = () => {
        elements.searchInput.value = '';
        elements.searchInput.disabled = false;
        elements.companyInfo.classList.add('d-none');
        elements.errorBanner.classList.add('d-none');
        elements.checkBtn.classList.remove('d-none');
        elements.sendInviteBtn.classList.add('d-none');
        elements.resetBtn.classList.add('d-none');
        elements.note.value = '';
        validateInput();
    };

    // Show error message
    const showError = (message) => {
        elements.errorBanner.textContent = message;
        elements.errorBanner.classList.remove('d-none');
        setTimeout(() => elements.errorBanner.classList.add('d-none'), 5000);
    };

    // Event listeners
    elements.searchTypeRadios.forEach(radio => radio.addEventListener('change', () => {
        currentSearchType = radio.value;
        updatePlaceholder();
        elements.searchInput.value = '';
        validateInput();
    }));

    elements.searchInput.addEventListener('input', validateInput);

    elements.checkBtn.addEventListener('click', async () => {
        const value = elements.searchInput.value.trim();
        try {
            const company = await checkCompanyInfo(value, currentSearchType);
            displayCompanyInfo(company);
        } catch (error) {
            showError(error.message);
        }
    });

    elements.resetBtn.addEventListener('click', resetForm);

    elements.cancelBtn.addEventListener('click', () => {
        window.loadContent('nsxkd-approval');
    });

    elements.sendInviteBtn.addEventListener('click', () => {
        if (window.Popup && typeof window.Popup.showApproveConfirm === 'function') {
            window.Popup.showApproveConfirm(
                null,
                async () => {
                    const companyData = {
                        companyCode: elements.companyCode.value,
                        companyName: elements.companyName.value,
                        phoneNumber: elements.phoneNumber.value,
                        email: elements.email.value,
                        businessRegNumber: elements.businessRegNumber.value,
                        address: elements.address.value
                    };
                    const note = elements.note.value.trim();
                    const success = await sendInvite(companyData, note);
                    if (success && window.Toast && typeof window.Toast.showSuccess === 'function') {
                        window.Toast.showSuccess('Gửi lời mời liên kết thành công!');
                        window.loadContent('nsxkd-approval');
                    }
                },
                'Bạn có chắc chắn muốn gửi lời mời liên kết này không?'
            );
        }
    });

    // Initialize
    updatePlaceholder();
};

document.addEventListener('DOMContentLoaded', initCompanyAddNewPage);