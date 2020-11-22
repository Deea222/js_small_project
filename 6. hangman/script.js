const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');

const finalMessage = document.getElementById('final-message');
const notification = document.getElementById('notification-container');
const playAgainBtn = document.getElementById('play-button');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['computer', 'star', 'coffee', 'hello'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [];
let wrongLetters = [];

displayWord();


// ! Show hidden word
function displayWord() {
	const abc = `${selectedWord.split('')
				.map(letter =>
					`<span class="letter">
						${correctLetters.includes(letter) ? letter : ""}
					</span>`)
				.join('')}`;

	wordEl.innerHTML = abc;
	const innerWord = wordEl.innerText.replace(/\s/g, '');
	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won!';
		popup.style.display = 'flex'
	}
}

// ! Update the wrong letters
function updateWrongLettersEl() {
	wrongLettersEl.innerHTML = `
		${wrongLetters.length > 0 ? '<p>Wrong Letters</p>' : ''}
		${wrongLetters.map(letter => `<span> ${letter}</span>`)}`;

	figureParts.forEach((part, index) => {
		if (index < wrongLetters.length) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	})
	// ! Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost';
		popup.style.display = 'flex';
	}
}


// ! Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}


// ! Keydown letter press
window.addEventListener('keydown', e => {
	if(e.keyCode >=65 && e.keyCode <= 90) {
		const letter = e.key;

		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);
				displayWord();
			}else {
				showNotification();		// 이미 추가된 알파벳
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLettersEl();	// 틀렸습니다 안내
			} else {
				showNotification();		// 이미 추가된 알파벳
			}
		}
	}
});

// ! Restart gane
playAgainBtn.addEventListener('click', () => {
	correctLetters = [];
	wrongLetters = [];

	selectedWord = words[Math.floor(Math.random() * words.length)];
	popup.style.display = 'none';

	displayWord();

	updateWrongLettersEl();
})

