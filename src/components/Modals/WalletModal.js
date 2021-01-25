import React from 'react'
import CountUp from 'react-countup';
import { Modal, ModalBody, Button } from '@windmill/react-ui'
import walletContainer from '../../redux/containers/wallet'
import WavesConfig from '../../config/waves'

function WalletModal({isOpen, onClose, walletState}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody className="text-center">
        <p className="text-xl font-semibold mb-8">My Account</p>
        <CountUp end={walletState.balance} decimals={WavesConfig.TOKEN_DECIMALS} duration={0.5}
          className="text-3xl font-bold text-gray-700 dark:text-gray-200"/>
        <p className="mt-4">BTFC Balance</p>
        <div className="flex flex-col items-center justify-end space-x-0 space-y-4 w-full mt-8">
          <Button className="w-full" layout="outline" onClick={() => onClose(1)}>
            View on WavesExplorer
          </Button>
          <Button className="w-full" layout="outline" onClick={() => onClose(2)}>
            Sign out
          </Button>
          <Button className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}
export default walletContainer(WalletModal)