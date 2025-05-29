(function initProductEdit(productId) {
    const form = document.getElementById('editProductForm');
    if (!form) {
        console.error('Form "editProductForm" not found.');
        return;
    }

    const confirmBtn = document.getElementById('confirmBtn');
    const backBtn = document.getElementById('backBtn');
    const fields = {
        productName: { element: document.getElementById('productName'), feedbackId: 'productName-feedback', required: true },
        shortDescription: { element: document.getElementById('shortDescription'), feedbackId: 'shortDescription-feedback', required: true },
        productGroup: { element: document.getElementById('productGroup'), feedbackId: 'productGroup-feedback', required: true },
        certificationStandards: { element: document.getElementById('certificationStandards'), feedbackId: 'certificationStandards-feedback', required: true },
        productImage: { element: document.getElementById('productImage'), feedbackId: 'productImage-feedback', required: false },
        status: { element: document.getElementById('status'), feedbackId: 'status-feedback', required: true },
        createdBy: { element: document.getElementById('createdBy'), feedbackId: null, required: false },
        createdDate: { element: document.getElementById('createdDate'), feedbackId: null, required: false },
        productImagePreview: { element: document.getElementById('productImagePreview'), feedbackId: null, required: false }
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
        certificationStandards: value => value.length > 0,
        status: value => value !== '',
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
        if (feedbackId) {
            element.classList.toggle('is-invalid', !isValid && shouldShowFeedback);
            const feedbackElement = document.getElementById(feedbackId);
            if (feedbackElement) {
                feedbackElement.textContent = (isValid || !shouldShowFeedback) ? '' : getErrorMessage(element.id, required);
            }
        }
        return isValid;
    };

    // Lấy thông báo lỗi
    const getErrorMessage = (fieldId, required) => {
        switch (fieldId) {
            case 'productName': return 'Vui lòng nhập tên sản phẩm.';
            case 'shortDescription': return 'Vui lòng nhập mô tả ngắn.';
            case 'productGroup': return 'Vui lòng chọn nhóm sản phẩm.';
            case 'certificationStandards': return 'Vui lòng nhập tiêu chuẩn chứng nhận.';
            case 'status': return 'Vui lòng chọn trạng thái.';
            case 'productImage': return 'Vui lòng chọn file ảnh (PNG/JPG, max 2MB).';
            default: return '';
        }
    };

    // Validate toàn bộ form
    const validateForm = (forceShowFeedback = false) => {
        let isValid = true;
        Object.values(fields).forEach(field => {
            if (field.feedbackId !== null) { // Chỉ validate các trường có feedback
                isValid &= validateField(field, forceShowFeedback);
            }
        });
        confirmBtn.disabled = !isValid;
        return isValid;
    };

    // Sample data (replace with API call if needed)
    const products = [
        {
            id: 1,
            productName: 'Máy giặt Samsung',
            shortDescription: 'Máy giặt công nghệ inverter tiết kiệm điện.',
            productGroup: 'Đồ gia dụng',
            certificationStandards: 'ISO 9001, CE',
            productImage: 'https://via.placeholder.com/300x200.png?text=Product+Image',
            status: 'Hoạt động',
            createdBy: 'Nguyễn Văn A',
            createdDate: '2025-05-01 10:00'
        },
        {
            id: 2,
            productName: 'Gạo ST25',
            shortDescription: 'Gạo ngon nhất Việt Nam.',
            productGroup: 'Thực phẩm',
            certificationStandards: 'OCOP, HACCP',
            productImage: 'https://via.placeholder.com/300x200.png?text=Product+Image',
            status: 'Chờ duyệt',
            createdBy: 'Trần Thị B',
            createdDate: '2025-05-02 14:30'
        }
    ];

    // Find product by ID and populate form
    const product = products.find(p => p.id === parseInt(productId)) || products[0];
    fields.productName.element.value = product.productName;
    fields.shortDescription.element.value = product.shortDescription;
    fields.productGroup.element.value = product.productGroup;
    fields.certificationStandards.element.value = product.certificationStandards;
    fields.status.element.value = product.status;
    fields.createdBy.element.textContent = product.createdBy;
    fields.createdDate.element.textContent = product.createdDate;
    fields.productImagePreview.element.src = product.productImage;

    // Real-time validation and interaction tracking
    Object.values(fields).forEach(field => {
        const { element } = field;
        if (element && field.feedbackId !== null) {
            const eventTypes = ['input'];
            if (element.type === 'file') eventTypes.push('change');
            if (element.tagName === 'SELECT') eventTypes.push('change');
            eventTypes.forEach(eventType => {
                element.addEventListener(eventType, () => {
                    interactionState[element.id] = true;
                    validateForm();
                });
            });
        }
    });

    // Submit form
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(true)) {
            const formData = new FormData(form);
            const updatedData = {
                id: product.id,
                productName: formData.get('productName'),
                shortDescription: formData.get('shortDescription'),
                productGroup: formData.get('productGroup'),
                certificationStandards: formData.get('certificationStandards'),
                productImage: formData.get('productImage'),
                status: formData.get('status'),
                createdBy: product.createdBy,
                createdDate: product.createdDate
            };
            console.log('Updated Product Data:', updatedData);
            // Add logic to submit the form data to a server or Firebase here
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
})(typeof productId !== 'undefined' ? productId : null);