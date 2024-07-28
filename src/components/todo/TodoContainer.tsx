import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
  // const todos=useAppSelector(state=>state.todos.todos)
  const [priority, setPriority] = useState('')


  const { data: todos, isLoading, isError } = useGetTodosQuery(priority)//,  {pollingInterval:3000})

  if (isLoading === true) {
    <p>Loading ..........</p>
  }
  if (isError === true) {
    <p>Error........</p>
  }
  return (
    <div>
      <div className="flex justify-between mb-5 ">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl  p-[5px]">
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
          {
            todos?.data.map((item: any) => <TodoCard {...item} key={item._id} />)
          }
        </div>

      </div>
    </div>
  );
};

export default TodoContainer;