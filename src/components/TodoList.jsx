import { useSelector } from "react-redux";
import { useEffect } from "react";
import Todo from "./Todo";
import { useDispatch } from "react-redux";
import { sortByNewestFirst, sortByOldestFirst } from "../redux/actions/todoActions";

const TodoList = () => {
  const todos = useSelector((state) => state.TodoReducers.todos);
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col overflow-y-auto h-full gap-2 text-sm noscrollbar">
      <div className="flex gap-2">
        <button 
          onClick={()=>dispatch(sortByNewestFirst())}
          className="px-2 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-300"
        >
          Sort by newest first
        </button>

        <button 
          onClick={()=>dispatch(sortByOldestFirst())}
          className="px-2 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-300"
        >
          Sort by oldest first
        </button>
      </div>
      {todos.map((todo) => (
        <div key={todo.createdAt}>
          <Todo todo={todo}/>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
