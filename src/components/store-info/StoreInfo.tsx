import {
  CheckCircle,
  Email,
  Language,
  LocationOn,
  Phone,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Grid,
  Stack,
  styled,
  Tooltip,
  Typography,
} from '@mui/material'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import { useGetBusinessByIdQuery } from '../../store/apis/businessApi'
import { selectThemeMode } from '../../store/features/theme/themeSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { selectRightDrawerWidth } from '../../store/features/right-drawer/rightDrawerSelectors'

type PropsType = {
  storeId: string
}

function StoreInfo({ storeId }: PropsType) {
  const rightDrawerLength = useAppSelector(selectRightDrawerWidth)
  const { data, error, isLoading } = useGetBusinessByIdQuery(storeId!)
  const themeMode = useAppSelector(selectThemeMode)

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

  return (
    <StoreInfoGrid filterDrawerLength={rightDrawerLength}>
      <StoreAvatarContainer item xs={12} xl={3}>
        <StoreAvatar src={logo} />

        <Box display='flex' alignItems='center' my={4}>
          {isProfileVerified ? (
            <Box display='flex' alignItems='center' mt={1}>
              <Tooltip title='Profile Verified' arrow>
                <CheckCircle
                  color='primary'
                  sx={{ marginX: 1, marginTop: '-4px' }}
                />
              </Tooltip>
              <Typography variant='body2' color='primary'>
                Profile Verified
              </Typography>
            </Box>
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
      </StoreAvatarContainer>

      <StoreDetailsContainer coverPhoto={coverPhoto} themeMode={themeMode}>
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold', my: 1 }}>
            {data?.data?.name}
          </Typography>
          <Typography variant='body1' sx={{ fontStyle: 'italic', mb: 2 }}>
            {data?.data?.description}
          </Typography>

          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} mt={2}>
            <StoreLinksContainer>
              <Email sx={{ margin: 1 }} color='primary' />
              <Typography variant='body2'>
                <a href={`mailto:${email}`}>{email}</a>
              </Typography>
            </StoreLinksContainer>

            <StoreLinksContainer>
              <Phone sx={{ margin: 1 }} color='primary' />
              <Typography variant='body2'>
                <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
              </Typography>
            </StoreLinksContainer>

            <StoreLinksContainer>
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
            </StoreLinksContainer>

            <StoreLinksContainer>
              <Language sx={{ margin: 1 }} color='primary' />
              <Typography variant='body2'>
                <a href={website!}>{website}</a>
              </Typography>
            </StoreLinksContainer>
          </Stack>
        </Box>
      </StoreDetailsContainer>
    </StoreInfoGrid>
  )
}

const StoreInfoGrid = (props: {
  children: React.ReactNode
  filterDrawerLength: number
}) => {
  const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    marginTop: '-2px',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${props.filterDrawerLength}px)`,
    },
  }))

  return <StyledGrid {...props} container />
}

const StoreAvatarContainer = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StoreAvatar = styled(Avatar)(() => ({
  width: 150,
  height: 150,
  backgroundColor: 'transparent',
}))

const StoreDetailsContainer = (props: {
  children: React.ReactNode
  coverPhoto?: string | undefined | null
  themeMode: string
}) => {
  let bgStyle = {}

  if (props.coverPhoto) {
    bgStyle = {
      backgroundImage: `url(${props.coverPhoto})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  } else {
    bgStyle = {
      backgroundColor: props.themeMode === 'light' ? '#f5f5f5' : '#424242',
    }
  }

  const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  }))

  return <StyledGrid {...props} xs={12} xl={9} style={bgStyle} />
}

const StoreLinksContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px 0',
  width: '100%',
}))

export default StoreInfo
