import React from "react"
import Head from "next/head"
import Layout, { siteTitle } from '../components/layout'
import tttStyles from '../styles/ttt.module.css'
import utilStyles from '../styles/utils.module.css'

function Square(props) {
  return (
    <button
      className={tttStyles.square}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        key={`square-${i.toString()}`}
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i)
        }}
      />
    )
  }

  renderRow(num) {
    let squares = []
    for (let i = num * 3; i < (num * 3 + 3); i++) {
      squares.push(this.renderSquare(i))
    }
    return (
      <div
        key={`square-${num.toString()}`}
        className={tttStyles.boardRow}
      >
        {squares}
      </div>
    )
  }

  renderField() {
    let rows = []
    for (let i = 0; i < 3; i++) {
      rows.push(this.renderRow(i))
    }
    return (
      <div>
        {rows}
      </div>
    )
  }

  render() {
    return this.renderField()
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  whoSNext() {
    return this.state.xIsNext ? 'X' : 'O'
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.whoSNext()
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  areFreeSquares(squares) {
    return squares.some(val => val === null)
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    let winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? `Turn #${move}` : `Game start`
      return (
        <li className={tttStyles.gameListItem} key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Winner is ${winner[0]}`

      const squaresArr = document.querySelectorAll(`.${tttStyles.square}`)
      
      winner[1].forEach(squareID => {
        squaresArr[squareID].style.color = 'red'
      });
    } else if (!this.areFreeSquares(current.squares)) {
      status = `Draw`
    } else {
      status = `Current player: ${this.whoSNext()}`;
    }
    
    return (
      <Layout>
        <Head>
          <title>{siteTitle}</title>
          <meta
            name="description"
            content="Check out letulip's personal blog developed with Next.js and React."
            key="desc"
          />
          <meta property="og:title" content={siteTitle} />
          <meta
            property="og:description"
            content="Check out letulip's personal blog developed with Next.js and React."
          />
          <meta
            property="og:image"
            content="/img/avatar2.jpg"
          />
        </Head>
        <section className={utilStyles.headingLg}>
          <h1>Tic-Tac-Toe Game</h1>
        </section>

        <div className={tttStyles.game}>
          <div className={tttStyles.gameBoard}>
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className={tttStyles.gameInfo}>
            <div>{status}</div>
            <p>Go to:</p>
            <ol className={tttStyles.gameList}>{moves}</ol>
          </div>
        </div>
      </Layout>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]]
    }
  }
  return null
}

export default Game