import React, {useState} from 'react'
import { Button, Label } from '@windmill/react-ui'

import BTFCLogo from '../assets/img/btfc.png'
import Switch from '../assets/img/switch.svg'
import WAVELogo from '../assets/img/waves.svg'
import PageTitle from '../components/Typography/PageTitle'
import walletContainer from '../redux/containers/wallet'
import WavesUtils from '../utils/waves'

function Swap({walletState, walletActions}) {
  const [fromAsset, setFromAsset] = useState('WAVES')
  const ChangeAssets = () => {
    if(fromAsset === 'WAVES')
      setFromAsset('BTFC')
    else
      setFromAsset('WAVES')
  }

  const [amount, setAmount] = useState('')
  const updateAmount = (e) => {
    if(e.target.validity.valid) {
      setAmount(e.target.value)
    }
  }
  const setMaxAmount = () => {
    setAmount(getMaxAmount())
  }
  const getMaxAmount = () => {
    if(fromAsset === 'WAVES')
      return walletState.waves_balance
    return walletState.btfc_balance
  }
  const checkValidate = () => {
    try {
      const swapAmount = parseFloat(amount)
      if(isNaN(swapAmount) || swapAmount <= 0 || swapAmount > getMaxAmount())
        return true
      return false
    } catch(e) {
      return true
    }
  }
  const Swap = () => {
    try {
      const swapAmount = parseFloat(amount)
      if(fromAsset === 'WAVES')
        WavesUtils.FromWavesToBtfc(swapAmount)
      else
        WavesUtils.FromBtfcToWaves(swapAmount)
    } catch(e) {
      return true
    }
  }

  return (
    <>
      <PageTitle>Swap</PageTitle>
      {
        walletState.locked ?
          <Button size="small" className="px-5 py-2" onClick={() => WavesUtils.unlockWallet(walletActions.unlockWallet, walletActions.lockWallet)}>
            Unlock Wallet
          </Button>
        :
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full"
                src={fromAsset === 'WAVES' ? WAVELogo : BTFCLogo}
                style={{width: 128, height: 128}}
                alt="W"
              />
              <img
                aria-hidden="true"
                className="object-cover w-full h-full cursor-pointer"
                src={Switch}
                style={{width: 32, height: 32, margin: '0 128px'}}
                alt="<->"
                onClick={ChangeAssets}
              />
              <img
                aria-hidden="true"
                className="object-cover w-full h-full"
                src={fromAsset === 'WAVES' ? BTFCLogo : WAVELogo}
                style={{width: 128, height: 128}}
                alt="B"
              />
            </div>
            <Label className='mt-4'>
              <span>Swap Amount</span>
              <div className='relative text-gray-500'>
                <input
                  className='block w-full pr-32 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus-within:text-purple-600 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input'
                  pattern='[+-]?([0-9]*[.])?[0-9]*'
                  placeholder='Enter amount'
                  value={amount}
                  onChange={updateAmount}
                />
                <div className='absolute inset-y-0 right-0 flex items-center mr-20 pointer-events-none'>
                  {fromAsset}
                </div>
                <button
                  className='absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'
                  onClick={setMaxAmount}
                >
                  MAX
                </button>
              </div>
            </Label>

            <Button
              className='w-full mt-4'
              disabled={checkValidate()}
              onClick={Swap}
            >
              Swap
            </Button>
          </div>
        }
    </>
  )
}

export default walletContainer(Swap)
