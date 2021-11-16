import React, { useEffect, useReducer } from 'react'

import { TopPageComponentProps } from '../TopPageComponent/TopPageComponent.props'
import { SortEnum } from '../../components/Sort/Sort.props'

import { HTag, Tag, HhData, Advantages, Sort, Product } from '../../components'

import { SortReducer } from './sort.reducer'

import { TopLevelCategory } from '../../interfaces/page.interface'

import styles from './TopPageComponent.module.css'

import { useReducedMotion } from 'framer-motion'

export const TopPagecomponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(SortReducer, { products, sort: SortEnum.Rating })
  const shouldReduceMotion = useReducedMotion()

  const setSort = (sort: SortEnum): void => {
    dispatchSort({ type: sort })
  }

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products })
  }, [products])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <HTag tag="h1">{page.title}</HTag>
        {products && (
          <Tag color="gray" aria-label={products.length + 'элементов'} size="m">
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts && sortedProducts.map((p) => <Product role="listitem" layout={shouldReduceMotion ? false : true} key={p._id} product={p} />)}
      </div>
      <div className={styles.hhTitle}>
        <HTag tag="h2">Вакансии - {page.category}</HTag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <HTag tag="h2">Преимущства</HTag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
      <HTag tag="h2">Получаемые навыки</HTag>
      {page.tags.map((t) => (
        <Tag key={t} color="primary">
          {t}
        </Tag>
      ))}
    </div>
  )
}
