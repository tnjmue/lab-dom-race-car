//copied from solution + consts from Ricardo
window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });
  restartButton.addEventListener("click", function () {
    restartGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  function restartGame() {
    location.reload();
  }


  // Function that handles keydown event
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
};

