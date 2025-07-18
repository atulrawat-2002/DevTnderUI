import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import Feed from "./components/Feed";
import Connections from './components/Connections';
import Requests from "./components/Requests";
import { Provider } from 'react-redux'
import appStore from './utils/appstore'

function App() {

  return (
    <>
    <Provider store={appStore} >
    <BrowserRouter basename='/' >
      <Routes>
        <Route path='/' element={ <Body /> } > 
          <Route index element={ <Feed /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/requests' element={ <Requests /> } />
          <Route path='/connections' element={ <Connections /> } />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
