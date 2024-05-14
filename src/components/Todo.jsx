import { MdDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import {
  changeTodoCompletedState,
  removeTodo,
  editTodo,
} from "../redux/actions/todoActions";
import { useState } from "react";
import stringFormatter from "../helpers/stringFormatter.jsx";

const Todo = ({ todo }) => {
  const date = new Date(todo.createdAt);

  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [isTitleFilled, setIsTitleFilled] = useState(true);
  const [editedTodo, setEditedTodo] = useState({
    title: todo.title,
    description: todo.description,
    isCompleted: todo.isCompleted,
    createdAt: todo.createdAt,
  });

  // const [formattedDescription, setFormattedDescription] = useState("")

  const formattedDescription = stringFormatter(todo.description);

  const dispatch = useDispatch();


  const editAndSubmitHandler = (e) => {
    if(isEditModeOn) {
      editTodoSubmitHandler(e)
    } else {
      setIsEditModeOn(!isEditModeOn)
    }
  }

  const editTodoSubmitHandler = (e) => {
    e.preventDefault();

    // if(isEditModeOn) {
    editedTodo.title = editedTodo.title.trim();
    editedTodo.description = editedTodo.description.trim();

    if (!editedTodo.title) {
      setIsTitleFilled(false);
      return;
    }

    dispatch(editTodo(editedTodo));
    setIsEditModeOn(false);
    // }
  };

  const todoStateHandler = (e) => {
    e.stopPropagation()
    dispatch(changeTodoCompletedState(todo.createdAt));
  };

  return (
    <div
      onClick={editAndSubmitHandler} 
      className="hover:bg-gray-100 shadow p-2 flex gap-[2em] rounded-lg"
    >
      <input
        type="checkbox"
        className="min-w-4 min-h-4 my-auto"
        onClick={(e) => todoStateHandler(e)}
      />
      <div className="grow">
        {isEditModeOn ? (
          // for editing a todo
          <div className="flex gap-2">
            <div
              className="flex flex-col items-center gap-1 grow"
              // onClick={editTodoSubmitHandler}
            >
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  placeholder="title"
                  value={editedTodo.title}
                  onClick={(e)=> e.stopPropagation()}
                  onChange={(e) => {
                    setEditedTodo({ ...editedTodo, title: e.target.value });
                    setIsTitleFilled(true);
                  }}
                  className={`border px-3 py-[0.3em] rounded-[15px] focus:outline-none focus:border-green-500 w-full ${
                    editedTodo.title.trim() === "" ? "focus:border-red-500" : ""
                  }`}
                />
                {isTitleFilled ? (
                  ""
                ) : (
                  <p className="text-red-500 text-sm">* Title is mandatory</p>
                )}
              </div>
              <textarea
                rows="2"
                placeholder="Description"
                value={editedTodo.description}
                onClick={(e)=>{e.stopPropagation()}}
                onChange={(e) => {
                  setEditedTodo({ ...editedTodo, description: e.target.value });
                }}
                className="border px-3 py-[0.3em] rounded-[20px] focus:outline-none focus:border-green-500 w-full noscrollbar"
              ></textarea>
            </div>

            <RxCross2
              title="Remove"
              className="my-auto min-w-4 text-[1.2em] text-gray-400 hover:text-red-500 hover:scale-[1.2] duration-300"
              onClick={(e) => {
                e.stopPropagation()
                dispatch(removeTodo(todo.createdAt));
              }}
            />
          </div>
        ) : (
          // for displaying a todo
          <div
            className="w-full flex justify-between"
            // onClick={() => setIsEditModeOn(!isEditModeOn)}
          >
            <div>
              <div className="flex">
                <div
                  className={`font-semibold ${
                    todo.isCompleted ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </div>
                <div className="italic text-xs text-gray-600 ml-4">
                  {/* ({day}/{month}/{year}) */}
                  {date.toLocaleDateString()}
                </div>

                <div className="italic text-xs text-gray-600 ml-4">
                  {/* ({day}/{month}/{year}) */}
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
              <p
                className={`italic text-gray-600 ${
                  todo.isCompleted ? "line-through" : ""
                } ${todo.description ? "" : "invisible"}`}
              >
                {todo.description
                  ? formattedDescription.map((jsx) => jsx)
                  : "No description"}
              </p>
            </div>

            <RxCross2
              title="Remove"
              className="my-auto min-w-4 text-[1.2em] text-gray-400 hover:text-red-500 hover:scale-[1.2] duration-300"
              onClick={(e) => {
                e.stopPropagation()
                dispatch(removeTodo(todo.createdAt));
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
