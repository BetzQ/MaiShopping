import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material'
import { Remove, Add } from '@mui/icons-material'
import formatCurrency from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/useShoppingCart'

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

type CardComponentProps = {
  item: StoreItemProps
}

const StoreItem = ({ item }: CardComponentProps) => {
  const { id, name, price, imgUrl } = item

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(id)

  return (
    <MuiCard sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="190" image={imgUrl} alt={name} />
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign={'center'}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'center'}>
          Price: {formatCurrency(price)}
        </Typography>
        {quantity === 0 ? (
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <div
              onClick={() => increaseCartQuantity(id)}
              style={{
                border: '1px solid',
                borderColor: '#0000ff',
                color: '#0000ff',
                borderRadius: 2,
                fontSize: 16,
                padding: '4px 8px',
                cursor: 'pointer',
              }}
            >
              Add to Cart
            </div>
          </CardContent>
        ) : (
          <>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: 0,
              }}
            >
              <div
                onClick={() => decreaseCartQuantity(id)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: '#0000ff',
                  color: '#0000ff',
                  borderRadius: 2,
                  fontSize: 16,
                  padding: '4px',
                  cursor: 'pointer',
                }}
              >
                <Remove />
              </div>

              <Typography color="text.secondary">
                <b>{quantity}</b> <small>di keranjang</small>
              </Typography>
              <div
                onClick={() => increaseCartQuantity(id)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: '#0000ff',
                  color: '#0000ff',
                  borderRadius: 2,
                  fontSize: 16,
                  padding: '4px',
                  cursor: 'pointer',
                }}
              >
                <Add />
              </div>
            </CardContent>
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <div
                onClick={() => removeFromCart(id)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: '#0000ff',
                  color: '#0000ff',
                  borderRadius: 2,
                  fontSize: 16,
                  padding: '4px',
                  cursor: 'pointer',
                }}
              >
                REMOVE
              </div>
            </CardContent>
          </>
        )}
      </CardActionArea>
    </MuiCard>
  )
}

export default StoreItem
