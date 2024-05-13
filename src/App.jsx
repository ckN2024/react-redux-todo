import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-200 via-blue-400 to-cyan-200">
        <div className="w-[40%] border rounded-xl bg-white h-[90%]">
          <div className="p-[2em]">
            <AddTodo />
          </div>
          <div className="px-[2em] h-[60%]">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
