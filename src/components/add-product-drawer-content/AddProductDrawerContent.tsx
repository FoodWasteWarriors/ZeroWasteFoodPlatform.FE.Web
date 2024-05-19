import {
  Alert,
  Autocomplete,
  Button,
  Container,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'

import dayjs from 'dayjs'
import { useGetCategoryListQuery } from '../../store/apis/categoryApi'
import { useCreateStoreProductMutation } from '../../store/apis/storeProducsApi'
import DefaultErrorMessage from '../default-error-message/DefaultErrorMessage'

const defaultFormData = {
  name: '',
  description: '',
  photo: '',
  expirationDate: new Date(),
  barcode: '',
  originalPrice: 0,
  percentDiscount: 0,
  categoriesIds: [],
} as StoreProductAddDto

function AddProductDrawerContent() {
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useGetCategoryListQuery()

  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([] as string[])
  const [createStoreProduct] = useCreateStoreProductMutation()

  const [productDetails, setProductDetails] = useState(defaultFormData)

  const handleAddProduct = () => {
    createStoreProduct({
      name: productDetails.name,
      photo: productDetails.photo,
      expirationDate: productDetails.expirationDate,
      description: productDetails.description,
      originalPrice: productDetails.originalPrice,
      percentDiscount: productDetails.percentDiscount,
      categoriesIds: productDetails.categoriesIds,
      barcode: productDetails.barcode,
    })
      .unwrap()
      .then(() => {
        setSuccess(true)
        setErrors([])
      })
      .catch((error) => {
        let errorMessages

        if (!error.messages) {
          errorMessages = Object.values(error.data.errors).flat() as string[]
        } else {
          errorMessages = error.data.messages.map(
            (message: ResponseMessage) => message.description
          )
        }

        setErrors(errorMessages)
        setSuccess(false)
      })
  }

  const handleCancelUpdate = () => {
    setErrors([])
    setProductDetails(defaultFormData)
  }

  if (categoryIsLoading) return <div>Loading...</div>

  if (categoryError)
    return <DefaultErrorMessage message='Error loading categories' />

  return (
    <Container sx={{ padding: 4 }}>
      <Typography variant='h4' gutterBottom align='center'>
        Add Product
      </Typography>
      <Stack spacing={2}>
        <TextField
          label='Name'
          value={productDetails.name}
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }}
          fullWidth
        />

        <TextField
          label='Description'
          value={productDetails.description}
          multiline
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }}
          fullWidth
        />

        <TextField
          label='Photo'
          value={productDetails.photo}
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              photo: e.target.value,
            }))
          }}
          fullWidth
        />

        <TextField
          label='Original Price'
          value={productDetails.originalPrice}
          type='number'
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              originalPrice: Number(e.target.value),
            }))
          }}
          fullWidth
        />

        <TextField
          label='Current Percent Discount'
          value={productDetails.percentDiscount}
          type='number'
          color='warning'
          helperText='The discount rate you currently enter will gradually increase to 90% until the expiration date.'
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              percentDiscount: Number(e.target.value),
            }))
          }}
          fullWidth
        />

        <Stack direction={'row'} spacing={2}>
          <Autocomplete
            multiple
            id='categories'
            options={categoryData!.data!}
            getOptionLabel={(option) => option.name}
            value={categoryData!.data!.filter((category) =>
              productDetails.categoriesIds.includes(category.id)
            )}
            onChange={(_, value) => {
              setProductDetails((prev) => ({
                ...prev,
                categoryIds: value.map
                  ? value.map((category) => category.id)
                  : [],
              }))
            }}
            renderInput={(params) => (
              <TextField {...params} label='Categories' />
            )}
            fullWidth
          />
        </Stack>

        <Stack spacing={2} direction='row'>
          <DatePicker
            sx={{ width: '100%' }}
            label='Expiration Date'
            value={dayjs(productDetails.expirationDate)}
            onChange={(date) => {
              setProductDetails((prev) => ({
                ...prev,
                expirationDate: date!.toDate(),
              }))
            }}
          />
        </Stack>

        <TextField
          label='Barcode'
          helperText='You can either manually enter the product barcode ID or conveniently scan it using our mobile app.'
          value={productDetails.barcode}
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              barcode: e.target.value,
            }))
          }}
          fullWidth
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent='center'
        >
          <Button
            variant='text'
            color='primary'
            onClick={() => handleAddProduct()}
            fullWidth
          >
            Add Product
          </Button>

          <Button
            variant='text'
            color='error'
            onClick={() => handleCancelUpdate()}
            fullWidth
          >
            Cancel
          </Button>

          <Snackbar open={success} autoHideDuration={6000}>
            <Alert
              severity='success'
              variant='filled'
              sx={{ width: '100%' }}
              onClose={() => setSuccess(false)}
            >
              Product has been added successfully!
            </Alert>
          </Snackbar>
        </Stack>
        {errors.map((error, index) => (
          <Alert severity='error' key={index}>
            {error}
          </Alert>
        ))}
      </Stack>
    </Container>
  )
}

export default AddProductDrawerContent
