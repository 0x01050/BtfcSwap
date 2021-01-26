import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody } from '@windmill/react-ui'
import CountUp from 'react-countup'

import StakingModal from '../components/Modals/StakingModal'
import PageTitle from '../components/Typography/PageTitle'
import WavesConfig from '../config/waves'
import stakingContainer from '../redux/containers/staking'
import walletContainer from '../redux/containers/wallet'
import WalletUtils from '../utils/waves'

function Staking({walletState, walletActions, stakingState, stakingActions}) {
  const [ modal, setModal ] = useState({
    isOpen: false,
    title: '',
    maximum: 0,
    callback: null
  })

  useEffect(() => {
    let interval = -1
    if(!walletState.locked && stakingState.approved && stakingState.staked > 0) {
      interval = setInterval(() => {
        stakingActions.earn(Math.random() / 1000)
      }, 10000)
    }
  
    return () => {
      if(interval > -1) {
        clearInterval(interval)
      }
    }
  }, [walletState.locked, stakingState.approved, stakingState.staked, stakingActions])

  const deposit = () => {
    setModal({
      isOpen: true,
      title: 'Deposit',
      maximum: walletState.waves_balance,
      callback: stakingActions.deposit
    })
  }
  const withdraw = () => {
    setModal({
      isOpen: true,
      title: 'Withdraw',
      maximum: stakingState.staked,
      callback: stakingActions.withdraw
    })
  }
  const settle = () => {
    stakingActions.settle(stakingState.earned)
    // stakingActions.settle(Math.random() / 10000)
  }
  const closeModal = (amount) => {
    if(amount && modal.callback) {
      modal.callback(amount)
    }
    setModal({
      isOpen: false
    })
  }

  return (
    <>
      <PageTitle>Earn BTFC by WAVES</PageTitle>
      {
        walletState.locked ?
          <Button size="small" className="px-5 py-2" onClick={() => WalletUtils.unlockWallet(walletActions.unlockWallet)}>
            Unlock Wallet
          </Button>
          
        :
          <div className="grid mt-8 gap-6 xl:grid-cols-2">
            <Card>
              <CardBody className="flex w-full flex-col">
                <div className="border-b-2 mb-2 pb-5 text-center">
                  <CountUp end={stakingState.earned} separator=", " decimals={WavesConfig.TOKEN_DECIMALS} duration={0.5}
                    className="text-3xl font-bold text-gray-700 dark:text-gray-200"/>
                  <p className="mb-2 font-medium text-purple-600 dark:text-purple-400">BTFC Earned</p>
                </div>
                <div className="flex justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                  <Button size="small" className="px-5 py-2" disabled={!stakingState.approved} onClick={settle}>
                    Settle
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex w-full flex-col">
                <div className="border-b-2 mb-2 pb-5 text-center">
                  <CountUp end={stakingState.staked} separator=", " decimals={WavesConfig.WAVES_DECIMALS} duration={0.5}
                    className="text-3xl font-bold text-gray-700 dark:text-gray-200"/>
                  <p className="mb-2 font-medium text-purple-600 dark:text-purple-400">WAVES Staked</p>
                </div>
                <div className="flex justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                  {
                    stakingState.approved ?
                      <div className="grid gap-6 grid-cols-2">
                        <Button size="small" className="px-5 py-2" onClick={deposit}>
                          +
                        </Button>
                        <Button size="small" className="px-5 py-2" onClick={withdraw}>
                          -
                        </Button>
                      </div>
                    :
                      <Button size="small" className="px-5 py-2" onClick={() => stakingActions.approve()}>
                        Approve
                      </Button>
                  }
                  
                </div>
              </CardBody>
            </Card>
          </div>
      }
      <StakingModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        maximum={modal.maximum}
      />
    </>
  )
}

export default stakingContainer(walletContainer(Staking))
