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
explainDiv.classList.add("w-100", "d-flex", "flex-column", "justify-content-center", "align-items-center", "p-2");
const explainWrapper1 = document.createElement("div");
const explainWrapper2 = document.createElement("div");
const explainWrapper3 = document.createElement("div");
explainWrapper1.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center", "m-2", "p-2");
explainWrapper2.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center", "m-2", "p-2");
explainWrapper3.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center", "m-2", "p-2");
const explain1 = document.createElement("h4");
explain1.innerHTML = "↑ rotate";
const explain2 = document.createElement("h4");
explain2.innerHTML = "← →move";
const explain3 = document.createElement("h4");
explain3.innerHTML = "↓  drop ";
explainWrapper1.appendChild(explain1);
explainDiv.appendChild(explainWrapper1);
explainWrapper2.appendChild(explain2);
explainDiv.appendChild(explainWrapper2);
explainWrapper3.appendChild(explain3);
explainDiv.appendChild(explainWrapper3);

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
displayDiv.style.width = "360px";
displayDiv.style.height= "660px";
const display = document.createElement("canvas");
display.setAttribute("id", "play-canvas");            ///field canvas id///
displayDiv.appendChild(display);
//中央フィールド作成

paramDiv.classList.add("div-overlay", "custom-margin", "d-flex", "justify-content-center", "align-items-center", "m-5", "p-5", "col-3", "flex-column");
//右側枠作成

let scoreLabel = document.createElement("h3");
let scoreVal = document.createElement("h3");
let topValLabel = document.createElement("h3");
let topVal = document.createElement("h3");
scoreVal.setAttribute("id", "current_score"); // スコアの値を表示する要素の ID
topVal.setAttribute("id", "top_score"); // 最高スコアの値を表示する要素の ID
let next = document.createElement("h3");
scoreLabel.innerHTML = "SCORE";
scoreVal.innerHTML = "0"; // 初期スコアは 0
topValLabel.innerHTML = "TOP SCORE";
topVal.innerHTML = "0"; // 初期最高スコアは 0

next.innerHTML = "NEXT";
let nextCanvas = document.createElement("canvas");
nextCanvas.setAttribute("id", "next-mino-canvas", "height", "128", "width", "128");   ///next mino canvas id///
//右側内容
paramDiv.appendChild(next);
paramDiv.appendChild(nextCanvas);
paramDiv.appendChild(scoreLabel);
paramDiv.appendChild(scoreVal);
paramDiv.appendChild(topValLabel);
paramDiv.appendChild(topVal);

//右側作成


mainDiv.appendChild(titleDiv);
mainDiv.appendChild(show);
show.appendChild(operateDiv);
show.appendChild(displayDiv);
show.appendChild(paramDiv);
//ブロック挿入

document.getElementById("target").appendChild(mainDiv);

//htmlに挿入

/////////////bgm管理//////////////////////////////

// 任意のボタンを押した時の効果音を再生する関数
function playButtonSound() {
    document.getElementById('buttonSound').play();
}

// BGMの一時停止/再開を切り替える関数
function togglePauseBgm() {
    const bgm = document.getElementById('startBgm'); // プレイ用のBGM

    if (bgm.paused) {
        bgm.play(); // BGMが一時停止中なら再生を再開
    } else {
        bgm.pause(); // BGMが再生中なら一時停止
    }

    // クリック音を再生
    playButtonSound();
}

///////////////bgm管理/////////////////////////////

/////////////////////////↑フロント↑////////////////////////////


////////////////////////↓環境↓////////////////////////////////

class Cell {
    constructor(value = 0, isWall = false, color = 'white', operatingMino = true) { // 色のデフォルト値を追加
        this.value = value;
        this.isWall = isWall;
        this.color = color; // 色のプロパティを追加
        this.operatingMino = operatingMino;
    }
}

