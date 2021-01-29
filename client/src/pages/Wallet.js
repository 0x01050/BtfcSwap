import React from 'react'
import Avatar from 'react-avatar'
import CountUp from 'react-countup'
import { Button, Card, CardBody } from '@windmill/react-ui'

import PageTitle from '../components/Typography/PageTitle'
import walletContainer from '../redux/containers/wallet'
import WavesUtils from '../utils/waves'

function Wallet({walletState, walletActions}) {
  return (
    <>
      <PageTitle>Wallet</PageTitle>
      {
        walletState.locked ?
          <Button size="small" className="px-5 py-2" onClick={() => WavesUtils.unlockWallet(walletActions.unlockWallet, walletActions.lockWallet)}>
            Unlock Wallet
          </Button>
          
        :
          <div className='grid mt-8 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
              walletState.balances.map((asset, index) => {
                return (
                  <Card key={index}>
                    <CardBody className='flex w-full flex-col'>
                      <div className='mb-2 pb-5 flex items-center'>
                        <Avatar name={asset.assetName} size={32} round={true} />
                        <span className='dark:text-white font-semibold text-2xl ml-4'>{asset.assetName}</span>
                      </div>
                      <CountUp end={asset.amount / (10 ** asset.decimals)} separator=', ' decimals={asset.decimals} duration={0.5}
                        className='text-xl font-semibold text-gray-700 dark:text-gray-200'/>
                    </CardBody>
                  </Card>
                )
              })
            }
          </div>
      }
    </>
  )
}

export default walletContainer(Wallet)
