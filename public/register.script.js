
        // Function to parse the URL query parameters
        function getQueryParam(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        // Function to display the Camp Name from the URL
        function displayEventDetails() {
            const eventName = getQueryParam('name');
            const eventLocation = getQueryParam('location');
            const eventDate = getQueryParam('date');
            const eventTime = getQueryParam('time');
            const eventHost = getQueryParam('host');

            // Check if any event details are missing
            if (!eventName && !eventLocation && !eventDate && !eventTime && !eventHost) {
                // If all details are missing, show "EVENT DETAILS NOT AVAILABLE"
                document.getElementById('eventDetailsNotAvailable').style.display = 'block';
                document.getElementById('eventDetailsContent').style.display = 'none';
            } else {
                // If any detail is available, show the event details
                document.getElementById('eventDetailsNotAvailable').style.display = 'none';
                document.getElementById('eventDetailsContent').style.display = 'block';

                document.getElementById('eventName').innerText = eventName || 'N/A';
                document.getElementById('eventLocation').innerText = eventLocation || 'N/A';
                document.getElementById('eventDate').innerText = eventDate || 'N/A';
                document.getElementById('eventTime').innerText = eventTime || 'N/A';
                document.getElementById('eventHost').innerText = eventHost || 'N/A';
            }
        }

        // Call the function on page load
        window.onload = function () {
            displayEventDetails();
        };

        // Submit form function
        function submitForm() {
            const resultMessage = document.getElementById('resultMessage');
            resultMessage.style.display = 'none'; // Hide previous result message

            const youthName = document.getElementById('youthName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const city = document.getElementById('city').value.trim();
            const province = document.getElementById('province').value.trim();
            const postalCode = document.getElementById('postalCode').value.trim();
            const emergencyContact = document.getElementById('emergencyContact').value.trim();
            const emergencyPhone = document.getElementById('emergencyPhone').value.trim();
            const permission = document.getElementById('permission').value.trim();
            let parentName = document.getElementById('parentName') ? document.getElementById('parentName').value.trim() : '';

            if (!youthName || !phone || !address || !city || !province || !postalCode || !emergencyContact || !emergencyPhone || !permission || (parentName === "" && getQueryParam('under18') === 'true')) {
                resultMessage.innerText = 'Please fill out all required fields.';
                resultMessage.className = 'error'; // Show error message
                resultMessage.style.display = 'block';
                return;
            }

            // Get email address from environment variable
            const emailUri = process.env.EMAIL_URI;

            // Mailto link for form submission
            const mailtoLink = `mailto:${emailUri}?subject=${getQueryParam('name')} Registration&body=Camp Name: ${getQueryParam('name')}%0AYouth's Name: ${youthName}%0APhone: ${phone}%0AAddress: ${address}%0ACity: ${city}%0AProvince: ${province}%0APostal Code: ${postalCode}%0AEmergency Contact: ${emergencyContact}%0AEmergency Phone: ${emergencyPhone}%0APermission: ${permission}${parentName ? '%0AParent/Guardian Name: ' + parentName : ''}`;

            // Open the email client with pre-filled info
            window.location.href = mailtoLink;

            // Show success message
            resultMessage.innerText = 'Form submitted successfully!';
            resultMessage.className = 'success'; // Show success message
            resultMessage.style.display = 'block';
        }
