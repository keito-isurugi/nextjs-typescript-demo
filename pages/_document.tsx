import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
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
