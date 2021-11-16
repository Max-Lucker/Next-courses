import { useRouter } from 'next/dist/client/router'

import { KeyboardEvent, useState } from 'react'

import { SearchProps } from './Search.props'

import { Button, Input } from '../index'

import styles from './Search.module.css'
import cn from 'classnames'

import SearchIcon from './search.svg'

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      goToSearch()
    }
  }

  const goToSearch = () => {
    router.push({ pathname: '/search', query: { q: search } })
  }

  return (
    <form className={cn(className, styles.search)} {...props} role="search">
      <Input className={styles.input} placeholder="search..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
      <Button className={styles.button} aria-label="поиск по сайту" appearance="primary" onClick={goToSearch}>
        <SearchIcon />
      </Button>
    </form>
  )
}
