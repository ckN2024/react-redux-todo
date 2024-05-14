import { useSelector } from "react-redux";
import { useEffect } from "react";
import Todo from "./Todo";
import { sortByNewestFirst, sortByOldestFirst } from "../redux/actions/todoActions";

const TodoList = () => {
  const todos = useSelector((state) => state.TodoReducers.todos);

  return (
    <div className="flex flex-col overflow-y-auto gap-2 text-sm px-[0.5em] sm:px-[1em] md:px-[1.5em] lg:px-[2em] max-h-[60%] noscrollbar">
      {/* map each todo */}
      {todos && todos.map((todo) => (
        <div key={todo.createdAt}>
          <Todo todo={todo}/>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
