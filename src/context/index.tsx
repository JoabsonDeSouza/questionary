import React from 'react'

import { AppProvider } from './app'

const ApplicationProvider: React.FC = ({ children }) => (
  <AppProvider>{children}</AppProvider>
)
export default ApplicationProvider
