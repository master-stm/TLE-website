const ADMIN_PASSWORD = "password";
const SHEET_ID = "1BtHswR85JyCSQe3rvELfvF2wjczSIUwpy1Pt_UnQe88";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

// Keep login form visible initially
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_PASSWORD) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        fetchData();
    } else {
        alert('كلمة المرور غير صحيحة');
    }
});

async function fetchData() {
    try {
        const response = await fetch(SHEET_URL, {
            method: 'GET',
            headers: {
                
                'Access-Control-Allow-Origin': '*'
            }
        });
        const text = await response.text();
        // Remove Google's security prefix and suffix from the response
        const jsonText = text.substring(47).slice(0, -2);
        const data = JSON.parse(jsonText);
        
        if (data && data.table && data.table.rows) {
            const formattedData = data.table.rows.map(row => ({
                fullName: row.c[0] ? row.c[0].v : '',
                dob: row.c[1] ? row.c[1].v : '',
                email: row.c[2] ? row.c[2].v : '',
                mobile: row.c[3] ? row.c[3].v : '',
                timestamp: row.c[4] ? row.c[4].v : ''
            }));
            displayData(formattedData);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('registrations-data').innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #FF2DFC;">
                    حدث خطأ في جلب البيانات. يرجى المحاولة مرة أخرى لاحقاً
                </td>
            </tr>
        `;
    }
}

function displayData(data) {
    const tbody = document.getElementById('registrations-data');
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.fullName}</td>
            <td>${formatDate(row.dob)}</td>
            <td>${row.email}</td>
            <td>${row.mobile}</td>
            <td>${formatDate(row.timestamp)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-KW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}