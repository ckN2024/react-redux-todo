import todoActionTypes from "../actions/actionTypes/todoActionTypes";
import mockTodos from "../../mockTodos";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || mockTodos
};

const TodoReducers = (state = initialState, action) => {
  const { 
    ADD_TODO, 
    CHANGE_TODO_COMPLETED_STATE, 
    REMOVE_TODO, EDIT_TODO, 
    SORT_BY_NEWEST_FIRST, 
    SORT_BY_OLDEST_FIRST } = todoActionTypes;

  const { type, payload } = action;

  switch (type) {
    case ADD_TODO: {
      // put createdAt & index in the new todo
      payload.todo = {...payload.todo, createdAt: Date.now(), index: 0}

      // change the index all elements in the existing todos
      let newTodos = state.todos.map((todo) => {
        todo.index = todo.index + 1
        return todo;
      })

      // create a new todos array
      newTodos = [payload.todo, ...newTodos]

      // update the todos in localstorage
      localStorage.setItem("todos", JSON.stringify(newTodos));

      // return the new state
      return {
        ...state,
        todos: newTodos
      }
    }

    case CHANGE_TODO_COMPLETED_STATE: {
      // find the todo
      const currentTodo = state.todos.find(
        (todo) => todo.createdAt === payload.createdAt
      );
	console.log('current todo', currentTodo)
      // change the completed state
      currentTodo.isCompleted = !currentTodo.isCompleted;

      // remove the todo in a new todos array
      const filteredTodos = state.todos.filter(
        (todo) => todo.createdAt !== payload.createdAt
      );
      console.log(filteredTodos)

      // if completed insert it in the end
      let newTodos;
      if (currentTodo.isCompleted === true) {
        newTodos = [...filteredTodos, currentTodo];
        // console.log(newTodos)
      } else {
        newTodos = [currentTodo, ...filteredTodos];

        // sort the newtodos according to their index
        newTodos.sort((a, b)=>{
          if (a.isCompleted || b.isCompleted) {
            return 0; // Stop sorting if either isCompleted is true
          } else {
            return a.index - b.index; // Continue sorting based on createdAt
          }
        })
      }

      // update the todos in localstorage
      localStorage.setItem("todos", JSON.stringify(newTodos));

      // return the new state
      return { 
        ...state,
        todos: newTodos
      };
    }

    case REMOVE_TODO: {
      // remove the todo from the todos array
      const newTodos = state.todos.filter((todo) => (todo.createdAt !== payload.createdAt))
      
      // update the todos in localstorage
      localStorage.setItem("todos", JSON.stringify(newTodos));

      // return the new state
      return {
        ...state,
        todos: newTodos
      }
    }

    case EDIT_TODO: {
      // find the todo by createdAt
      const todoToUpdate = state.todos.find(
        (todo) => todo.createdAt === payload.updatedTodo.createdAt
      );

      // make a new updated the todo
      const updatedTodo = {
        title: payload.updatedTodo.title,
        description: payload.updatedTodo.description,
        isCompleted: false,
        createdAt: Date.now()
      }
      
      // make a new todos array with the updated todo
      const newTodos = state.todos.map((todo) => {
        if(todo.createdAt === todoToUpdate.createdAt) {
          return updatedTodo
        } else {
          return todo
        }
      })

      // update the todos in localstorage
      localStorage.setItem("todos", JSON.stringify(newTodos));

      // return the new state
      return {
        ...state,
        todos: newTodos
      }
    }

    case SORT_BY_NEWEST_FIRST: {
      // make a copy of the todos state
      const newTodos = [...state.todos]

      // incomplete todos are sorted in descending order of createdAt
      newTodos.sort((a, b) => {
        if (a.isCompleted || b.isCompleted) {
          return 0; // Stop sorting if either is completed
        } else {
          return b.createdAt - a.createdAt; // Continue sorting based on createdAt
        }
      })

      // update the todos in localstorage
      localStorage.setItem("todos", JSON.stringify(newTodos));

      // return the new state
      return {
        ...state,
        todos: newTodos
      }
    }

    case SORT_BY_OLDEST_FIRST: {
      // make a copy of the todos state
      const newTodos = [...state.todos]

      // incomplete todos are sorted in ascending order of createdAt
      newTodos.sort((a, b)=>{
        if (a.isCompleted || b.isCompleted) {
          return 0; // Stop sorting if either is completed
        } else {
          return a.createdAt - b.createdAt; // Continue sorting based on createdAt
        }
      })

      // update the todos in localstorage
      localStorage.setItem("todos", JSON.stringify(newTodos));

      // return the new state
      return {
        ...state,
        todos: newTodos
      }
    }

    default:
      return state;
  }
};

export default TodoReducers;
