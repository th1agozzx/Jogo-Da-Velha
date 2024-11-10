let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

// Adicionando variáveis de pontuação
let scoreX = 0;
let scoreO = 0;

// Pegando os nomes dos jogadores e atualizando o ranking
let playerXName = "";
let playerOName = "";

document.querySelector("#playerX").addEventListener("input", function() {
    playerXName = this.value || "Jogador 1"; // Valor default caso não digite nada
    document.querySelector("#scoreX").innerHTML = `${playerXName}: ${scoreX}`; // Atualiza o nome no ranking imediatamente
});

document.querySelector("#playerO").addEventListener("input", function() {
    playerOName = this.value || "Jogador 2"; // Valor default caso não digite nada
    document.querySelector("#scoreO").innerHTML = `${playerOName}: ${scoreO}`; // Atualiza o nome no ranking imediatamente
});

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = `${turn === "X" ? playerXName : playerOName} Ganhou!`;
            document.querySelector("#play-again").style.display = "inline";

            // Atualizando o placar baseado no vencedor
            if (turn === "X") {
                scoreX++; // Atualiza o placar de X
                document.querySelector("#scoreX").innerHTML = `${playerXName}: ${scoreX}`;
            } else {
                scoreO++; // Atualiza o placar de O
                document.querySelector("#scoreO").innerHTML = `${playerOName}: ${scoreO}`;
            }

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

function cheakDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Velha";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});

// Função para resetar o ranking
document.querySelector("#reset-ranking").addEventListener("click", () => {
    scoreX = 0; // Reseta o placar de X
    scoreO = 0; // Reseta o placar de O

    // Atualiza o ranking no HTML
    document.querySelector("#scoreX").innerHTML = `${playerXName}: ${scoreX}`;
    document.querySelector("#scoreO").innerHTML = `${playerOName}: ${scoreO}`;
});
