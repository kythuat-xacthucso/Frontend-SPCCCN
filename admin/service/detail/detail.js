(function initServiceDetailPage(serviceId) {
    const packageName = document.getElementById('packageName');
    const packagePrice = document.getElementById('packagePrice');
    const packageStatus = document.getElementById('packageStatus');
    const createdDate = document.getElementById('createdDate');
    const createdBy = document.getElementById('createdBy');
    const parameterTableBody = document.getElementById('parameterTableBody');
    const actionButtons = document.getElementById('actionButtons');
    const backBtn = document.getElementById('backBtn');
    const approveBtn = document.getElementById('approveBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const suspendBtn = document.getElementById('suspendBtn');
    const activateBtn = document.getElementById('activateBtn');
    const editBtn = document.getElementById('editBtn');

    // Sample data (replace with API call if needed)
    const services = [
        { id: 1, name: 'Gói Cơ Bản', price: 1000000, unit: 'Năm', status: 'Chờ duyệt', createdDate: '2025-05-01', createdBy: 'Nguyễn Văn A', parameters: [
            { name: 'Mã định danh', unit: 'Cái', quantity: 10 },
            { name: 'Mã sản phẩm truyền thông', unit: 'Cái', quantity: 5 }
        ] },
        { id: 2, name: 'Gói Nâng Cao', price: 2000000, unit: 'Tháng', status: 'Hoạt động', createdDate: '2025-05-02', createdBy: 'Trần Thị B', parameters: [
            { name: 'Người dùng nội bộ', unit: 'Người', quantity: 20 },
            { name: 'Dung lượng', unit: 'GB', quantity: 50 }
        ] },
        { id: 3, name: 'Gói Cao Cấp', price: 3000000, unit: 'Năm', status: 'Tạm ngưng', createdDate: '2025-05-03', createdBy: 'Lê Văn C', parameters: [
            { name: 'Mã định danh chủ thể', unit: 'Cái', quantity: 15 },
            { name: 'Dung lượng', unit: 'GB', quantity: 100 }
        ] },
        { id: 4, name: 'Gói Đặc Biệt', price: 5000000, unit: 'Năm', status: 'Từ chối', createdDate: '2025-05-04', createdBy: 'Phạm Thị D', parameters: [
            { name: 'Mã định danh', unit: 'Cái', quantity: 20 },
            { name: 'Người dùng nội bộ', unit: 'Người', quantity: 50 }
        ] },
    ];

    // Find service by ID
    const service = services.find(s => s.id === parseInt(serviceId)) || services[0];

    // Populate service information
    packageName.textContent = service.name;
    packagePrice.textContent = `${service.price.toLocaleString('vi-VN')} VNĐ/${service.unit}`;
    packageStatus.textContent = service.status;
    createdDate.textContent = service.createdDate;
    createdBy.textContent = service.createdBy;

    // Render parameters table
    function renderParameters() {
        parameterTableBody.innerHTML = '';
        service.parameters.forEach((param, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td>${param.name}</td>
                <td>${param.unit}</td>
                <td>${param.quantity}</td>
            `;
            parameterTableBody.appendChild(row);
        });
    }

    // Update action buttons based on status
    function updateActionButtons() {
        approveBtn.classList.add('d-none');
        rejectBtn.classList.add('d-none');
        suspendBtn.classList.add('d-none');
        activateBtn.classList.add('d-none');
        editBtn.classList.add('d-none');

        switch (service.status) {
            case 'Chờ duyệt':
                approveBtn.classList.remove('d-none');
                rejectBtn.classList.remove('d-none');
                editBtn.classList.remove('d-none');
                break;
            case 'Hoạt động':
                suspendBtn.classList.remove('d-none');
                editBtn.classList.remove('d-none');
                break;
            case 'Tạm ngưng':
                activateBtn.classList.remove('d-none');
                editBtn.classList.remove('d-none');
                break;
            case 'Từ chối':
                break;
        }
    }

    // Event listeners for buttons
    backBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('service-packages');
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });

    approveBtn.addEventListener('click', () => {
        service.status = 'Hoạt động';
        packageStatus.textContent = service.status;
        updateActionButtons();
        alert('Gói dịch vụ đã được duyệt!'); // Replace with actual save logic
    });

    rejectBtn.addEventListener('click', () => {
        service.status = 'Từ chối';
        packageStatus.textContent = service.status;
        updateActionButtons();
        alert('Gói dịch vụ đã bị từ chối!'); // Replace with actual save logic
    });

    suspendBtn.addEventListener('click', () => {
        service.status = 'Tạm ngưng';
        packageStatus.textContent = service.status;
        updateActionButtons();
        alert('Gói dịch vụ đã bị tạm ngưng!'); // Replace with actual save logic
    });

    activateBtn.addEventListener('click', () => {
        service.status = 'Hoạt động';
        packageStatus.textContent = service.status;
        updateActionButtons();
        alert('Gói dịch vụ đã được kích hoạt lại!'); // Replace with actual save logic
    });

    editBtn.addEventListener('click', () => {
        if (typeof window.loadContent === 'function') {
            window.loadContent('service-edit', { serviceId: service.id });
        } else {
            console.error('loadContent function not found in layout.js');
        }
    });

    // Initial render
    renderParameters();
    updateActionButtons();
})(typeof serviceId !== 'undefined' ? serviceId : null);