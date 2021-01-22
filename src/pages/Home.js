import React from 'react'

import HomeCard from '../components/Cards/HomeCard'
import walletContainer from '../redux/containers/wallet';

function Home({walletState, walletActions}) {

  return (
    <>
      <div className="grid mt-8 gap-6 xl:grid-cols-2">
          <HomeCard
            title="Your SUSHI Balance" value={walletState.locked ? "Locked" : walletState.balance} decimals={8}
            extraTitle="Pending harvest" extraValue="0.000 SUSHI"
          />
          <HomeCard
            title="Total SUSHI Supply" value={walletState.locked ? "Locked" : 183802607}
            extraTitle="New rewards per block" extraValue="60 SUSHI"
          />
      </div>
    </>
  )
}

export default walletContainer(Home)
