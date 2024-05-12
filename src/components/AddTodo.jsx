import { useState } from "react";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={submitHandler} className="h-[3em]">
        <input
          type="text"
          placeholder="Type your todo here"
          className="border w-[70vw] h-full px-5"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="bg-green-400 py-2 px-5 h-full">Add</button>
      </form>
    </>
  );
};

export default AddTodo;
