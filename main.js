"use strict"

var UIController                    = {}
var currentItemState                = {}
var userAnswersAccumulator          = {
										 quizCount: 0,
    								 	 answers: []
									  }
const requiredUIElementForQuestion  = "question"
const requiredUIElementForQuiz      = "quiz"
const requiredUIElementForAnswers   = "answer"
const requiredUIElementForAnswerBtn = "answerBtn"
const requiredUIElementForNextBtn   = "nextBtn"
const labelSuffix                   = ":label"
const divSuffix                     = ":div"


function load() { 
    //populate UIController with required document elements for future processing
	UIController[requiredUIElementForQuestion]  = document.getElementById("question")
	UIController[requiredUIElementForQuiz]      = document.getElementById("quiz")
	UIController[requiredUIElementForAnswerBtn] = document.getElementById("answerBtn")
	UIController[requiredUIElementForNextBtn]   = document.getElementById("nextBtn")

	//initiate content
    populate()
}

function populate() {
	reloadContent()
}

function reloadContent() {
	//it should update all required elements with next content
	if (data != null && data.length != 0)
	    loadContentWithFollowData(data.shift())
	else 
		clearRequiredUIElementsAndStopTheGame()
}

function loadContentWithFollowData(data) {
	//it should overlap current data into required UI elements
	UIController[requiredUIElementForQuestion].textContent = data.question

	data.cases.forEach(function(it, index) {

		let radioIdentificator = requiredUIElementForAnswers + index 

        if(document.getElementById(radioIdentificator) == null) {

        	let newDiv = document.createElement("div")
        	newDiv.setAttribute("id", radioIdentificator + divSuffix)

        	let newRadio = document.createElement("input")
		    newRadio.setAttribute("id", radioIdentificator)
		    newRadio.setAttribute("type", "radio")
		    newRadio.setAttribute("name", "possibleAnswer")
		    newRadio.setAttribute("value", it.answer)
		    newRadio.checked = false

		    let newLable = document.createElement("label")
		    newLable.setAttribute("id", radioIdentificator + labelSuffix)
		    newLable.setAttribute("for", radioIdentificator)
		    newLable.textContent = it.answer

		    newDiv.appendChild(newRadio)
		    newDiv.appendChild(newLable)

            UIController[requiredUIElementForQuiz].appendChild(newDiv)
            UIController[radioIdentificator] = document.getElementById(radioIdentificator)
            UIController[radioIdentificator + labelSuffix] = document.getElementById(radioIdentificator + labelSuffix)
            UIController[radioIdentificator + divSuffix] = document.getElementById(radioIdentificator + divSuffix)
        
        } else {
        
        	UIController[radioIdentificator].checked = false
        	UIController[radioIdentificator].value = it.answer
            UIController[radioIdentificator + labelSuffix].textContent = it.answer
        
        }

	})

    userAnswersAccumulator.quizCount += 1
	//set current state
    currentItemState = data

}

function setUserAnswer() {

	function rec(iter) {
		if (data == UIController[requiredUIElementForQuiz].childNodes.length) return
		if (UIController[requiredUIElementForQuiz].children[iter].children[0].checked) {
            userAnswersAccumulator.answers.push({
                correctIs: currentItemState.correctIs,
                userAnswerIs: UIController[requiredUIElementForQuiz].children[iter].children[0].value
            })
			return
		}
		rec(++iter)
	}

	rec(0)

	if (data.length != 0)
		loadContentWithFollowData(data.shift())
	else
		clearRequiredUIElementsAndStopTheGame()

}

function clearRequiredUIElementsAndStopTheGame() {
	//hide elements
    UIController[requiredUIElementForQuestion].style.display  = "none"
    UIController[requiredUIElementForQuiz].style.display      = "none"
    UIController[requiredUIElementForAnswerBtn].style.display = "none"
    UIController[requiredUIElementForNextBtn].style.display   = "none"
    
}
