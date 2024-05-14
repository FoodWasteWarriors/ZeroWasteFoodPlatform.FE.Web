import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import { useGetShoppingListQuery } from '../../store/apis/customerApi'
import { selectAuthUserId } from '../../store/features/auth/authSelectors'
import { useAppSelector } from '../../utils/hooks/reduxHooks'
import { getFinalPrice } from '../../utils/helpers/priceHelpers'
import { getFormattedDate } from '../../utils/helpers/dateTimeHelpers'
import { useMemo, useState } from 'react'
import { useRemoveFromShoppingListMutation } from '../../store/apis/storeProducsApi'
import { useNavigate } from 'react-router-dom'

function ShoppingList() {
  const userId = useAppSelector(selectAuthUserId)!
  const { data, error, isLoading } = useGetShoppingListQuery(userId)
  const [orderBy, setOrderBy] = useState<string>('name')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [removeFromShoppingList] = useRemoveFromShoppingListMutation()
  const navigate = useNavigate()

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrderBy(property)
    setOrder(isAsc ? 'desc' : 'asc')
  }

  const handleDeleteProduct = (productId: string) => {
    removeFromShoppingList({ productId })
    navigate(0)
  }

  const sortedData = useMemo(() => {
    if (data) {
      return [...data.data!].sort((a: any, b: any) => {
        let comparison = 0
        if (a[orderBy] > b[orderBy]) {
          comparison = 1
        } else if (a[orderBy] < b[orderBy]) {
          comparison = -1
        }
        return order === 'desc' ? comparison * -1 : comparison
      })
    }
    return []
  }, [data, orderBy, order])

  if (isLoading) return <div>Loading...</div>
  if (error)
    return <DefaultErrorMessage message='Error loading shopping list' />
  return (
    <Container>
      <Typography variant='h4' gutterBottom align='center' margin={2}>
        Shopping List
      </Typography>
      <Box sx={{ overflowX: 'auto', maxWidth: '85vw', margin: 'auto' }}>
        <Table aria-label='basic table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Product Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'storeName'}
                  direction={orderBy === 'storeName' ? order : 'asc'}
                  onClick={() => handleSort('storeName')}
                >
                  Store Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'originalPrice'}
                  direction={orderBy === 'originalPrice' ? order : 'asc'}
                  onClick={() => handleSort('originalPrice')}
                >
                  Original Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'percentDiscount'}
                  direction={orderBy === 'percentDiscount' ? order : 'asc'}
                  onClick={() => handleSort('percentDiscount')}
                >
                  Discount Percentage
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'discountedPrice'}
                  direction={orderBy === 'discountedPrice' ? order : 'asc'}
                  onClick={() => handleSort('discountedPrice')}
                >
                  Discounted Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'expirationDate'}
                  direction={orderBy === 'expirationDate' ? order : 'asc'}
                  onClick={() => handleSort('expirationDate')}
                >
                  Expiration Date
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.business.name}</TableCell>
                <TableCell>{item.originalPrice}</TableCell>
                <TableCell>{item.percentDiscount}</TableCell>
                <TableCell>
                  {getFinalPrice(item.originalPrice, item.percentDiscount)}
                </TableCell>
                <TableCell>{getFormattedDate(item.expirationDate!)}</TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  )
}

export default ShoppingList
