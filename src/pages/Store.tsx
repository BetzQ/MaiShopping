import StoreItem from '../components/StoreItem'
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material'
import { useStoreState } from '../hooks/useStoreState'
import { filterItems, showAllItems } from '../utilities/filterUtils'
import storeItems from '../data/items.json'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'

const Store = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
  } = useStoreState()
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)

  const categories = [
    'all',
    ...new Set(storeItems.map((item) => item.category)),
  ]

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value)
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm.trim())
  }
  const handleRemovePaymentSuccess = () => {
    localStorage.removeItem('paymentSuccess')
    setPaymentSuccess(false)
  }

  useEffect(() => {
    const paymentStatus = localStorage.getItem('paymentSuccess')
    if (paymentStatus === 'true') {
      setPaymentSuccess(true)
      localStorage.removeItem('paymentSuccess')
    }
  }, [])

  if (!storeItems) {
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
    );
  }

  return (
    <div style={{ marginTop: 40 }}>
      {paymentSuccess && (
        <Alert onClose={handleRemovePaymentSuccess}>
          Pembayaran Sukses!
        </Alert>
      )}

      <Typography textAlign={'center'} variant="h2">
        Store
      </Typography>

      <SearchBar onSearch={handleSearch} />

      <FormControl sx={{ mb: 1 }}>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {showAllItems(searchTerm, selectedCategory) ? (
          storeItems.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
              sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
            >
              <StoreItem item={item} />
            </Grid>
          ))
        ) : filterItems(searchTerm, selectedCategory, storeItems).length ===
          0 ? (
          <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
            No results found
          </Typography>
        ) : (
          filterItems(searchTerm, selectedCategory, storeItems).map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
              sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
            >
              <StoreItem item={item} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  )
}

export default Store
