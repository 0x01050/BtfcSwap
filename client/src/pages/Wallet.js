import React from 'react'
import CountUp from 'react-countup'
import { Button, Card, CardBody } from '@windmill/react-ui'

import BTFCLogo from '../assets/img/btfc.png'
import WAVELogo from '../assets/img/waves.svg'
import PageTitle from '../components/Typography/PageTitle'
import walletContainer from '../redux/containers/wallet'
import WavesUtils from '../utils/waves'
import WavesConfig from '../config/waves'

function Wallet({walletState, walletActions}) {
  return (
    <>
      <PageTitle>Wallet</PageTitle>
      {
        walletState.locked ?
          <div className="flex justify-center">
            <Button size="small" className="px-5 py-2" onClick={() => WavesUtils.unlockWallet(walletActions.unlockWallet, walletActions.lockWallet)}>
              Unlock Wallet
            </Button>
          </div>
        :
          <div className='grid mt-8 gap-6 md:grid-cols-2'>
            <Card>
              <CardBody className='flex w-full flex-col'>
                <div className='mb-2 pb-5 flex items-center'>
                  <img
                    aria-hidden="true"
                    className="object-cover w-full h-full"
                    src={WAVELogo}
                    style={{width: 32, height: 32}}
                    alt="W"
                  />
                  <span className='dark:text-white font-semibold text-2xl ml-4'>WAVES</span>
                </div>
                <CountUp end={walletState.waves_balance} separator=', ' decimals={8} duration={0.5}
                  className='text-xl font-semibold text-gray-700 dark:text-gray-200'/>
              </CardBody>
            </Card>
            <Card>
              <CardBody className='flex w-full flex-col'>
                <div className='mb-2 pb-5 flex items-center'>
                  <img
                    aria-hidden="true"
                    className="object-cover w-full h-full"
                    src={BTFCLogo}
                    style={{width: 32, height: 32}}
                    alt="B"
                  />
                  <span className='dark:text-white font-semibold text-2xl ml-4'>BTFC</span>
                </div>
                <CountUp end={walletState.btfc_balance} separator=', ' decimals={WavesConfig.TOKEN_DECIMALS} duration={0.5}
                  className='text-xl font-semibold text-gray-700 dark:text-gray-200'/>
              </CardBody>
            </Card>
          </div>
      }
    </>
  )
}

export default walletContainer(Wallet)
