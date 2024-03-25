import { createContext, useState } from 'react'
import './App.css'
import LoginForm from './components/forms/LoginForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/forms/SignUpForm'
import Homepage from './components/dash/Homepage'
import Dashboard from './components/dash/Dashboard'
import PersistLogin from './components/features/PersistLogin'
import { Toaster } from 'react-hot-toast'
import CheckoutForm from './components/forms/CheckoutForm';

export const childContext = createContext()


function App() {
  const [currentChild, setCurrentChild] = useState(<Dashboard />)
  const [active, setActive]=useState("Dashboard")
  const [invModalHidden, setinvModalHidden] = useState(true)
  const [supModalHidden, setsupModalHidden] = useState(true)
  const [refresh1, setRefresh1]=useState(false)
  const [refresh2, setRefresh2]=useState(false)
  const [session, setSession] = useState(null)
  const [drugList, setDrugList]=useState([])
  return (
    <childContext.Provider value={{ active, setActive, currentChild, setCurrentChild, invModalHidden, setinvModalHidden, supModalHidden, setsupModalHidden, session, setSession , refresh1, setRefresh1, refresh2, setRefresh2, drugList, setDrugList}}>
      <Router>
        <Routes>
        <Route path='*' element={<LoginForm />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route element={<PersistLogin />}>
            <Route exact path='/dash' element={<Homepage />} />
            <Route path='/dash/checkout' element={<CheckoutForm/>}/>
          </Route>
        </Routes>
      </Router>
      <Toaster/>
    </childContext.Provider>
  )
}

export default App
