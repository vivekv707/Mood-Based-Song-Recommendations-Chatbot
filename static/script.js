// script.js
document.addEventListener("DOMContentLoaded", function() {
    var chatInput = document.getElementById("textInput");
    var sendBtn = document.getElementById("sendBtn");
    var chatLog = document.getElementById("chatLog");
    let responses = '';
    sendBtn.addEventListener("click", function() {
        sendMessage();
    });

    chatInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        var message = chatInput.value.trim();
        if (message !== "") {
            appendUserMessage(message);
            responses = responses.concat(" "+message);
            chatInput.value = "";
            askQuestion();
        }
    }
// Function to get current time in HH:mm format
function getTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
    // Function to create and append user message container
function appendUserMessage(message) {
    let userMessageContainer = document.createElement('div');
    userMessageContainer.className = 'message-container-user';
    userMessageContainer.innerHTML = `
        <div class="message-bubble user-bubble">
            <div class="message-info">
            <span class="name">You&nbsp;&nbsp;&nbsp;</span>
            <div class="time">${getTime()}</div>
            </div>
            <div> ${message}</div>
           
        </div>
        <img class="user-avatar" src="static/user_avatar.png" alt="User Avatar">
    `;
    chatLog.appendChild(userMessageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Function to create and append bot message container
function appendBotMessage(message) {
    let botMessageContainer = document.createElement('div');
    botMessageContainer.className = 'message-container-bot';
    botMessageContainer.innerHTML = "<img class='bot-avatar' src='static/bot_avatar.png' alt='Bot Avatar'><div class='message-bubble bot-bubble'><div class='message-info'><span class='name'>Bot&nbsp;&nbsp;&nbsp;</span><div class='time'>"+getTime()+"</div></div><div> "+message+"</div></div>";
    chatLog.appendChild(botMessageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
}


let questions = [
    "How was your day today?",
    "Did anything exciting or noteworthy happen recently?",
    "Are you feeling motivated and looking forward to anything in the near future?",
    "How well have you been able to sleep lately?",
    "Have you been engaging in activities that you usually enjoy?",
    "How's your appetite been? Have you been eating well?",
    "Have you been spending time with loved ones or feeling socially connected?",
    "Are you finding it easy or challenging to concentrate on tasks?",
    "Have you been able to manage stress and handle daily responsibilities?",
    "Are you feeling physically healthy or experiencing any discomfort?",
    "What has been the highlight of your day so far?",
    "Is there anything that's been bothering you lately?",
    "Tell me about something that has been making you happy recently.",
    "Describe a recent success or accomplishment that you're proud of.",
    "Has anything been stressing you out or causing you anxiety?",
    "Tell me about a moment today that made you feel grateful.",
    "What's been bringing you down or making you feel sad recently?",
    "Describe a recent event or situation that made you feel frustrated.",
    "Is there something that's been making you feel anxious or worried?"
];
function getRandomQuestions() {
    const pickedQuestions = [];
    while (pickedQuestions.length < 4) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (pickedQuestions.indexOf(randomIndex) === -1) {
            pickedQuestions.push(randomIndex);
        }
    }
    const pickedQuestionsArray = [];
    for (let i = 0; i < pickedQuestions.length; i++) {
        pickedQuestionsArray.push(questions[pickedQuestions[i]]);
    }
    return pickedQuestionsArray;
}

const selectedQuestions = getRandomQuestions();
console.log(selectedQuestions)
    let questionCount = 0;
    let askedQuestions = []
    function askQuestion() {
        
        if (questionCount === selectedQuestions.length+1) {
            appendBotMessage("Thank you for your responses!");
            document.body.outerHTML = document.body.outerHTML;
            const loader = document.getElementById('Loader');
            loader.classList.add('loading');
            // Create an HTTP POST request to Flask server
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/analyze", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var json_data = JSON.parse(xhr.responseText); 
                        loader.classList.remove('loading');
                        console.log("User responses sent to Flask server successfully." + json_data['mood']);
                        window.location.replace("/mood_identified/"+json_data['mood']);
                    } else {
                        loader.classList.remove('loading');
                        console.error("Failed to send user responses to Flask server.");
                    }
                }
            };
            xhr.send(JSON.stringify(responses));
        }
        if (questionCount === selectedQuestions.length+1) {
            return; // All questions asked
        }
        if(questionCount == 0){
            appendBotMessage('Hi I am your Song Recommendation Chatbot')
        }
        else{
        var randomQuestion = getRandomQuestion();
        askedQuestions.push(randomQuestion)
        appendBotMessage(randomQuestion);
        }
        questionCount++;
        
    }

    function getRandomQuestion() {
        var randomIndex = Math.floor(Math.random() * selectedQuestions.length);
        var question = selectedQuestions[randomIndex];
        if (askedQuestions.indexOf(question) !== -1) {
            return getRandomQuestion(); // If question already asked, get another question
        }
        return question;
    }

    // Start the conversation with the first question
    askQuestion();
    
});
