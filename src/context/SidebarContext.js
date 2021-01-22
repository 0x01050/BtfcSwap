import React, { useState, useMemo } from 'react'

// create context
export const SidebarContext = React.createContext()

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen] = useState(false)

  const value = useMemo(
    () => ({
      isSidebarOpen,
    }),
    [isSidebarOpen]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}
