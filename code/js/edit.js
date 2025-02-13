        // Ensure baseUrl is declared and initialized before it's used
        const baseUrl = "https://60th.vercel.app";

        function generateUrl() {
            const campName = document.getElementById('campNameInput').value.trim();
            const location = document.getElementById('campLocation').value.trim();
            const startDate = document.getElementById('campStartDate').value;
            const endDate = document.getElementById('campEndDate').value;
            const meetingTime = document.getElementById('campTime').value;
            const price = document.getElementById('campPrice').value.trim();
            const host = document.getElementById('campHost').value.trim();
            const details = document.getElementById('campDetails').value.trim();

            if (!campName || !location || !startDate || !endDate || !meetingTime || !price || !host || !details) {
                return; // Exit if any of the required fields are empty
            }

            // Construct the URL with the camp details
            const url = `name=${encodeURIComponent(campName)}&location=${encodeURIComponent(location)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&meetingTime=${encodeURIComponent(meetingTime)}&price=${encodeURIComponent(price)}&host=${encodeURIComponent(host)}&details=${encodeURIComponent(details)}`;

            // Update the generated URL field
            document.getElementById('generatedUrl').value = `${baseUrl}?${url}`;
        }

        function copyUrl() {
            const generatedUrl = document.getElementById('generatedUrl');
            generatedUrl.select();
            document.execCommand('copy');
            alert('URL copied to clipboard!');
        }
