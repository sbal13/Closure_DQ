
document.addEventListener("DOMContentLoaded", (event) => {
	let addPlayerButton = document.getElementById('add-player')
	addPlayerButton.addEventListener("click", promptForControls)

	let startButton = document.getElementById('start-game')
	startButton.addEventListener("click", startGame)

})





