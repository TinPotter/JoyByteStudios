document.addEventListener("DOMContentLoaded", function () {
  const encodedWebhook = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM3NDcyMzk1OTk3NDUzMTE2NC83RG4wTDI2ekVXaHoyNk5TUGgzVVpoZUFkbnJ6ZzRmNWV1TEw5OTBPbERPSlJUWHZuUFh1Zno1UHZFS0FsYjU5X19IbHc=
";
  const webhookUrl = atob(encodedWebhook);

  const submitButton = document.getElementById("feedback-submit");
  const feedbackForm = document.getElementById("feedback-form");
  const feedbackMessage = document.getElementById("feedback-message");
  const feedbackName = document.getElementById("feedback-name");
  const feedbackEmail = document.getElementById("feedback-email");
  const statusMessage = document.getElementById("feedback-status");

  if (!submitButton || !feedbackForm || !feedbackMessage) {
    console.error("Missing form elements. Check your HTML IDs");
    return;
  }

  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const message = feedbackMessage.value.trim();
    const name = feedbackName?.value.trim() || "None";
    const email = feedbackEmail?.value.trim() || "None";

    if (!message) {
      statusMessage.textContent = "Please enter a message.";
      return;
    }

    submitButton.disabled = true;
    statusMessage.textContent = "Sending...";

    const embed = {
      title: "📬 New Feedback Received",
      color: 0x0099ff,
      fields: [
        { name: "Name", value: name, inline: true },
        { name: "Email", value: email, inline: true },
        { name: "Message", value: message }
      ],
      timestamp: new Date().toISOString()
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ embeds: [embed] })
    })
    .then(response => {
      if (response.ok) {
        statusMessage.textContent = "✅ Feedback sent!";
        feedbackForm.reset();
      } else {
        throw new Error("Failed to send feedback");
      }
    })
    .catch(error => {
      console.error("Error sending feedback:", error);
      statusMessage.textContent = "❌ Failed to send feedback.";
    })
    .finally(() => {
      submitButton.disabled = false;
    });
  });
});
