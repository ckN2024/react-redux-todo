import todoActionTypes from "../actions/actionTypes/todoActionTypes";
import mockTodos from "../../mockTodos.js";

const initialState = {
  // todos: []
  todos: mockTodos,
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
      // state.todos = [payload.todo, ...state.todos];
      // console.log(state);
      // return { ...state };
      // above code directly mutates the state which is not recommended in redux

      // put createdAt & index in the new todo
      payload.todo = {...payload.todo, createdAt: Date.now(), index: 0}

      // change the index all elements in the existing todos
      let newTodos = state.todos.map((todo) => {
        todo.index = todo.index + 1
        return todo;
      })

      // create a new todos array
      newTodos = [payload.todo, ...newTodos]

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
      // modify the completed state
      currentTodo.isCompleted = !currentTodo.isCompleted;

      // remove the todo in a new todos array
      const filteredTodos = state.todos.filter(
        (todo) => todo.createdAt !== payload.createdAt
      );

      // if completed insert it in the end
      let newTodos;
      if (currentTodo.isCompleted === true) {
        newTodos = [...filteredTodos, currentTodo];
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

      return { 
        ...state,
        todos: newTodos
      };
    }

    case REMOVE_TODO: {
      // remove the todo from the todos array
      const newTodos = state.todos.filter((todo) => (todo.createdAt !== payload.createdAt))
      
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

      // return the new state
      return {
        ...state,
        todos: newTodos
      }
    }

    case SORT_BY_NEWEST_FIRST: {
      // make a copy of the todos state
      const newTodos = [...state.todos]

      // sort the todos in descending order of createdAt
      // newTodos.sort((a, b)=>(b.createdAt - a.createdAt))

      // completed todos are not sorted
      newTodos.sort((a, b) => {
        if (a.isCompleted || b.isCompleted) {
          return 0; // Stop sorting if either isCompleted is true
        } else {
          return b.createdAt - a.createdAt; // Continue sorting based on createdAt
        }
      })

      // return the new state
      return {
        ...state,
        todos: newTodos
      }
    }

    case SORT_BY_OLDEST_FIRST: {
      // make a copy of the todos state
      const newTodos = [...state.todos]

      // sort the todos in ascending order of createdAt
      // newTodos.sort((a, b)=>(a.createdAt - b.createdAt))

      // completed todos are not sorted
      newTodos.sort((a, b)=>{
        if (a.isCompleted || b.isCompleted) {
          return 0; // Stop sorting if either isCompleted is true
        } else {
          return a.createdAt - b.createdAt; // Continue sorting based on createdAt
        }
      })

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
