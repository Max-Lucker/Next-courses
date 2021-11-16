import { withLayout } from '../Layout/Layout'

import { HTag } from '../components/index'

function Error500(): JSX.Element {
  return (
    <>
      <HTag tag="h1">Ошибка 500</HTag>
    </>
  )
}

export default withLayout(Error500)
