import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type TTodos={
    id:string
    task:string,
    description:string,
    isComplite?:boolean
}

type TInitial={
    todos:TTodos[]
}

const initialState:TInitial={
    todos:[]
}

const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action:PayloadAction<TTodos>)=>{
            state.todos.push({...action.payload , isComplite:false})
        },
        removeTodos:(state,action:PayloadAction<string>)=>{
           state.todos= state.todos.filter(item=>item.id!== action.payload)
        },
        togoleComplete:(state,action)=>{
            const task=state.todos.find(item=>item.id==action.payload)
            task!.isComplite=!task?.isComplite
        }
    }

})

export const {addTodo,removeTodos,togoleComplete} = todoSlice.actions

export default todoSlice.reducer