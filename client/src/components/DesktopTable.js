import DesktopCurrencieStats from "./DesktopCurrencyStats";

const DesktopTable = ({ currencyStats, children }) => {
  return (
    <table className='nd-table' style={{padding: '0 5rem', maxWidth: '125rem'}}>
      <thead>
        <tr>
          {children}
        </tr>
      </thead>
      <tbody>
        {currencyStats.map((elem, index) => <DesktopCurrencieStats key={index} name={elem.name} symbol={elem.symbol} price={Number.parseFloat(elem.price)} marketCap={Number.parseFloat(elem.marketCap)} change={Number.parseFloat(elem.change)} volume={Number.parseFloat(elem['24hVolume'])} icon={elem.iconUrl} />)}
      </tbody>
    </table>
  )
}

export default DesktopTable