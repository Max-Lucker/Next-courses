import React, { FunctionComponent, KeyboardEvent, useRef, useState } from 'react'

import { AppContextProvider, IAppContext } from '../context/app.context'

import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'

import { Up } from '../components'

import { LayoutProps } from './Layout.props'

import styles from './Layout.module.css'
import cn from 'classnames'

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipedLinkDisplayed, setIsSkipedLinkDisplayed] = useState<boolean>(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault()
      bodyRef.current?.focus()
    }
    setIsSkipedLinkDisplayed(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        tabIndex={0}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipedLinkDisplayed,
        })}
        onFocus={() => setIsSkipedLinkDisplayed(true)}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main tabIndex={0} className={styles.body} ref={bodyRef} role="main">
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    )
  }
}
