const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particlesArray = [];


class Particle {
	constructor(x, y, directionX, directionY, size, color){
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.color = color;
		this.position = Math.random() + Math.random();
	}

	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fillstyle = '#8C5523';
		ctx.fill();
	}
	update(){
		if (this.x > canvas.width + 20 || this.x < -20){
			// for (let i = 0; i < particlesArray.length; i++){
			// 	if (particlesArray[i].position == this.position){
			// 		particlesArray.splice(i, 1);
			// 	}
			// } if ya wanna delete item
			this.directionX = -this.directionX;

		}
		if (this.y > canvas.height + 20 || this.y < -20){
			// for (let i = 0; i < particlesArray.length; i++){
			// 	if (particlesArray[i].position == this.position){
			// 		particlesArray.splice(i, 1);
			// 	}
			// }
			this.directionY = -this.directionY;
		}
	this.x += this.directionX;
	this.y += this.directionY;
	this.draw();
	}
}

function init(){
	particlesArray = [];
	let numberOfParticles = (canvas.height * canvas.width) / 4000;
	for (let i = 0; i < numberOfParticles; i++){
		let size = 0.01;
		let x = Math.random() * innerWidth - size * 2 - size * 2;
		let y = Math.random() * canvas.height - size * 2 - size * 2;
		let directionX = Math.random() * 5 - 2.5;
		let directionY = Math.random() * 5 - 2.5;
		let color = '#8C5523'
		particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for (let i = 0; i < particlesArray.length; i++){
		particlesArray[i].update();
	}
	connect();
}

function connect() {
	for (let a = 0; a < particlesArray.length; a++){
		for (let b = a; b < particlesArray.length; b++){
			let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
			 + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
			if (distance < (canvas.width / 7) * (canvas.height / 7)){
				let opacity = 1 - distance / ((canvas.width / 7) * (canvas.height / 7));
				ctx.strokeStyle = 'rgba(0, 0, 0, ' + 1 +')'
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
				ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
				ctx.stroke();
			}
		}
	}
}

window.addEventListener('resize', 
	function(){
		height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
		canvas.width = innerWidth;
		canvas.height= height - innerHeight;
		mouse.radius = (canvas.height / 80) * (canvas.width / 80);
	}
)


init();
animate();