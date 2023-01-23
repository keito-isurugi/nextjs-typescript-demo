import Link from 'next/link'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react'
import { client, postMethod } from '@/lib/axios'

export default function Home() {
	const router = useRouter()
	const [todos, setTodos] = useState([])
	const [addTodoData, setAddTodoData] = useState({title: "", content: ""})
	
	useEffect(() => {
		fetchTodos()
	}, [])

	const changeTodoData = (e: any) => {
		if(e.target.id === "title") {
			setAddTodoData(addTodoData => ({...addTodoData, title: e.target.value}))
		} else if(e.target.id === "content") {
			setAddTodoData(addTodoData => ({...addTodoData, content: e.target.value}))
		}
	}

	const fetchTodos = () => {
		client
			.get('/api/todo/list')
			.then((res) => {
				console.log(res.data)
				setTodos(res.data)
			})
			.catch(error => {
					console.error(error)
			})
	}

	const registerTodo = () => {
		postMethod(
			'/api/todo/register', 
			addTodoData, 
		)
		.then((res) => {
			console.log("登録しました");
			setAddTodoData({title: "", content: ""})
			fetchTodos()
		})
		.catch((error) => {
			console.log(error);
		});
	}
	const deleteTodo = (id: number) => {
		console.log(id)
		postMethod(
			'/api/todo/delete', 
			{id: id},
		)
		.then((res) => {
			console.log("削除しました");
			setAddTodoData({title: "", content: ""})
			fetchTodos()
		})
		.catch((error) => {
			console.log(error);
		});
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
						onClick={() => registerTodo()}
					>追加</button>
			</div>
			<div className='mb-6'>
				<h2 className="text-2xl font-bold mb-1">一覧</h2>
				<ul className='w-[762px]'>
					<li className='flex gap-4'>
						<p className='w-[5%]'>No</p>
						<p className='w-[15%]'>タイトル</p>
						<p className='w-[30%]'>内容</p>
					</li>
					{todos?.map((todo, index) => (
						<li key={todo.Id} className='flex gap-4 mb-3 items-center'>
							<p className='w-[5%]'>{todo.Id}</p>
							<p className='w-[15%]'>{todo.Title}</p>
							<p className='w-[30%]'>{todo.Content}</p>
							<button
								className="bg-green-600 hover:bg-green-500 text-white rounded px-4 py-2"
							onClick={() => router.push(`/todo/show/${todo.Id}`)}
							>詳細</button>
							<button
								className="bg-red-600 hover:bg-red-500 text-white rounded px-4 py-2"
								onClick={() => deleteTodo(todo.Id)}
							>削除</button>
						</li>
					))}
				</ul>
			</div>
			<Link className='text-xl text-blue-500 font-bold underline' href="/">トップに戻る</Link>
    </>
  )
}
