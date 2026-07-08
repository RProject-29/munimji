import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Landing from './components/Landing.jsx'
import LanguageGate from './components/LanguageGate.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Calculators from './pages/Calculators.jsx'
import SipCalculator from './pages/calculators/SipCalculator.jsx'
import FdCalculator from './pages/calculators/FdCalculator.jsx'
import RdCalculator from './pages/calculators/RdCalculator.jsx'
import GoalCalculator from './pages/calculators/GoalCalculator.jsx'
import InflationCalculator from './pages/calculators/InflationCalculator.jsx'
import WealthSimulator from './pages/calculators/WealthSimulator.jsx'
import Schemes from './pages/Schemes.jsx'
import InvestmentComparison from './pages/InvestmentComparison.jsx'
import ExpenseAnalyzer from './pages/ExpenseAnalyzer.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Platforms from './pages/Platforms.jsx'
import NotFound from './pages/NotFound.jsx'

import FinancialHealth from './pages/FinancialHealth.jsx'


import AiMunim from './pages/AiMunim.jsx'
import Goals from './pages/Goals.jsx'
import Dictionary from './pages/Dictionary.jsx'
import Profile from './pages/Profile.jsx'

function AppShell() {
  const { language } = useLanguage()
  const [showLanding, setShowLanding] = useState(
    () => !sessionStorage.getItem('munimji_entered')
  )

  if (showLanding) {
    return (
      <Landing
        onEnter={() => {
          sessionStorage.setItem('munimji_entered', 'true')
          setShowLanding(false)
        }}
      />
    )
  }

  if (!language) {
    return <LanguageGate />
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/sip" element={<SipCalculator />} />
         <Route path="/calculators/fd" element={<FdCalculator />} />
          <Route path="/calculators/rd" element={<RdCalculator />} />
          <Route path="/calculators/goal" element={<GoalCalculator />} />
          <Route path="/calculators/inflation" element={<InflationCalculator />} />
          <Route path="/calculators/wealth" element={<WealthSimulator />} />
         <Route path="/schemes" element={<Schemes />} />
          <Route path="/compare" element={<InvestmentComparison />} />
           <Route path="/expense" element={<ExpenseAnalyzer />} />
           <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/platforms" element={<Platforms />} />
         
          <Route path="*" element={<NotFound />} />


          <Route path="/health" element={<FinancialHealth />} />

          <Route path="/ai-munim" element={<AiMunim />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </LanguageProvider>
  )
}