import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom mb={4} align="center">
        Reports
      </Typography>
      <Grid container spacing={3}>
        {data?.data?.map((report) => (
          <Grid item xs={12} md={6} lg={4} key={report.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {report.reportName}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {report.content}
                </Typography>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <Typography variant="body2">Manufacturer: {report.manufacturer}</Typography>
                  <Typography variant="body2">Location: {report.location}</Typography>
                  <Typography variant="body2">Product Name: {report.productName}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: 2,
                      p: 1,
                      backgroundColor: 'background.default',
                      borderRadius: 1
                    }}
                  >
                    <Typography variant="body2">Sold Amount: {report.soldAmount}</Typography>
                    <Typography variant="body2">Supplied Amount: {report.suppliedAmount}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: 2
                    }}
                  >
                    <Typography variant="body2">Start Date: {getFormattedDate(new Date(report.startDate))}</Typography>
                    <Typography variant="body2">End Date: {getFormattedDate(new Date(report.endDate))}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Reports
