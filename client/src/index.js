import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' 
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import './styles/main.scss'
import App from './App'

// createRoot(document.getElementById('root')).render(<App />)

createRoot(document.getElementById('root')).render(<ChakraProvider>
  <ColorModeScript initialColorMode='light'/>
  <App /></ChakraProvider>)