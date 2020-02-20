const initialState = {
    isFetching: false,
    transactions: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "TRANSACTIONS_REQUESTED":
            return {
                ...state,
                isFetching: true
            }
        case "TRANSACTIONS_LOADED":
            return {
                ...state,
                isFetching: false,
                transactions: action.payload                
            }
        case "TRANSACTIONS_ERRORED":
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state
    }
}