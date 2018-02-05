let players = []

let addPlayer = (controls) => {


	let colors = randomColor()
	let startingPosition = randomStartingPosition()
	let blockEl = document.createElement("div")

	blockEl.style.background = colors
	blockEl.style.top = startingPosition.y
	blockEl.style.left = startingPosition.x
	blockEl.style.height = 30
	blockEl.style.width = 30
	blockEl.id = "player" + (players.length+1)
	blockEl.style.position = "absolute"

	let board = document.getElementById('board')

	block = Block(blockEl, controls, startingPosition, players.length+1, `Player ${players.length+1}`)
	block.status = "Normal"
	players.push(block)
	board.appendChild(blockEl)
	document.body.addEventListener("keydown", block.move)
	let table = document.getElementById("player-table")

	table.innerHTML += `
		<tr>
			<td id="${blockEl.id}" style="color: ${colors}">${blockEl.id}</td>
			<td>${controls.left}</td>
			<td>${controls.down}</td>
			<td>${controls.right}</td>
			<td>${controls.up}</td>
			<td id="${blockEl.id}-status">${block.status}</td>
		</tr>
	`
}

let promptForControls = (event) => {
	let messages = document.getElementById('messages')

	let controls = {}

	controlSwitch(controls, 0)()

}

let controlSwitch = (controls,controlNum) => {
	return function (){
		switch (controlNum){
			case 0: 
				messages.innerText = "Please press a key for the left control!"
				document.body.addEventListener("keydown", singleControlListener(controls, "left"))
				loop(controls, "left", controlNum)()
				break;
			case 1: 
				messages.innerText = "Please press a key for the down control!"
				document.body.addEventListener("keydown", singleControlListener(controls, "down"))
				loop(controls, "down", controlNum)()
				break;
			case 2: 
				messages.innerText = "Please press a key for the right control!"
				document.body.addEventListener("keydown", singleControlListener(controls, "right"))
				loop(controls, "right", controlNum)()
				break;
			case 3: 
				messages.innerText = "Please press a key for the up control!"
				document.body.addEventListener("keydown", singleControlListener(controls, "up"))
				loop(controls, "up", controlNum)()
				break;
			case 4:
				messages.innerText = ""
				restoreListeners()
				addPlayer(controls)
				break;
		}
	}
}

let restoreListeners = () => {
	let newButton = document.getElementById('add-player')
	let startButton = document.getElementById('start-game')
	newButton.addEventListener("click", promptForControls)
	startButton.addEventListener("click", startGame)
	
	players.forEach(block => {
		block.setBlock(document.getElementById(block.id))
		document.body.addEventListener("keydown", block.move)
	})
}

let startGame = () => {
	new Game(players)
}



let singleControlListener = (controls, direction) => {
	return (event) => {
		event.preventDefault()
		controls[direction] = event.code
	}
}


let loop = (controls, direction, controlNum) => {
	return () => {
		if (controls[direction]){
			let oldBody = document.body
			let cloneBody = oldBody.cloneNode(true)
			oldBody.parentNode.replaceChild(cloneBody, oldBody)
			controlSwitch(controls, controlNum+1)()
		}
		else{
			setTimeout(controlSwitch(controls, controlNum), 0)
		}
	}
}

