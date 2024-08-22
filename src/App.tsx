import TodoApp from "./components/TodoApp";
import React, { useState } from 'react';
import './styles/styles.scss';


function App() {
  const [showTodoApp, setShowTodoApp] = useState(false);

  const handleShowTodoApp = () => {
    setShowTodoApp(true);
  };

  return (
    <div className="App">
      {!showTodoApp ? (
        <div className="MainScreen">
          <h1 className="mainTitle">My Todo App</h1>
          <p className="description" onClick={handleShowTodoApp}>
            Click here if you want to check your TODO
          </p>
        </div>
      ) : (
        <TodoApp />
      )}
    </div>
  );
}

export default App;