import React, {useEffect, useState} from 'react'

import HomeCard from '../components/Cards/HomeCard'
import WavesConfig from '../config/waves'
import stakingContainer from '../redux/containers/staking'
import walletContainer from '../redux/containers/wallet'
import ApiUtils from '../utils/api'

function Home({walletState, stakingState}) {

  const [ price, setPrice ] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      ApiUtils.getPrice(setPrice)
    }, 1000)
  
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div className="grid mt-8 gap-6 xl:grid-cols-2">
          <HomeCard
            title="Your BTFC Balance" value={walletState.locked ? "Locked" : walletState.btfc_balance} decimals={WavesConfig.TOKEN_DECIMALS}
            extraTitle="Earned" extraValue={stakingState.earned} extraOption="CountUp" extraDecimals={WavesConfig.TOKEN_DECIMALS}
          />
          <HomeCard
            title="Total BTFC Supply" value={walletState.locked ? "Locked" : 21000000}
            extraTitle="BTFC Price" extraValue={price} extraOption="string"
          />
      </div>
    </>
  )
}

export default stakingContainer(walletContainer(Home))
