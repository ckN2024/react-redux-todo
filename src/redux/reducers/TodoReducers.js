import todoActionTypes from "../actions/actionTypes/todoActionTypes";
import mockTodos from "../../mockTodos.js";

const initialState = {
  // todos: []
  todos: mockTodos,
};

const TodoReducers = (state = initialState, action) => {
  const { ADD_TODO, MARK_TODO_COMPLETED, REMOVE_TODO } = todoActionTypes;

  const { type, payload } = action;

  switch (type) {
    case ADD_TODO: {
      state.todos = [payload.todo, ...state.todos];
      console.log(state);
      return { ...state };
    }

    case MARK_TODO_COMPLETED: {
      // find the todo
      const currentTodo = state.todos.find(
        (todo) => todo.createdAt === payload.createdAt
      );
      // modify the completed state
      currentTodo.isCompleted = !currentTodo.isCompleted;

      // remove the todo
      const filteredTodos = state.todos.filter(
        (todo) => todo.createdAt !== payload.createdAt
      );

      // if completed insert it in the end
      if (currentTodo.isCompleted === true) {
        state.todos = [...filteredTodos, currentTodo];
      } else {
        state.todos = [currentTodo, ...filteredTodos];
      }

      return { ...state };
    }

    case REMOVE_TODO: {
      // remove the todo from the todos array
      const newTodos = state.todos.filter((todo) => (todo.createdAt !== payload.createdAt))
      
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
