import { AppProps } from 'next/dist/next-server/lib/router/router'
import Router from 'next/router'
import Head from 'next/head'

import React from 'react'

import ym from 'react-yandex-metrika'
import { YMInitializer } from 'react-yandex-metrika'

import '../styles/globals.css'

Router.events.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined') {
    ym('hit', url)
  }
})

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Best top</title>
        <link rel="icon" href="/favicon.ico"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}></meta>
        <meta property="og:locale" content="ru_RU"></meta>
      </Head>
      <YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version="2" />
      <Component {...pageProps}></Component>
    </>
  )
}

export default MyApp
