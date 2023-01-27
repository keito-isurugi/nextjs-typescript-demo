import { Html, Head, Main, NextScript } from 'next/document'
import Header from '@/components/Header';

export default function Document() {
  return (
    <Html lang="en">
      {/* <Header/> */}
      <Head />
      <body>
        <div className='p-5'>
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
