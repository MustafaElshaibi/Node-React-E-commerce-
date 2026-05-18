
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { api } from './redux/api/api'
import { setLoading, setUser } from './redux/features/authSlice'

const intitilizeListener = async ()=> {
  const data = await store.dispatch(
    api.endpoints.getProfile.initiate()
  )
  if(data?.data?.data?.user) {
    store.dispatch(setUser(data?.data?.data?.user));
  }

  store.dispatch(setLoading(false));
}

intitilizeListener()


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
   <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
     <Provider store={store} >
    <App />
    </Provider>
   </ThemeProvider>
    </BrowserRouter>
)


