import todoActionTypes from "./actionTypes/todoActionTypes"

const addTodo = (todo) => {
    return {
        type: todoActionTypes.ADD_TODO,
        payload: {todo}
    }
}

const markTodoCompleted = (createdAt) => {
    return {
        type: todoActionTypes.MARK_TODO_COMPLETED,
        payload: {createdAt}
    }
}

export {addTodo, markTodoCompleted}