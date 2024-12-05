import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished]=useState(true)

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveTodo=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished=(e) => {
    setshowFinished(!showFinished)
  }
  
  

  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id != id
    });
    setTodos(newTodos)
    saveTodo()

  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id != id
    });
    setTodos(newTodos)
    saveTodo()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTodo()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    saveTodo()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTodo()
  }


  return (
    <>
      <Navbar />
      <div className="text-white mx-3 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-[50%] bg-black">
      <h1 className='font-bold font-signika text-center text-3xl'> A Todo List Manager For Your Everyday Use!</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='font-jose text-xl font-bold text-violet-400'>Add a Todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='font-jose w-full rounded-full px-5 py-2 text-black' />
          <button onClick={handleAdd} disabled={todo.length<3} className='font-jose mx-2 bg-violet-500 hover:bg-violet-600 disabled:bg-violet-500 p-4 py-2 text-white rounded-full'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished}  /> <span className='font-signika text-violet-200'>Show Finished</span>
        <div className='h-[1px] bg-black opacity-40 mx-auto my-2 '></div>
        <h2 className='font-jose text-xl my-4 font-bold text-violet-400'>Your Todos</h2>
        {todos.length === 0 && <div className='m-5 font-jose '>No Todos to Display</div>}
        {todos.map(item => {
          return (
            (showFinished||!item.isCompleted)&&<div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5 font-jose text-xl break-all '>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>

              </div>

              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className=' bg-violet-500 hover:bg-violet-600 mx-1 p-2 py-1 text-white rounded-md'><FaEdit />
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className=' bg-violet-500 hover:bg-violet-600 mx-1 p-2 py-1 text-white rounded-md'><MdDelete /></button>
              </div>

            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
