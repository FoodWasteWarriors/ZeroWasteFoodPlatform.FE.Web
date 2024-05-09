type ServiceObjectResponse<T> = {
  hasData: boolean
  data: T | null
  hasFailed: boolean
  extraData: any[]
  resultCode: string
  dataType: string
  isList: boolean
  messages: ResponseMessage[]
}

type ResponseMessage = {
  code: string
  description: string
  isWarning: boolean
  isError: boolean
  isSuccess: boolean
}

type ServiceCollectionResponse<T> = ServiceObjectResponse<T> & {
  totalItemCount: number
  totalPageCount: number
  currentPage: number
  nextPage: number | null
  data: T[] | null
}
