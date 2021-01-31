import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Home = lazy(() => import('../pages/Home'))
const Wallet = lazy(() => import('../pages/Wallet'))
const Staking = lazy(() => import('../pages/Staking'))
const Faucet = lazy(() => import('../pages/Faucet'))
const Explorer = lazy(() => import('../pages/Explorer'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/wallet',
    component: Wallet
  },
  {
    path: '/staking',
    component: Staking
  },
  {
    path: '/faucet',
    component: Faucet
  },
  {
    path: '/explorer',
    component: Explorer
  },
]

export default routes
