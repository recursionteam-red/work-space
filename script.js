const mainDiv = document.getElementById("target");
mainDiv.classList.add("d-flex", "justify-content-center", "m-8");
//大枠

const titleDiv = document.createElement("div");
title.classList.add("m-auto")
const title = document.createElement("h1")
title.innerHTML = "Tetris"
titleDiv.appendChild(title)
//タイトル

const display = document.createElement("div");

display.classList.add("bg-gray");

mainDiv.appendChild(field)
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

const mino = {

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

}

static function embody(minoOperate, minoCrash, minoRotate, minoDelete, minoOrder, calScore){
            
}




function minoOperate(){
            
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


function minoRotate(){
            
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


            
