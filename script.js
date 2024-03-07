const mainDiv = document.createElement("div");
mainDiv.classList.add("d-flex", "justify-content-center","align-items-center", "vh-100", "flex-column");
const titleDiv = document.createElement("div");
const show = document.createElement("div");
show.classList.add("d-flex", "justify-content-center", "align-items-center", "m-3");
const operateDiv = document.createElement("div");
const playDiv = document.createElement("div");
const paramDiv = document.createElement("div");
//大枠


titleDiv.classList.add("d-flex","justify-content-center", "align-items-center", "col-2", "m-5", "h-40");
const title = document.createElement("h1");
title.innerHTML = "Tetris";
titleDiv.appendChild(title);
//タイトル


operateDiv.classList.add("div-overlay", "custom-margin", "d-flex", "justify-content-center", "align-items-center","bg-purple", "m-5", "p-2", "h-100","flex-column", "col-3");
//左画面の枠に設定
const startButton = document.createElement("button");
startButton.classList.add("btn","pixel-button");
startButton.setAttribute("id", "start-retry-button");         ///start,retry button id///
const h2 = document.createElement("h2");
const Text1 = document.createTextNode("START");
h2.appendChild(Text1);
startButton.appendChild(h2);
//スタートボタン

const pauseButton = document.createElement("button");
pauseButton.classList.add("btn","pixel-button");
pauseButton.setAttribute("id", "pause-restart-button");       ///pause, restart button id///
const h2_2 = document.createElement("h2");
const gameText2 = document.createTextNode("PAUSE");
h2_2.appendChild(gameText2);
pauseButton.appendChild(h2_2);
//ポーズボタン

const explainDiv = document.createElement("div");
explainDiv.classList.add("w-100", "d-flex", "flex-column", "justify-content-center", "align-items-center");
const br1 = document.createElement("br");
const br2 = document.createElement("br");
const explain1 = document.createElement("h5");
explain1.innerHTML = "↑ rotate";
const explain2 = document.createElement("h5");
explain2.innerHTML = "←→move";
const explain3 = document.createElement("h5");
explain3.innerHTML = "↓ drop";
explainDiv.appendChild(explain1);
explainDiv.appendChild(br1);
explainDiv.appendChild(explain2);
explainDiv.appendChild(br2);
explainDiv.appendChild(explain3);

//操作説明

const buttonWrapper1 = document.createElement("div");
buttonWrapper1.classList.add("w-100", "p-2", "d-flex", "justify-content-center", "align-items-center");
const buttonWrapper2 = document.createElement("div");
buttonWrapper2.classList.add("w-100", "p-2", "d-flex", "justify-content-center", "align-items-center", "m-5");
buttonWrapper1.appendChild(startButton);
buttonWrapper2.appendChild(pauseButton);
operateDiv.appendChild(buttonWrapper1);
operateDiv.appendChild(buttonWrapper2);
operateDiv.appendChild(explainDiv);
//左画面作成

const displayDiv = document.createElement("div");
displayDiv.classList.add("d-flex", "custom-margin", "justify-content-center", "align-items-center","bg-primary", "m-8", "h-70", "col-3");
displayDiv.style.width = "300px";
displayDiv.style.height= "600px";
const display = document.createElement("canvas");
display.setAttribute("id", "play-canvas");            ///field canvas id///
displayDiv.appendChild(display);
//中央フィールド作成

paramDiv.classList.add("div-overlay", "custom-margin", "d-flex", "justify-content-center", "align-items-center", "m-5", "p-5", "col-3", "flex-column");
//右側枠作成

let score = document.createElement("h3");
let scoreVal = document.createElement("h3");
scoreVal.setAttribute("id", "current_score");         ///score  id///
let next = document.createElement("h3");
score.innerHTML = "SCORE";
scoreVal.innerHTML = "0";
next.innerHTML = "NEXT";
let nextCanvas = document.createElement("canvas");
nextCanvas.setAttribute("id", "next-mino-canvas", "height", "128", "width", "128");   ///next mino canvas id///
//右側内容
paramDiv.appendChild(next);
paramDiv.appendChild(nextCanvas);
paramDiv.appendChild(score);
paramDiv.appendChild(scoreVal);

//右側作成


mainDiv.appendChild(titleDiv);
mainDiv.appendChild(show);
show.appendChild(operateDiv);
show.appendChild(displayDiv);
show.appendChild(paramDiv);
//ブロック挿入

