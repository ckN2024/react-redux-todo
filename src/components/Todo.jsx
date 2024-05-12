import { MdDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { markTodoCompleted } from "../redux/actions/todoActions";

const Todo = ({ todo }) => {
  const date = new Date(todo.createdAt);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dispatch = useDispatch()

  const todoStateHandler = () => {
    dispatch(markTodoCompleted(todo.createdAt))   
  }

  return (
    <div className="bg-gray-100 p-[1em] flex gap-[2em]">
      <input type="checkbox" className="w-5" onClick={todoStateHandler} />
      <div className="grow">
        <p className="text-[1.5em]">
          <span className={todo.isCompleted ? "line-through":""}>{todo.title}</span>
          <span className="italic text-xs text-gray-600">
            ({day}/{month}/{year})
          </span>
        </p>
        <p className={`italic text-gray-600 ${todo.isCompleted ? "line-through":""}`}>
          {todo.description ? todo.description : "No Description"}
        </p>
      </div>
      <div className="flex gap-2">
        <MdModeEditOutline title="Edit" className="h-full text-[2em] text-blue-400 hover:text-blue-500" />
        <MdDeleteForever title="Delete" className="h-full text-[2em] text-red-400 hover:text-red-500" />
      </div>
    </div>
  );
};

export default Todo;
