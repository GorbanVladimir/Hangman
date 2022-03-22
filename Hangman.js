let specialWord = ''
let input = document.getElementById('addWord')
let check = document.getElementById('check')
let sectionBody = document.getElementById('sectionBody')
let searchedLetters = ''

function reload () {
    location.reload()
}

function addRestartButton () {
    document.getElementById('cardBody').innerHTML = '<button type="button" class="btn btn-secondary" onclick="reload()">Restart the game</button>'
}

function checkLettersearched (currentLetter) {
    return searchedLetters.indexOf(currentLetter)
}

function isALetter (letter) {
    return letter.toUpperCase() !== letter.toLowerCase()
}

function addWord () {
    specialWord = input.value.toUpperCase()
    document.getElementById('inputAndButtonDelete').innerHTML = ''
    sectionBody.innerHTML = ''
    document.getElementById('image').innerHTML = '<img src="Images/0.jpg" alt="HangmanSteps">'
    let lgWord = specialWord.length
    for (let i = 0; i < lgWord; ++i) {
        sectionBody.innerHTML += `<th id="letterNumber ${i}"></th>`
    }
}

let counterChance = 1
let counterSucces = 0

function checkTheLetter () {
    let inputLetter = check.value.toUpperCase()
    if (specialWord.length) {
        if (isALetter(inputLetter)) {
            if (inputLetter.length === 1) {
                let indexOfTheLetter = specialWord.indexOf(inputLetter)
                if (indexOfTheLetter >= 0 && checkLettersearched(inputLetter) < 0) {
                    searchedLetters += inputLetter
                    document.getElementById('alert').innerHTML = '<div class="alert alert-success" role="alert">\n' +
                        '  RIGHT!\n' +
                        '</div>'
                    while (indexOfTheLetter >= 0) {
                        ++counterSucces
                        let section = document.getElementById(`letterNumber ${indexOfTheLetter}`)
                        section.innerHTML = `${specialWord.charAt(indexOfTheLetter)}`
                        indexOfTheLetter = specialWord.indexOf(inputLetter, ++indexOfTheLetter)
                        check.value = ''
                        if (counterSucces === specialWord.length) {
                            alert('YOU GUESSED IT!')
                            addRestartButton()
                        }
                    }
                } else if (indexOfTheLetter < 0 && counterChance < 10) {
                    document.getElementById('alert').innerHTML = `<div class="alert alert-warning" role="alert">\n` +
                        `  Is incorrect but you still have&nbsp;${10 - counterChance}&nbsp;chances!\n` +
                        `</div>`
                    let img = document.getElementById('image')
                    img.innerHTML = `<img src="Images/${counterChance}.jpg" alt="HangmanSteps">`
                    ++counterChance
                    check.value = ''
                } else if (indexOfTheLetter < 0 && counterChance >= 10) {
                    console.log('counterChance' + counterChance)
                    document.getElementById('image').innerHTML = `<img src="Images/${counterChance}.jpg" alt="HangmanSteps">`
                    alert('MAYBE NEXT TIME!')
                    document.getElementById('alert').innerHTML = ''
                    sectionBody.innerHTML = `<p>THE WORD YOU MISSED : ${specialWord}</p>`
                    addRestartButton()
                }
            } else {
                alert('Type only one letter please')
                check.value = ''
            }
        } else {
            alert('It is not a letter!')
            check.value = ''
        }
    } else {
        alert('First enter a word :D')
        check.value = ''
    }
}

check.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('checkButton').click();
    }
});

input.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('inputButton').click();
    }
});