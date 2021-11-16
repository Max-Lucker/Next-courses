import { GetStaticProps } from 'next'
import React, { useState } from 'react'

import axios from 'axios'

import { API } from '../helpers/api'

import { HTag, Button, PTag, Tag, Rating, Input, Textarea, Search, Product } from '../components'
import { withLayout } from '../Layout/Layout'

import { MenuItem } from '../interfaces/menu.interface'

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4)

  return (
    <>
      <HTag tag="h1">a</HTag>
      <Button appearance="primary" className="sfaa" arrow="right">
        plus
      </Button>
      <Button appearance="ghost" arrow="down">
        minus
      </Button>
      <PTag size="s">ssss</PTag>
      <PTag size="m">mmmm</PTag>
      <PTag size="l">llll</PTag>
      <Tag size="s" color="ghost">
        ghost
      </Tag>
      <Tag size="m" color="red">
        red
      </Tag>
      <Tag size="s" color="primary">
        primary
      </Tag>
      <Tag size="m" color="green">
        green
      </Tag>
      <Tag size="s" color="gray">
        gray
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <Input placeholder="test" />
      <Textarea placeholder="text" />
      <Search />
    </>
  )
}

export default withLayout(Home)

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