document.getElementById("target").appendChild(mainDiv);

//htmlに挿入

///////////////bgm管理//////////////////////////////

// ページが読み込まれたら、メインBGMを再生
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('welcomeBgm').play();
});

// 任意のボタンを押した時の効果音を再生する関数
function playButtonSound() {
    document.getElementById('buttonSound').play();
};

// BGMの一時停止/再開を切り替える関数
function togglePauseBgm() {
    const bgm = document.getElementById('startBgm'); // プレイ用のBGM

    if (bgm.paused) {
        bgm.play(); // BGMが一時停止中なら再生を再開
    } else {
        bgm.pause(); // BGMが再生中なら一時停止
    }
};

// スタートボタンを押した時の処理
document.getElementById('start-retry-button').addEventListener('click', function() {
    playButtonSound(); // クリック音を再生

    const welcomeBgm = document.getElementById('welcomeBgm'); // スタート画面のBGM
    const startBgm = document.getElementById('startBgm'); // プレイ用のBGM

    welcomeBgm.pause(); // スタート画面のBGMを一時停止
    welcomeBgm.currentTime = 0; // BGMの再生位置を最初に戻す

    startBgm.play(); // プレイ用のBGMを再生
});

// ポーズボタンを押した時の処理
document.getElementById('pause-restart-button').addEventListener('click', function() {
    playButtonSound(); // クリック音を再生
    togglePauseBgm(); // BGMの一時停止/再開
});

document.getElementById('playAudioButton').addEventListener('click', function() {
    // 音声ファイルの再生を試みる
    const audio = document.getElementById('welcomeBgm'); // 例としてwelcomeBgmを使用
    audio.play().then(() => {
        console.log("Audio started successfully");
    }).catch(error => {
        console.error("Error occurred while starting audio:", error);
    });
});

///////////////bgm管理/////////////////////////////

//仮作成
// キーボードイベントリスナーの設定（例：左右下回転移動）
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case "ArrowLeft":
            console.log("Left key pressed");
            // ここに左移動のロジックを実装
            break;
        case "ArrowRight":
            console.log("Right key pressed");
            // ここに右移動のロジックを実装
            break;
        case "ArrowDown":
            console.log("Down key pressed");
            // ここに速い下移動のロジックを実装
            break;
        case "ArrowUp":
            console.log("Up key pressed");
            // ここに回転のロジックを実装
            break;
        case "None":
            console.log("None key pressed");
            // ここに下移動のロジックを実装
            break;
        // さらなるキー操作の処理...
        }
});
/////////////////////////↑フロント↑////////////////////////////


////////////////////////↓環境↓////////////////////////////////

const field = [
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100] 
]

