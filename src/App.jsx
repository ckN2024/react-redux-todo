import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SortingMenu from "./components/SortingMenu";
import mockTodos from "./mockTodos";
import { useSelector } from "react-redux";

function App() {
  // load todos from localstorage on first time or when localstorage gets cleared
  if(!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify(mockTodos));
  }

  const todos = useSelector((state) => state.TodoReducers.todos)

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-200 via-blue-400 to-cyan-200">
        <div className="w-[90%] sm:w-[85%] md:w-[70%] lg:w-[50%] border rounded-xl bg-white h-[90%]">
          <AddTodo />
          {
            todos && todos.length ? <SortingMenu /> : ""
          }
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
