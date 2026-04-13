import { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    await axios.post('/todos', { text: newTodo, completed: false });
    setNewTodo('');
    fetchTodos();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;