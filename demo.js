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

/////////////bgm管理//////////////////////////////

//ページが完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // 全てのaudio要素の音量を設定
    const audios = document.querySelectorAll('audio');
    audios.forEach(function(audio) {
        audio.volume = 0.05; // 音量を0.05に設定
    });

    // メインBGMを再生してループさせる
    const welcomeBgm = document.getElementById('welcomeBgm');
    welcomeBgm.loop = true; // ループを有効化
    welcomeBgm.play();

    // スタートボタンを押した時の処理
    document.getElementById('start-retry-button').addEventListener('click', function() {
        playButtonSound(); // クリック音を再生
        welcomeBgm.pause(); // スタート画面のBGMを一時停止
        welcomeBgm.currentTime = 0; // BGMの再生位置を最初に戻す

        const startBgm = document.getElementById('startBgm'); // プレイ用のBGM
        startBgm.loop = true; // ループを有効化
        startBgm.play(); // プレイ用のBGMを再生
    });

    // ポーズボタンを押した時の処理
    document.getElementById('pause-restart-button').addEventListener('click', function() {
        togglePauseBgm(); // BGMの一時停止/再開
    });
});

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
    constructor(value = 0, isWall = false, color = 'white') { // 色のデフォルト値を追加
        this.value = value;
        this.isWall = isWall;
        this.color = color; // 色のプロパティを追加
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
                new Cell(0, i === 0 || i === this.width - 1)
            )
        );
        
        // 最上行と最下行を壁に設定
        field[0].forEach(cell => cell.isWall = true);
        field[this.height - 1].forEach(cell => cell.isWall = true);
        
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

    // フィールドの状態をコンソールに表示するメソッド（デバッグ用）
    printField() {
        this.grid.forEach(row => {
            console.log(row.map(cell => cell.isWall ? 100 : cell.value).join(' '));
        });
    }
}

class Mino {
    constructor(shapes, colors, shapeColors, centerPositions) {
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



//generateMino関数のminoをここに移動
const mino = new Mino(); // Minoクラスのインスタンスを作成
let currentMinoProperties = mino.getRandomShapeAndColor(); // メソッドを呼び出してプロパティを取得
let newMinoPosition;

//キーボードイベントリスナーの設定（例：左右下回転移動）
document.addEventListener('keydown', (event) => {
    let moved = false;
    console.log(`Key pressed: ${event.key}`); // どのキーが押されたかをログに出力

    switch (event.key) {
        case "ArrowLeft":
            // 左に移動する処理
            if (!isColliding(field, currentMinoProperties.shape, {x: currentMinoProperties.centerPosition.x - 1, y: currentMinoProperties.centerPosition.y})) {
                currentMinoProperties.centerPosition.x -= 1;
                moved = true;
            }
            break;
        case "ArrowRight":
            // 右に移動する処理
            if (!isColliding(field, currentMinoProperties.shape, {x: currentMinoProperties.centerPosition.x + 1, y: currentMinoProperties.centerPosition.y})) {
                currentMinoProperties.centerPosition.x += 1;
                moved = true;
            }
            break;
        case "ArrowDown":
            // 下に移動する処理
            if (!isColliding(field, currentMinoProperties.shape, {x: currentMinoProperties.centerPosition.x, y: currentMinoProperties.centerPosition.y + 1})) {
                currentMinoProperties.centerPosition.y += 1;
                moved = true;
            }
            break;
        case "ArrowUp":
            // 回転する処理
            console.log("Attempting to rotate the mino"); 
            const rotatedShape = minoRotate(currentMinoProperties.shape);
            if (!isColliding(field, rotatedShape, currentMinoProperties.centerPosition)) {
                currentMinoProperties.shape = rotatedShape;
                moved = true;
                console.log("Mino rotated successfully"); 
            }
            break;
    }

    if (moved) {
        console.log("Mino moved or rotated"); 
        // ミノの移動や回転が行われた場合、フィールドを更新してキャンバスに反映
        updateField(field, currentMinoProperties);
        drawField(field);
    }
});

class masterClass {

    static embody(minoOperate, minoCrash, minoRotate, minoDelete, minoOrder, calScore){
        // 関数の内容
    }
}

// 現在のミノをフィールドからクリアする関数
function clearMino(field, position, shape) {
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] !== 0) {
                let fieldY = position.y + y;
                let fieldX = position.x + x;
                // ミノが占めていたセルをデフォルト値にリセット
                if (field.grid[fieldY] && field.grid[fieldY][fieldX]) {
                    field.grid[fieldY][fieldX].value = 0;
                    field.grid[fieldY][fieldX].color = 'white'; // またはフィールドのデフォルト背景色
                }
            }
        }
    }
}

