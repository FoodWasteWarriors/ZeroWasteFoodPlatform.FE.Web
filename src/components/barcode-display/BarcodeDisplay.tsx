import Barcode from 'react-barcode'

function BarcodeDisplay({ barcode }: { barcode: string }) {
  return <Barcode value={barcode} />
}

export default BarcodeDisplay
