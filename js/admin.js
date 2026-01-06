// Check if admin is logged in
if (!sessionStorage.getItem('adminLoggedIn')) {
    window.location.href = 'admin.html';
}

let allComplaints = [];
let currentComplaintId = null;

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin.html';
});

// Load complaints on page load
loadComplaints();

// Filter functionality
document.getElementById('statusFilter').addEventListener('change', function() {
    filterComplaints(this.value);
});

// Modal close functionality
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('complaintModal').style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('complaintModal')) {
        document.getElementById('complaintModal').style.display = 'none';
    }
});

// Update status button
document.getElementById('updateBtn').addEventListener('click', updateStatus);

// Load all complaints
async function loadComplaints() {
    try {
        const response = await fetch('php/get-complaints.php');
        const result = await response.json();
        
        if (result.success) {
            allComplaints = result.data;
            displayComplaints(allComplaints);
            updateStats();
        }
    } catch (error) {
        console.error('Error loading complaints:', error);
    }
}

// Display complaints in table
function displayComplaints(complaints) {
    const tbody = document.getElementById('complaintsBody');
    tbody.innerHTML = '';
    
    if (complaints.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No complaints found</td></tr>';
        return;
    }
    
    complaints.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${complaint.complaint_id}</td>
            <td>${complaint.name}</td>
            <td>${complaint.email}</td>
            <td>${complaint.category}</td>
            <td><span class="status-badge ${getStatusClass(complaint.status)}">${complaint.status}</span></td>
            <td>${complaint.created_at}</td>
            <td><button class="btn btn-primary btn-small" onclick="viewComplaint('${complaint.complaint_id}')">View</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Filter complaints by status
function filterComplaints(status) {
    if (status === 'all') {
        displayComplaints(allComplaints);
    } else {
        const filtered = allComplaints.filter(c => c.status === status);
        displayComplaints(filtered);
    }
}

// Update statistics
function updateStats() {
    document.getElementById('totalComplaints').textContent = allComplaints.length;
    document.getElementById('pendingCount').textContent = allComplaints.filter(c => c.status === 'Pending').length;
    document.getElementById('progressCount').textContent = allComplaints.filter(c => c.status === 'In Progress').length;
    document.getElementById('resolvedCount').textContent = allComplaints.filter(c => c.status === 'Resolved').length;
}

// View complaint details
function viewComplaint(id) {
    const complaint = allComplaints.find(c => c.complaint_id === id);
    if (complaint) {
        currentComplaintId = id;
        document.getElementById('modalId').textContent = complaint.complaint_id;
        document.getElementById('modalName').textContent = complaint.name;
        document.getElementById('modalEmail').textContent = complaint.email;
        document.getElementById('modalPhone').textContent = complaint.phone;
        document.getElementById('modalCategory').textContent = complaint.category;
        document.getElementById('modalDescription').textContent = complaint.description;
        document.getElementById('updateStatus').value = complaint.status;
        document.getElementById('complaintModal').style.display = 'block';
    }
}

// Update complaint status
async function updateStatus() {
    const newStatus = document.getElementById('updateStatus').value;
    
    try {
        const formData = new FormData();
        formData.append('complaint_id', currentComplaintId);
        formData.append('status', newStatus);
        
        const response = await fetch('php/update-status.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            document.getElementById('complaintModal').style.display = 'none';
            loadComplaints();
            alert('Status updated successfully!');
        } else {
            alert('Error updating status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Error connecting to server');
    }
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