// フィールドを更新する関数
function updateField(field, currentMinoProperties) {
    console.log("Updating field with new mino position and shape");
    // 現在のミノをフィールドからクリア
    clearMino(field, currentMinoProperties.centerPosition, currentMinoProperties.shape);
    
    // 新しい位置にミノを再配置
    field.placeMino(currentMinoProperties.shape, currentMinoProperties.centerPosition, currentMinoProperties.color);
    console.log("Field updated"); // フィールドが更新されたことをログに出力
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
    let newPosition = { ...minoPosition }; // オブジェクトの不変性を保持
    let newShape = minoShape;

    if (action === 'rotate') {
        newShape = minoRotate(newShape); // 回転した新しい形状を取得
    } else {
        newPosition = minoOperate(newPosition, action); // 新しい位置を計算する関数（この関数の実装が必要）
    }

    // 更新された位置と形状で衝突チェック
    for (let y = 0; y < newShape.length; y++) {
        for (let x = 0; x < newShape[y].length; x++) {
            if (newShape[y][x] !== 0) {
                let fieldY = newPosition.y + y;
                let fieldX = newPosition.x + x;

                // フィールドの境界または他のミノとの衝突をチェック
                if (fieldX < 0 || fieldX >= field.width || fieldY < 0 || fieldY >= field.height || (field.grid[fieldY] && field.grid[fieldY][fieldX].value !== 0)) {
                    return true; // 衝突あり
                }
            }
        }
    }

    // 衝突なし
    return false;

    // field: プレイフィールドの二次元配列
    // minoShape: ミノの形状を表す二次元配列
    // minoPosition: ミノの現在位置（{x: _, y: _}のようなオブジェクト）
    // action: 移動方向や回転（'left', 'right', 'down', 'rotate' などの文字列）

    // ここで衝突判定のロジックを実装
    // 衝突があればtrueを返し、なければfalseを返す
}


function minoRotate(minoShape) {
    console.log("Original shape:", minoShape); // 回転前の形状をログに出力
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
    console.log("Rotated shape:", newMinoShape);
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



let minoShape = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
];

// ミノの初期位置を定義（フィールドの上部中央に配置）
let minoPosition = {
    x: 4, // X座標（フィールドの幅に応じて調整すること）
    y: 0  // Y座標（フィールドの最上部からのスタートを意味する）
};

// グローバルスコープでctxとfieldを宣言
let ctx;
let field; // グローバルスコープで field を宣言

// DOMContentLoaded イベントリスナー内で field インスタンスを初期化
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('play-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        canvas.width = 360;
        canvas.height = 660;

        // Fieldインスタンスの初期化
        field = new Field(22, 12);

        // 初期フィールドの描画
        drawField(field);

        // ミノの生成とフィールドへの配置
        generateMino(field);
    }
});





// drawField関数を修正して、セルの色プロパティを使用
function drawField(field) {
    console.log("Redrawing field on canvas");

    const cellSize = 30;
    for (let y = 0; y < field.height; y++) {
        for (let x = 0; x < field.width; x++) {
            const cell = field.grid[y][x];
            ctx.fillStyle = cell.isWall ? 'black' : cell.color; // セルの色を使用
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    console.log("Canvas redrawn"); // キャンバスが再描画されたことをログに出力
}

function generateMino(field,mino) {
    const selectedMino = mino.getRandomShapeAndColor();

    // フィールドの幅から左右の壁を除外した実際に使用できる幅を計算
    const playableWidth = field.width - 2; // 左端と右端の壁の幅を除外

    // ミノの初期位置のX座標を壁を考慮して計算
    const startPositionX = 1 + Math.floor((playableWidth - selectedMino.shape[0].length) / 2);

    // ミノがフィールドの壁にめり込まないようにY座標を1に設定
    const startPositionY = 1;

    // ミノの初期位置を設定
    const startPosition = { x: startPositionX, y: startPositionY };

    // ミノをフィールドに配置
    field.placeMino(selectedMino.shape, startPosition, selectedMino.color);

    // フィールドを描画
    drawField(field);
}






// ミノ生成関数の呼び出し
generateMino(field);
