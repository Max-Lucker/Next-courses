import { withLayout } from '../Layout/Layout'

import { HTag } from '../components/index'

export function Error404(): JSX.Element {
  return (
    <>
      <HTag tag="h1">Ошибка 404</HTag>
    </>
  )
}

export default withLayout(Error404)
