import { useContext } from 'react'
import { FarmsPageLayout, FarmsContext } from 'views/Farms'
import FarmCard from 'views/Farms/components/FarmCard/FarmCard'
import { getDisplayApr } from 'views/Farms/components/getDisplayApr'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useWeb3React } from '@web3-react/core'
import ProxyFarmContainer from 'views/Farms/components/YieldBooster/components/ProxyFarmContainer'

const FarmsPage = () => {
  const { account } = useWeb3React()
  const { chosenFarmsMemoized } = useContext(FarmsContext)
  const cakePrice = usePriceCakeBusd()

  return (
    <>
      {chosenFarmsMemoized.map((farm) =>
        farm.boosted ? (
          <ProxyFarmContainer {...farm}>
            {(finalFarm) => (
              <FarmCard
                key={finalFarm.pid}
                farm={finalFarm}
                displayApr={getDisplayApr(finalFarm.apr, finalFarm.lpRewardsApr)}
                cakePrice={cakePrice}
                account={account}
                removed={false}
                originalLiquidity={farm?.liquidity}
              />
            )}
          </ProxyFarmContainer>
        ) : (
          <FarmCard
            key={farm.pid}
            farm={farm}
            displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
            cakePrice={cakePrice}
            account={account}
            removed={false}
          />
        ),
      )}
    </>
  )
}

FarmsPage.Layout = FarmsPageLayout

export default FarmsPage
