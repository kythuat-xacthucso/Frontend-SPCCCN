(function initProductDetail(productId) {
    const productName = document.getElementById('productName');
    const shortDescription = document.getElementById('shortDescription');
    const productGroup = document.getElementById('productGroup');
    const certificationStandards = document.getElementById('certificationStandards');
    const productImage = document.getElementById('productImage');
    const status = document.getElementById('status');
    const createdBy = document.getElementById('createdBy');
    const createdDate = document.getElementById('createdDate');
    const editBtn = document.getElementById('editBtn');
    const backBtn = document.getElementById('backBtn');

    // Kiểm tra các phần tử cần thiết
    if (!productName || !shortDescription || !productGroup || !certificationStandards || !productImage || !status || !createdBy || !createdDate || !editBtn || !backBtn) {
        console.error('One or more detail elements are missing.');
        return;
    }

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

    // Find product by ID
    const product = products.find(p => p.id === parseInt(productId)) || products[0];

    // Populate product details
    productName.textContent = product.productName;
    shortDescription.textContent = product.shortDescription;
    productGroup.textContent = product.productGroup;
    certificationStandards.textContent = product.certificationStandards || 'Chưa có';
    productImage.src = product.productImage;
    status.textContent = product.status;
    createdBy.textContent = product.createdBy;
    createdDate.textContent = product.createdDate;

    // Event listeners for buttons
    editBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('product-edit', { productId: product.id });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });

    backBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('product-management');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });
})(typeof productId !== 'undefined' ? productId : null);