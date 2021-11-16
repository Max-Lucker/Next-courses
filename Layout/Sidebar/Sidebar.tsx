import { SidebarProps } from './Sidebar.props'

import { Menu } from '../Menu/Manu'
import { Search } from '../../components'

import styles from './Sidebar.module.css'
import cn from 'classnames'

import Logo from '../logo.svg'

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo />
      <Search />
      <Menu></Menu>
    </div>
  )
}
