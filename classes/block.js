let allBlocks = []

let Block = function (element, userControls, startingPosition, bId, name){

	let position = {x: startingPosition.x, y: startingPosition.y}
	let block = element
	let controls = userControls
	let id = "player" + bId
	let playerName = name
	let tagged = false


	let moveLeft = function() {
		return {x: position.x - 10, y: position.y}
	}
	let moveRight = function() {
		return {x: position.x + 10, y: position.y}
	}
	let moveUp = function() {
		return {x: position.x, y: position.y - 10}
	}
	let moveDown = function() {
		return {x: position.x, y: position.y + 10}
	}

	let updatePosition = function(newPosition){
		let sides = generateSides(newPosition)
		let collision = collide(sides)
		console.log(collision)
		if (collision.collided){
			//What to do in case of collision
		} else {
			block.style.left = newPosition.x
			block.style.top = newPosition.y
			position = newPosition
		}
	}

	let generateSides = function(position) {
		return {
			left: position.x,
			right: position.x + 30,
			top: position.y,
			bottom: position.y + 30
		}
	}

	let collide = function(sides) {
		let sideCollision = collideSide(sides) 
		let blockCollision = collideBlock(sides)

		return sideCollision.collided ? sideCollision : blockCollision
	}


	let collideSide = function(sides){
		let collided = sides.left < 0 || sides.right > 500 || sides.top < 0 || sides.bottom > 500

		return {collided, type: "side"}
	}

	let collideBlock = function(sides){
		let collided = !!allBlocks.find((block) => {
			return block.id !== id && block.checkBlockCollision(sides)
		})

		return {collided, type: "player"}
	}

	let checkBlockCollision = function(movingBlockSides) {
		let mySides = generateSides(position)
		let betweenSides = {
			left: between(movingBlockSides.left, mySides.left, mySides.right),
			right: between(movingBlockSides.right, mySides.left, mySides.right),
			top: between(movingBlockSides.top, mySides.top, mySides.bottom),
			bottom: between(movingBlockSides.bottom, mySides.top, mySides.bottom)
		}

		let equalSides = {
			left: equal(movingBlockSides.left, mySides.left),
			right: equal(movingBlockSides.right, mySides.right),
			top: equal(movingBlockSides.top, mySides.top),
			bottom: equal(movingBlockSides.bottom, mySides.bottom)
		}

		console.log(equalSides)

		return (betweenSides.left && (betweenSides.top || betweenSides.bottom || (equalSides.top && equalSides.bottom))) || 
			   (betweenSides.right && (betweenSides.top || betweenSides.bottom || (equalSides.top && equalSides.bottom))) || 
			   (betweenSides.top && (betweenSides.left || betweenSides.right || (equalSides.left && equalSides.right))) ||
			   (betweenSides.bottom && (betweenSides.left || betweenSides.right || (equalSides.left && equalSides.right)))

	}

	let between = function(sideToCheck, side1, side2){
		return sideToCheck > side1 && sideToCheck < side2
	}

	let equal = function(sideToCheck, side1){
		return sideToCheck === side1
	}





	let move = function (event) {
		event.preventDefault()

		let newPosition = {}

		switch (event.code) {
			case controls.left:
				newPosition = moveLeft()
				break;
			case controls.right:
				newPosition = moveRight()
				break;
			case controls.up:
				newPosition = moveUp()
				break;
			case controls.down: 
				newPosition = moveDown()
				break;
			default: 
				newPosition = position
				break;
		}
		updatePosition(newPosition)

	}



	let setBlock = function(newBlock) {
		block = newBlock
	}


	let blockObject = {move, setBlock, id, playerName, checkBlockCollision}
	
	allBlocks.push(blockObject)

	return blockObject
}

