// Select the input field where users enter the URL
const input = document.getElementById('input');

// Select the <img> element where the generated QR Code will be displayed
const qrimg = document.getElementById('qr-img');

// Select the "Generate QR Code" button
const button = document.getElementById('btn');

// Select the container that holds social media share buttons
const shareButtons = document.getElementById('share-buttons');

// Select the "Download QR Code" button
const downloadButton = document.getElementById('download-btn');

// Select individual social media share buttons
const twitterShare = document.getElementById('twitter-share'); 
const facebookShare = document.getElementById('facebook-share'); 
const emailShare = document.getElementById('email-share');
const whatsappShare = document.getElementById('whatsapp-share');

// Add event listener to the "Generate QR Code" button
button.addEventListener('click', () => {
    // Get the user input, removing leading and trailing spaces
    const inputValue = input.value.trim();

    // If the input field is empty, show an alert and exit function
    if (!inputValue) {
        alert("Please Enter a Valid URL");
        return;
    }

    // Create the QR Code API URL with user input encoded
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputValue)}`;

    // Set the generated QR Code image URL as the source of the <img> element
    qrimg.src = qrCodeUrl;
    qrimg.alt = `QR Code for ${inputValue}`; // Set an alt description for accessibility

    // Display the QR Code image
    qrimg.style.display = "block";

    // Show the share buttons and the download button
    shareButtons.style.display = "flex";
    downloadButton.style.display = "block";

    // Download functionality for the QR Code image
    downloadButton.onclick = async () => {
        try {
            // Fetch the QR Code image from the API
            const response = await fetch(qrCodeUrl);
            // Convert the response into a Blob (binary data)
            const blob = await response.blob();
            // Create a temporary URL for the Blob data
            const url = URL.createObjectURL(blob);

            // Create an invisible anchor (<a>) element for downloading
            const a = document.createElement("a");
            a.href = url;
            a.download = "qrcode.png"; // Set the filename for download
            document.body.appendChild(a); // Append to the document
            a.click(); // Programmatically trigger the download
            document.body.removeChild(a); // Remove anchor after download

            // Release memory by revoking the temporary URL
            URL.revokeObjectURL(url);
        } catch (error) {
            // Log any errors encountered during download
            console.error("Error downloading QR Code:", error);
        }
    };

    // Twitter Share Button - Opens Twitter with the QR Code link in a new tab
    twitterShare.onclick = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(qrCodeUrl)}&text=Check out this QR Code!`;
        window.open(twitterUrl, "_blank");
    };

    // Facebook Share Button - Opens Facebook share window with QR Code link
    facebookShare.onclick = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(qrCodeUrl)}`;
        window.open(facebookUrl, "_blank");
    };

    // Email Share Button - Opens Gmail with a prefilled email containing the QR Code link
    emailShare.onclick = () => {
        const emailSubject = `QR Code for ${inputValue}`; // Email subject
        const emailBody = `Here is the QR Code for ${inputValue}:\n${qrCodeUrl}`; // Email body content
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(gmailUrl, "_blank"); // Open Gmail in a new tab
    };

    // WhatsApp Share Button - Opens WhatsApp with a prefilled message containing the QR Code link
    whatsappShare.onclick = () => {
        const whatsappUrl = `https://wa.me/?text=Check out this QR Code: ${qrimg.src}`;
        window.open(whatsappUrl, "_blank");
    };
});
