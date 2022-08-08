Game.chat.init = function () {
  const chatDiv = document.querySelector(".chat");
  const chatContext = chatDiv.querySelector(".chatContext");
  socket.on("chat", (chat) => {
    console.log(chat);
    const div = document.createElement("div");
    div.innerHTML = `<div>${chat[0]}</div><div>${chat[1]}</div>`;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 32;
    canvas.height = 32;

    this.iconDraw(chat[2], ctx);
    div.prepend(canvas);
    chatContext.append(div);
    chatContext.scrollTop = chatContext.scrollHeight;
  });

  const submit = chatDiv.querySelector("button");
  const input = chatDiv.querySelector("input");

  submit.addEventListener("click", () => {
    if (input.value !== "") {
      const nameChat = [Game.hero.nickName, input.value, Game.hero.id];
      socket.emit("chat", nameChat);
      input.value = "";
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      input.focus();
    }
  });
  input.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      submit.click();
    }
  });
  this.boxResize();
};
Game.chat.iconDraw = function (playerId, ctx) {
  let playerKey;
  Object.keys(Game.players).forEach((key) => {
    if ((Game.players[key].id = playerId)) {
      playerKey = key;
      return;
    }
  });
  console.log(Game.players[playerKey].customInfo);
  const playerInfo = Game.players[playerKey].customInfo;
  console.log(ctx);
  ctx.fillColor = "#fff";
  ctx.fillRect(0, 0, 32, 32);
};

Game.chat.boxResize = function () {
  const canvas = document.getElementById("demo");
  const chatBox = document.querySelector(".chat");
  if (window.innerWidth < Game.mediaQ) {
    chatBox.style.display = "none";
  } else {
    chatBox.style.display = "inline-block";
    chatBox.style.height = canvas.height + 4 + "px";
  }
};
