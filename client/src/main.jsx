import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Provider} from 'react-redux'
import store from '../store/store.js'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter> 
                <App />
                <ReactQueryDevtools initialIsOpen={false}/>
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
   
  
)
