import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Store from './pages/Store'
import About from './pages/About'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Navbar from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import Payment from './components/Payment'

interface WithLayoutProps {
  children: React.ReactNode
}

interface RouteConfig {
  path: string
  element: JSX.Element
  withLayout?: boolean
}

const routes: RouteConfig[] = [
  {
    path: '/store/*',
    element: <Store />,
    withLayout: true,
  },
  {
    path: '/about',
    element: <About />,
    withLayout: true,
  },
  {
    path: '/store/payment',
    element: <Payment />,
  },
  {
    path: '*',
    element: <Navigate to="/store" />,
  },
]

const WithLayout: React.FC<WithLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container sx={{ fontFamily: 'Roboto', mb: 4 }}>{children}</Container>
    </>
  )
}

const App = () => {
  return (
    <>
      <ShoppingCartProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.withLayout ? (
                  <WithLayout>{route.element}</WithLayout>
                ) : (
                  <Container sx={{ fontFamily: 'Roboto' }}>
                    {route.element}
                  </Container>
                )
              }
            />
          ))}
        </Routes>
      </ShoppingCartProvider>
    </>
  )
}

export default App
