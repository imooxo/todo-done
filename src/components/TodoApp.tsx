import { useState, KeyboardEvent } from 'react';
import React from 'react';
import { Input, Button } from 'antd';
import { runes } from 'runes2';
import useTodoStore from '../store/todoStore';
import '../styles/styles.scss'; 

export default function TodoApp() {
  const { todos, addTodo, InProgressTodo, doneTodo } = useTodoStore();
  const [title, setTitle] = useState<string>(''); 
  const [description, setDescription] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); 

  const handleAddTodo = () => {
    if (title.trim() && description.trim()) {
      addTodo(title, description);
      setTitle('');
      setDescription('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' ) {
      if (e.shiftKey) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          handleAddTodo();
          setLoading(false);
        }, 2000);
      }
    }
  };

  const todoList = todos.filter((todo) => todo.status === 'todo');
  const inProgressList = todos.filter((todo) => todo.status === 'inProgress');
  const doneList = todos.filter((todo) => todo.status === 'done');

  return (
    <div className="TodoApp">
      <h2 className="mainTitle">Today Planning</h2>

      <section className="TodoList">
        <h2>Todo</h2>
        <div>
          <Input
            count={{
              show: true,
              max: 20,
              strategy: (value: string) => runes(value).length,
              exceedFormatter: (value: string, { max }: { max: number }) => runes(value).slice(0, max).join(''), 
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title 🔥"
            style={{ width: 480, resize: 'none' }}
          />
        </div>
        <div>
          <Input.TextArea
            count={{
              show: true,
              max: 50,
              strategy: (value: string) => runes(value).length, 
              exceedFormatter: (value: string, { max }: { max: number }) => runes(value).slice(0, max).join(''),
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Todo Description 🔥 "
            style={{ height: 180, resize: 'none' }}
          />
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                handleAddTodo();
                setLoading(false);
              }, 2000);
            }}
          >
            ADD
          </Button>
        </div>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <span className="title">{todo.title}</span>
              <span className="description">{todo.description}</span>
              <button onClick={() => InProgressTodo(todo.id)}>IN PROGRESS</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="InProgressList">
        <h2>In Progress</h2>
        <ul>
          {inProgressList.map((todo) => (
            <li key={todo.id}>
              <span className="title">{todo.title}</span>
              <span className="description">{todo.description}</span>
              <button onClick={() => doneTodo(todo.id)}>DONE</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="DoneList">
        <h2>Done</h2>
        <ul>
          {doneList.map((todo) => (
            <li key={todo.id}>
              <span className="title">{todo.title}</span>
              <span className="description">{todo.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}