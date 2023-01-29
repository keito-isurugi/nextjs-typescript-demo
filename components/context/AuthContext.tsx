import axios from "axios";
import React, {useContext, createContext, useState, ReactNode, useEffect} from "react"
import { client, postMethod } from '@/lib/axios'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { NextPageContext } from "next";
import { useRouter } from 'next/router'

export const authContext = createContext(null)
// type Auth = {
// 	user: null,
// 	isFetched: boolean,
// 	register: (registerData: any) => Promise<void>,
// 	signin: (loginData: any) => Promise<void>,
// 	signout: () => Promise<void>,
// 	saveProfile: (formData: any) => Promise<...>,
// }
const AuthProvide = ({children}) => {
  const auth = useAuthProvide();
	
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}
export default AuthProvide

export const useAuth = () => {
  return useContext(authContext)
}

type User = {
	id: number,
	name: string,
	email: string,
	password: string,
	created_at: Date,
	updated_at: Date,
}

const useAuthProvide = () => {
  const [user, setUser] = useState<User | null>(null);
	const router = useRouter()

  const register = async (registerData) => {
    console.log('regisetr!')
    console.log(registerData)
    return await axios.post('/register', registerData).then((res) => {
			console.log('api-register')
			console.log(res)
				axios.get('api/user').then((res) => {
				console.log('api-user')
				console.log(res.data)
				setUser(res.data)
			})
		.catch((error) => {
				console.log('エラー')
				console.log(error)
			})
		})
	}

	// ログイン
  const signin = async (loginData) => {
		// email, passwordをサーバーに渡してトークンをCookieにセット
    try {
      const res = await postMethod('/api/login', loginData);
      console.log('signin-try')
			setTokenInCookie(res.data)
    } catch (error) {
      console.log('signin-error')
      console.log(error)
      throw error;
    }

		// Cookieのトークンをヘッダーにセットしサーバーに渡す、
		// トークンから復元されたuser_idに紐づくユーザー情報をセット
		const cookie = parseCookies();
		return postMethod(
			'/api/auth_user',
			"",
			{ headers: { Authorization: cookie.accessToken } }
			).then((res) => {
				console.log('login')
				setUser(res.data)
			}).catch((error) => {
				console.log('login-error')
				console.log(error)
				setUser(null)
			})
  }

	// CooKieにトークンをセット
	function setTokenInCookie(token: string, ctx?: NextPageContext) {
		setCookie(null, 'accessToken', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
	}

	// Cookieのトークンとユーザー情報を削除
  const signout = () => {
		destroyCookie(null, 'accessToken')
		setUser(null)
		router.push(`/login`)
  }

	// Cookieのトークンをヘッダーにセットしサーバーに渡す、
	// トークンから復元されたuser_idに紐づくユーザー情報をセット
  useEffect(() => {
			const cookie = parseCookies();
			postMethod(
				'/api/auth_user',
				"",
				{ headers: { Authorization: cookie.accessToken } }
			)
		.then((res) => {
      console.log('api-user')
      setUser(res.data)
    }).catch((error) => {
      console.log('api-user-error')
      setUser(null)
    })
  }, [])

  return {
    user,
    register,
    signin,
    signout,
  }
}
