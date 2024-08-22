import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import TodoApp from './components/TodoApp';
export { TodoApp }; //// TodoApp 컴포넌트를 내보내기

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  throw new Error("Root not found.");
}
export default TodoApp;  
