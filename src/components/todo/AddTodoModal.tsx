import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAddTodosMutation } from "@/redux/api/api"
import { DialogClose } from "@radix-ui/react-dialog"
import { FormEvent, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

export function AddTodoModal() {
    const [description, setDescription] = useState('')
    const [task, setTask] = useState('')
    const [priority, setPriority] = useState('')
    //! For local state manage
    // const dispatch=useAppDispatch()

    const [addTodo, { isLoading, isError, isSuccess }] = useAddTodosMutation()


    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        // const randomString = Math.random().toString().substring(2)
        const taskDetails = {
            title: task,
            description,
            isCompleted: false,
            priority
        }
        //! For local state manage
        // dispatch(addTodo(taskDetails))
        // console.log(taskDetails);
        addTodo(taskDetails)
    }

    if (isLoading) {
        <p>Loading..................</p>
    }
    if (isError) {
        <p>Error..................</p>
    }
    if (isSuccess) {
        <p>Success..................</p>
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-primary-gradient text-xl font-semibold" >Add Todo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Add your tasks that you want to finish.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="task" className="text-right">Task</Label>
                            <Input
                                onBlur={(e) => setTask(e.target.value)}
                                id="task"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                onBlur={(e) => setDescription(e.target.value)}
                                id="description"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right"> Priority</Label>
                            <Select onValueChange={(value) => setPriority(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Priority</SelectLabel>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                    <DialogClose className="flex justify-end">

                        <Button type="submit">Save changes</Button>
                    </DialogClose>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTodoModal