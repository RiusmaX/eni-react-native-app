import React from 'react'

const CountContext = React.createContext()

const actions = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement'
}

const countReducer = (state, action) => {
    switch (action.type) {
        case actions.INCREMENT:
            return {count: state.count + 1}
        case actions.DECREMENT:
            return {count: state.count - 1}
        default:
            throw new Error(`Unhandled action type : ${action.type}`)
    }          
}

const CountProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(countReducer, {count: 0})

    const value = {state, dispatch}
    return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}

const useCount = () => {
    const context = React.useContext(CountContext)
    if (!context) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export {CountProvider, useCount, actions}