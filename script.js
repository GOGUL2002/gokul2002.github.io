const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Function to send the user's message to the Gemini AI API
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Display the user's message immediately
  displayMessage(message, "user-message");
  userInput.value = "";

  // Wait for the response from the AI API
  const botMessage = await getBotResponse(message);

  // Display the bot's response
  displayMessage(botMessage, "bot-message");
}

// Function to interact with the Gemini AI API and get the response
async function getBotResponse(userMessage) {
  try {
    // Replace 'YOUR_API_KEY' with your actual API key
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBpwCglFkW2yDsjDtHepIRFUdWxZROFKe4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: userMessage }, // User's input
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // Check if the response contains the expected data
    const botMessage =
      data.contents?.[0]?.parts?.[0]?.text ||
      "The model is overloaded. Please try again later.";
    return botMessage;
  } catch (error) {
    console.error("Error fetching the response:", error);
    return "Error connecting to the AI.";
  }
}

// Function to display messages in the chat box
function displayMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}
