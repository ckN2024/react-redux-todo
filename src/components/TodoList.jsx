import { useSelector } from "react-redux";
import { useEffect } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const todos = useSelector((state) => state.TodoReducers.todos);

  return (
    <div className="flex flex-col overflow-y-auto h-full gap-1 text-sm noscrollbar">
      {todos.map((todo) => (
        <div key={todo.createdAt}>
          <Todo todo={todo}/>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