class Field {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.grid = this.initializeField();
    }

    initializeField() {
        let field = Array.from({ length: this.height }, () =>
            Array.from({ length: this.width }, (v, i) => 
                new Cell(i === 0 || i === this.width - 1 ? 100 : 0, i === 0 || i === this.width - 1)
            )
        );
        
        // 最上行と最下行を壁に設定
        field[0].forEach(cell => {
            cell.value = 100;
            cell.isWall = true;
            cell.color = 'black'; // 壁の色を黒に設定
        });
        
        field[this.height - 1].forEach(cell => {
            cell.value = 100;
            cell.isWall = true;
            cell.color = 'black'; // 壁の色を黒に設定
        });
        
        return field;
    }
    
    // フィールドにミノを配置するメソッド
    placeMino(shape, position, color) {
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x] !== 0) {
                    let fieldY = position.y + y;
                    let fieldX = position.x + x;
                    if (fieldY >= 0 && fieldY < this.height && fieldX >= 0 && fieldX < this.width) {
                        this.grid[fieldY][fieldX].value = 1;
                        this.grid[fieldY][fieldX].isWall = false;
                        this.grid[fieldY][fieldX].color = color;
                    }
                }
            }
        }
    }
    // フィールド内の全てのセルを走査して、valueが1のセルのoperatingMinoをfalseに設定
    setOperatingMinoFalse() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let cell = this.grid[y][x];
                if (cell.value === 1) {
                    cell.operatingMino = false;
                }
            }
        }
    }
    // フィールドの状態をコンソールに表示するメソッド（デバッグ用）
    printField() {
        this.grid.forEach(row => {
           // console.log(row.map(cell => cell.isWall ? 100 : cell.value).join(' '));
        });
    }
}

class Mino {
    constructor(shapes, colors, shapeColors, centerPositions) {
        this.shapes = {
            I: [
                [1, 1, 1, 1],
                [0, 0, 0, 0],
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
            I: "cyan",
            O: "yellow",
            T: "purple",
            S: "blue",
            Z: "orange",
            J: "green",
            L: "red",
            // 他の形状と色のマッピングもここに追加できる
        };

        // 中心座標を設定する辞書
        this.centerPositions = {x: 0, y: 0}; 
    }
    getRandomShapeAndColor() {
        const keys = Object.keys(this.shapes);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const colorName = this.shapeColors[randomKey] || 'grey'; // マッピングされていない場合はデフォルト色
        return {
            shape: this.shapes[randomKey],
            color: this.colors[colorName],
            centerPosition: this.centerPositions
        };
    }
};
// グローバルスコープでctxとfieldを宣言

let ctx;
let previousMinoProperties;
let intervalId = null;
let gameOver = false;
let currentScore = 0;
let topscore = 0;
let level = 1;
// DOMContentLoaded イベントリスナー内で field インスタンスを初期化
//ページが完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    ///////インスタンス作成//////


    let field = new Field(22, 12);
    const mino = new Mino(); // Minoクラスのインスタンスを作成
    let currentMinoProperties = mino.getRandomShapeAndColor(); // メソッドを呼び出してプロパティを取得
    let moved = false;
    let lastLeftRightMoveTime = 0;
    let lastDownMoveTime = 0;
    let lastRotateTime = 0;
    let keyEvent = false;

    //////////////////////////
    // 全てのaudio要素の音量を設定
    const audios = document.querySelectorAll('audio');
    audios.forEach(function(audio) {
        audio.volume = 0.05; // 音量を0.05に設定
    });

    // メインBGMを再生してループさせる
    const welcomeBgm = document.getElementById('welcomeBgm');
    welcomeBgm.loop = true; // ループを有効化
    welcomeBgm.play();

    let canvas = document.getElementById('play-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        canvas.width = 360;
        canvas.height = 660;

        // 初期フィールドの描画
        drawField(field);
        //console.log()
        // ミノの生成とフィールドへの配置
        currentMinoProperties.centerPosition = generateMino(field,currentMinoProperties);
    }

