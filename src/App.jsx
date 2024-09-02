import {  useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }

  return currentPlayer;
}

function App() {
  // const [activePlayer , setActivePlayer] = useState('X')
  const [gameTurns , setGameTurns] = useState([])
  const [players,setPlayers] = useState({
    X:'Player 1',
    O:'Player 2'
  })
  const activePlayer = deriveActivePlayer(gameTurns)

  // let gameBoard = initialGameBoard; //not good because we are mutating an array
  let gameBoard = [...initialGameBoard.map(array=>[...array])]

  for(const turn of gameTurns){
      const {square, player } = turn
      const {row,col} = square

      gameBoard[row][col] = player
  }

  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column]
    const secondSquare = gameBoard[combination[1].row][combination[1].column]
    const thirdSquare = gameBoard[combination[2].row][combination[2].column]

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){

      winner = players[firstSquare]
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner

  
  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurn) => {

      const currentPlayer = deriveActivePlayer(prevTurn)
      const updatedTurns = [
        { square:{row:rowIndex, col:colIndex},player:currentPlayer }
        ,...prevTurn];

        return updatedTurns
    })
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prev=>{
      return {
        ...prev,
        [symbol]:newName
      }
    })
  }
  return <main>
    <div id='game-container'>
      <ol id="players" className="highlight-player">
        <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
        <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver onRestart={handleRestart}  winner={winner}/>}

      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>

    <Log  turns={gameTurns}/>
  </main>
}

export default App
