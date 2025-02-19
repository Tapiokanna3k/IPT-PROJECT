const input = document.getElementById('input'); // Get input field
const qrimg = document.getElementById('qr-img'); // Get QR image element
const button = document.getElementById('btn'); // Get Generate button
const shareButtons = document.getElementById('share-buttons'); // Get share buttons container
const downloadButton = document.getElementById('download-btn'); // Get Download button

const twitterShare = document.getElementById('twitter-share'); 
const facebookShare = document.getElementById('facebook-share'); 
const emailShare = document.getElementById('email-share');

button.addEventListener('click', () => {
    const inputValue = input.value.trim(); // Get user input and remove extra spaces

    if (!inputValue) {
        alert("Please Enter a Valid URL"); // Show alert if input is empty
        return;
    }

    // Generate QR Code using API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputValue)}`;
    qrimg.src = qrCodeUrl;
    qrimg.alt = `QR Code for ${inputValue}`;

    qrimg.style.display = "block"; // Show QR image only after generation
    shareButtons.style.display = "flex";
    downloadButton.style.display = "block";

    // Enable Download Button (Fix: It now directly downloads instead of opening a new tab)
    downloadButton.onclick = async () => {
        try {
            const response = await fetch(qrCodeUrl); // Fetch QR Code image
            const blob = await response.blob(); // Convert to blob format
            const url = URL.createObjectURL(blob); // Create temporary object URL

            const a = document.createElement("a"); // Create an anchor tag
            a.href = url;
            a.download = "qrcode.png"; // Set filename
            document.body.appendChild(a);
            a.click(); // Trigger download
            document.body.removeChild(a);

            URL.revokeObjectURL(url); // Cleanup temporary URL
        } catch (error) {
            console.error("Error downloading QR Code:", error);
        }
    };

    // Twitter Share (Share QR Code link)
    twitterShare.onclick = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(qrCodeUrl)}&text=Check out this QR Code!`;
        window.open(twitterUrl, "_blank");
    };

    // Facebook Share (Share QR Code link)
    facebookShare.onclick = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(qrCodeUrl)}`;
        window.open(facebookUrl, "_blank");
    };

    // Email Share (Share QR Code link via Gmail)
    emailShare.onclick = () => {
        const emailSubject = `QR Code for ${inputValue}`;
        const emailBody = `Here is the QR Code for ${inputValue}:\n${qrCodeUrl}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(gmailUrl, "_blank");
    };
});
