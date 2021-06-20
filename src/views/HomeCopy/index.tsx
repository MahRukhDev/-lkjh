import React from 'react';
import styled from 'styled-components'
import { Heading, Text } from '@rug-zombie-libs/uikit'
import { useTranslation } from '../../contexts/Localization'
import Page from '../../components/layout/Page'
import Table from './components/Table'
import './HomeCopy.Styles.css'
import tableData from './data';

const Hero = styled.div`
  align-items: center;
  /* background-image: url('/images/pan-bg-mobile.svg'); */
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: none;
    /* background-image: url('https://storage.googleapis.com/rug-zombie/running-zombie-2.png'), url('https://storage.googleapis.com/rug-zombie/running-zombie-1.png'); */
    background-position: left center, right center;
    background-size: 207px 142px, 207px 142px;
    height: 165px;
    padding-top: 0;
  }
`

const ImageURL = "https://storage.googleapis.com/rug-zombie/rug-zombie-home.png";

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          <img alt="" src={ImageURL} style={{ width: "250px" }} />
          <Text>{t('Bringing your rugged tokens back from the dead.')}</Text>
        </Heading>
      </Hero>
      <div>
        {tableData.map((data) => {
          return <Table details={data} key={data.id} />
        })}
      </div>
    </Page>
  )
}

export default Home
