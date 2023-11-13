const questions = [
    {
        question: "What is the largest animal in the world?",
        answers:[
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraff", correct: false}
        ]
    },
    {
        question: "What is the smalles continent in the world?",
        answers:[
            {text: "Assia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ]
    },
    {
        question: "What is the largest desert in the world?",
        answers:[
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antractica", correct: true}
        ]
    },
    {
        question: "What is the smallest city in the world?",
        answers:[
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nipal", correct: false},
            {text: "Shri lanka", correct: false}
        ]
    },
]

const questionElement = document.querySelector("#question")
const answerBtns = document.querySelector("#answer-btns")
const nextBtn = document.querySelector("#next-btn")
const osman = document.querySelector(".osman")

let currentQuestionIndex = 0
let score = 0

// the main function to start the quiz
function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextBtn.innerHTML = "Next"
    showQuestion()
}

// function to show the quize with the options
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    // create buttons that contains the answers
    currentQuestion.answers.forEach(function(answer){
        const btn = document.createElement("button")
        btn.innerHTML = answer.text
        btn.classList.add("btn")
        answerBtns.appendChild(btn)
        // add true / false 
        if(answer.correct){
            btn.dataset.correct = answer.correct
        }
        btn.addEventListener("click", selectAnswer)
    })
}

//function to reset 
function resetState(){
    nextBtn.style.display = "none"
    // to remove all (answer 1, answer 2, ...)
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild)
    }
}

// function to handle selected answers
function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++ 
    }else{
        selectedBtn.classList.add("incorrect")

    }

    // show the correct answer if the wrong button is selected
    Array.from(answerBtns.children).forEach(function(button){
        if(button.dataset.correct === 'true'){
            button.classList.add("correct")
        }
        // disable all buttons
        button.disabled = true
    })
    // display next button
    nextBtn.style.display = "block"
    osman.innerHTML = "Osman is the best"
}

// function to show the score 
function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
    nextBtn.innerHTML = "Play again"
    nextBtn.style.display = "block"
}

// function to show the next question 
function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

// event listener for next button
nextBtn.addEventListener("click", function(){
    // keep show the next question until the last qeustion
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})
startQuiz()
