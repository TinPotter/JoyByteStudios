function sendToWebhook() {
    const emailInput = document.getElementById('newsletter-email');
    const errorMessage = document.getElementById('error-message');
    const email = emailInput.value.trim().toLowerCase();

    // Config
    const webhookUrl = "https://discord.com/api/webhooks/1374053348050862190/iKab2zNtol8ZyDo43ATAFIASPVOquNN3BEn3t0_2Bc_M5qpGY7zn-4NvnXGpeFBbZD8D";
    const validDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];

    // Reset errors
    clearError();

    // Validate input
    if (!email) return showError("Please enter your email address.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError("Invalid email format.");
    
    const domain = email.split('@')[1];
    if (!validDomains.includes(domain)) {
        return showError("Only Gmail, Outlook, or Yahoo emails are accepted.");
    }

    // Prepare payload
    const currentDate = new Date().toLocaleString();
    const payload = {
        embeds: [{
            title: "📬 New Newsletter Subscriber",
            color: 0x5865F2, // Discord blurple
            fields: [
                { name: "Email", value: email, inline: true },
                { name: "Date", value: currentDate, inline: true }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    // Send webhook
    emailInput.disabled = true;
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) throw new Error("Webhook failed");
        alert("✅ Subscribed successfully!");
        emailInput.value = "";
    })
    .catch(err => {
        console.error("Webhook error:", err);
        alert("❌ Something went wrong. Please try again.");
    })
    .finally(() => {
        emailInput.disabled = false;
    });

    // Error helpers
    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        emailInput.focus();
    }

    function clearError() {
        errorMessage.textContent = "";
        errorMessage.classList.add('hidden');
        emailInput.classList.remove('border-red-500');
    }
}