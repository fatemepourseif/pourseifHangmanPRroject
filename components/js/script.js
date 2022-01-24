window.onload = function () {
  var alphabet = [
    "a",
    "b ",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  var categories;
  var chosenCategory;
  var word;
  var guess;
  var guesses = [];
  var lives;
  var counter;
  var space;
  var showLives = document.getElementById("myLives");

  var buttons = function () {
    myButtons = document.getElementById("buttons");
    letters = document.createElement("ul");
    for (var i = 0; i < alphabet.length; i++) {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };
  result = function () {
    wordHolder = document.getElementById("hold");
    correct = document.createElement("ul");
    for (var i = 0; i < word.length; i++) {
      correct.setAttribute("id", "my-word");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }
      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };
  comments = function () {
    showLives.innerHTML = "you have " + lives + "lives";
    if (lives < 1) {
      showLives.innerHTML = "game over";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "you win";
      }
    }
  };
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  };
  canvas = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
  };
  head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };
  frame1 = function () {
    draw(0, 150, 150, 150);
  };
  frame2 = function () {
    draw(10, 0, 10, 600);
  };
  frame3 = function () {
    draw(0, 5, 70, 5);
  };
  frame4 = function () {
    draw(60, 5, 60, 15);
  };
  torso = function () {
    draw(60, 36, 60, 70);
  };
  rightArm = function () {
    draw(60, 46, 100, 50);
  };
  leftArm = function () {
    draw(60, 46, 20, 50);
  };
  rightLeg = function () {
    draw(60, 70, 100, 100);
  };
  leftLeg = function () {
    draw(60, 70, 20, 100);
  };
  drawArray = [
    rightLeg,
    leftLeg,
    rightArm,
    leftArm,
    torso,
    head,
    frame4,
    frame3,
    frame2,
    frame1,
  ];
  check = function () {
    list.onclick = function () {
      var guess = this.innerHTML;
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = word.indexOf(guess);
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    };
  };
  play = function () {
    categories = [
      ["liverpool", "chelsea", "manchester-city"],
      ["jaws", "coda", "free-guy"],
      ["tehran", "karaj", "shiraz"],
    ];
    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();
    guesses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    canvas();
  };
  play();

  (function () {
    const duration = 600;
    let app;

    let timer;
    class Rue {
      constructor(selector, options) {
        this.elem = document.querySelector(selector);
        this.data = options.data;
        this.template = options.template;
      }
      render() {
        this.elem.innerHTML = this.template(this.data);
      }
    }

    function getData() {
      return {
        time: duration,
        paused: true,
      };
    }

    function format(time) {
      const minutes = Math.floor(time / 60).toString();
      const seconds = (time % 60).toString();
      return minutes + ":" + seconds.padStart(2, "0");
    }

    function template(props) {
      const pausedState = props.paused ? "Start" : "Pause";
      if (props.paused === "Start") {
        myButtons.removeAttribute("class", "active");
      }

      return `
        
        <p>
          <button id="${pausedState.toLowerCase()}" type="button">
            ${pausedState}
            

          </button>
          
        </p>
        <p>
          ${format(props.time)}
        </p>
      `;
    }

    function countdown() {
      app.data.time--;

      if (app.data.time < 1) {
        clearInterval(timer);
      }

      app.render();
    }

    function start() {
      app.data.paused = false;

      app.render();

      timer = setInterval(countdown, 1000);
    }

    function pause() {
      app.data.paused = true;

      app.render();

      clearInterval(timer);
    }

    function reset() {
      app.data = getData();

      app.render();

      clearInterval(timer);
    }

    function handleClick(event) {
      switch (event.target.id) {
        case "start":
          start();
          break;
        case "pause":
          pause();
          break;
        case "reset":
          reset();
      }
    }

    app = new Rue("#app", {
      data: getData(),
      template: template,
    });

    app.render();

    app.elem.addEventListener("click", handleClick);
  })();
};
