import { useSelector } from "react-redux";
import { useEffect } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const todos = useSelector((state) => state.TodoReducers.todos);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-[2em] font-semibold">Todos</h1>
      <hr className="h-[0.2em] bg-gray-400" />

      {todos.map((todo) => (
        <div key={todo.createdAt}>
          <Todo todo={todo}/>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
