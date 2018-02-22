"use strict"

var UIController                   = {}
var userAnswersAccumulator         = {}
const requiredUIElementForQuestion = "question"
const requiredUIElementForQuiz     = "quiz"
const requiredUIElementForAnswers  = "answer"


function load() { 
    //populate UIController with required document elements for future processing
	UIController[requiredUIElementForQuestion] = document.getElementById("question")
	UIController[requiredUIElementForQuiz]     = document.getElementById("quiz")

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
        	newDiv.setAttribute("id", radioIdentificator + ":div")

        	let newRadio = document.createElement("input")
		    newRadio.setAttribute("id", radioIdentificator)
		    newRadio.setAttribute("type", "radio")
		    newRadio.setAttribute("name", "possibleAnswer")
		    newRadio.setAttribute("value", it.answer)
		    newRadio.checked = false

		    let newLable = document.createElement("label")
		    newLable.setAttribute("id", radioIdentificator + ":label")
		    newLable.setAttribute("for", radioIdentificator)
		    newLable.textContent = it.answer

		    newDiv.appendChild(newRadio)
		    newDiv.appendChild(newLable)

            UIController[requiredUIElementForQuiz].appendChild(newDiv)
            UIController[radioIdentificator] = document.getElementById(radioIdentificator)
            UIController[radioIdentificator + ":label"] = document.getElementById(radioIdentificator + ":label")
            UIController[radioIdentificator + ":div"] = document.getElementById(radioIdentificator + ":div")
        } else {
        	UIController[radioIdentificator].checked = false
        	UIController[radioIdentificator].value = it.answer
            UIController[radioIdentificator + ":label"].textContent = it.answer
        }

	})

}

function clearRequiredUIElementsAndStopTheGame() {
    //TODO needed to remove all children from body tag
	loadContentWithFollowData({question: "", cases:[{answer:""},{answer:""},{answer:""},{answer:""}]})

	//flush variables
	data                   = null
	UIController           = null
	userAnswersAccumulator = null

}
