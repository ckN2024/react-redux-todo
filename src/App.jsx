import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SortingMenu from "./components/SortingMenu";
import mockTodos from "./mockTodos";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  // load todos from localstorage on first time or when localstorage gets cleared
  useEffect(()=>{
    if (!localStorage.getItem("todos")) {
      localStorage.setItem("todos", JSON.stringify(mockTodos));
    }
  })

  const todos = useSelector((state) => state.TodoReducers.todos);

  return (
    <>
      {/* main container */}
      <div className="flex justify-center items-center h-screen overflow-y-scroll bg-gradient-to-r from-cyan-200 via-blue-400 to-cyan-200">
        {/* todo container */}
        <div className="w-[90%] sm:w-[85%] md:w-[70%] lg:w-[50%] text-xs sm:text-base border rounded-xl bg-white h-[95%] pb-2">
          <AddTodo />
          {todos && todos.length ? <SortingMenu /> : ""}
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
