class Game {
	constructor(players){
		this.players = players
		this.timeLeft = 30
		this.powerups = []
		this.powerUpGenerator = setInterval(this.generatePowerup.bind(this), 1000)
		console.log("constructor")
	}

	generatePowerup(){
		if (this.timeLeft) {
			let position = randomStartingPosition()
			let index = Math.floor(Math.random()*3)
			let powerups = ["Attack", "Defend", "Rush"]

			let newPowerup = Powerup(position, powerups[index])
			this.powerups.push(newPowerup)
			this.timeLeft -= 1
		} else {
			this.endGame()
		}
	}


	endGame(){
		clearInterval(this.powerUpGenerator)
	}
}