const initialGameBoard = [
    [null, null,null],
    [null,null,null],
    [null,null,null]
]


export default function GameBoard(){

    return <ol id="game-board">
        {initialGameBoard.map((row , index) => <li key={index}>
            <ol>
                {row.map((col,colIndex) => <li key={colIndex}>
                    <button>{col}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}