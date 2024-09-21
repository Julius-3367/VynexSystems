// Function to show a specific section and hide the others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.container');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Function to send a message to the chatbox
async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatbox = document.getElementById('chatbox');
    const userMessage = inputField.value;

    if (userMessage.trim() === '') return;  // Avoid empty messages

    chatbox.innerHTML += `<div class="message user-message">You: ${userMessage}</div>`;
    inputField.value = '';

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        const aiMessage = data.response;
        chatbox.innerHTML += `<div class="message ai-message">AI: ${aiMessage}</div>`;
    } catch (error) {
        chatbox.innerHTML += `<div class="message ai-message">Error: Unable to send message</div>`;
    }

    chatbox.scrollTop = chatbox.scrollHeight;  // Scroll to the bottom
}

// Function to update business hours status
function updateBusinessHoursStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    const isOpen = currentDay >= 1 && currentDay <= 6 && currentHour >= 8 && currentHour < 17;

    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = isOpen ? 'We are open! Feel free to reach out.' : 'We are closed. Operating hours: Mon-Sat 8 AM - 5 PM';
    statusElement.classList.toggle('open', isOpen);
    statusElement.classList.toggle('closed', !isOpen);
}

// Initial call to update business hours
updateBusinessHoursStatus();
// Update business hours status every hour
setInterval(updateBusinessHoursStatus, 60 * 60 * 1000);
