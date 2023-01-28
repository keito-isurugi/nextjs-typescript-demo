import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { client, postMethod } from '@/lib/axios'
import { useAuth } from '@/components/context/AuthContext';
import { Button } from '@mui/material'

const Header = () => {
  const auth = useAuth();
  console.log("header", auth?.user)
  return (
		<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
			<Link href="/" className="flex items-center flex-shrink-0 text-white mr-6">
				<svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
				<span className="font-semibold text-xl tracking-tight">Next.js Demo</span>
			</Link>
			<div className="block lg:hidden">
				<button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
				</button>
			</div>
			<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
				{auth?.user !== null &&
					<div className="text-sm lg:flex-grow">
						<a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
							foo
						</a>
						<a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
							hoge
						</a>
						<a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
							bar
						</a>
					</div>
				 }
				<div className='flex gap-10'>
					<p className="text-white">
						{auth?.user?.name}
					</p>
					{auth?.user ? 
						<Button 
							className='bg-red-800 hover:bg-red-400 text-white font-semibold'
							onClick={() => auth?.signout()}
						>ログアウト</Button>
					: ""}
				</div>
				</div>
		</nav>
  )
}

export default Header