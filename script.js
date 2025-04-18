function togglePopup() {
    const popup = document.getElementById('register-popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

// Close popup when clicking the close button
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('register-popup').style.display = 'none';
});

// Close popup when clicking outside
window.addEventListener('click', function(event) {
    const popup = document.getElementById('register-popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

// Form submission handler
document.getElementById('registration-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        fullName: this.fullName.value,
        dob: this.dob.value,
        email: this.email.value,
        mobile: this.mobile.value
    };

    const formMessage = document.getElementById('form-message');
    const wepAppURL = "https://script.google.com/macros/s/AKfycbyfysQH5RYskQVxTg9_ssF0gsQhqtEDPhfO9Dj24ZDuDiCfektVxG9zqA7X81kqq06r/exec"
    try {
        // Replace with your Google Apps Script Web App URL
        const response = await fetch(wepAppURL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        
        if (result.status === 'success') {
            formMessage.textContent = result.message;
            formMessage.style.color = '#4CAF50';
            this.reset();
            setTimeout(() => {
                document.getElementById('register-popup').style.display = 'none';
            }, 2000);
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        formMessage.textContent = 'حدث خطأ. يرجى المحاولة مرة أخرى.';
        formMessage.style.color = '#FF2DFC';
    }
});