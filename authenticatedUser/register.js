document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerSubjectForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {
                unitName: formData.get('unitName'),
                taxCode: formData.get('taxCode'),
                repName: formData.get('repName'),
                repPhone: formData.get('repPhone'),
                zaloName: formData.get('zaloName'),
                zaloPhone: formData.get('zaloPhone'),
                businessLicense: formData.get('businessLicense')
            };
            console.log('Form Data:', data);
            // Add logic to submit the form data to a server or Firebase here
            const modal = bootstrap.Modal.getInstance(document.getElementById('registerSubjectModal'));
            modal.hide();
        });
    }
});