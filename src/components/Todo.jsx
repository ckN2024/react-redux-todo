import { MdDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { markTodoCompleted, removeTodo, editTodo } from "../redux/actions/todoActions";
import { useState } from "react";

const Todo = ({ todo }) => {
  const date = new Date(todo.createdAt);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const [isEditModeOn, setIsEditModeOn] = useState(false)
  const [isTitleFilled, setIsTitleFilled] = useState(true)
  const [editedTodo, setEditedTodo] = useState({
    title: todo.title,
    description: todo.description,
    isCompleted: todo.isCompleted,
    createdAt: todo.createdAt
  });

  const dispatch = useDispatch()

  const editTodoSubmitHandler = (e) => {
    e.preventDefault()

    editedTodo.title = editedTodo.title.trim()
    editedTodo.description = editedTodo.description.trim()

    if(!editedTodo.title) {
      setIsTitleFilled(false)
      return
    }

    dispatch(editTodo(editedTodo))
  }

  const todoStateHandler = () => {
    dispatch(markTodoCompleted(todo.createdAt))   
  }

  return (
    <div className="hover:bg-gray-100 shadow p-2 flex gap-[2em] rounded-lg">
      <input type="checkbox" className="w-4 h-4 appearance-none border rounded-full border-gray-700 cursor-pointer checked:bg-blue-500 my-auto" onClick={todoStateHandler} />
      <div className="grow">
        {
          isEditModeOn ? (
            // for editing a todo
              <form className="flex flex-col items-center gap-1" onSubmit={editTodoSubmitHandler}>
                <div className="flex flex-col w-full">
                  <input 
                    type="text" 
                    placeholder="title"
                    value={editedTodo.title}
                    onChange={(e) => {
                      setEditedTodo({...editedTodo, title: e.target.value})
                      setIsTitleFilled(true)
                    }}
                    className={`border px-3 py-[0.3em] rounded-[15px] focus:outline-none focus:border-green-500 w-full ${editedTodo.title.trim() === "" ? "focus:border-red-500":""}`}
                  />
                  {
                    isTitleFilled ? "" : (<p className="text-red-500 text-sm">* Title is mandatory</p>)
                  }
                </div>
                <textarea
                  rows="2"
                  placeholder="Description"
                  value={editedTodo.description}
                  onChange={(e) => {setEditedTodo({...editedTodo, description: e.target.value})}}
                  className="border px-3 py-[0.3em] rounded-[20px] focus:outline-none focus:border-green-500 w-full" 
                ></textarea>

                <div className="flex gap-3">
                  <button 
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-600 py-[0.3em] px-5 rounded-full min-w-fit w-[7em]"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setIsEditModeOn(!isEditModeOn)}
                    className="bg-orange-600 text-white hover:bg-orange-700 py-[0.3em] px-5 rounded-full min-w-fit w-[7em]"
                  >
                    Keep Existing
                  </button>
                </div>
              </form>
            ) : (
            // for displaying a todo
            <div onClick={() => setIsEditModeOn(!isEditModeOn)}>
              <p>
                <span className={`font-semibold ${todo.isCompleted ? "line-through":""}`}>{todo.title}</span>
                <span className="italic text-xs text-gray-600 ml-4">
                  ({day}/{month}/{year})
                </span>
              </p>
              <p className={`italic text-gray-600 line-clamp-1 ${todo.isCompleted ? "line-through":""} ${todo.description ? "":"invisible"}`}>
                {todo.description ? todo.description : "No description"}
              </p>
            </div>
          )
        }
        
      </div>
      <div className="flex gap-2">
        <RxCross2 
          title="Remove" 
          className="h-full text-[1.2em] text-gray-400 hover:text-red-500" 
          onClick={() => dispatch(removeTodo(todo.createdAt))}/>
      </div>
    </div>
  );
};

export default Todo;
