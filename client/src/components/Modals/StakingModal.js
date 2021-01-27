import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, Button } from '@windmill/react-ui'
import walletContainer from '../../redux/containers/wallet'

function StakingModal({isOpen, onClose, title, maximum}) {
  const [amount, setAmount] = useState('')
  const updateAmount = (e) => {
    if(e.target.validity.valid) {
      setAmount(e.target.value)
    }
  }
  const setMaxAmount = () => {
    setAmount(maximum)
  }
  const makeTransaction = () => {
    if(!isNaN(amount) && amount > 0) {
      onClose(amount)
    }
  }
  useEffect(() => {
    setAmount('')
  }, [isOpen])
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalBody>
        <p className="text-center text-xl font-semibold mb-8">{title} BTFC</p>
        <p className="mt-4 text-right">{maximum} BTFC Available</p>
        <div className="relative text-gray-500 focus-within:text-purple-600">
          <input
            className="block w-full pr-32 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            pattern="[+-]?([0-9]*[.])?[0-9]*"
            placeholder="0"
            value={amount}
            onChange={updateAmount}
          />
          <div className="absolute inset-y-0 right-0 flex items-center mr-20 pointer-events-none">
            BTFC
          </div>
          <button
            className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            onClick={setMaxAmount}
          >
            MAX
          </button>
        </div>
        <div className="space-x-4 mt-8 grid grid-cols-2">
          <Button layout="outline" className="text-green-400 dark:text-green-200" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button layout="outline" className="text-yellow-400 dark:text-yellow-200" onClick={makeTransaction}>
            Confirm
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}
export default walletContainer(StakingModal)