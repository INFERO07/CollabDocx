import React, { useState, useEffect, useRef } from 'react';

const BoardSize = 20;

const Game: React.FC = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('right');
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);

  useEffect(() => {
    gameLoopRef.current = window.setInterval(() => {
      moveSnake();
    }, 100);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);

  const moveSnake = () => {
    const head = { ...snake[0] };
    switch (direction) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }

    if (head.x < 0 || head.x >= BoardSize || head.y < 0 || head.y >= BoardSize || checkCollision(head)) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      alert('Game Over!');
      return;
    }

    setSnake([head, ...snake.slice(0, -1)]);
    if (head.x === food.x && head.y === food.y) {
      setSnake([head, ...snake]);
      generateFood();
    }
  };

  const checkCollision = (head: { x: number; y: number }) => {
    return snake.some(part => part.x === head.x && part.y === head.y);
  };

  const generateFood = () => {
    let newFood = {
      x: Math.floor(Math.random() * BoardSize),
      y: Math.floor(Math.random() * BoardSize)
    };
    while (snake.some(part => part.x === newFood.x && part.y === newFood.y)) {
      newFood = {
        x: Math.floor(Math.random() * BoardSize),
        y: Math.floor(Math.random() * BoardSize)
      };
    }
    setFood(newFood);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowUp': if (direction !== 'down') setDirection('up'); break;
      case 'ArrowDown': if (direction !== 'up') setDirection('down'); break;
      case 'ArrowLeft': if (direction !== 'right') setDirection('left'); break;
      case 'ArrowRight': if (direction !== 'left') setDirection('right'); break;
    }
  };

  useEffect(() => {
    const handleDocKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'down') setDirection('up'); break;
        case 'ArrowDown': if (direction !== 'up') setDirection('down'); break;
        case 'ArrowLeft': if (direction !== 'right') setDirection('left'); break;
        case 'ArrowRight': if (direction !== 'left') setDirection('right'); break;
      }
    };
    document.addEventListener('keydown', handleDocKeyDown);
    return () => document.removeEventListener('keydown', handleDocKeyDown);
  }, [direction]);

  return (
    <div className="game-container" tabIndex={0} onKeyDown={handleKeyDown} ref={gameBoardRef}>
      <div className="game-board">
        {snake.map((part, index) => (
          <div key={index} className="snake-part" style={{ left: part.x * 20, top: part.y * 20 }}></div>
        ))}
        <div className="food" style={{ left: food.x * 20, top: food.y * 20 }}></div>
      </div>
    </div>
  );
};

export default Game;
