class Game {
    constructor () {

        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
        this.player = null;
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;
        this.gameLoopFrequency = Math.round(1000/60);
        
        this.player = new Player(this.gameScreen, 200, 500, 100, 150, "./images/car.png");

    }

start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';

    this.gameIntervalId = setInterval(() => {
        this.gameLoop()}, this.gameLoopFrequency);
}

gameLoop() {
    console.log("in the game loop");
    this.update();
    if (this.gameIsOver) {
        clearInterval(this.gameIntervalId);
    }
}

update() {
    console.log("in the update");
    this.player.move();

      // Debug: log how many obstacles currently exist
    console.log("Obstacle count:", this.obstacles.length);

       // Check for collision and if an obstacle is still on the screen
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      // If the player's car collides with an obstacle
      if (this.player.didCollide(obstacle)) {
        // Remove the obstacle element from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        const lives = document.querySelector('#lives')
				lives.textContent = this.lives
        // Update the counter variable to account for the removed obstacle
        i--;
      } // If the obstacle is off the screen (at the bottom)
      else if (obstacle.top > this.height) {
        // Increase the score by 1
        this.score++;
        const score = document.querySelector('#score')
				score.textContent = this.score
        // Remove the obstacle from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
    }

    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    console.log("Reached obstacle spawn check. Obstacles:", this.obstacles.length);

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      console.log("Creating new obstacle...");
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(obstacle => obstacle.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}
