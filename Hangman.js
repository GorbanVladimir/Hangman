let specialWord = ''
let input = document.getElementById('input')
let sectionBody = document.getElementById('sectionBody')
let cardBody = document.getElementById('cardBody')
let image = document.getElementById('image')
let alerts = document.getElementById('alert')
let searchedLetters = ''

function reload () {
    location.reload()
}

function addRestartButton () {
    cardBody.innerHTML = '<button type="button" class="btn btn-secondary" onclick="reload()">Restart the game</button>'
}

function checkLetterSearched (currentLetter) {
    if (searchedLetters.indexOf(currentLetter) >= 0) {
        alerts.innerHTML = `<div class="alert alert-dark" role="alert">'${currentLetter}' has already been introduced</div>`
        input.value = ''
        return 0
    }
    return -1
}

function isALetter (letter) {
    return letter.toUpperCase() !== letter.toLowerCase()
}

function isAWord (word) {
    for (let i of word) {
        if (i.toUpperCase() === i.toLowerCase()) {
            return false
        }
    }
    return true
}

function replaceInput () {
    cardBody.innerHTML = '            <p class="card-text">Enter a letter to guess the word</p>\n' +
        '            <label for="input"></label><input type="text" id="input" placeholder="Type a letter">\n' +
        '            <input type="button" value="OK"  id="inputButton" onclick="checkTheLetter()">'
}

function clearSectionBody () {
    sectionBody.innerHTML = ''
}

function createSection () {
    for (let i = 0; i < specialWord.length; ++i) {
        sectionBody.innerHTML += `<th id="letterNumber ${i}"></th>`
    }
}

function wordInitiation () {
    specialWord = input.value.toUpperCase()
    if (specialWord !== '' && isAWord(specialWord)) {
        replaceInput()
        clearSectionBody()
        createSection()
        image.innerHTML = '<img src="Images/0.jpg" alt="HangmanSteps">'
    } else if (specialWord === '') {
        alerts.innerHTML = '<div class="alert alert-warning" role="alert">First type a word :D!</div>'
    } else if (!isAWord(specialWord)) {
        alerts.innerHTML = '<div class="alert alert-warning" role="alert">Is not a word!</div>'
        input.value = ''
    }
}

let counterChance = 1
let counterSuccess = 0

function checkTheLetter () {
    input = document.getElementById('input')
    let inputLetter = input.value.toUpperCase()
    if (isALetter(inputLetter) && inputLetter.length === 1) {
        let indexOfTheLetter = specialWord.indexOf(inputLetter)
        if (indexOfTheLetter >= 0 && checkLetterSearched(inputLetter) < 0) {
            searchedLetters += inputLetter
            alerts.innerHTML = '<div class="alert alert-info" role="alert">RIGHT!\n</div>'
            do {
                ++counterSuccess
                let section = document.getElementById(`letterNumber ${indexOfTheLetter}`)
                section.innerHTML = `${specialWord.charAt(indexOfTheLetter)}`
                indexOfTheLetter = specialWord.indexOf(inputLetter, ++indexOfTheLetter)
                input.value = ''
                if (counterSuccess === specialWord.length) {
                    alerts.innerHTML = '<div class="alert alert-success" role="alert">YOU GUESSED IT!</div>'
                    addRestartButton()
                }
            } while (indexOfTheLetter >= 0)
        } else if (indexOfTheLetter < 0 && counterChance < 10) {
            alerts.innerHTML = `<div class="alert alert-warning" role="alert">Is incorrect, but you still have&nbsp;${10 - counterChance}&nbsp;chances!</div>`
            let img = document.getElementById('image')
            img.innerHTML = `<img src="Images/${counterChance}.jpg" alt="HangmanSteps">`
            ++counterChance
            input.value = ''
        } else if (indexOfTheLetter < 0 && counterChance >= 10) {
            document.getElementById('image').innerHTML = `<img src="Images/${counterChance}.jpg" alt="HangmanSteps">`
            alerts.innerHTML = '<div class="alert alert-danger" role="alert">MAYBE NEXT TIME!</div>'
            sectionBody.innerHTML = `<p>THE WORD YOU MISSED : ${specialWord}</p>`
            addRestartButton()
        }
    } else if (!isALetter(inputLetter)) {
        alerts.innerHTML = '<div class="alert alert-warning" role="alert">It is not a letter!</div>'
        input.value = ''
    } else if (inputLetter.length !== 1) {
        alerts.innerHTML = '<div class="alert alert-warning" role="alert">Type only one letter please</div>'
        input.value = ''
    }
}