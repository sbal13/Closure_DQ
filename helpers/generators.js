let randomColor = () => {
	return `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 1)`
}

let randomStartingPosition = () => {
	return {x: Math.floor(Math.random()*47)*10, y: Math.floor(Math.random()*44)*10}
}

