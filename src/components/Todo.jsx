import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  changeTodoCompletedState,
  removeTodo,
  editTodo,
} from "../redux/actions/todoActions";
import { useRef, useState } from "react";
import stringFormatter from "../helpers/stringFormatter.jsx";

const Todo = ({ todo }) => {
  const date = new Date(todo.createdAt);
  const editInputRef = useRef(null);

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

  // Edit and Submit is handled here
  const editAndSubmitHandler = (e) => {
    if(isEditModeOn) {
      editTodoSubmitHandler(e)
    } else {
      setIsEditModeOn(!isEditModeOn)
    }
  }


  // to handle submit
  const editTodoSubmitHandler = (e) => {
    e.preventDefault();

	  console.log("editedtodo", editedTodo);
    // trimming title and description
    editedTodo.title = editedTodo.title.trim();
    editedTodo.description = editedTodo.description.trim();
    editedTodo.isCompleted = editedTodo.isCompleted;

    // for validation purposes
    if (!editedTodo.title) {
      setIsTitleFilled(false);
      return;
    }

    // dispatch action to edit the todo
    dispatch(editTodo(editedTodo));
    setIsEditModeOn(false);
    // }
  };

  // completed todo state handler
  const todoStateHandler = (e) => {
    e.stopPropagation()
    setIsEditModeOn(false);
    dispatch(changeTodoCompletedState(todo.createdAt));
  };

  const toggleEditModeFn = (e)=>{
    setIsEditModeOn(false);
    
  }
  return (
    <div
      onClick={editAndSubmitHandler} 
      //onBlur={(e) => {
      //  console.log("onBlur triggred")
      //   //editTodoSubmitHandler(e)
	//toggleEditModeFn(e) 
      //}}
      className="hover:bg-gray-100 shadow p-2 flex gap-[2em] rounded-lg"
    >
       {/* completed or not completed indicator checkbox  */}
      <input
        type="checkbox"
        className="min-w-4 min-h-4 my-auto"
	checked={todo.isCompleted}
        onClick={(e) => {
          e.stopPropagation()
          todoStateHandler(e)
        }}
	onChange={e => e.stopPropagation()}
      />
      <div className="grow">
        {isEditModeOn ? (
          // for editing a todo
          <div className="flex gap-2">
            <div
              className="flex flex-col items-center gap-1 grow"
            >
              <div className="flex flex-col w-full">
                 {/* title input while editing */}
                <input
                  ref={editInputRef}
                  type="text"
                  placeholder="title"
                  value={editedTodo.title}
                  onClick={(e)=> e.stopPropagation()}
		      onBlur={(e) => {
			console.log("onBlur triggred from input", e)
			editTodoSubmitHandler(e)
		      }}
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

              {/* description input while editing */}
              <textarea
                rows="2"
                placeholder="Description"
                value={editedTodo.description}
                onClick={(e)=>{e.stopPropagation()}}
                onChange={(e) => {
                  setEditedTodo({ ...editedTodo, description: e.target.value });
                }}
		      onBlur={(e) => {
			console.log("onBlur triggred from textarea checkbox")
			editTodoSubmitHandler(e)
		      }}
                className="border px-3 py-[0.3em] rounded-[20px] focus:outline-none focus:border-green-500 w-full noscrollbar"
              ></textarea>
            </div>

            {/* cross button to remove the todo */}
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
          >
            <div>
              <div className="flex">
                {/* todo title */}
                <div
                  className={`font-semibold ${
                    todo.isCompleted ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </div>

                {/* todo created date */}
                <div className="italic text-xs text-gray-600 ml-4">
                  {date.toLocaleDateString()}
                </div>

                {/* todo created time */}
                <div className="italic text-xs text-gray-600 ml-4">
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>

              {/* todo description */}
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

            {/* todo remove icon */}
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
