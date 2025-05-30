// Module để hiển thị toast thông báo
const Toast = {
    showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-bg-success border-0 position-fixed top-0 end-0 m-3';
        toast.style.zIndex = '1055';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        document.body.appendChild(toast);

        const bootstrapToast = new bootstrap.Toast(toast);
        bootstrapToast.show();

        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }
};

// Export module
window.Toast = Toast;