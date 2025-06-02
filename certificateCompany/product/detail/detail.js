const initProductDetailPage = (productId) => {
    const elements = {
        productDetailForm: document.getElementById('productDetailForm'),
        productName: document.getElementById('product_name'),
        productType: document.getElementById('product_type'),
        description: document.getElementById('description'),
        certificationStandard: document.getElementById('certification_standard'),
        status: document.getElementById('status'),
        createdDate: document.getElementById('created_date'),
        creator: document.getElementById('creator'),
        imagePreview: document.getElementById('image_preview'),
        previewImage: document.getElementById('preview_image'),
        actionButtons: document.getElementById('actionButtons'),
        imageViewModal: document.getElementById('imageViewModal'),
        fullSizeImage: document.getElementById('full_size_image'),
    };

    // Khởi tạo tooltip (dù không có tooltip trong yêu cầu, giữ để tương thích)
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

    // Format ngày tháng
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    // Load dữ liệu sản phẩm từ API (mock data)
    const loadProductDetail = async (id) => {
        try {
            // Mock API call, thay bằng API thực tế nếu có
            const response = await new Promise(resolve =>
                setTimeout(() => resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        id: id,
                        productName: 'Kombucha Hồng trà - Đào tuyết',
                        productType: 'Đồ uống',
                        description: 'Mô tả sản phẩm kombucha.',
                        certificationStandard: 'ISO 22000',
                        status: 'Hoạt động', // hoặc 'Khóa'
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
            elements.status.value = product.status === 'Hoạt động' ? 'Đang hoạt động' : 'Khóa';
            elements.createdDate.value = formatDate(product.createdDate);
            elements.creator.value = product.creator;
            if (product.imageUrl) {
                elements.previewImage.src = product.imageUrl;
                elements.imagePreview.style.display = 'block';
            }
            renderActionButtons(product.status);
        } catch (error) {
            console.error('Error loading product detail:', error);
        }
    };

    // Render nút chức năng dựa trên trạng thái
    const renderActionButtons = (status) => {
        elements.actionButtons.innerHTML = `
            <div class="d-flex gap-2">
                <button type="button" class="btn btn-secondary w-100" id="backBtn">Quay lại</button>
                <button type="button" class="btn btn-outline-warning w-100" id="editBtn">Sửa</button>
                ${status === 'Hoạt động' ? '<button type="button" class="btn btn-outline-danger w-100" id="lockBtn">Khóa</button>' : ''}
                ${status === 'Khóa' ? '<button type="button" class="btn btn-outline-success w-100" id="unlockBtn">Mở khóa</button>' : ''}
            </div>
        `;
        addActionListeners();
    };

    // Xử lý xem ảnh lớn
    const handleImageView = () => {
        elements.previewImage.addEventListener('click', () => {
            elements.fullSizeImage.src = elements.previewImage.src;
            const bootstrapModal = new bootstrap.Modal(elements.imageViewModal);
            bootstrapModal.show();
        });
    };

    // Thêm các sự kiện cho nút
    const addActionListeners = () => {
        document.getElementById('backBtn').addEventListener('click', () => {
            elements.productDetailForm.style.display = 'none';
            window.loadContent('product-management');
        });

        document.getElementById('editBtn').addEventListener('click', () => {
            const productId = productId; // Lấy từ tham số ban đầu
            elements.productDetailForm.style.display = 'none';
            window.loadContent('product-edit', { productId });
        });

        if (document.getElementById('lockBtn')) {
            document.getElementById('lockBtn').addEventListener('click', () => {
                window.Popup.showApproveConfirm(
                    productId,
                    async (id) => {
                        await updateProductStatus(id, 'Khóa');
                        loadProductDetail(id); // Tải lại dữ liệu để cập nhật trạng thái
                    },
                    'Bạn có chắc chắn muốn khóa sản phẩm này không?'
                );
            });
        }

        if (document.getElementById('unlockBtn')) {
            document.getElementById('unlockBtn').addEventListener('click', () => {
                window.Popup.showApproveConfirm(
                    productId,
                    async (id) => {
                        await updateProductStatus(id, 'Hoạt động');
                        loadProductDetail(id); // Tải lại dữ liệu để cập nhật trạng thái
                    },
                    'Bạn có chắc chắn muốn mở khóa sản phẩm này không?'
                );
            });
        }
    };

    // Cập nhật trạng thái sản phẩm
    const updateProductStatus = async (productId, newStatus) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Mock API call
            if (window.Toast && typeof window.Toast.showSuccess === 'function') {
                window.Toast.showSuccess(`Cập nhật trạng thái thành ${newStatus === 'Hoạt động' ? 'Đang hoạt động' : 'Khóa'} thành công!`);
            }
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    };

    // Khởi tạo các sự kiện
    handleImageView();

    // Load dữ liệu ban đầu
    loadProductDetail(productId);
};

// Khởi tạo trang khi DOM ready
document.addEventListener('DOMContentLoaded', () => initProductDetailPage(window.productId));