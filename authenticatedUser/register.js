document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerSubjectForm');
    const submitBtn = document.getElementById('submitBtn');
    const fileInput = document.getElementById('legalDocuments');
    const filePreview = document.getElementById('filePreview');

    const fields = [
        { id: 'orgName', validate: v => v.length > 0, msg: 'Vui lòng nhập tên tổ chức/thương hiệu.' },
        { id: 'certificationGoal', validate: v => v.length > 0, msg: 'Vui lòng nhập mục tiêu chứng nhận.' },
        { id: 'productGroup', validate: v => v.split(',').some(tag => tag.trim()), msg: 'Vui lòng nhập ít nhất một nhóm sản phẩm.' },
        { id: 'operationScope', validate: v => v !== '', msg: 'Vui lòng chọn phạm vi hoạt động.' },
        { id: 'taxLicense', validate: v => /^[0-9]{10,13}$/.test(v), msg: 'Vui lòng nhập mã số thuế/GPKD hợp lệ (10-13 chữ số).' },
        { id: 'contactEmail', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Vui lòng nhập email hợp lệ.' },
        { id: 'phoneNumber', validate: v => /^[0-9]{10}$/.test(v), msg: 'Vui lòng nhập số điện thoại hợp lệ (10 chữ số).' }
    ];

    const validateField = ({ id, validate, msg }) => {
        const el = document.getElementById(id);
        const val = el.value.trim();
        const isValid = validate(val);
        el.classList.toggle('is-invalid', !isValid);
        document.getElementById(`${id}-feedback`).textContent = isValid ? '' : msg;
        return isValid;
    };

    const validateFiles = () => {
        const files = fileInput.files;
        const valid = files.length > 0 && files.length <= 3 &&
            Array.from(files).every(f => f.size <= 15 * 1024 * 1024);
        fileInput.classList.toggle('is-invalid', !valid);
        document.getElementById('legalDocuments-feedback').textContent = valid
            ? ''
            : 'Vui lòng chọn tối đa 3 file (PDF, JPG, PNG) và mỗi file không vượt quá 15MB.';
        return valid;
    };

    const showFilePreview = () => {
        const names = Array.from(fileInput.files).map(f => f.name);
        filePreview.textContent = names.join(', ') || '';
    };

    const validateForm = () => {
        const validFields = fields.map(validateField).every(Boolean);
        const validFiles = validateFiles();
        return validFields && validFiles;
    };

    // Validate mỗi trường khi blur (mất focus)
    fields.forEach(field => {
        const el = document.getElementById(field.id);
        el.addEventListener('blur', () => validateField(field));
    });

    // Validate lại toàn form khi có input/change
    fields.forEach(({ id }) => {
        const el = document.getElementById(id);
        el.addEventListener('input', validateField.bind(null, fields.find(f => f.id === id)));
        if (el.tagName === 'SELECT') {
            el.addEventListener('change', validateField.bind(null, fields.find(f => f.id === id)));
        }
    });

    fileInput.addEventListener('change', () => {
        validateFiles();
        showFilePreview();
    });

    form.addEventListener('submit', e => {
        const isValid = validateForm();
        if (!isValid) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Reset modal form khi đóng
    const modal = document.getElementById('registerSubjectModal');
    modal.addEventListener('hidden.bs.modal', () => {
        form.reset();
        filePreview.textContent = '';
        [...form.querySelectorAll('.is-invalid')].forEach(el => el.classList.remove('is-invalid'));
        [...form.querySelectorAll('.invalid-feedback')].forEach(el => el.textContent = '');
    });
});
