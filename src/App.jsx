import AddTodo from "./components/AddTodo"
import TodoList from "./components/TodoList"

function App() {

  return (
    <>
      <div className="flex h-screen">
        <div className="w-[30%] h-full border-r p-[2em]">
          <AddTodo />
        </div>
        <div className="w-[70%] h-full p-[2em]">
          <TodoList />
        </div>

      </div>
    </>
  )
}

export default App
