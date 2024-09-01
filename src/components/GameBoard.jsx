import { useState } from "react"

const initialGameBoard = [
    [null, null,null],
    [null,null,null],
    [null,null,null]
]


export default function GameBoard(){

    const [gameBoard , setGameBoard] = useState(initialGameBoard)

    function handleSelectSquare(row,col ,  ){

        // const newBoard = [...initialGameBoard]
        setGameBoard((prevGameBoard)=> {
            //updating immutable way
            const newBoard = [...prevGameBoard.map((inner)=> [...inner])]
            newBoard[row][col] = 'X';
            return newBoard;
        })
    }

    return <ol id="game-board">
        {gameBoard.map((row , index) => <li key={index}>
            <ol>
                {row.map((col,colIndex) => <li key={colIndex}>
                    <button onClick={()=>handleSelectSquare(index,colIndex)}>{col}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}