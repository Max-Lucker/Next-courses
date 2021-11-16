import { GetStaticProps } from 'next'

import axios from 'axios'
import { API } from '../helpers/api'

import { withLayout } from '../Layout/Layout'

import { MenuItem } from '../interfaces/menu.interface'

function Search(): JSX.Element {
  return <>Search</>
}

export default withLayout(Search)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  })
  return {
    props: {
      menu,
      firstCategory,
    },
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
