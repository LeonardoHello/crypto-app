const GlobalStats = ({ stats }) => {
  return (
    <div>
      <dt>{stats[0]}</dt>
      <dd>{stats[0] === 'Total 24h Volume:' || stats[0] === 'Total Market Cap:' ? `$${stats[1]}` : stats[1]    || 0}</dd>
    </div>
  )
}

export default GlobalStats