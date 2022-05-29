const MobileCurrencyStats = ({ name, symbol, price, volume, marketCap, change, icon }) => {
  return (
    <tr>
      <th scope="row">
        <figure style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <img src={icon} alt={`${name} icon`} width='13rem' />
          <ul>
            <li>
              <figcaption style={{fontSize: '1.7rem', fontWeight: '400', textAlign: 'left', height: '1.7rem', lineHeight: '1.7rem'}}>{symbol}</figcaption>
            </li>
            <li>
              <figcaption style={{fontSize: '1.3rem', fontWeight: '400', color: 'gray', height: '1.3rem', lineHeight: '1.3rem'}}>{name}</figcaption>
            </li>
          </ul>
        </figure>
      </th>
      <td>
        <ul>
          <li>{`$${price.toLocaleString('en-US')}`}</li>
          <li style={{color: change < 0 ? 'red' : change > 0 ? 'green' : 'black'}}>{!isNaN(change) ? `${change.toLocaleString('en-US')}%` : '-'}</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>{`$${volume.toLocaleString('en-US')}`}</li>
          <li>{`$${marketCap.toLocaleString('en-US')}`}</li>
        </ul>
      </td>
    </tr>
  )
}

export default MobileCurrencyStats