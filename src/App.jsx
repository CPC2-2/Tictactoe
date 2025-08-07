import { useState } from 'react'
import './App.css';

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({children, isSelected ,updateBoard,index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(index);
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function App() {

  const [board,setBoard] = useState(Array(9).fill(null));
  const [turn,setTurn] = useState(TURNS.X);
  const [winner,setWinner] = useState(null); //null no winner and false is draw


  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo;
      if(
        boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c] // 2
      ) {
        return boardToCheck[a]; //return the winner
      }
    }
    return null; //no winner
  }

  //function to update the board
  const updateBoard = (index) => {

    if (board[index] || board.includes(null) === false || winner) {
      //if the square is already filled or there are no empty squares, do nothing
      return;
    }else{
      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);
  
      //check what turn it is X or O
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);

      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      }
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
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


      {
        winner !== null && (
          <section className="winner">
            <div className='text'>
              <h2>
                {
                  winner === false
                  ? 'Empate:'
                  : 'Ganó:'
                }
              </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>Empezar de Nuevo</button>
                </footer>

            </div>
          </section>
        )
      }
    </main>

  )
}

