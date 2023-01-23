import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { client, postMethod } from '@/lib/axios'

const TodoShowPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

	const [todo, setTodo] = useState({})

	console.log(todo)

	const fetchTodo = () => {
		client
			.get(`/api/todo/show/${id}`)
			.then((res) => {
				console.log(res.data)
				setTodo(res.data)
			})
			.catch(error => {
					console.error(error)
			})
	}

	useEffect(() => {
		fetchTodo()
	}, [id])

	const changeTodoData = (e: any) => {
		if(e.target.id === "title") {
			setTodo(todo => ({...todo, title: e.target.value}))
		} else if(e.target.id === "content") {
			setTodo(todo => ({...todo, content: e.target.value}))
		}
	}

	const updateTodo = (todoId: any) => {
		console.log(todoId)
	}

  return (
		<>
		<h1 className="text-4xl font-bold mb-3">Todo詳細・編集</h1>
        <div className='mb-2'>
					<label className="block font-medium">タイトル</label>
					<input 
						value={todo?.Title}
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
						value={todo?.Content}
						rows={4} 
						className="bg-gray-50 border border-gray-300 rounded-lg p-1.5"
						onChange={(e) => changeTodoData(e)} 
						></textarea>
        </div>
				<button
						className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
						onClick={() => updateTodo(todo?.Id)}
					>更新</button>
			<div>
				<Link href="/todo">Todo管理ページへ</Link>
			</div>
		</>
  )
}

export default TodoShowPage