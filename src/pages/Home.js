import React from 'react'

import HomeCard from '../components/Cards/HomeCard'
import WavesConfig from '../config/waves'
import walletContainer from '../redux/containers/wallet';

function Home({walletState, walletActions}) {

  return (
    <>
      <div className="grid mt-8 gap-6 xl:grid-cols-2">
          <HomeCard
            title="Your BTFC Balance" value={walletState.locked ? "Locked" : walletState.balance} decimals={WavesConfig.TOKEN_DECIMALS}
            extraTitle="Pending harvest" extraValue="0.000 BTFC"
          />
          <HomeCard
            title="Total BTFC Supply" value={walletState.locked ? "Locked" : 21000000}
            extraTitle="New rewards per block" extraValue="60 BTFC"
          />
      </div>
    </>
  )
}

export default walletContainer(Home)
