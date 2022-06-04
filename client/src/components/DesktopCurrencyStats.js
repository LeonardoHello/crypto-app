const DesktopCurrencyStats = ({ name, symbol, price, volume, marketCap, change, icon }) => {

  const figure = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem'
  }

  return (
    <tr>
      <th scope="row">
        <figure style={figure}>
          <img src={icon} alt={`${name} icon`}/>
          <figcaption style={{fontSize: '1.7rem', fontWeight: '500'}}>{symbol}</figcaption>
          <figcaption style={{fontWeight: '300', color: 'gray'}}>{name}</figcaption>
        </figure>
      </th>
      <td>{`$${price.toLocaleString('en-US')}`}</td>
      <td style={{color: change < 0 ? 'red' : change > 0 ? 'green' : 'black'}}>{!isNaN(change) ? `${change.toLocaleString('en-US')}%` : '-'}</td>
      <td>{`$${volume.toLocaleString('en-US')}`}</td>
      <td>{`$${marketCap.toLocaleString('en-US')}`}</td>
    </tr>
  )
}

export default DesktopCurrencyStats