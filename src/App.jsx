import { HashRouter, Route, Routes } from 'react-router-dom'
import { isFirebaseConfigured } from './firebase'
import { AppDataProvider } from './contexts/AppDataContext'
import Layout from './components/layout/Layout'
import FirebaseSetupNotice from './components/layout/FirebaseSetupNotice'
import TopPage from './pages/TopPage'
import PeopleManagePage from './pages/PeopleManagePage'
import PersonDetailPage from './pages/PersonDetailPage'
import TrapNewPage from './pages/TrapNewPage'
import TrapEditPage from './pages/TrapEditPage'

function App() {
  if (!isFirebaseConfigured) return <FirebaseSetupNotice />

  return (
    <AppDataProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/people" element={<PeopleManagePage />} />
            <Route path="/people/:personId" element={<PersonDetailPage />} />
            <Route path="/traps/new" element={<TrapNewPage />} />
            <Route path="/traps/:trapId/edit" element={<TrapEditPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppDataProvider>
  )
}

export default App
