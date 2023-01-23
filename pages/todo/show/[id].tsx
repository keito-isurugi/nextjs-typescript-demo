import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { client, postMethod } from '@/lib/axios'

const TodoShowPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

	const [todoId, setTodoId] = useState()
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")

	const fetchTodo = () => {
		client
			.get(`/api/todo/show/${id}`)
			.then((res) => {
				setTodoId(res.data.Id)
				setTitle(res.data.Title)
				setContent(res.data.Content)
			})
			.catch(error => {
					console.error(error)
			})
	}

	useEffect(() => {
		fetchTodo()
	}, [id])

	const editTodo = () => {
		postMethod(
			'/api/todo/edit', 
			{ id: todoId, title: title, content: content }, 
		)
		.then((res) => {
			console.log("更新しました");
			fetchTodo()
		})
		.catch((error) => {
			console.log(error);
		});
	}

	const updateTodo = (todoId: any) => {
		console.log({id: todoId, title: title, content: content})
		editTodo()
	}

  return (
		<>
		<h1 className="text-4xl font-bold mb-3">Todo詳細・編集</h1>
        <div className='mb-2'>
					<label className="block font-medium">タイトル</label>
					<input 
						value={title}
						type="text" 
						id="title" 
						className="bg-gray-50 border border-gray-300 rounded-lg p-1.5" required
						onChange={(e) => setTitle(e.target.value)} 
						/>
        </div>
        <div>
					<label className="block font-medium">内容</label>					
					<textarea 
						id="content" 
						value={content}
						rows={4} 
						className="bg-gray-50 border border-gray-300 rounded-lg p-1.5"
						onChange={(e) => setContent(e.target.value)} 
						></textarea>
        </div>
				<button
						className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
						onClick={() => updateTodo(todoId)}
					>更新</button>
			<div>
				<Link href="/todo">Todo管理ページへ</Link>
			</div>
		</>
  )
}

export default TodoShowPage