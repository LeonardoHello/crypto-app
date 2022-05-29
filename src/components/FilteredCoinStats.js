const FilteredCoinStats = ({ icon, symbol, price, change }) => {
  return (
    <tr>
      <td>
        <figure>
          <img src={icon} alt="cryptocurrency icon" />
          <figcaption>{symbol}</figcaption>
        </figure>
      </td>
      <td>{!isNaN(price) ? price.toLocaleString('en-US') : '-'}</td>
      <td style={{color: change < 0 ? 'red' : change > 0 ? 'green' : 'black'}}>{change !== null ? `${change}%` : '-'}</td>
    </tr>
  )
}

export default FilteredCoinStats