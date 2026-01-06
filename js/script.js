// Complaint Form Submission
const complaintForm = document.getElementById('complaintForm');
if (complaintForm) {
    complaintForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const messageDiv = document.getElementById('message');
        
        try {
            const response = await fetch('php/submit.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                messageDiv.className = 'message success';
                messageDiv.innerHTML = `Complaint submitted successfully!<br>Your Complaint ID: <strong>${result.complaint_id}</strong><br>Please save this ID to track your complaint.`;
                this.reset();
            } else {
                messageDiv.className = 'message error';
                messageDiv.textContent = result.message || 'Error submitting complaint';
            }
        } catch (error) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Error connecting to server. Please try again.';
        }
    });
}

// Track Complaint Form
const trackForm = document.getElementById('trackForm');
if (trackForm) {
    trackForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const complaintId = document.getElementById('complaintId').value;
        const messageDiv = document.getElementById('message');
        const resultDiv = document.getElementById('trackResult');
        
        try {
            const response = await fetch(`php/track.php?id=${encodeURIComponent(complaintId)}`);
            const result = await response.json();
            
            if (result.success) {
                messageDiv.className = 'message';
                messageDiv.style.display = 'none';
                
                document.getElementById('resultId').textContent = result.data.complaint_id;
                document.getElementById('resultName').textContent = result.data.name;
                document.getElementById('resultCategory').textContent = result.data.category;
                document.getElementById('resultDate').textContent = result.data.created_at;
                document.getElementById('resultDescription').textContent = result.data.description;
                
                const statusSpan = document.getElementById('resultStatus');
                statusSpan.textContent = result.data.status;
                statusSpan.className = 'value status-badge ' + getStatusClass(result.data.status);
                
                resultDiv.style.display = 'block';
            } else {
                resultDiv.style.display = 'none';
                messageDiv.className = 'message error';
                messageDiv.textContent = result.message || 'Complaint not found';
            }
        } catch (error) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Error connecting to server. Please try again.';
        }
    });
}

// Admin Login Form
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const messageDiv = document.getElementById('message');
        
        try {
            const response = await fetch('php/admin-login.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'admin-dashboard.html';
            } else {
                messageDiv.className = 'message error';
                messageDiv.textContent = result.message || 'Invalid credentials';
            }
        } catch (error) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Error connecting to server. Please try again.';
        }
    });
}

// Helper function to get status class
function getStatusClass(status) {
    switch (status) {
        case 'Pending':
            return 'status-pending';
        case 'In Progress':
            return 'status-progress';
        case 'Resolved':
            return 'status-resolved';
        default:
            return '';
    }
}