    // スタートボタンを押した時の処理
    document.getElementById('start-retry-button').addEventListener('click', function() {
        playButtonSound(); // クリック音を再生
        welcomeBgm.pause(); // スタート画面のBGMを一時停止
        welcomeBgm.currentTime = 0; // BGMの再生位置を最初に戻す

        const startBgm = document.getElementById('startBgm'); // プレイ用のBGM
        startBgm.loop = true; // ループを有効化
        startBgm.play(); // プレイ用のBGMを再生
        startAutoDown(); // 1秒ごとに落下
        keyEvent = true; // キーボードイベントを有効化
        if (gameOver) {
            //console.log("Starting a new game");
            // ゲームオーバー状態の場合、新しいゲームを開始
            updatedTopScoreDisplay(); // 最高スコア表示を更新
            currentScore = 0; // スコアをリセット
            updateScoreDisplay(); // スコア表示を更新
            previousMinoProperties = null;
            intervalId = null;
            gameOver = false;
            field = new Field(22, 12); // 新しいフィールドを作成
            lastLeftRightMoveTime = 0;
            lastDownMoveTime = 0;
            lastRotateTime = 0;
            currentMinoProperties = mino.getRandomShapeAndColor(); // 新しいミノを生成
            if (canvas) {
                canvas.width = 360;
                canvas.height = 660;

                // 初期フィールドの描画
                drawField(field);
                // ミノの生成とフィールドへの配置
                currentMinoProperties.centerPosition = generateMino(field,currentMinoProperties);
            }
        }

    });

    // ポーズボタンを押した時の処理
    document.getElementById('pause-restart-button').addEventListener('click', function() {
        togglePauseBgm(); // BGMの一時停止/再開
        stopAutoDown(); // 落下を一時停止
        keyEvent = false; // キーボードイベントの無効化
    });

    //キーボードイベントリスナーの設定（例：左右下回転移動）
    document.addEventListener('keydown', handleKeyDown);

    
    function handleKeyDown(event) {
        if (!keyEvent) {
            return;
        }
       // console.log(`Key pressed: ${event.key}`); // どのキーが押されたかをログに出力
        //console.log("currentMinoProperties:", currentMinoProperties); // 現在のミノのプロパティをログに出力
    
        const currentTime = Date.now();
    
        switch (event.key) {
            case "ArrowLeft":
            case "ArrowRight":
                if (currentTime - lastLeftRightMoveTime >= 100) {
                    lastLeftRightMoveTime = currentTime;
                    switch (event.key) {
                        case "ArrowLeft":
                            moveMinoLeft();
                            break;
                        case "ArrowRight":
                            moveMinoRight();
                            break;
                    }
                }
                break;
            case "ArrowDown":
                if (currentTime - lastDownMoveTime >= 50) {
                    lastDownMoveTime = currentTime;
                    moveMinoDown();
                }
                event.preventDefault();
                break;
            case "ArrowUp":
                if (currentTime - lastRotateTime >= 200) {
                    lastRotateTime = currentTime;
                    rotateMinoUp();
                }
                event.preventDefault();
                break;
            default:
                event.preventDefault();
                break;
        }
    }
    function moveMinoLeft() {
        // 左に移動する処理
       // console.log(currentMinoProperties.centerPosition.x, "こりでぃんぐまえのX");
        if (!isColliding(field, currentMinoProperties.shape, {x: currentMinoProperties.centerPosition.x - 1, y: currentMinoProperties.centerPosition.y}, "ArrowLeft")) {
            previousMinoProperties = {
                ...currentMinoProperties, centerPosition: { ...currentMinoProperties.centerPosition }
            };
            currentMinoProperties.centerPosition.x -= 1;
            moved = true;
           // console.log("左に移動");
          //  console.log(currentMinoProperties.centerPosition.x, "こりでぃんぐごのX");
        } else {
           // console.log(currentMinoProperties.centerPosition.x, "衝突があります");
        }
        updateFieldAndDraw();
    }
    
