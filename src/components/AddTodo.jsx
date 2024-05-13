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

  const submitHandler = (e) => {
    e.preventDefault();
    newTodo.title = newTodo.title.trim()
    newTodo.description = newTodo.description.trim()

    if(!newTodo.title) {
      setIsTitleFilled(false)
      return
    }

    console.log(`newTodo:`, newTodo)
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
        className="flex flex-col gap-3 text-sm p-[0.5em] sm:p-[1em] md:p-[1.5em] lg:p-[2em]"
      >
        <div className="flex flex-col">
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
          <textarea 
            id="description" 
            rows="2" 
            value={newTodo.description}
            placeholder="Description"
            onChange={(e)=> setNewTodo({...newTodo, description: e.target.value})}
            className="border px-3 py-1 rounded-[20px] focus:outline-none focus:border-green-500 noscrollbar"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button 
            type="submit"
            className="bg-green-500 text-white hover:bg-green-600 py-[0.3em] px-5 rounded-full min-w-fit w-[7em]"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTodo;
