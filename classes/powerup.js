let powerUpId = 0

let Powerup = function(initialPosition, type) {
	let position = initialPosition
	let icon = {}
	powerUpId += 1
	let id = `powerup-${powerUpId}`

	switch (type){
		case "Attack":
			icon.class = "fas fa-bomb"
			icon.color = "red"
			break;
		case "Defend":
			icon.class = "fas fa-shield-alt"
			icon.color = "blue" 
			break;
		case "Rush":
			icon.class = "fas fa-bolt"
			icon.color = "yellow" 
			break;
		default:
			break;
	}

	// let iconElement = `<div id="${id}"><i class="${icon.class}" 
	// 			   style="color: ${icon.color}; height: 30px; width: 30px; position: absolute; top: ${position.y}px; left: ${position.x}px;"
	// 			   ></i></div>`

	let div = document.createElement("div")
	div.id = id

	let powerupStyle = {
		color: icon.color,
		height: "30px",
		width: "30px",
		position: "absolute",
		top: `${position.y}px`,
		left: `${position.x}px`,
	}

	let iconElement = document.createElement("i")
	iconElement.className = icon.class
	iconElement.style.color = icon.color
	iconElement.style.height = "30px"
	iconElement.style.width = "30px"
	iconElement.style.position = "absolute"
	iconElement.style.top = `${position.y}px`
	iconElement.style.left = `${position.x}px`
	div.appendChild(iconElement)


	let board = document.getElementById("board")
	board.appendChild(div)

	let timeLeft = Math.floor(Math.random()*10)
	let timer = setInterval(tick, 1000)


	function tick(){
		if (timeLeft) {
			timeLeft -= 1	
		} else {
			removePowerup()
		}
	}

	let removePowerup = () => {
		console.log("removing")
		clearInterval(timer)
		let foundIcon = document.getElementById(id)
		let board = document.getElementById("board")

		board.removeChild(foundIcon)
	}


	return {position, type}
}