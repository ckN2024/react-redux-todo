import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    isCompleted: false,
    createdAt: null
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const newTodoWithDate = {...newTodo, createdAt: Date.now()}

    dispatch(addTodo(newTodoWithDate));
    
    setNewTodo({
      title: "",
      description: "",
      createdAt: null
    });
  };

  return (
    <>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <h1 className="text-[2em] font-semibold">Add Todo</h1>
        <hr className="h-[0.2em] bg-gray-400"/>

        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={newTodo.title}
            placeholder="Type todo title here"
            onChange={(e) =>
              setNewTodo({ ...newTodo, title: e.target.value })
            }
            required={true}
            className="border px-5 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            rows="3" 
            value={newTodo.description}
            placeholder="Type todo description here"
            className="border px-5 py-2"
            onChange={(e)=> setNewTodo({...newTodo, description: e.target.value})}
          ></textarea>
        </div>

        <button className="bg-green-400 py-2 px-5">Add</button>
      </form>
    </>
  );
};

export default AddTodo;
