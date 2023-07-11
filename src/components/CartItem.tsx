import { Button, Grid, Typography } from "@mui/material";
import { useShoppingCart } from "../context/useShoppingCart";
import storeItems from "../data/items.json";
import formatCurrency from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  const handleIncreaseQuantity = () => {
    increaseCartQuantity(item.id);
  };

  const handleDecreaseQuantity = () => {
    decreaseCartQuantity(item.id);
  };

  const handleRemoveItem = () => {
    removeFromCart(item.id);
  };

  return (
    <Grid container spacing={2} alignItems="center" padding={2}>
      <Grid item>
        <img
          src={item.imgUrl}
          alt={item.name}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
      </Grid>
      <Grid item xs>
        <Typography variant="body1">
          {item.name}{" "}
          {quantity > 1 && (
            <Typography variant="caption" color="text.secondary" fontSize=".65rem">
              x{quantity}
            </Typography>
          )}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontSize=".75rem">
          {formatCurrency(item.price)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} display="flex" justifyContent="flex-end" alignItems="center">
        <Button variant="outlined" color="error" size="small" onClick={handleRemoveItem}>
          Remove
        </Button>
      </Grid>
      <Grid item xs={12} md={8} display="flex" alignItems="center">
        <Button variant="outlined" color="error" size="small" onClick={handleDecreaseQuantity}>
          -
        </Button>
        <Typography paddingLeft={1} paddingRight={1}>
          {quantity}
        </Typography>
        <Button variant="outlined" color="success" size="small" onClick={handleIncreaseQuantity}>
          +
        </Button>
      </Grid>
      <Grid item xs={12} md={4} display={{ xs: "flex", md: "none" }}>
        <Button variant="outlined" color="error" size="small" onClick={handleRemoveItem}>
          Remove
        </Button>
      </Grid>
    </Grid>
  );
}
