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

function minoCrash(){
            
}
//衝突判定

function minoRotate(){
            
}
//回転

function minoDelete(){
            
}
//一列揃ったミノの削除

function minoOrder(){
            
}
//残ったミノを一列おろす

function calScore(){
            
}
//消えた列からスコア加算


            
