import React, {useEffect, useState} from 'react'
import { Button, Input, Label, Modal, ModalBody, Textarea } from '@windmill/react-ui'
import WAValidator from 'multicoin-address-validator'
import walletContainer from '../../redux/containers/wallet'
import WavesUtils from '../../utils/waves'

function SendModal({isOpen, onClose, walletState}) {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [hasDesc, setHasDesc] = useState(false)
  const [description, setDescription] = useState('')
  const updateAmount = (e) => {
    if(e.target.validity.valid) {
      setAmount(e.target.value)
    }
  }
  const setMaxAmount = () => {
    setAmount(walletState.btfc_balance)
  }
  const checkValidate = () => {
    try {
      const sendAmount = parseFloat(amount)
      if(isNaN(sendAmount) || sendAmount <= 0 || sendAmount > walletState.btfc_balance)
        return true
      if(!WAValidator.validate(address, 'waves', 'testnet'))
        return true
      return false
    } catch(e) {
      return true
    }
  }
  const sendBTFC = () => {
    WavesUtils.send(address, amount, hasDesc, description)
    onClose()
  }
  useEffect(() => {
    setAddress('')
    setAmount('')
    setHasDesc(false)
    setDescription('')
  }, [isOpen])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <p className='text-xl font-semibold mb-8'>Send BTFC</p>
        <Label>
          <span>Recipient</span>
          <Input
            className='mt-1'
            placeholder='Paste Waves address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Label>
        <Label className='mt-4'>
          <span>Amount</span>
          <div className='relative text-gray-500'>
            <input
              className='block w-full pr-32 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus-within:text-purple-600 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input'
              pattern='[+-]?([0-9]*[.])?[0-9]*'
              placeholder='Enter amount'
              value={amount}
              onChange={updateAmount}
            />
            <div className='absolute inset-y-0 right-0 flex items-center mr-20 pointer-events-none'>
              BTFC
            </div>
            <button
              className='absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'
              onClick={setMaxAmount}
            >
              MAX
            </button>
          </div>
        </Label>
        <div className='text-right text-xs mt-2'>
          Transaction Fee
          <span className='text-sm font-semibold dark:text-white ml-2'>0.001 WAVES</span>
        </div>
        <Label className='mt-4' check>
          <Input type='checkbox' checked={hasDesc} onChange={(e) => setHasDesc(e.target.checked)} />
          <span className='ml-2'>
            Add Description
          </span>
        </Label>
        <Label className='mt-4' style={{display: hasDesc ? 'block' : 'none'}}>
          <span>Description</span>
          <Textarea
            className='mt-1'
            placeholder='Write a message' 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Label>
        <Button
          className='w-full mt-4'
          disabled={checkValidate()}
          onClick={sendBTFC}
        >
          Continue
        </Button>
      </ModalBody>
    </Modal>
  )
}
export default walletContainer(SendModal)