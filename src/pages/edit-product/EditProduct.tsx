import { Edit, Save } from '@mui/icons-material'
import {
  Alert,
  Autocomplete,
  Avatar,
  Button,
  Container,
  List,
  ListItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useCallback, useEffect, useState } from 'react'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'

import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useGetCategoryListQuery } from '../../store/apis/categoryApi'
import {
  useGetStoreProductByIdQuery,
  useUpdateStoreProductMutation,
} from '../../store/apis/storeProducsApi'

const defaultActiveEdits = {
  name: false,
  photo: false,
  expirationDate: false,
  description: false,
  originalPrice: false,
  percentDiscount: false,
  categories: false,
}

function EditProduct() {
  const { productId } = useParams()
  const {
    data: productData,
    error: productError,
    isLoading: productIsLoading,
  } = useGetStoreProductByIdQuery(productId!)

  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useGetCategoryListQuery()

  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([] as string[])
  const [updateStoreProduct] = useUpdateStoreProductMutation()

  const [activeEdits, setActiveEdits] = useState(defaultActiveEdits)

  const [productDetails, setProductDetails] = useState({
    name: '',
    photo: '',
    expirationDate: new Date() as Date | null | undefined,
    description: '',
    originalPrice: 0,
    percentDiscount: 0,
    categoryIds: [] as string[],
  })

  const SetDefaluts = useCallback(() => {
    setProductDetails({
      name: productData!.data!.name,
      photo: productData!.data!.photo,
      expirationDate: productData!.data!.expirationDate,
      description: productData!.data!.description,
      originalPrice: productData!.data!.originalPrice,
      percentDiscount: productData!.data!.percentDiscount,
      categoryIds: productData!.data!.categories.map((category) => category.id),
    })
  }, [productData])

  const handleProductUpdate = () => {
    updateStoreProduct({
      id: productId!,
      name: productDetails.name,
      photo: productDetails.photo,
      expirationDate: productDetails.expirationDate,
      description: productDetails.description,
      originalPrice: productDetails.originalPrice,
      percentDiscount: productDetails.percentDiscount,
      categoryIds: productDetails.categoryIds,
    })
      .unwrap()
      .then(() => {
        setSuccess(true)
        setErrors([])
        SetDefaluts()
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

    setActiveEdits(defaultActiveEdits)
  }

  const handleCancelUpdate = () => {
    setErrors([])
    SetDefaluts()
    setActiveEdits(defaultActiveEdits)
  }

  useEffect(() => {
    if (productData) SetDefaluts()
  }, [SetDefaluts, productData])

  if (productIsLoading || categoryIsLoading) return <div>Loading...</div>

  if (productError || categoryError)
    return <DefaultErrorMessage message='Error loading product' />

  const EditOrSaveButton = (activeEditKey: keyof typeof defaultActiveEdits) => {
    const activeEdit = activeEdits[activeEditKey]

    return activeEdit ? (
      <Save
        sx={{ cursor: 'pointer', marginLeft: 1 }}
        onClick={() => {
          setActiveEdits((prev) => ({
            ...prev,
            [activeEditKey]: false,
          }))
        }}
      />
    ) : (
      <Edit
        sx={{ cursor: 'pointer', marginLeft: 1 }}
        onClick={() => {
          setActiveEdits((prev) => ({
            ...prev,
            [activeEditKey]: true,
          }))
        }}
      />
    )
  }

  return (
    <Container>
      <Stack alignItems='center' spacing={2} my={2}>
        <Avatar
          src={productDetails.photo}
          alt={productDetails.name}
          sx={{ width: 200, height: 200 }}
        />
      </Stack>

      <Stack spacing={2}>
        <TextField
          label='Name'
          value={productDetails.name}
          disabled={!activeEdits.name}
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }}
          fullWidth
          InputProps={{
            endAdornment: EditOrSaveButton('name'),
          }}
        />

        <TextField
          label='Description'
          value={productDetails.description}
          disabled={!activeEdits.description}
          multiline
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }}
          fullWidth
          InputProps={{
            endAdornment: EditOrSaveButton('description'),
          }}
        />

        <TextField
          label='Photo'
          value={productDetails.photo}
          disabled={!activeEdits.photo}
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              photo: e.target.value,
            }))
          }}
          fullWidth
          InputProps={{
            endAdornment: EditOrSaveButton('photo'),
          }}
        />

        <TextField
          label='Original Price'
          value={productDetails.originalPrice}
          disabled={!activeEdits.originalPrice}
          type='number'
          onChange={(e) => {
            setProductDetails((prev) => ({
              ...prev,
              originalPrice: Number(e.target.value),
            }))
          }}
          fullWidth
          InputProps={{
            endAdornment: EditOrSaveButton('originalPrice'),
          }}
        />

        <TextField
          label='Current Percent Discount'
          value={productDetails.percentDiscount}
          disabled={!activeEdits.percentDiscount}
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
          InputProps={{
            endAdornment: EditOrSaveButton('percentDiscount'),
          }}
        />

        <Stack direction={'row'} spacing={2}>
          <Autocomplete
            multiple
            id='categories'
            options={categoryData!.data!}
            getOptionLabel={(option) => option.name}
            value={categoryData!.data!.filter((category) =>
              productDetails.categoryIds.includes(category.id)
            )}
            onChange={(_, value) => {
              setProductDetails((prev) => ({
                ...prev,
                categoryIds: value.map
                  ? value.map((category) => category.id)
                  : [],
              }))
            }}
            disabled={!activeEdits.categories}
            renderInput={(params) => (
              <TextField {...params} label='Categories' />
            )}
            fullWidth
          />

          {EditOrSaveButton('categories')}
        </Stack>

        <Stack spacing={2} direction='row'>
          <DatePicker
            sx={{ width: '100%' }}
            label='Expiration Date'
            disabled={!activeEdits.expirationDate}
            value={dayjs(productDetails.expirationDate)}
            onChange={(date) => {
              setProductDetails((prev) => ({
                ...prev,
                expirationDate: date?.toDate(),
              }))
            }}
          />

          {EditOrSaveButton('expirationDate')}
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent='center'
        >
          <Button
            variant='text'
            color='primary'
            onClick={() => handleProductUpdate()}
            fullWidth
          >
            Save
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
              Product details updated successfully!
            </Alert>
          </Snackbar>
        </Stack>
        <List>
          {errors.map((error, index) => (
            <ListItem key={index}>
              <Typography color='error'>{error}</Typography>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Container>
  )
}

export default EditProduct
