const initProductEditPage = (productId) => {
    const elements = {
        editProductForm: document.getElementById('editProductForm'),
        productName: document.getElementById('product_name'),
        productType: document.getElementById('product_type'),
        description: document.getElementById('description'),
        certificationStandard: document.getElementById('certification_standard'),
        createdDate: document.getElementById('created_date'),
        creator: document.getElementById('creator'),
        imageUpload: document.getElementById('image_upload'),
        imagePreview: document.getElementById('image_preview'),
        previewImage: document.getElementById('preview_image'),
        removeImageBtn: document.getElementById('remove_image'),
        saveBtn: document.getElementById('saveBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        imageViewModal: document.getElementById('imageViewModal'),
        fullSizeImage: document.getElementById('full_size_image'),
    };

    // Khởi tạo tooltip
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

    // Format ngày tháng
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    // Load dữ liệu loại sản phẩm từ API (mock data)
    const loadProductTypes = async () => {
        try {
            const response = await new Promise(resolve =>
                setTimeout(() => resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 1, name: 'Thực phẩm' },
                        { id: 2, name: 'Đồ uống' },
                        { id: 3, name: 'Sản phẩm điện tử' },
                    ]),
                }), 500)
            );
            const productTypes = await response.json();
            elements.productType.innerHTML = '<option value="">Chọn loại sản phẩm</option>' + productTypes.map(type => `<option value="${type.id}">${type.name}</option>`).join('');
        } catch (error) {
            console.error('Error loading product types:', error);
        }
    };

    // Load dữ liệu sản phẩm từ API (mock data)
    const loadProductDetail = async (id) => {
        try {
            const response = await new Promise(resolve =>
                setTimeout(() => resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        id: id,
                        productName: 'Kombucha Hồng trà - Đào tuyết',
                        productType: 'Đồ uống',
                        description: 'Mô tả sản phẩm kombucha.',
                        certificationStandard: 'ISO 22000',
                        createdDate: '2025-05-06',
                        creator: 'Phongigi',
                        imageUrl: 'https://via.placeholder.com/300x200', // Mock image
                    }),
                }), 500)
            );
            const product = await response.json();
            elements.productName.value = product.productName;
            elements.productType.value = product.productType;
            elements.description.value = product.description || '';
            elements.certificationStandard.value = product.certificationStandard || '';
            elements.createdDate.value = formatDate(product.createdDate);
            elements.creator.value = product.creator;
            if (product.imageUrl) {
                elements.previewImage.src = product.imageUrl;
                elements.imagePreview.style.display = 'block';
            }
        } catch (error) {
            console.error('Error loading product detail:', error);
        }
    };

    // Xử lý upload ảnh
    const handleImageUpload = () => {
        elements.imageUpload.addEventListener('change', () => {
            const file = elements.imageUpload.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert('Kích thước file không được vượt quá 2MB!');
                    elements.imageUpload.value = '';
                    return;
                }
                if (!['image/jpeg', 'image/png'].includes(file.type)) {
                    alert('Chỉ chấp nhận file JPG hoặc PNG!');
                    elements.imageUpload.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    elements.previewImage.src = e.target.result;
                    elements.imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    };

    // Xử lý xóa ảnh
    const handleRemoveImage = () => {
        elements.removeImageBtn.addEventListener('click', () => {
            elements.imageUpload.value = '';
            elements.imagePreview.style.display = 'none';
            elements.previewImage.src = '';
        });
    };

    // Xử lý xem ảnh lớn
    const handleImageView = () => {
        elements.previewImage.addEventListener('click', () => {
            elements.fullSizeImage.src = elements.previewImage.src;
            const bootstrapModal = new bootstrap.Modal(elements.imageViewModal);
            bootstrapModal.show();
        });
    };

    // Xử lý nút Xác nhận
    elements.saveBtn.addEventListener('click', () => {
        if (!elements.productName.value || !elements.productType.value) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        window.Popup.showApproveConfirm(
            productId,
            async (id) => {
                // Mock API call to update product
                await new Promise(resolve => setTimeout(resolve, 500));
                if (window.Toast && typeof window.Toast.showSuccess === 'function') {
                    window.Toast.showSuccess('Cập nhật sản phẩm thành công!');
                }
                elements.editProductForm.style.display = 'none';
                // Đảm bảo không còn lớp phủ opacity
                const overlays = document.querySelectorAll('.modal-backdrop, .overlay');
                overlays.forEach(overlay => overlay.remove());
                // Đóng tất cả modal nếu còn mở
                document.querySelectorAll('.modal').forEach(modal => {
                    const bootstrapModal = bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                });
                window.loadContent('product-management');
            },
            'Bạn có chắc chắn muốn cập nhật sản phẩm này không?'
        );
    });

    // Xử lý nút Hủy
    elements.cancelBtn.addEventListener('click', () => {
        elements.editProductForm.style.display = 'none';
        // Đảm bảo không còn lớp phủ opacity
        const overlays = document.querySelectorAll('.modal-backdrop, .overlay');
        overlays.forEach(overlay => overlay.remove());
        window.loadContent('product-management');
    });

    // Khởi tạo các sự kiện
    handleImageUpload();
    handleRemoveImage();
    handleImageView();

    // Load dữ liệu ban đầu
    loadProductTypes();
    loadProductDetail(productId);
};

// Khởi tạo trang khi DOM ready
document.addEventListener('DOMContentLoaded', () => initProductEditPage(window.productId));