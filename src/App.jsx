import { useState } from 'react'
import './App.css';

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({children,update,index}) => {
  return(
    <div className='square'>
      {children}
    </div>
  )
}

const board = new Array(9).fill(null);

export default function App() {
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
              >
                {index}
              </Square>
            )
          })
        }

      </section>
    </main>
  )
}