    function moveMinoRight() {
        // 右に移動する処理
        if (!isColliding(field, currentMinoProperties.shape, {x: currentMinoProperties.centerPosition.x + 1, y: currentMinoProperties.centerPosition.y}, "ArrowRight")) {
            previousMinoProperties = {
                ...currentMinoProperties,
                centerPosition: { ...currentMinoProperties.centerPosition }
            };
            currentMinoProperties.centerPosition.x += 1;
            moved = true;
        }
        updateFieldAndDraw();
    }
    
    function moveMinoDown() {
        // 下に移動する処理
        if (!collisionCheck(field, currentMinoProperties.shape, {x: currentMinoProperties.centerPosition.x, y: currentMinoProperties.centerPosition.y + 1}, "ArrowDown")) {
            previousMinoProperties = {
                ...currentMinoProperties,
                centerPosition: { ...currentMinoProperties.centerPosition }
            };
            currentMinoProperties.centerPosition.y += 1;
            moved = true;
        }
        updateFieldAndDraw();
        if (collisionCheck(field, currentMinoProperties.shape, {x: currentMinoProperties.centerPosition.x, y: currentMinoProperties.centerPosition.y + 1}, "ArrowDown")) {
            clearInterval(intervalId); // 自動落下を停止
            intervalId = null;
            field.setOperatingMinoFalse();
            minoDelete(field);
            // 新しいミノを生成
            const mino1 = new Mino();
            currentMinoProperties = mino1.getRandomShapeAndColor();
            currentMinoProperties.centerPosition = generateMino(field,currentMinoProperties);
            // 新しいミノの初期位置を設定
            if (!canPlaceMino(field, currentMinoProperties.shape, currentMinoProperties.centerPosition)) {
                gameOver = true;
                showResultScreen()
           //     console.log("Game Over",gameOver);
            }
            // 新しいミノでゲームを続けるために自動落下を再開
            startAutoDown();
        }
    }
    
    function rotateMinoUp() {
        // 回転する処理
        if (!isColliding(field, currentMinoProperties.shape, {x: currentMinoProperties.centerPosition.x, y: currentMinoProperties.centerPosition.y + 1}, "ArrowUp")) {
           // console.log("Attempting to rotate the mino");
            //console.log("回す前",currentMinoProperties.shape);
            previousMinoProperties = {
                ...currentMinoProperties,
                shape: JSON.parse(JSON.stringify(currentMinoProperties.shape))
            };
            const rotatedShape = minoRotate(currentMinoProperties.shape);
           // console.log("回した後", rotatedShape);
            currentMinoProperties.shape = rotatedShape;
           // console.log("いれたあと", currentMinoProperties.shape);
            moved = true;
          //  console.log("Mino rotated successfully"); 
        }
        updateFieldAndDraw();
    }
    
    function updateFieldAndDraw() {
        if (moved) {
           // console.log("Mino moved or rotated"); 
            // ミノの移動や回転が行われた場合、フィールドを更新してキャンバスに反映
           // console.log("updateがよびだされるまえのX", currentMinoProperties.centerPosition.x);
            updateField(field, currentMinoProperties, previousMinoProperties);
            drawField(field);
        }
    }
    
    function startAutoDown() {
        // 既に動作しているタイマーをクリア
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
        // 1秒ごとにログを表示し、ミノを下に移動させる
        intervalId = setInterval(() => {
            moveMinoDown();
        }, 1000 - (level - 1) * 10);
    }
    
    function stopAutoDown() {
        // タイマーをクリアしてログの表示を停止
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null; // intervalIdをリセット
        }
    }
});


// 現在のミノをフィールドからクリアする関数
function clearMino(field, shape, previousPosition) {
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] !== 0) {
                let fieldY = previousPosition.y + y;
                let fieldX = previousPosition.x + x;
                // ミノが占めていたセルをデフォルト値にリセット
                if (field.grid[fieldY] && field.grid[fieldY][fieldX]&& !field.grid[fieldY][fieldX].isWall) {
                    field.grid[fieldY][fieldX].value = 0;
                    field.grid[fieldY][fieldX].color = 'white'; // またはフィールドのデフォルト背景色
                }
            }
        }
    }
}

