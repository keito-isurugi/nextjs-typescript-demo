import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app'
import AuthProvide from '@/components/context/AuthContext';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvide>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvide>
    </>
  )
}
