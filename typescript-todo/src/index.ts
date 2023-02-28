import { v4 as uuidV4 } from "uuid"

type Task = {
    id: string, 
    title: string, 
    completed: boolean, 
    createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null //another way to specify type. getElement by ID doesn't support the previous way to declare type
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[] = loadTasks()

tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
    e.preventDefault()
    if (input?.value == "" || input?.value == null) return // ? is an optional chaining. Means that if "input" exist - give a value, if not - return undefined.

    const newTask : Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask)
    saveTasks()
    addListItem(newTask)
    input.value = ""
})

function addListItem(task: Task) {
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    checkbox.addEventListener("change", ()=>{
        task.completed = checkbox.checked
        saveTasks()
    })
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
}

function saveTasks(){
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}
function loadTasks(): Task[]{
    const tasksJson = localStorage.getItem("TASKS")
    if(tasksJson == null) return []
    return JSON.parse(tasksJson)
}