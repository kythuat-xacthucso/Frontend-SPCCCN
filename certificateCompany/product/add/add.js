(function initAddProduct() {
    const form = document.getElementById('addProductForm');
    if (!form) {
        console.error('Form "addProductForm" not found.');
        return;
    }

    const confirmBtn = document.getElementById('confirmBtn');
    const backBtn = document.getElementById('backBtn');
    const fields = {
        productName: { element: document.getElementById('productName'), feedbackId: 'productName-feedback', required: true },
        shortDescription: { element: document.getElementById('shortDescription'), feedbackId: 'shortDescription-feedback', required: true },
        productGroup: { element: document.getElementById('productGroup'), feedbackId: 'productGroup-feedback', required: true },
        certificationStandards: { element: document.getElementById('certificationStandards'), feedbackId: 'certificationStandards-feedback', required: false },
        productImage: { element: document.getElementById('productImage'), feedbackId: 'productImage-feedback', required: false }
    };

    // Kiểm tra các phần tử cần thiết
    if (!confirmBtn || !backBtn || Object.values(fields).some(field => !field.element)) {
        console.error('One or more form elements are missing.');
        return;
    }

    // Disable confirm button by default
    confirmBtn.disabled = true;

    // Theo dõi trạng thái tương tác
    const interactionState = {};
    Object.keys(fields).forEach(key => interactionState[key] = false);

    // Validation rules
    const validationRules = {
        productName: value => value.length > 0,
        shortDescription: value => value.length > 0,
        productGroup: value => value !== '',
        productImage: () => {
            const file = fields.productImage.element.files[0];
            return !file || (file.size <= 2 * 1024 * 1024 && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type));
        }
    };

    // Validation function
    const validateField = (field, forceShow = false) => {
        const { element, feedbackId, required } = field;
        const value = element.value.trim();
        const isValid = !required || (validationRules[element.id] ? validationRules[element.id](value) : true);
        const shouldShowFeedback = forceShow || interactionState[element.id];
        element.classList.toggle('is-invalid', !isValid && shouldShowFeedback);
        const feedbackElement = document.getElementById(feedbackId);
        if (feedbackElement) {
            feedbackElement.textContent = (isValid || !shouldShowFeedback) ? '' : getErrorMessage(element.id, required);
        }
        return isValid;
    };

    // Lấy thông báo lỗi
    const getErrorMessage = (fieldId, required) => {
        switch (fieldId) {
            case 'productName': return 'Vui lòng nhập tên sản phẩm.';
            case 'shortDescription': return 'Vui lòng nhập mô tả ngắn.';
            case 'productGroup': return 'Vui lòng chọn nhóm sản phẩm.';
            case 'productImage': return 'Vui lòng chọn file ảnh (PNG/JPG, max 2MB).';
            default: return '';
        }
    };

    // Validate toàn bộ form
    const validateForm = (forceShowFeedback = false) => {
        let isValid = true;
        Object.values(fields).forEach(field => {
            isValid &= validateField(field, forceShowFeedback);
        });
        confirmBtn.disabled = !isValid;
        return isValid;
    };

    // Real-time validation and interaction tracking
    Object.values(fields).forEach(field => {
        const { element } = field;
        const eventTypes = ['input'];
        if (element.type === 'file') eventTypes.push('change');
        if (element.tagName === 'SELECT') eventTypes.push('change');
        eventTypes.forEach(eventType => {
            element.addEventListener(eventType, () => {
                interactionState[element.id] = true;
                validateForm();
            });
        });
    });

    // Submit form
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(true)) {
            const formData = new FormData(form);
            const data = {
                productName: formData.get('productName'),
                shortDescription: formData.get('shortDescription'),
                productGroup: formData.get('productGroup'),
                certificationStandards: formData.get('certificationStandards')?.split(',').map(tag => tag.trim()).filter(tag => tag) || [],
                productImage: formData.get('productImage')
            };
            console.log('Product Data:', data);
            if (typeof window.loadContent === 'function') {
                window.loadContent('product-management');
            } else {
                console.error('loadContent function not found in layout.js');
            }
        }
    });

    // Back button
    backBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('product-management');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });
})();