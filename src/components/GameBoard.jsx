import { useState } from "react"

const initialGameBoard = [
    [null, null,null],
    [null,null,null],
    [null,null,null]
]


export default function GameBoard({onSelectSquare, turns}){

    let gameBoard = initialGameBoard;

    for(const turn of turns){
        const {square, player } = turn
        const {row,col} = square

        gameBoard[row][col] = player
    }

    // const [gameBoard , setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(row,col ){

    //     // const newBoard = [...initialGameBoard]
    //     setGameBoard((prevGameBoard)=> {
    //         //updating immutable way
    //         const newBoard = [...prevGameBoard.map((inner)=> [...inner])]
    //         newBoard[row][col] = activePlayerSymbol;
    //         return newBoard;
    //     })

    //     onSelectSquare()
    // }

    return <ol id="game-board">
        {gameBoard.map((row , index) => <li key={index}>
            <ol>
                {row.map((col,colIndex) => <li key={colIndex}>
                    <button onClick={()=>onSelectSquare(index,colIndex)} disabled={col !== null}>{col}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}