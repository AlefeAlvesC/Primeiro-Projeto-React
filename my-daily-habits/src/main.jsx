import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
/*import { BrowserRouter } from 'react-router-dom';*/
import { HashRouter } from 'react-router-dom';
import { HabitsProvider } from './contexts/HabitsContext.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter >
      <HabitsProvider>
        <App/>
      </HabitsProvider>
    </HashRouter>
  </StrictMode>
)
