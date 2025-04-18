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
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        fullName: this.fullName.value,
        dob: this.dob.value,
        email: this.email.value,
        mobile: this.mobile.value
    };

    const formMessage = document.getElementById('form-message');
    const webAppURL = "https://script.google.com/macros/s/AKfycbyfysQH5RYskQVxTg9_ssF0gsQhqtEDPhfO9Dj24ZDuDiCfektVxG9zqA7X81kqq06r/exec";

    // Show loading message
    formMessage.textContent = 'جاري التسجيل...';
    formMessage.style.color = '#FF2DFC';

    // Create XML HTTP request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', webAppURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    formMessage.textContent = response.message;
                    formMessage.style.color = '#4CAF50';
                    e.target.reset();
                    setTimeout(() => {
                        document.getElementById('register-popup').style.display = 'none';
                    }, 2000);
                } catch (error) {
                    formMessage.textContent = 'حدث خطأ. يرجى المحاولة مرة أخرى.';
                    formMessage.style.color = '#FF2DFC';
                }
            } else {
                formMessage.textContent = 'حدث خطأ. يرجى المحاولة مرة أخرى.';
                formMessage.style.color = '#FF2DFC';
            }
        }
    };

    // Send the request
    xhr.send(JSON.stringify(formData));
});