import { Box, Card, Stack } from '@mui/material'
import DefaultErrorMessage from '../../components/default-error-message/DefaultErrorMessage'
import { useGetReportListQuery } from '../../store/apis/reportApi'
import { getFormattedDate } from './../../utils/helpers/dateTimeHelpers'

const Reports = () => {
  const { data, error, isLoading } = useGetReportListQuery({ page: 1, pageSize: 100 })

  if (isLoading) return <div>Loading...</div>

  if (error) {
    return <DefaultErrorMessage message="Error loading reports" />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        gap: '1rem'
      }}
    >
      {data?.data?.map((report) => (
        <Card key={report.id}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              gap: '1rem'
            }}
          >
            <h1>{report.reportName}</h1>
            <p>{report.content}</p>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'space-between',
                justifyContent: 'space-between',
                alignItems: 'center',
                justifyItems: 'center',
                gap: '1rem',
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}
              >
                <h3>Manufacturer: {report.manufacturer}</h3>
                <h3>Location: {report.location}</h3>
                <h3>Product Name: {report.productName}</h3>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  border: '2px solid red',
                  borderRadius: '1rem',
                  height: 'min-content',
                  padding: '1rem'
                }}
              >
                <h4>Sold Amount: {report.soldAmount}</h4>
                <h4>Supplied Amount: {report.suppliedAmount}</h4>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}
              >
                <p>Start Date: {getFormattedDate(new Date(report.startDate))}</p>
                <p>End Date: {getFormattedDate(new Date(report.endDate))}</p>
              </Box>
            </Box>
          </Stack>
        </Card>
      ))}
    </Box>
  )
}

export default Reports
