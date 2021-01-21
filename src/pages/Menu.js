import React from 'react'

import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon'
import PageTitle from '../components/Typography/PageTitle'
import { PeopleIcon } from '../icons'
import walletContainer from '../redux/containers/wallet';

function Menu({walletState, walletActions}) {

  return (
    <>
      <PageTitle>Menu</PageTitle>
      <div className="grid mt-8">
        {
          walletState.locked ?
            <InfoCard title="Locked">
              <RoundIcon
                icon={PeopleIcon}
                iconColorClass="text-orange-500 dark:text-orange-100"
                bgColorClass="bg-orange-100 dark:bg-orange-500"
                className="mr-4"
              />
            </InfoCard>
          :
            <InfoCard title={walletState.address} value={walletState.balance}>
              <RoundIcon
                icon={PeopleIcon}
                iconColorClass="text-orange-500 dark:text-orange-100"
                bgColorClass="bg-orange-100 dark:bg-orange-500"
                className="mr-4"
              />
            </InfoCard>
        }
      </div>
    </>
  )
}

export default walletContainer(Menu)