class Mino {
    constructor(shape, color, shapeColors) {
        this.shapes = {
            I: [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            O: [
                [1, 1],
                [1, 1],
            ],
            T: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            S: [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            Z: [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            J: [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            L: [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ]
        };   
        this.colors = {
            cyan: "#00FFFF",
            yellow: "#FFFF00",
            purple: "#800080",
            blue: "#0000FF",
            orange: "#FFA500",
            green: "#008000",
            red: "#FF0000",
            pink: "#FFC0CB",
            grey: "#808080",
            brown: "#A52A2A", 
            // 他の色もここに追加できる
        };
        this.shapeColors = {
            I: "shian",
            O: "yellow",
            T: "porpoll",
            S: "blue",
            Z: "orange",
            J: "green",
            L: "red",
            // 他の形状と色のマッピングもここに追加できる
        };

        // 中心座標を設定する辞書
        this.centerPositions = {
            I: {y: 1, x: 2},
            O: {y: 0, x: 0},
            T: {y: 1, x: 1},
            S: {y: 0, x: 1},
            Z: {y: 0, x: 1},
            J: {y: 1, x: 1},
            L: {y: 1, x: 1},
        };
    }
    getRandomShapeAndColor() {
        const keys = Object.keys(this.shapes);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const colorName = this.shapeColors[randomKey] || 'grey'; // マッピングされていない場合はデフォルト色
        return {
            shape: this.shapes[randomKey],
            color: this.colors[colorName],
            centerPosition: this.centerPositions[randomKey]
        };
    }
};

class masterClass {

    static embody(minoOperate, minoCrash, minoRotate, minoDelete, minoOrder, calScore){
        // 関数の内容
    }
}



function minoOperate(minoPosition, action) {
    // 仮作成
    // action: 'left', 'right', 'down', 'rotate'
    switch (action) {
        case 'left':
            minoPosition.x -= 1;
            break;
        case 'right':
            minoPosition.x += 1;
            break;
        case 'down':
            minoPosition.y += 1;
            break;
        case 'rotate':
            break;
        default:
            break; 
    }
    // ここでミノの位置を返す
    return minoPosition;
}
//左右と落下

function isColliding(field, minoShape, minoPosition, action) {
    // field: プレイフィールドの二次元配列
    // minoShape: ミノの形状を表す二次元配列
    // minoPosition: ミノの現在位置（{x: _, y: _}のようなオブジェクト）
    // action: 移動方向や回転（'left', 'right', 'down', 'rotate' などの文字列）

    // ここで衝突判定のロジックを実装
    // 衝突があればtrueを返し、なければfalseを返す
    

}

document.addEventListener('keydown', function(event) {
    let action;
    switch (event.key) {
        case 'ArrowLeft':
            action = 'left';
            break;
        case 'ArrowRight':
            action = 'right';
            break;
        case 'ArrowUp':
            action = 'rotate';
            break;
        case 'ArrowDown':
            action = 'down';
            break;
        // 他のキーに関する処理
    }

    if (action && !isColliding(field, minoShape, minoPosition, action)) {
        // 衝突がなければミノの位置を更新する処理　　ここが実質operateF
    }
});


function minoRotate(minoShape,action) {
    if (action !== 'rotate') {
        return;
    }
    let newMinoShape = [];
    // 二次元配列をコピーする
    for (let i = 0; i < minoShape.length; i++) {
        let row = [];
        for (let j = 0; j < minoShape[i].length; j++) {
            row.push(minoShape[i][j]);
        }
        newMinoShape.push(row);
    }
    // ここでnewMinoShapeを回転させる
    // 転置する
    const N = newMinoShape.length;
    for (let i = 0; i < N; i++) {
        for (let j = i; j < N; j++) {
            // i == j の要素は転置不要。
            if (i !== j) {
                [newMinoShape[i][j], newMinoShape[j][i]] = [newMinoShape[j][i], newMinoShape[i][j]];
            }
        }
    }
    // 左右対称にする
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < Math.floor(N / 2); j++) {
            [newMinoShape[i][j], newMinoShape[i][N - 1 - j]] = [newMinoShape[i][N - 1 - j], newMinoShape[i][j]];
        }
    }
    // 90度回転後のミノの形状を返す
    return newMinoShape; 
}
//回転

//消す行である1次元目のインデックスを返す
function DeleteOneDimensional(){
    //javascriptは配列は全て動的配列
    let deleteRowIndex = [];

    for(let i = 0; i < field.length; i++){
        arr = field[i];
        for(let j = 1; j < arr.length - 1; j++){
            if(arr[j] === 0) break;
            if(j == arr.length -2 && arr[j] != 0) deleteRowIndex.push(i);
            
        }
    }
    return deleteRowIndex;
}

//消して最上位に何もないフィールドを生成（残ったミノを1列おろす動作も入っている）
function minoDelete(){

    let DeleteCheckResultArray = DeleteOneDimensional();

        for(i = 0; i < DeleteCheckResultArray.length; i++){
            let DeleteRow = field.splice(DeleteCheckResultArray[i], 1);
            field.unshift([100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100]);
        }
        return field;
}

//1列ごとに10点
function calScore(){
    let DeleteCheckResultArray = DeleteOneDimensional();
    return DeleteCheckResultArray.length * 10;
}



// ランダムにミノを生成し，fieldに反映させる関数
function generateMino(field) {

    const mino = new Mino();

    // 選択されたミノを取得
    const selectedMino = mino.getRandomShapeAndColor();
    // 選択されたミノの中心座標を取得
    const center = selectedMino.centerPosition;

    // fieldの初期位置を定義
    const startPosition = {y: 0, x: 5};

    // ミノをfieldに配置
    for (let y = 0; y < selectedMino.shape.length; y++) {
        for (let x = 0; x < selectedMino.shape[y].length; x++) {
            if (selectedMino.shape[y][x] === 1) {
                // ミノのブロックがある場所にfieldを更新
                field[startPosition.y + y + center.y][startPosition.x + x - center.x] = 1;
            }
        }
    }
}

// 関数をテストする
generateMino(field);
console.log(field);

            
