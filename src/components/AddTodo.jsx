import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  const [isTitleFilled, setIsTitleFilled] = useState(true)

  const dispatch = useDispatch();

  // add todo handler
  const submitHandler = (e) => {
    e.preventDefault();

    // trim the title and description
    newTodo.title = newTodo.title.trim()
    newTodo.description = newTodo.description.trim()

    // for validation purposes
    if(!newTodo.title) {
      setIsTitleFilled(false)
      return
    }

    // dispatch action to add todo
    dispatch(addTodo(newTodo));
    
    setNewTodo({
      title: "",
      description: "",
      isCompleted: false,
      createdAt: null
    });
  };

  return (
    <>
      <form 
        onSubmit={submitHandler} 
        className="flex flex-col gap-3 text-sm p-[0.5em] sm:p-[1em] md:p-[1.5em] lg:p-[2em] max-h-[35%]"
      >
        
        <div className="flex flex-col">
          {/* todo title input */}
          <input
            type="text"
            value={newTodo.title}
            placeholder="Title"
            onChange={(e) => {
              setNewTodo({ ...newTodo, title: e.target.value })
              setIsTitleFilled(true)
              }
            }
            className={`border px-3 py-1 rounded-[15px] focus:outline-none focus:border-green-500 ${newTodo.title.trim() === "" ? "focus:border-red-500":""}`}
          />
          {
            isTitleFilled ? "" : (<p className="text-red-500 text-sm">* Title is mandatory</p>)
          }
        </div>

        <div className="flex flex-col">
          {/* todo description input */}
          <textarea 
            id="description" 
            rows="2" 
            value={newTodo.description}
            placeholder="Description"
            onChange={(e)=> setNewTodo({...newTodo, description: e.target.value})}
            className="max-h-28 border px-3 py-1 rounded-[20px] focus:outline-none focus:border-green-500 noscrollbar"
          ></textarea>
        </div>

        <div className="flex justify-center">
          {/* Add button */}
          <button 
            type="submit"
            className="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-400 text-white hover:from-indigo-500 hover:via-blue-600 hover:to-cyan-500 py-[0.3em] px-5 rounded-full min-w-fit w-[7em]"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTodo;
