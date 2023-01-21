import Link from 'next/link'
import { Inter } from '@next/font/google'
import { MouseEvent, useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
	const todosArray = [
		{ id: 1, title: "買い物", content: "スーパーで肉を買う"},
		{ id: 2, title: "勉強", content: "Next.jsを学習する"},
		{ id: 3, title: "睡眠", content: "8時間ほど寝る"},
		{ id: 4, title: "サウナ", content: "12分×3セット"},
		{ id: 5, title: "外食", content: "ラーメン"},
	]

	const [todos, setTodos] = useState(todosArray)
	const [addTodoData, setAddTodoData] = useState({id: 0, title: "", content: ""})
	
	useEffect(() => {
		const lastTodo = todos.slice(-1)[0]
		setAddTodoData(addTodoData => ({...addTodoData, id: lastTodo.id + 1}))
	}, [todos])

	const changeTodoData = (e: any) => {
		if(e.target.id === "title") {
			setAddTodoData(addTodoData => ({...addTodoData, title: e.target.value}))
		} else if(e.target.id === "content") {
			setAddTodoData(addTodoData => ({...addTodoData, content: e.target.value}))
		}
	}

	const addTodo = () => {
		setTodos((todos) => ([...todos, addTodoData]))
		setAddTodoData({id: 0, title: "", content: ""})
	}

	const deleteTodo = (id: number) => {
		setTodos((current) => current.filter((todo) => todo.id !== id))
	}

  return (
    <>
      <h1 className="text-4xl font-bold mb-3">Todo管理</h1>
			<div className='mb-6'>
				<h2 className="text-2xl font-bold mb-2">追加</h2>
        <div className='mb-2'>
					<label className="block font-medium">タイトル</label>
					<input 
						value={addTodoData.title}
						type="text" 
						id="title" 
						className="bg-gray-50 border border-gray-300 rounded-lg p-1.5" required
						onChange={(e) => changeTodoData(e)} 
						/>
        </div>
        <div>
					<label className="block font-medium">内容</label>					
					<textarea 
						id="content" 
						value={addTodoData.content}
						rows={4} 
						className="bg-gray-50 border border-gray-300 rounded-lg p-1.5"
						onChange={(e) => changeTodoData(e)} 
						></textarea>
        </div>
				<button
						className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
						onClick={() => addTodo()}
					>追加</button>
			</div>
			<div>
				<h2 className="text-2xl font-bold mb-1">一覧</h2>
				<ul className='w-[762px]'>
					<li className='flex gap-4'>
						<p className='w-[5%]'>No</p>
						<p className='w-[15%]'>タイトル</p>
						<p className='w-[30%]'>内容</p>
					</li>
					{todos.map((todo, index) => (
						<li key={todo.id} className='flex gap-4 mb-3 items-center'>
							<p className='w-[5%]'>{todo.id}</p>
							<p className='w-[15%]'>{todo.title}</p>
							<p className='w-[30%]'>{todo.content}</p>
							<button
								className="bg-red-600 hover:bg-red-500 text-white rounded px-4 py-2"
								onClick={() => deleteTodo(todo.id)}
							>
									削除
								</button>
						</li>
					))}
				</ul>
			</div>
			<Link href="./">トップに戻る</Link>
    </>
  )
}
