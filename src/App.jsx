import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TodoForm, TodoItem, ThemeBtn } from "./components";
import { TodoProvider } from "./contexts";

function App() {
  // Dark Theme.
  const [themeMode, setThemeMode] = useState("light");

  const lightMode = () => {
    setThemeMode("light");
  };

  const darkMode = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  // TodoList.
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const result = todos.reduce((acc, item) => {
    return acc + Number(item.price);
  }, 0);
  // console.log(result);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <ThemeProvider value={{ themeMode, lightMode, darkMode }}>
        <div className="bg-[#172842] dark:bg-black min-h-screen py-8">
          <ThemeBtn />
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white dark:text-[#a47575]">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Bill Book ( List of Items )
            </h1>
            <div className="mb-4">
              {/* Todo form goes here */}
              <TodoForm />
            </div>
            <div className="mb-4 flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
            <div
              className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-white dark:text-[#9c9898]  bg-[#232422]`}
            >
              <h1 className="px-5 py-1 w-3/5 bg-[#444841] dark:bg-slate-900 rounded-lg text-center">
                Number of Items = {todos.length}
              </h1>
              <h1 className="px-1 py-1 w-2/5 bg-[#444841] dark:bg-slate-900 rounded-lg text-center">
                Total = {result} ₹
              </h1>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </TodoProvider>
  );
}

export default App;
