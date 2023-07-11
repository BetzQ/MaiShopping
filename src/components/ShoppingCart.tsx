import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Stack,
  Button,
  Box,
  CircularProgress,
} from '@mui/material'
import {
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { useShoppingCart } from '../context/useShoppingCart'
import { CartItem } from './CartItem'
import formatCurrency from '../utilities/formatCurrency'
import storeItems from '../data/items.json'
import { useState } from 'react'

type ShoppingCartProps = {
  isOpen: boolean
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart()
  const [ isEmpty, setIsEmpty ] = useState(false)

  const handleClose = () => {
    closeCart()
    setTimeout(() => {
      setIsEmpty(false)
    }, 1000);
  }

  const handlePayment = () => {
    if (cartItems.length === 0) {
      setIsEmpty(true)
      return
    }

    const itemsToStore = cartItems
      .map((cartItem) => {
        const item = storeItems.find((item) => item.id === cartItem.id)
        if (item) {
          const { id, name, price, imgUrl } = item
          return { id, name, price, imgUrl, quantity: cartItem.quantity }
        }
        return null
      })
      .filter((item) => item !== null)

    localStorage.setItem('cartItems', JSON.stringify(itemsToStore))

    window.location.href = '/store/payment'
  }

  const total = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id)
    return total + (item?.price || 0) * cartItem.quantity
  }, 0)

  return (
    <div>
      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
        <List>
          <ListItemButton onClick={handleClose}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Shopping Cart" />
            <IconButton edge="end" aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </ListItemButton>
          {!cartItems ? (
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
          ) : (
            <Stack>
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
              <Typography
                variant="subtitle1"
                align="right"
                fontSize="1.25rem"
                paddingRight={2}
              >
                <small>Total :</small> {formatCurrency(total)}
              </Typography>
              <Button
                sx={{ mx: 2 }}
                variant="contained"
                color="primary"
                size="large"
                onClick={handlePayment}
              >
                Proceed to Payment
              </Button>
              {isEmpty && (
                <Typography variant="body2" color="error" textAlign={"center"}>
                  Your cart is empty.
                </Typography>
              )}
            </Stack>
          )}
        </List>
      </Drawer>
    </div>
  )
}

export default ShoppingCart
