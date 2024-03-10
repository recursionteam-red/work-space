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

let isFalling = true; // ミノが落下中かどうかのフラグ

const intervalId = setInterval(() => {
    if (isDropped()) {
        console.log('ミノが着地しました。ループを停止します。');
        isFalling = false; // 落下フラグ
        clearInterval(intervalId); // ループを停止
    }
}, 1000);


class Cell {
    constructor(value = 0, isWall = false) {
        this.value = value; // セルの値 (ミノの有無、種類を示す値や0)
        this.isWall = isWall; // セルが壁かどうかのフラグ
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
    placeMino(mino, position) {
        for (let y = 0; y < mino.shape.length; y++) {
            for (let x = 0; x < mino.shape[y].length; x++) {
                if (mino.shape[y][x] !== 0) {
                    let fieldY = position.y + y;
                    let fieldX = position.x + x;
                    if (fieldY >= 0 && fieldY < this.height && fieldX >= 0 && fieldX < this.width) {
                        this.grid[fieldY][fieldX].value = mino.shape[y][x]; // ミノの値で更新
                        this.grid[fieldY][fieldX].isWall = false; // 壁ではない
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

//テストの実行
const field = new Field(22, 12); // 22行12列のフィールドを作成
const mino = new Mino(); // Minoインスタンスを作成
const selectedMino = mino.getRandomShapeAndColor(); // ランダムにミノを選択

// ミノをフィールドの初期位置に配置
// 配置の前にminoのshapeやpositionを適切に設定する
field.placeMino(selectedMino, { y: 1, x: 5 }); // ミノをフィールドに配置する例

// フィールドの状態を表示
field.printField();

//仮作成
let minoInstance = new Mino(); // Minoクラスのインスタンスを作成
let currentMinoProperties = minoInstance.getRandomShapeAndColor(); // メソッドを呼び出してプロパティを取得
let newMinoPosition;

//キーボードイベントリスナーの設定（例：左右下回転移動）
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case "ArrowLeft":
            console.log("Left key pressed");
            console.log(currentMinoProperties.centerPosition);
            newMinoPosition = minoOperate(currentMinoProperties.centerPosition, "left");
            console.log(newMinoPosition);
            // ここに左移動のロジックを実装
            break;
        case "ArrowRight":
            console.log("Right key pressed");
            console.log(currentMinoProperties.centerPosition);
            newMinoPosition = minoOperate(currentMinoProperties.centerPosition, "right");
            console.log(newMinoPosition);
            // ここに右移動のロジックを実装
            break;
        case "ArrowDown":
            console.log("Down key pressed");
            // ここに速い下移動のロジックを実装
            console.log(currentMinoProperties.centerPosition);
            newMinoPosition = minoOperate(currentMinoProperties.centerPosition, "down");
            console.log(newMinoPosition);
            break;
        case "ArrowUp":
            console.log("Up key pressed");
            // ここに回転のロジックを実装
            console.log(currentMinoProperties.shape);
            let newMinoShape = minoRotate(currentMinoProperties.shape);
            console.log(newMinoShape);
            currentMinoProperties.shape = newMinoShape;
            break;

        }
});
class masterClass {

    static embody(minoOperate, minoCrash, minoRotate, minoDelete, minoOrder, calScore){
        // 関数の内容
    }
}

// 初期落下位置のセーフティーチェック
function canPlaceMino(field, minoShape, initialPosition) {
    for (let y = 0; y < minoShape.length; y++) {
        for (let x = 0; x < minoShape[y].length; x++) {
            if (minoShape[y][x] !== 0) {
                let fieldY = initialPosition.y + y;
                let fieldX = initialPosition.x + x;
                
                if (fieldX < 0 || fieldX >= field.width || fieldY < 0 || fieldY >= field.height ) {
                    return false; // フィールドの範囲外なので、配置不可
                }
                
                // 既に配置されているミノとの衝突をチェック
                if (field.grid[fieldY][fieldX].value !== 0) {
                    return false; // 他のミノと衝突するので、配置不可
                }
            }
        }
    }
    return true; // すべて確認して問題ないので、配置可能
}


function minoOperate(minoPosition, action) {
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

function automaticDrop(currentPosition) {
    // 自動落下
    currentPosition.y += 1;
}

// isColliding関数を用いて簡略化した関数
function isDropped(field, currentMinoShape, currentPosition) {
    // 'down'を使って、次にミノが移動した場合の位置をチェックします
    let testPosition = { x: currentPosition.x, y: currentPosition.y};
    if (isColliding(field, currentMinoShape, testPosition, 'down')) {
        return true; // ミノは落下完了
    } else {
        return false; // ミノはまだ落下中
    }
}

function minoRotate(minoShape) {
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


//まだ今は必要という感じ
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
                let fieldY = startPosition.y + y;
                let fieldX = startPosition.x + x;
                if (fieldY >= 0 && fieldY < field.height && fieldX >= 0 && fieldX < field.width) {
                    // ここでCellオブジェクトの値を更新
                    field.grid[fieldY][fieldX].value = selectedMino.color; // 色情報で更新
                    field.grid[fieldY][fieldX].isWall = false; // これは壁ではない
                }
            }
        }
    }
}

// 関数をテストする
generateMino(field); // ミノを生成しフィールドに配置
field.printField(); // フィールドの状態をコンソールに表示（デバッグ用）

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

console.log("テスト1（衝突しない場合）: ", isColliding(field, minoShape, minoPosition, 'down') ? "衝突あり" : "衝突なし");

// フィールドの底に衝突する場合のテスト
let bottomPosition = { x: 4, y: 18 };
console.log("テスト2（フィールドの底に衝突）: ", isColliding(field, minoShape, bottomPosition, 'down') ? "衝突あり" : "衝突なし");

// 左の壁に衝突する場合のテスト
let leftWallPosition = { x: 0, y: 0 };
console.log("テスト3（左の壁に衝突）: ", isColliding(field, minoShape, leftWallPosition, 'left') ? "衝突あり" : "衝突なし");

// 回転による衝突のテスト
console.log("テスト4（回転による衝突）: ", isColliding(field, minoShape, minoPosition, 'rotate') ? "衝突あり" : "衝突なし");
