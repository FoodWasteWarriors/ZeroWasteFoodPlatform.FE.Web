import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Divider,
  Slider,
  Button
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { ChangeEvent, useState } from 'react'
import { useGetCategoryListQuery } from '../../store/apis/categoryApi'
import { useGetBusinessListQuery } from '../../store/apis/businessApi'
import { StoreProductsFilterType } from '../../pages/main-page/MainPage'
import DefaultErrorMessage from '../default-error-message/DefaultErrorMessage'

type PropType = {
  setFilter: (filter: StoreProductsFilterType) => void
}

function FilterProductsDrawerContent({ setFilter }: PropType) {
  // Define state variables for filters
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'discount'>('name')
  const [searchText, setSearchText] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [discountRange, setDiscountRange] = useState<[number, number]>([0, 100])
  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const [storeIds, setStoreIds] = useState<string[]>([])

  const { data: categoryData, error: categoryError, isLoading: categoryIsLoading } = useGetCategoryListQuery()
  const { data: storeData, error: storeError, isLoading: storeIsLoading } = useGetBusinessListQuery({})

  // Define options for sorting
  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'price', label: 'Sort by Price' },
    { value: 'discount', label: 'Sort by Discount' }
  ]

  // Handle apply filters
  const handleApplyFilters = () => {
    setFilter({
      nameQuery: searchText,
      sortBy,
      percentDiscountLow: discountRange[0],
      percentDiscountHigh: discountRange[1],
      originalPriceLow: priceRange[0],
      originalPriceHigh: priceRange[1],
      categoryIds,
      storeIds
    })
  }

  if (categoryIsLoading || storeIsLoading) return <Typography>Loading...</Typography>

  if (categoryError || storeError) return <DefaultErrorMessage message="Error loading categories and stores" />

  return (
    <Box sx={{ overflow: 'auto', marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Filters
      </Typography>
      <FormControl sx={{ m: 2, width: '88%' }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortBy}
          label="Sort By"
          onChange={(event: ChangeEvent<{ value: unknown }>) => setSortBy(event.target.value as string)}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider />

      <TextField
        sx={{ m: 2, width: '88%' }}
        label="Search Products"
        value={searchText}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)}
        InputProps={{
          endAdornment: <SearchIcon />
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
        <TextField
          sx={{ m: 2, width: '40%' }}
          label="Min Price"
          value={priceRange[0]}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPriceRange([+event.target.value, priceRange[1]])}
        />
        <TextField
          sx={{ m: 2, width: '40%' }}
          label="Max Price"
          value={priceRange[1]}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPriceRange([priceRange[0], +event.target.value])}
        />
      </Box>
      <Typography variant="h6" sx={{ mt: 2, ml: 2, fontSize: '1.2rem' }}>
        Discount
      </Typography>
      <Slider
        sx={{ m: 2, ml: 3, width: '85%' }}
        value={discountRange}
        onChange={(event: Event, newValue: number | number[]) => setDiscountRange(newValue as [number, number])}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        step={5}
        marks={[
          { value: 0, label: '0%' },
          { value: 50, label: '50%' },
          { value: 100, label: '100%' }
        ]}
      />

      <Divider />
      <Typography variant="h6" sx={{ mt: 2, ml: 2, fontSize: '1.2rem' }}>
        Categories
      </Typography>
      <Autocomplete
        sx={{ m: 2, width: '88%' }}
        multiple
        id="categories"
        options={categoryData!.data!}
        getOptionLabel={(option) => option.name}
        value={categoryData!.data!.filter((category) => categoryIds.includes(category.id))}
        renderInput={(params) => <TextField {...params} label="Categories" />}
        onChange={(_, value) => {
          setCategoryIds(value.map((category) => category.id))
        }}
      />

      <Divider />
      <Typography variant="h6" sx={{ mt: 2, ml: 2, fontSize: '1.2rem' }}>
        Stores
      </Typography>
      <Autocomplete
        sx={{ m: 2, width: '88%' }}
        multiple
        id="stores"
        options={storeData!.data!}
        getOptionLabel={(option) => option.name}
        value={storeData!.data!.filter((store) => storeIds.includes(store.id))}
        renderInput={(params) => <TextField {...params} label="Stores" />}
        onChange={(_, value) => {
          setStoreIds(value.map((store) => store.id))
        }}
      />

      <Divider />

      <Button variant="contained" sx={{ m: 2, width: '88%', p: 2, pt: 2.3 }} onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </Box>
  )
}

export default FilterProductsDrawerContent
