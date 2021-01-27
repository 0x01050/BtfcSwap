import React, { Suspense, useEffect, useState, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import routes from '../routes'

import Header from '../components/Header'
import Main from '../containers/Main'
import ThemedSuspense from '../components/ThemedSuspense'
import WalletModal from '../components/Modals/WalletModal'
import WavesConfig from '../config/waves'
import walletContainer from '../redux/containers/wallet'
import WavestUtils from '../utils/waves'

const Page404 = lazy(() => import('../pages/404'))

function Layout({walletState, walletActions}) {
  const [ isWalletOpen, setWallet ] = useState(false)
  
  useEffect(() => {
    let interval = -1
    if(!walletState.locked) {
      interval = setInterval(() => {
        WavestUtils.getBalance(walletActions.setBalance, walletActions.lockWallet)
      }, 1000)
    }
  
    return () => {
      if(interval > -1) {
        clearInterval(interval)
      }
    }
  }, [walletState.locked, walletState.waves, walletActions])

  const openWallet = () => {
    setWallet(true)
  }
  const closeWallet = (mode) => {
    if(mode === 1) {
      window.open(WavesConfig.EXPLORER_URL + walletState.address, "_blank")
    }
    if(mode === 2) {
      lockWallet()
    }
    setWallet(false)
  }
  const lockWallet = () => {
    walletActions.lockWallet()
  }

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden`}
    >

      <div className="flex flex-col flex-1 w-full">
        <Header walletOpen={openWallet} />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null
              })}
              <Redirect exact from="/app" to="/app/home" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
        <WalletModal isOpen={isWalletOpen} onClose={closeWallet} />
      </div>
    </div>
  )
}

export default walletContainer(Layout)
