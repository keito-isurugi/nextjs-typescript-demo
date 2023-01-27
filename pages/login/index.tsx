import { useForm } from 'react-hook-form'
import { postMethod } from '@/lib/axios'
import toast, { Toaster } from 'react-hot-toast';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { NextPageContext } from 'next';

type login = {
	email: string,
	password: string
}

const notify = () => toast('Here is your toast.');

const toastDemo = () => {
	return toast.custom((t) => (
		<div
			className={`${
				t.visible ? 'animate-enter' : 'animate-leave'
			} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
		>
			<div className="flex-1 w-0 p-4">
				<div className="flex items-start">
					<div className="flex-shrink-0 pt-0.5">
						<img
							className="h-10 w-10 rounded-full"
							src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
							alt=""
						/>
					</div>
					<div className="ml-3 flex-1">
						<p className="text-sm font-medium text-gray-900">
							Emilia Gates
						</p>
						<p className="mt-1 text-sm text-gray-500">
							Sure! 8:30pm works great!
						</p>
					</div>
				</div>
			</div>
			<div className="flex border-l border-gray-200">
				<button
					onClick={() => toast.dismiss(t.id)}
					className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					Close
				</button>
			</div>
		</div>
	))
}

export default function Login() {
	const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm();

	const onSubmit = async (data) => {
		await postMethod(
			'/api/login',
			data
		)
		.then((res) => {
			console.log("test")
			console.log(res.data)
			setTokenInCookie(res.data)
		})
		.catch(error => {
			console.log(error)
		})
	}

	const auth = async () => {
		const cookie = parseCookies();
		await postMethod(
			'/api/auth',
			"",
			{ headers: { Authorization: cookie.accessToken } }
		)
		.then((res) => {
			console.log(res.data)
		})
		.catch(error => {
			console.log(error)
		})
	}


	function viewCookie() {
		const cookie = parseCookies();
    console.log(cookie.accessToken)
	}


	function setTokenInCookie(token: string, ctx?: NextPageContext) {
		setCookie(null, 'accessToken', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
	}
	return (
		<>
		<button onClick={toastDemo}>Make me a toast</button>
		<br />
		<button onClick={viewCookie}>Cookie表示</button>
		<br />
		<button onClick={auth}>auth</button>
		<br />
		{/* <button onClick={handleSetCookie}>Cookieセット</button> */}
		{/* <br /> */}
		<Toaster />
		<section className="">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
								ログイン
						</h1>
						<form className="space-y-4 md:space-y-6" action="#" onSubmit={e => {clearErrors(); handleSubmit(onSubmit)(e)}}>
							<div>
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">メールアドレス</label>
								<input 
									type="email" 
									id="email" 
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
									placeholder="name@company.com" 
									{...register('email', {
										required: '入力してください'
									})}
								/>
							</div>
							<div>
								<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">パスワード</label>
								<input 
									type="password" 
									id="password" 
									placeholder="••••••••" 
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
									{...register('password', {
										required: '入力してください'
									})}
									/>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required={false} />
										</div>
										<div className="ml-3 text-sm">
											<label htmlFor="remember" className="text-gray-500">ログイン情報を記憶する</label>
										</div>
									</div>
									<a href="#" className="text-sm font-medium text-blue-600 hover:underline">パスワードを忘れた場合</a>
								</div>
								<button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ログイン</button>
								<p className="text-sm font-light text-gray-500">
										アカウント登録がまだの場合はこちら <a href="#" className="font-medium text-blue-600 hover:underline">新規登録</a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}