// フィールドを更新する関数
function updateField(field, currentMinoProperties, previousPosition) {
   // console.log("Updating field with new mino position and shape");
    // 現在のミノをフィールドからクリア
   // console.log("クリア前", field);
    clearMino(field, previousPosition.shape, previousPosition.centerPosition);
   // console.log("クリア後、placeminoの前", field);
    
   // console.log("placeminoを読み込む前のcurrentぷろぱてぃ", currentMinoProperties);
    // 新しい位置にミノを再配置
    field.placeMino(currentMinoProperties.shape, currentMinoProperties.centerPosition, currentMinoProperties.color);
   // console.log("placeminoを読んだ後", field);
    // console.log("位置変化");
    // console.log(currentMinoProperties.centerPosition);
    // console.log("形状変化");
    // console.log(currentMinoProperties.shape);
    // console.log("Field updated"); // フィールドが更新されたことをログに出力
    moved = false;
}

function minoOperate(minoPosition, action) {
    // action: 'left', 'right', 'down', 'rotate'
    switch (action) {
        case 'Arrowleft':
            minoPosition.x -= 1;
            break;
        case 'ArrowRight':
            minoPosition.x += 1;
            break;
        case 'ArrowDown':
            minoPosition.y += 1;
            break;
        case 'ArrowUp':
            break;
        default:
            break; 
    }
    // ここでミノの位置を返す
    return minoPosition;
}
//左右と落下

// Arrowdownの操作で衝突があるかどうかをチェックする関数
function collisionCheck(field, minoShape, minoPosition, action) {
    
    // 更新された位置と形状で衝突チェック
    for (let y = 0; y < minoShape.length; y++) {
        for (let x = 0; x < minoShape[y].length; x++) {
            if (minoShape[y][x] !== 0) {
                let fieldY = minoPosition.y + y;
                let fieldX = minoPosition.x + x;
          //      console.log(fieldY, "fieldY", fieldX, "fieldX");
                // 下の壁との衝突をチェック
                if(field.grid[fieldY][fieldX].isWall && field.grid[fieldY][fieldX].value === 200){
              //      console.log("壁との衝突があります");
                    return true;
                }
                
                if (field.grid[fieldY][fieldX].value !== 0 && !field.grid[fieldY][fieldX].operatingMino) {
               //     console.log("他のミノとの衝突があります");
                    return true; // 他のミノとの衝突
                }
            }
        }
    }
    
   // console.log("衝突がありません");
    return false; // 衝突なし
}

// arrowDown以外の操作で衝突があるかどうかをチェックする関数
function isColliding(field, minoShape, minoPosition, action) {
    let newShape = minoShape;
    let newPosition = {...minoPosition};

    if (action === 'ArrowUp') {
        newShape = minoRotate(newShape);
        // 回転後のミノの中心位置を計算
        const shapeHeight = newShape.length;
        const shapeWidth = newShape[0].length;
        newPosition.x += Math.floor((minoShape[0].length - shapeWidth) / 2);
        newPosition.y += Math.floor((minoShape.length - shapeHeight) / 2);
    }
    
    // 更新された位置と形状で衝突チェック
    for (let y = 0; y < newShape.length; y++) {
        for (let x = 0; x < newShape[y].length; x++) {
            if (newShape[y][x] !== 0) {
                let fieldY = newPosition.y + y;
                let fieldX = newPosition.x + x;
                
                if (field.grid[fieldY][fieldX].isWall && field.grid[fieldY][fieldX].value === 100) {
                //    console.log("壁との衝突があります");
                    return true;
                }
                
                if (field.grid[fieldY][fieldX].value !== 0 && !field.grid[fieldY][fieldX].operatingMino) {
                 //   console.log("他のミノとの衝突があります");
                    return true;
                }
            }
        }
    }
  //  console.log("衝突がありません");
    Object.assign(minoPosition, newPosition);
    return false;
}

