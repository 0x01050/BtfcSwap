import React, {useEffect, useState} from 'react'
import { Button } from '@windmill/react-ui'

import BTFCLogo from '../assets/img/btfc.png'
import PageTitle from '../components/Typography/PageTitle'
import walletContainer from '../redux/containers/wallet'
import ApiUtils from '../utils/api'
import WavesUtils from '../utils/waves'

function Faucet({walletState, walletActions}) {
  const [lastFaucet, setLastFaucet] = useState(null)
  const msToTime = (duration) => {
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
  
    return hours + ":" + minutes + ":" + seconds
  }
  useEffect(() => {
    let interval = -1
    if(!walletState.locked) {
      interval = setInterval(() => {
        ApiUtils.getFaucet(walletState.address, setLastFaucet)
      }, 1000)
    }
  
    return () => {
      if(interval > -1) {
        clearInterval(interval)
        setLastFaucet(null)
      }
    }
  }, [walletState.locked, walletState.address])
  
  const getFaucetButtonDisabled = () => {
    if(lastFaucet === null) {
      return true
    }
    if(lastFaucet) {
      const now = new Date()
      const prev = new Date(lastFaucet)
      const diff = (now - prev) / (1000 * 3600 * 24)
      if(diff < 1) {
        return true
      }
    }
    return false
  }
  
  const getFaucetButtonTitle = () => {
    if(lastFaucet) {
      const now = new Date()
      const prev = new Date(lastFaucet)
      let diff = (now - prev) / (1000 * 3600 * 24)
      if(diff < 1) {
        diff = (1000 * 3600 * 24) - (now - prev)
        return 'Calim in ' + msToTime(diff)
      }
    }
    return 'Calim'
  }

  return (
    <>
      <PageTitle>Faucet</PageTitle>
      <div className="mt-4 mb-8 flex flex-col items-center">
        <img
          aria-hidden="true"
          className="object-cover w-full h-full"
          src={BTFCLogo}
          style={{width: 128, height: 128}}
          alt="B"
        />
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold text-gray-400 dark:text-gray-600">BTFC Faucet</span>
          <span className="font-bold dark:text-white">0.00025000 BTFC</span>
          <span className="text-xs dark:text-white">Every 24 Hours</span>
        </div>
      </div>
      {
        walletState.locked ?
          <Button size="small" className="px-5 py-2" onClick={() => WavesUtils.unlockWallet(walletActions.unlockWallet, walletActions.lockWallet)}>
            Unlock Wallet
          </Button>
          
        :
          <Button
            size="small"
            className="px-5 py-2 mt-8"
            onClick={() => WavesUtils.faucet(walletState.address)}
            disabled={getFaucetButtonDisabled()}
          >
            {getFaucetButtonTitle()}
          </Button>
      }
    </>
  )
}

export default walletContainer(Faucet)
