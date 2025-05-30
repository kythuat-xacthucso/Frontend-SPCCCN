// Module để hiển thị popup xác nhận
const Popup = {
    // Hiển thị popup xác nhận duyệt
    showApproveConfirm(profileId, callback) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'approveModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Xác nhận duyệt</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Bạn có chắc chắn muốn duyệt hồ sơ này?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-primary" id="confirmApproveBtn">Duyệt</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        document.getElementById('confirmApproveBtn').addEventListener('click', () => {
            callback(profileId);
            bootstrapModal.hide();
        });

        modal.addEventListener('hidden.bs.modal', () => modal.remove());
    },

    // Hiển thị popup xác nhận từ chối
    showRejectConfirm(profileId, callback) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'rejectModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Xác nhận từ chối</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Bạn có chắc chắn muốn từ chối hồ sơ này?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-danger" id="confirmRejectBtn">Từ chối</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        document.getElementById('confirmRejectBtn').addEventListener('click', () => {
            callback(profileId);
            bootstrapModal.hide();
        });

        modal.addEventListener('hidden.bs.modal', () => modal.remove());
    }
};

// Export module
window.Popup = Popup;