// 初期落下位置のセーフティーチェック
function canPlaceMino(field, minoShape, initialPosition) {
    for (let y = 0; y < minoShape.length; y++) {
        for (let x = 0; x < minoShape[y].length; x++) {
            if (minoShape[y][x] !== 0) {
                let fieldY = initialPosition.y + y;
                let fieldX = initialPosition.x + x;
                
                if (field.grid[fieldY][fieldX].isWall ) {
                    return false; // フィールドの範囲外なので、配置不可
                }
                
                // 既に配置されているミノとの衝突をチェック
                if (field.grid[fieldY][fieldX].value !== 0 && !field.grid[fieldY][fieldX].operatingMino) {
                 //   console.log("他のミノとの衝突があります");
                    return false; // 他のミノとの衝突
                }
            }
        }
    }
    return true; // すべて確認して問題ないので、配置可能
}

function minoRotate(minoShape) {
    let newShape = [];
    for (let y = 0; y < minoShape[0].length; y++) {
        newShape[y] = [];
        for (let x = 0; x < minoShape.length; x++) {
            newShape[y][x] = minoShape[minoShape.length - 1 - x][y];
        }
    }
    return newShape;
}

//回転

function minoDelete(field) {
    // 削除すべき行のインデックスを格納する配列
    let deleteRowIndex = [];
    
    // フィールドを走査して削除すべき行を特定
    for (let i = 1; i < field.height - 1; i++) { // 最上段と最下段の壁は無視
        let isFull = true; // その行が完全にミノで埋まっているかをチェックするフラグ
        for (let j = 1; j < field.width - 1; j++) { // 左端と右端の壁は無視
            if (field.grid[i][j].value === 0) {
                isFull = false;
                break; // 一つでも空のセルがあればその行は削除しない
            }
        }
        if (isFull) {
            deleteRowIndex.push(i); // 削除すべき行のインデックスを配列に追加
        }
    }

    // 削除すべき行があれば処理を実行
    if (deleteRowIndex.length > 0) {
        // 該当する行を削除し、新しい空行を上部に追加
        for (let index of deleteRowIndex) {
            field.grid.splice(index, 1); // 行を削除
            // 新しい空行を作成し、インデックス1の位置に挿入
            let newRow = Array.from({ length: field.width }, (v, i) => new Cell(i === 0 || i === field.width - 1 ? 100 : 0, i === 0 || i === field.width - 1));
            field.grid.splice(1, 0, newRow); // 新しい行を挿入
        }

        // ここで削除された行数を更新
        let linesCleared = deleteRowIndex.length;
        playLinedSound();
        updateScore(linesCleared); // 行が消去されたらスコアを更新
    }
}




// 行が消去されたときにスコアを加算して表示を更新する関数
function updateScore(linesCleared) {
    const pointsPerLine = 10; // 1行につき加算するポイント
    level += 0.1;
    currentScore += linesCleared * pointsPerLine; // スコアを更新
    updateScoreDisplay(); // スコア表示を更新
}

// HTML 上のスコア表示を更新する関数
function updateScoreDisplay() {
    // "current_score" という ID を持つ要素を取得
    const scoreElement = document.getElementById("current_score");
    if (scoreElement) {
        scoreElement.innerHTML = currentScore.toString(); // スコアの値で更新
    }
}
function updatedTopScoreDisplay() {
    // "top_score" という ID を持つ要素を取得
    if(currentScore > topscore){
        topscore = currentScore;
    }
    const topscoreElement = document.getElementById("top_score"); 
    if (topscoreElement) {
        topscoreElement.innerHTML = topscore.toString(); // スコアの値で更新
    }
}

