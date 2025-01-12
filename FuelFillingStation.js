<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fuel Station Services Survey</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .container {
            width: 500px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 20px;
        }
        .top-panel {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .earnings-section {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .label {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .amount-button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
        }
        .timer-label {
            color: #666;
            font-size: 0.9em;
        }
        .survey-panel {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .question {
            margin-bottom: 20px;
        }
        .question-text {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .radio-options {
            display: flex;
            flex-direction: column;
        }
        .radio-options label {
            margin-bottom: 5px;
        }
        .text-input {
            width: 100%;
            padding: 8px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .next-button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: not-allowed;
            opacity: 0.6;
        }
        .next-button.active {
            cursor: pointer;
            opacity: 1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="top-panel">
            <div class="earnings-section">
                <label class="label">Amount you will earn</label>
                <button class="amount-button">Ksh 70</button>
                <label class="timer-label" id="leftTimer">Time Left: 00:04</label>
            </div>
            <div class="earnings-section">
                <label class="label">Amount you will earn</label>
                <button class="amount-button">Ksh 70</button>
                <label class="timer-label" id="rightTimer">Time Left: 00:04</label>
            </div>
        </div>
        
        <div class="survey-panel" id="surveyPanel">
            <div class="question" id="questionContainer">
                <!-- Questions will be dynamically inserted here -->
            </div>
            <button class="next-button" id="nextButton" disabled>Next</button>
        </div>
    </div>

    <script>
        const questions = [
            {
                type: 'radio',
                text: 'How satisfied were you with the overall fuel station service?',
                options: [
                    'Very Satisfied',
                    'Satisfied',
                    'Neutral',
                    'Dissatisfied',
                    'Very Dissatisfied'
                ]
            },
            {
                type: 'text',
                text: 'What specific aspects of the fuel station did you find most convenient?'
            },
            {
                type: 'radio',
                text: 'How would you rate the cleanliness of the fuel station facilities?',
                options: [
                    'Excellent',
                    'Good',
                    'Average',
                    'Poor',
                    'Very Poor'
                ]
            },
            {
                type: 'text',
                text: 'Describe the friendliness and professionalism of the fuel station staff.'
            },
            {
                type: 'radio',
                text: 'How quickly were you served during fuel filling?',
                options: [
                    'Very Fast',
                    'Fast',
                    'Average',
                    'Slow',
                    'Very Slow'
                ]
            },
            {
                type: 'text',
                text: 'What suggestions would you give to improve the fuel station\'s service?'
            },
            {
                type: 'radio',
                text: 'How would you rate the quality of the fuel?',
                options: [
                    'Excellent',
                    'Good',
                    'Average',
                    'Poor',
                    'Very Poor'
                ]
            },
            {
                type: 'text',
                text: 'Tell us about any additional services you appreciated at the station.'
            },
            {
                type: 'radio',
                text: 'Was the fuel station environment comfortable and safe?',
                options: [
                    'Very Comfortable',
                    'Comfortable',
                    'Neutral',
                    'Uncomfortable',
                    'Very Uncomfortable'
                ]
            },
            {
                type: 'text',
                text: 'What additional amenities would you like to see at the fuel station?'
            },
            {
                type: 'radio',
                text: 'How likely are you to recommend this fuel station to others?',
                options: [
                    'Very Likely',
                    'Likely',
                    'Neutral',
                    'Unlikely',
                    'Very Unlikely'
                ]
            },
            {
                type: 'text',
                text: 'Share any unique or memorable experience you had at the station.'
            },
            {
                type: 'radio',
                text: 'How fair were the fuel prices?',
                options: [
                    'Very Fair',
                    'Fair',
                    'Neutral',
                    'Expensive',
                    'Very Expensive'
                ]
            },
            {
                type: 'text',
                text: 'Would you like to see any new services or products offered?'
            },
            {
                type: 'radio',
                text: 'How convenient was the station\'s location and parking?',
                options: [
                    'Excellent',
                    'Good',
                    'Average',
                    'Poor',
                    'Very Poor'
                ]
            }
        ];

        let currentQuestionIndex = 0;
        let currentTimer = null;
        const questionContainer = document.getElementById('questionContainer');
        const nextButton = document.getElementById('nextButton');
        const leftTimer = document.getElementById('leftTimer');
        //const rightTimer = document.getElementById('rightTimer');

        function renderQuestion(question) {
            // Clear previous question
            questionContainer.innerHTML = '';

            // Create question text
            const questionText = document.createElement('div');
            questionText.classList.add('question-text');
            questionText.textContent = question.text;
            questionContainer.appendChild(questionText);

            // Render based on question type
            if (question.type === 'radio') {
                const optionsContainer = document.createElement('div');
                optionsContainer.classList.add('radio-options');

                question.options.forEach((option, index) => {
                    const radioLabel = document.createElement('label');
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = 'surveyOption';
                    radioInput.value = option;
                    radioInput.id = `option-${index}`;

                    radioLabel.appendChild(radioInput);
                    radioLabel.appendChild(document.createTextNode(option));
                    optionsContainer.appendChild(radioLabel);
                });

                questionContainer.appendChild(optionsContainer);
            } else {
                const textInput = document.createElement('textarea');
                textInput.classList.add('text-input');
                textInput.rows = 4;
                textInput.placeholder = 'Type your answer here...';
                questionContainer.appendChild(textInput);
            }

            // Start timer immediately
            startTimer();
        }

        function startTimer() {
            // Clear any existing timer
            if (currentTimer) {
                clearInterval(currentTimer);
            }

            let timeLeft = 4;
            
            currentTimer = setInterval(() => {
                timeLeft--;
                leftTimer.textContent = `Time Left: 00:${timeLeft.toString().padStart(2, '0')}`;
                //rightTimer.textContent = `Time Left: 00:${timeLeft.toString().padStart(2, '0')}`;

                if (timeLeft <= 0) {
                    clearInterval(currentTimer);
                    nextButton.disabled = false;
                    nextButton.classList.add('active');
                    leftTimer.textContent = 'Time Left: 00:00';
                    rightTimer.textContent = 'Time Left: 00:00';
                }
            }, 1000);

            // Ensure next button is disabled at start of timer
            nextButton.disabled = true;
            nextButton.classList.remove('active');
        }

        nextButton.addEventListener('click', () => {
            if (!nextButton.disabled) {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    renderQuestion(questions[currentQuestionIndex]);
                } else {
                    alert('Survey completed! Thank you for your feedback.');
                }
            }
        });

        // Start the survey
        renderQuestion(questions[currentQuestionIndex]);
    </script>
</body>
</html>