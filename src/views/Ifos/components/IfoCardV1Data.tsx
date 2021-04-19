import React from 'react'
import useGetPublicIfoV1Data from 'hooks/ifo/v1/useGetPublicIfoData'
import useGetWalletIfoV1Data from 'hooks/ifo/v1/useGetWalletIfoData'
import { Ifo } from 'config/constants/types'
import IfoV1Card from './IfoV1Card'

interface Props {
  ifo: Ifo
}

const IfoCardV1Data: React.FC<Props> = ({ ifo }) => {
  const publicIfoData = useGetPublicIfoV1Data(ifo)
  const walletIfoData = useGetWalletIfoV1Data(ifo)

  return <IfoV1Card ifo={ifo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} />
}

export default IfoCardV1Data
