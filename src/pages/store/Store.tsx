import { useParams } from 'react-router-dom'
import { useGetBusinessByIdQuery } from '../../store/apis/businessApi'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import { Avatar, Typography, Grid, Box, Tooltip, Stack } from '@mui/material'
import {
  Email,
  Phone,
  LocationOn,
  Language,
  CheckCircle,
} from '@mui/icons-material'
import { selectThemeMode } from '../../store/features/theme/themeSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import StoreProducts from '../store-products/StoreProducts'
import { selectFilterProductsDrawerWidth } from '../../store/features/filter-products-drawer/filterProductsDrawerSelectors'

function Store() {
  const { storeId } = useParams()
  const { data, error, isLoading } = useGetBusinessByIdQuery(storeId!)
  const themeMode = useAppSelector(selectThemeMode)
  const filterDrawerLength = useAppSelector(selectFilterProductsDrawerWidth)

  if (isLoading) return <div>Loading...</div>
  if (error) {
    console.error(error)
    return <DefaultErrorMessage message='Error loading store profile' />
  }

  const {
    logo,
    coverPhoto,
    email,
    phoneNumber,
    address,
    website,
    emailVerified,
    phoneNumberVerified,
  } = data!.data!

  const isProfileVerified = emailVerified && phoneNumberVerified

  let bgStyle = {}

  if (coverPhoto) {
    bgStyle = {
      backgroundImage: `url(${coverPhoto})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  } else {
    bgStyle = {
      backgroundColor: themeMode === 'light' ? '#f5f5f5' : '#424242',
    }
  }

  return (
    <Box>
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 2,
          marginTop: '-2px',
          flexGrow: 1,
          width: { sm: `calc(100% - ${filterDrawerLength}px)` },
        }}
      >
        <Grid
          item
          xs={12}
          xl={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            src={logo}
            sx={{
              width: 150,
              height: 150,
              backgroundColor: 'transparent',
            }}
          />

          <Box display='flex' alignItems='center' my={4}>
            {isProfileVerified ? (
              <Grid item>
                <Tooltip title='Profile Verified' arrow>
                  <CheckCircle
                    color='primary'
                    sx={{ marginX: 1, marginTop: '-4px' }}
                  />
                </Tooltip>
                <Typography variant='body2' color='primary'>
                  Profile Verified
                </Typography>
              </Grid>
            ) : (
              <Box display='flex' alignItems='center' mt={1}>
                <Tooltip title='Profile Not Verified' arrow>
                  <CheckCircle
                    sx={{ color: 'gray ', marginX: 1, marginTop: '-4px' }}
                  />
                </Tooltip>
                <Typography variant='body2' color={'gray'}>
                  Profile Not Verified
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          xl={9}
          sx={{
            ...bgStyle,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 4,
            padding: 2,
          }}
        >
          <Box
            sx={{
              padding: 2,
              borderRadius: 4,
            }}
          >
            <Typography variant='h4' sx={{ fontWeight: 'bold', my: 1 }}>
              {data?.data?.name}
            </Typography>
            <Typography variant='body1' sx={{ fontStyle: 'italic', mb: 2 }}>
              {data?.data?.description}
            </Typography>

            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} mt={2}>
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mx={1}
                sx={{ width: '100%' }}
              >
                <Email sx={{ margin: 1 }} color='primary' />
                <Typography variant='body2'>
                  <a href={`mailto:${email}`}>{email}</a>
                </Typography>
              </Box>

              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mx={1}
                sx={{ width: '100%' }}
              >
                <Phone sx={{ margin: 1 }} color='primary' />
                <Typography variant='body2'>
                  <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                </Typography>
              </Box>

              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mx={1}
                sx={{ width: '100%' }}
              >
                <LocationOn sx={{ margin: 1 }} color='primary' />
                <Typography variant='body2'>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      address
                    )}`}
                  >
                    {address}
                  </a>
                </Typography>
              </Box>

              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mx={1}
                sx={{ width: '100%' }}
              >
                <Language sx={{ margin: 1 }} color='primary' />
                <Typography variant='body2'>
                  <a href={website!}>{website}</a>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <StoreProducts storeId={storeId} />
    </Box>
  )
}

export default Store
