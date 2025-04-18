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
    
    const formMessage = document.getElementById('form-message');
    const webAppURL = "https://script.google.com/macros/s/AKfycbyfysQH5RYskQVxTg9_ssF0gsQhqtEDPhfO9Dj24ZDuDiCfektVxG9zqA7X81kqq06r/exec";

    // Show loading message
    formMessage.textContent = 'جاري التسجيل...';
    formMessage.style.color = '#FF2DFC';

    // Create form data
    const formData = new FormData();
    formData.append('fullName', this.fullName.value);
    formData.append('dob', this.dob.value);
    formData.append('email', this.email.value);
    formData.append('mobile', this.mobile.value);

    // Create a temporary invisible iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Create a form inside the iframe
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = webAppURL;

    // Add form data as hidden inputs
    for (let pair of formData.entries()) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = pair[0];
        input.value = pair[1];
        form.appendChild(input);
    }

    // Add form to iframe and submit
    iframe.contentDocument.body.appendChild(form);
    form.submit();

    // Handle response
    iframe.onload = function() {
        formMessage.textContent = 'تم التسجيل بنجاح!';
        formMessage.style.color = '#4CAF50';
        e.target.reset();
        
        // Remove iframe after submission
        setTimeout(() => {
            document.body.removeChild(iframe);
            document.getElementById('register-popup').style.display = 'none';
        }, 2000);
    };

    iframe.onerror = function() {
        formMessage.textContent = 'حدث خطأ. يرجى المحاولة مرة أخرى.';
        formMessage.style.color = '#FF2DFC';
        document.body.removeChild(iframe);
    };
});