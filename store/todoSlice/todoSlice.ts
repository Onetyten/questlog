import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface todolistTypes{
    _id: string;
    user_id: string|null,
    parent_id: string|null,
    title: string|null,
    status:string|null,
    priority:string|null,
    dueDate:string|null,
    dateCreated:string|null
    isTemp?:boolean
}

const initialState:todolistTypes[]=[]


const todoSlice  = createSlice(
    {
        name:"todolist",
        initialState,
        reducers:{
            setTodos:(state,action:PayloadAction<todolistTypes[]>)=>{
                return action.payload
            },
            addTodo:{
                reducer:(state,action:PayloadAction<todolistTypes>)=>{
                    state.push(action.payload)
                },
                prepare:(todo:Omit<todolistTypes,"_id">)=>{
                    return{
                        payload:{
                            ...todo,
                            _id:uuidv4(),
                            isTemp:true
                        }
                    }
                }

            },
            replaceTodo:(state,action:PayloadAction<{Temp_id:string,newTodo:todolistTypes}>)=>{
                const index = state.findIndex(todo=>todo._id === action.payload.Temp_id)
                if(index != -1){
                    state[index] = action.payload.newTodo
                }
            },
            updateTodo:(state,action:PayloadAction<todolistTypes>)=>{
                const index  = state.findIndex(todo=>todo._id == action.payload._id)
                if (index != -1){
                    state[index] = action.payload
                }
            },
            deleteTodo:(state,action:PayloadAction<todolistTypes>)=>{
                return state.filter(todo=>todo._id !== action.payload._id)
            },

            
        }


    }
)

export const {addTodo,setTodos,replaceTodo,updateTodo,deleteTodo} = todoSlice.actions
export default todoSlice.reducer