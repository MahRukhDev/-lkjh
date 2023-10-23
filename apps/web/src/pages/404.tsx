import { NotFound } from '@pancakeswap/uikit'
import { NextSeo } from 'next-seo'

const NotFoundPage = () => (
  <NotFound>
    <NextSeo title="404" />
  </NotFound>
)

NotFoundPage.chains = []

export default NotFoundPage
