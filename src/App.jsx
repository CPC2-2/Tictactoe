import { useState } from 'react'
import './App.css';

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({children, isSelected ,updateBoard,index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard();
  }

  return(
    <div onClick={updateBoard} className={className}>
      {children}
    </div>
  )
}


export default function App() {

  const [board,setBoard] = useState(Array(9).fill(null));

  const [turn,setTurn] = useState(TURNS.X);

  //funcction to update the board
  const updateBoard = () => {
    //check what turn it is X or O
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  }


  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <p>Welcome to the game! Tic Tac Toe</p>
      <section className= "game">
        {
          board.map((_, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }

      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  )
}

