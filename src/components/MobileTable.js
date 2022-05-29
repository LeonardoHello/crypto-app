import MobileCurrencyStats from "./MobileCurrencyStats";

const MobileTable = ({ currencyStats }) => {
  const color = {
    color: 'gray'
  }
  return (
    <table className='nd-table' style={{padding: '0 2rem'}}>
      <thead>
        <tr>
          <th style={color} scope="col">Name</th>
          <th style={color} scope="col">Price/Change</th>
          <th style={color} scope="col">Volume/Cap</th>
        </tr>
      </thead>
      <tbody>
        {currencyStats.map((elem, index) => <MobileCurrencyStats key={index} name={elem.name} symbol={elem.symbol} price={Number.parseFloat(elem.price)} marketCap={Number.parseFloat(elem.marketCap)} change={Number.parseFloat(elem.change)} volume={Number.parseFloat(elem['24hVolume'])} icon={elem.iconUrl} />)}
      </tbody>
    </table>
  )
}

export default MobileTable