// drawField関数を修正して、セルの色プロパティを使用
function drawField(field) {
 //   console.log("Redrawing field on canvas");
  //  console.log("Field to draw:", field); // 描画するフィールドをログに出力

    const cellSize = 30;
    for (let y = 0; y < field.height; y++) {
        for (let x = 0; x < field.width; x++) {
            const cell = field.grid[y][x];
            if(cell.isWall && y < 20){
                cell.color = "black";
                cell.value = 100;
            }
            else if(cell.isWall && y >= 20){
                cell.color = "black";
                cell.value = 200;
            }
            ctx.fillStyle = cell.isWall ? 'black' : cell.color; // セルの色を使用

            
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
  //  console.log("Canvas redrawn"); // キャンバスが再描画されたことをログに出力
}

function generateMino(field,currentMinoProperties) {
   // console.log("Generating a new mino");
   // console.log("generateMino:Current mino properties:", currentMinoProperties); // 現在のミノのプロパティをログに出力
    const selectedMino = currentMinoProperties;
   // console.log("Selected mino:", selectedMino); // 選択されたミノのプロパティをログに出力
    

    // フィールドの幅から左右の壁を除外した実際に使用できる幅を計算
    const playableWidth = field.width - 2; // 左端と右端の壁の幅を除外
  //  console.log("playlableWidth", playableWidth, "selectedlength", selectedMino.shape[0].length);

    // ミノの初期位置のX座標を壁を考慮して計算
    let startPositionX = 1 + Math.floor((playableWidth - selectedMino.shape[0].length) / 2);//Iだと5-1は4
  //  console.log(startPositionX, "startPositionX");
    // ミノがフィールドの壁にめり込まないようにY座標を1に設定
    let startPositionY = 1;

    // ミノの初期位置を設定
    let startPosition = { x: startPositionX, y: startPositionY };

    // フィールドにミノを配置できるかどうかをチェック
    if(canPlaceMino(field, selectedMino.shape, startPosition)){
   //     console.log("Mino can be placed")
        // ミノをフィールドに配置
        field.placeMino(selectedMino.shape, startPosition, selectedMino.color);
        

        // フィールドを描画
        drawField(field);
      //  console.log("Field drawn with new mino");
        return startPosition;
    }
    else{
        gameOver = true;
        updatedTopScoreDisplay();
        showResultScreen();
      //  console.log("genarateMIno Game Over", gameOver);
    }
}

// lined BGMを再生する関数
function playLinedSound() {
    const linedSound = document.getElementById('lined');
    if (linedSound) {
        linedSound.currentTime = 0; // BGMを最初から再生
        linedSound.play();
    }
}



function showResultScreen() {
    const resultScreen = document.createElement('div');
    resultScreen.id = 'resultScreen';
    resultScreen.style.position = 'fixed';
    resultScreen.style.top = '0';
    resultScreen.style.left = '0';
    resultScreen.style.width = '100%';
    resultScreen.style.height = '100%';
    resultScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    resultScreen.style.display = 'flex';
    resultScreen.style.flexDirection = 'column';
    resultScreen.style.justifyContent = 'center';
    resultScreen.style.alignItems = 'center';
    resultScreen.style.zIndex = '1000';

    const scoreDisplay = document.createElement('h2');
    scoreDisplay.innerText = 'Score: ' + currentScore;
    scoreDisplay.style.color = 'white';

    const retryButton = document.createElement('button');
    retryButton.classList.add("btn","pixel-button");
    const h2_3 = document.createElement("h2");
    const gameText3 = document.createTextNode("Retry");
    h2_3.appendChild(gameText3);
    retryButton.appendChild(h2_3);
    retryButton.onclick = function() {
        location.reload(); // ページをリロードしてゲームをリスタート
    };

    resultScreen.appendChild(scoreDisplay);
    resultScreen.appendChild(retryButton);
    document.body.appendChild(resultScreen);

    const bgm = document.getElementById('startBgm'); // プレイ中のBGM
    bgm.pause(); // プレイ中のBGMを停止
    bgm.currentTime = 0; // 再生位置を最初に戻す

    const failedSound = document.getElementById('failed'); // ゲームオーバー時のBGM
    failedSound.play(); // ゲームオーバー時のBGMを再生
}