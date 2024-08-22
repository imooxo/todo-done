import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Todo {
  id: number;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
}

interface TodoState {
  todos: Todo[];
  nextID: number;
  addTodo: (title: string, description: string) => void;
  InProgressTodo: (id: number) => void;
  doneTodo: (id: number) => void;
}

const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [
        {
          id: 0,
          title: "프론트",
          description: "react 공부하기",
          status: "todo",
        },
        {
          id: 1,
          title: "백엔드",
          description: "nest.js 공부하기",
          status: "todo",
        },
        {
          id: 2,
          title: "코딩",
          description: "zustand 적용하기",
          status: "inProgress",
        },
        {
          id: 3,
          title: "코딩",
          description: "components 통합하기",
          status: "done",
        },
      ],
      nextID: 4,
      addTodo: (title: string, description: string) => {
        set((state) => ({
          todos: [...state.todos, { id: state.nextID, title, description, status: "todo" }],
          nextID: state.nextID + 1,
        }));
      },
      InProgressTodo: (id: number) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, status: "inProgress" } : todo
          ),
        }));
      },
      doneTodo: (id: number) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, status: "done" } : todo
          ),
        }));
      },
    }),
    {
      name: "todo-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useTodoStore;
