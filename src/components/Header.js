import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, WindmillContext } from '@windmill/react-ui'

import Waves from '@waves/signer'
import Provider from '@waves.exchange/provider-web'

import WavesSwapLogo from '../assets/img/wavesswap-logo.png'
import * as Icons from '../icons'
import {
  MoonIcon,
  SunIcon,
} from '../icons'
import walletContainer from '../redux/containers/wallet';
import routes from '../routes/sidebar'
import WavesConfig from '../config/waves'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function Header({walletState, walletActions, walletOpen}) {
  const { mode, toggleMode } = useContext(WindmillContext)

  const unlockWallet = async  () => {
    try {
      const waves = new Waves({NODE_URL: WavesConfig.NODE_URL})
      const provider = new Provider(WavesConfig.PROVIDER_URL)
      waves.setProvider(provider)
      const user = await waves.login()
      const balances = await waves.getBalance()
      var balance = 0
      balances.forEach(item => {
        if(item.assetId === WavesConfig.TOKEN_ID) {
          balance = item.amount / (10 ** WavesConfig.TOKEN_DECIMALS)
        }
      })
      walletActions.unlockWallet(user.address, balance)
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <header className="z-40 py-2 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-gray-800 dark:text-gray-200">
        <img
          aria-hidden="true"
          className="mr-8 object-cover hidden lg:block"
          style={{height: 64}}
          src={WavesSwapLogo}
          alt="Office"
        />
        
        <ul className="flex items-center flex-1 space-x-6">
          {routes.map((route) =>
            <li className="relative px-2 py-1" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-purple-600 dark:hover:text-purple-300"
                activeClassName="text-purple-600 dark:text-purple-300"
              >
                {/* <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} /> */}
                <span >{route.name}</span>
              </NavLink>
            </li>
          )}
          <div className="flex justify-end flex-1 lg:mr-32">
            <Button onClick={walletState.locked ? unlockWallet : walletOpen} size="small" className="px-5 py-2 hidden lg:block">
              {walletState.locked ? "Unlock Wallet" : "My Wallet"}
            </Button>
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple block lg:hidden"
              onClick={walletState.locked ? unlockWallet : walletOpen}
              aria-label="Toggle color mode"
            >
              {walletState.locked ? (
                <Icon className="w-5 h-5" aria-hidden="true" icon="BellIcon" />
              ) : (
                <Icon className="w-5 h-5" aria-hidden="true" icon="CardsIcon" />
              )}
            </button>
          </div>
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default walletContainer(Header)
