// popup.js
const Popup = {
    init() {
        // Tạo HTML cho popup và thêm vào body
        const popupHTML = `
            <div class="modal fade" id="approveConfirmModal" tabindex="-1" aria-labelledby="approveConfirmModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="approveConfirmModalLabel">Xác nhận</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc chắn muốn thực hiện hành động này?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" class="btn btn-primary" id="confirmActionBtn">Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    },

    showApproveConfirm(itemId, actionCallback, message = 'Bạn có chắc chắn muốn thực hiện hành động này?') {
        let modal = document.getElementById('approveConfirmModal');
        if (!modal) {
            Popup.init();
            modal = document.getElementById('approveConfirmModal');
        }

        if (!modal) {
            return;
        }

        const modalBody = modal.querySelector('.modal-body');
        const confirmBtn = modal.querySelector('#confirmActionBtn');

        if (!modalBody || !confirmBtn) {
            return;
        }

        // Cập nhật nội dung popup
        modalBody.textContent = message;

        // Xử lý sự kiện khi nhấn nút "Xác nhận"
        const handleConfirm = () => {
            actionCallback(itemId);
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
            confirmBtn.removeEventListener('click', handleConfirm);
        };

        confirmBtn.addEventListener('click', handleConfirm);

        // Hiển thị popup
        try {
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        } catch (error) {}
    }
};

// Khởi tạo Popup ngay lập tức
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Popup.init());
} else {
    Popup.init();
}

window.Popup = Popup;