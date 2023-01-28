import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app'
import AuthProvide from '@/components/context/AuthContext';
import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvide>
        <Header/>
        <Component {...pageProps} />
      </AuthProvide>
    </>
  )
}
