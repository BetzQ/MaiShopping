import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography, Button, CircularProgress } from '@mui/material'
import formatCurrency from '../utilities/formatCurrency'
import storeItems from '../data/items.json'
import { useShoppingCart } from '../context/useShoppingCart'

interface CartItem {
  id: number
  name: string
  price: number
  imgUrl: string
  quantity: number
}

const Payment: React.FC = () => {
  const navigate = useNavigate()
  const cartItems: CartItem[] = JSON.parse(
    localStorage.getItem('cartItems') || '[]',
  )
  const { removeAllFromCart } = useShoppingCart()

  const handlePayment = () => {
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shopping-cart')
    localStorage.setItem('paymentSuccess', 'true')
    removeAllFromCart()
    navigate('/store')
  }

  const total = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id)
    return total + (item?.price || 0) * cartItem.quantity
  }, 0)

  const itemHeight = 75
  const showScroll = cartItems.length > 4

  if (!cartItems) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!cartItems.length) {
    navigate('/store')
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3,
      }}
    >
      <Box
        sx={{
          background: '#CBF1F5',
          boxShadow: 3,
          borderRadius: 10,
          padding: 4,
          transition: '0.3s',
          '&:hover': {
            boxShadow: 1,
            borderRadius: 5,
          },
        }}
      >
        <h2>Purchase Receipt</h2>
        <div
          style={{
            maxHeight: `${itemHeight * 4}px`,
            overflowY: `${showScroll ? 'scroll' : 'auto'}`,
          }}
        >
          {cartItems.map((item) => (
            <Grid container spacing={2} alignItems="center" key={item.id}>
              <Grid item>
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  style={{
                    width: '125px',
                    height: `${itemHeight}px`,
                    objectFit: 'cover',
                  }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body1">
                  {item.name}{' '}
                  {item.quantity > 1 && (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      fontSize=".65rem"
                    >
                      x{item.quantity}
                    </Typography>
                  )}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  fontSize=".75rem"
                >
                  {formatCurrency(item.price)}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </div>
        <Typography variant="subtitle1" fontSize="1.25rem" paddingRight={2}>
          <small>Total :</small> {formatCurrency(total)}
        </Typography>
        <Button variant="contained" color="primary" onClick={handlePayment}>
        Already paid
        </Button>
      </Box>
    </Box>
  )
}

export default Payment
