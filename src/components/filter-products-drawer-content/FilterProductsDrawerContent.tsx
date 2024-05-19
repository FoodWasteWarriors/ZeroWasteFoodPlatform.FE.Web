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
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { ChangeEvent, useState } from 'react'

function FilterProductsDrawerContent() {
  // Define state variables for filters
  const [sortBy, setSortBy] = useState('')
  const [searchText, setSearchText] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])
  const [discountRange, setDiscountRange] = useState<[number, number]>([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStores, setSelectedStores] = useState<string[]>([])

  // Define options for sorting
  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'price', label: 'Sort by Price' },
    { value: 'discount', label: 'Sort by Discount' },
  ]

  // Define options for categories and stores
  const categoryOptions = ['Category 1', 'Category 2', 'Category 3']
  const storeOptions = ['Store 1', 'Store 2', 'Store 3']

  // Handle apply filters
  const handleApplyFilters = () => {
    // Implement your logic to apply the filters
  }

  return (
    <Box sx={{ overflow: 'auto', marginTop: 4 }}>
      <Typography variant='h4' gutterBottom align='center'>
        Filters
      </Typography>
      <FormControl sx={{ m: 2, width: '88%' }}>
        <InputLabel id='sort-by-label'>Sort By</InputLabel>
        <Select
          labelId='sort-by-label'
          id='sort-by'
          value={sortBy}
          label='Sort By'
          onChange={(event: ChangeEvent<{ value: unknown }>) =>
            setSortBy(event.target.value as string)
          }
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
        label='Search Products'
        value={searchText}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchText(event.target.value)
        }
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
        <TextField
          sx={{ m: 2, width: '40%' }}
          label='Min Price'
          value={priceRange[0]}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPriceRange([+event.target.value, priceRange[1]])
          }
        />
        <TextField
          sx={{ m: 2, width: '40%' }}
          label='Max Price'
          value={priceRange[1]}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPriceRange([priceRange[0], +event.target.value])
          }
        />
      </Box>
      <Typography variant='h6' sx={{ mt: 2, ml: 2, fontSize: '1.2rem' }}>
        Discount
      </Typography>
      <Slider
        sx={{ m: 2, ml: 3, width: '85%' }}
        value={discountRange}
        onChange={(event: Event, newValue: number | number[]) =>
          setDiscountRange(newValue as [number, number])
        }
        valueLabelDisplay='auto'
        min={0}
        max={100}
        step={5}
        marks={[
          { value: 0, label: '0%' },
          { value: 50, label: '50%' },
          { value: 100, label: '100%' },
        ]}
      />

      <Divider />
      <Typography variant='h6' sx={{ mt: 2, ml: 2, fontSize: '1.2rem' }}>
        Categories
      </Typography>
      <Autocomplete
        multiple
        id='categories'
        options={categoryOptions}
        value={selectedCategories}
        sx={{ m: 2, width: '88%' }}
        onChange={(event: ChangeEvent<{}>, newValue: string[]) =>
          setSelectedCategories(newValue)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Categories'
            placeholder='Categories'
          />
        )}
      />

      <Typography variant='h6' sx={{ mt: 2, ml: 2, fontSize: '1.2rem' }}>
        Stores
      </Typography>

      <Autocomplete
        multiple
        id='stores'
        options={storeOptions}
        value={selectedStores}
        sx={{ m: 2, width: '88%' }}
        onChange={(event: ChangeEvent<{}>, newValue: string[]) =>
          setSelectedStores(newValue)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Stores'
            placeholder='Stores'
          />
        )}
      />

      <Divider />

      <Button
        variant='contained'
        sx={{ m: 2, width: '88%', p: 2, pt: 2.3 }}
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </Box>
  )
}

export default FilterProductsDrawerContent
