import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, WindmillContext } from '@windmill/react-ui'

import BtfcSwapLogo from '../assets/img/btfcswap.png'
import * as Icons from '../icons'
import {
  MoonIcon,
  SunIcon,
} from '../icons'
import walletContainer from '../redux/containers/wallet'
import routes from '../routes/sidebar'
import WavesUtils from '../utils/waves'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function Header({walletState, walletActions, walletOpen, sendOpen}) {
  const { mode, toggleMode } = useContext(WindmillContext)

  return (
    <header className="z-40 py-2 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-gray-800 dark:text-gray-200">
        <img
          aria-hidden="true"
          className="mr-8 object-cover hidden lg:block"
          style={{height: 64}}
          src={BtfcSwapLogo}
          alt="Office"
        />
        
        <ul className="flex items-center flex-1 space-x-6">
          {routes.map((route) =>
            <li className="relative px-2 py-1" key={route.name}>
              {
                route.path ?
                  <NavLink
                    exact
                    to={route.path}
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-purple-600 dark:hover:text-purple-300"
                    activeClassName="text-purple-600 dark:text-purple-300"
                  >
                    {/* <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} /> */}
                    <span >{route.name}</span>
                  </NavLink>
                :
                  <span
                    className={
                      walletState.locked ?
                        "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-300 dark:text-gray-600"
                      :
                        "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-purple-600 dark:hover:text-purple-300"
                    }
                    style={{cursor: 'pointer'}}
                    onClick={walletState.locked ? null : sendOpen}
                  >
                    {route.name}
                  </span>
              }
            </li>
          )}
          <div className="flex justify-end flex-1 lg:mr-32">
            <Button onClick={walletState.locked ? () => WavesUtils.unlockWallet(walletActions.unlockWallet, walletActions.lockWallet) : walletOpen} size="small" className="px-5 py-2 hidden lg:block">
              {walletState.locked ? "Unlock Wallet" : "My Wallet"}
            </Button>
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple block lg:hidden"
              onClick={walletState.locked ? () => WavesUtils.unlockWallet(walletActions.unlockWallet, walletActions.lockWallet) : walletOpen}
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
