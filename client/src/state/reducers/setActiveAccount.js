const setActiveAccount = (state = null, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_ACCOUNT':
            return action.account
        default:
            return state
    }
}

export default setActiveAccount;