// toast.js
const Toast = {
    init() {
        // Tạo HTML cho toast container và thêm vào body
        const toastHTML = `
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="successToast" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body"></div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', toastHTML);
    },

    showSuccess(message) {
        let toast = document.getElementById('successToast');
        if (!toast) {
            Toast.init();
            toast = document.getElementById('successToast');
        }

        if (!toast) {
            return;
        }

        const toastBody = toast.querySelector('.toast-body');
        if (!toastBody) {
            return;
        }

        // Cập nhật nội dung toast
        toastBody.textContent = message;

        // Hiển thị toast
        try {
            const bootstrapToast = new bootstrap.Toast(toast, { delay: 3000 });
            bootstrapToast.show();
        } catch (error) {}
    }
};

// Khởi tạo Toast ngay lập tức
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Toast.init());
} else {
    Toast.init();
}

window.Toast = Toast;