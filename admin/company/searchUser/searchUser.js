const initSearchUserPage = (entityId) => {
    const elements = {
        searchUserModal: document.getElementById('searchUserModal'),
        searchTypeRadios: document.querySelectorAll('input[name="searchType"]'),
        phoneInput: document.getElementById('phoneInput'),
        emailInput: document.getElementById('emailInput'),
        userPhone: document.getElementById('userPhone'),
        userEmail: document.getElementById('userEmail'),
        phoneError: document.getElementById('phoneError'),
        emailError: document.getElementById('emailError'),
        searchBtn: document.getElementById('searchBtn'),
        selectBtn: document.getElementById('selectBtn'),
        userInfoContainer: document.getElementById('userInfoContainer'),
        userAvatar: document.getElementById('userAvatar'),
        userName: document.getElementById('userName'),
        userAddress: document.getElementById('userAddress'),
        userPhoneResult: document.getElementById('userPhoneResult'),
        userEmailResult: document.getElementById('userEmailResult'),
        searchResultMessage: document.getElementById('searchResultMessage'),
    };

    let currentEntityId = entityId;

    // Validate phone number (Vietnamese format: 10 digits, starting with 0)
    const validatePhone = (phone) => {
        const phoneRegex = /^0\d{9}$/;
        return phoneRegex.test(phone);
    };

    // Validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Toggle input fields based on radio selection
    const toggleInputFields = () => {
        const selectedType = document.querySelector('input[name="searchType"]:checked').value;
        elements.phoneInput.classList.toggle('d-none', selectedType !== 'phone');
        elements.emailInput.classList.toggle('d-none', selectedType !== 'email');
        validateAndEnableSearch();
    };

    // Validate and enable/disable search button
    const validateAndEnableSearch = () => {
        const selectedType = document.querySelector('input[name="searchType"]:checked').value;
        let isValid = false;
        if (selectedType === 'phone') {
            isValid = validatePhone(elements.userPhone.value);
            elements.phoneError.textContent = isValid ? '' : 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 0';
        } else if (selectedType === 'email') {
            isValid = validateEmail(elements.userEmail.value);
            elements.emailError.textContent = isValid ? '' : 'Email không hợp lệ';
        }
        elements.searchBtn.disabled = !isValid;
    };

    // Search user (mock API call with more fake data)
    const searchUser = async (searchValue) => {
        elements.searchBtn.disabled = true;
        elements.userInfoContainer.classList.add('d-none');
        elements.searchResultMessage.textContent = 'Đang tìm kiếm...';
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            // Mock API response with more fake data
            const mockData = {
                phone: {
                    '0123456789': { avatar: 'https://via.placeholder.com/50', name: 'Nguyễn Văn A', address: '123 Đường Láng, Hà Nội', phone: '0123456789', email: 'nguyenvana@example.com' },
                    '0987654321': { avatar: 'https://via.placeholder.com/50', name: 'Trần Thị B', address: '456 Nguyễn Huệ, TP.HCM', phone: '0987654321', email: 'tranthib@example.com' },
                    '0912345678': { avatar: 'https://via.placeholder.com/50', name: 'Lê Văn C', address: '789 Hai Bà Trưng, Đà Nẵng', phone: '0912345678', email: 'levanc@example.com' },
                },
                email: {
                    'nguyenvana@example.com': { avatar: 'https://via.placeholder.com/50', name: 'Nguyễn Văn A', address: '123 Đường Láng, Hà Nội', phone: '0123456789', email: 'nguyenvana@example.com' },
                    'tranthib@example.com': { avatar: 'https://via.placeholder.com/50', name: 'Trần Thị B', address: '456 Nguyễn Huệ, TP.HCM', phone: '0987654321', email: 'tranthib@example.com' },
                    'levanc@example.com': { avatar: 'https://via.placeholder.com/50', name: 'Lê Văn C', address: '789 Hai Bà Trưng, Đà Nẵng', phone: '0912345678', email: 'levanc@example.com' },
                },
            };
            const selectedType = document.querySelector('input[name="searchType"]:checked').value;
            const user = mockData[selectedType][searchValue];
            if (user) {
                elements.userAvatar.src = user.avatar;
                elements.userName.value = user.name;
                elements.userAddress.value = user.address;
                elements.userPhoneResult.value = user.phone;
                elements.userEmailResult.value = user.email;
                elements.userInfoContainer.classList.remove('d-none');
                elements.selectBtn.classList.remove('d-none');
                elements.searchResultMessage.textContent = '';
            } else {
                elements.searchResultMessage.textContent = 'Không tìm thấy người dùng phù hợp';
                elements.selectBtn.classList.add('d-none');
            }
        } catch (error) {
            elements.searchResultMessage.textContent = 'Lỗi khi tìm kiếm người dùng';
            elements.selectBtn.classList.add('d-none');
        }
        elements.searchBtn.disabled = false;
    };

    // Handle select user
    const handleSelectUser = () => {
        if (window.Popup && typeof window.Popup.showApproveConfirm === 'function') {
            window.Popup.showApproveConfirm(currentEntityId, async () => {
                try {
                    await new Promise((resolve) => setTimeout(resolve, 500)); // Mock API call
                    if (window.Toast && typeof window.Toast.showSuccess === 'function') {
                        window.Toast.showSuccess('Mời người dùng làm quản trị viên thành công!');
                    } else {
                        console.error('Toast module not loaded');
                    }
                    // Close the modal and remove overlay
                    elements.searchUserModal.querySelector('[data-bs-dismiss="modal"]').click();
                } catch (error) {
                    console.error('Error assigning admin:', error);
                }
            });
        } else {
            console.error('Popup module not loaded or showApproveConfirm not found');
        }
    };

    // Handle modal close
    elements.searchUserModal.addEventListener('hidden.bs.modal', () => {
        // Remove popup container and overlay
        const popupContainer = document.getElementById('searchUserPopupContainer');
        const overlay = document.getElementById('searchUserOverlay');
        if (popupContainer) popupContainer.remove();
        if (overlay) overlay.remove();
    });

    // Event listeners
    elements.searchTypeRadios.forEach(radio => radio.addEventListener('change', toggleInputFields));
    elements.userPhone.addEventListener('input', validateAndEnableSearch);
    elements.userEmail.addEventListener('input', validateAndEnableSearch);
    elements.searchBtn.addEventListener('click', () => {
        const selectedType = document.querySelector('input[name="searchType"]:checked').value;
        const searchValue = selectedType === 'phone' ? elements.userPhone.value : elements.userEmail.value;
        searchUser(searchValue);
    });
    elements.selectBtn.addEventListener('click', handleSelectUser);

    // Initialize
    toggleInputFields();

    // Reset modal state when shown
    elements.searchUserModal.addEventListener('show.bs.modal', () => {
        elements.userInfoContainer.classList.add('d-none');
        elements.selectBtn.classList.add('d-none');
        elements.searchResultMessage.textContent = '';
        elements.userPhone.value = '';
        elements.userEmail.value = '';
        elements.searchBtn.disabled = true;
        validateAndEnableSearch();
    });
};