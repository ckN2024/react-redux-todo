const todoActionTypes = {
    ADD_TODO: "ADD_TODO",
    REMOVE_TODO: "REMOVE_TODO",
    EDIT_TODO: "EDIT_TODO",
    CHANGE_TODO_COMPLETED_STATE: "CHANGE_TODO_COMPLETED_STATE",
    SORT_BY_NEWEST_FIRST: "SORT_BY_NEWEST_FIRST",
    SORT_BY_OLDEST_FIRST: "SORT_BY_OLDEST_FIRST"
}

// freeze types to restrict changes
Object.freeze(todoActionTypes)

export default todoActionTypes