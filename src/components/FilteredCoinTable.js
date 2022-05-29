import { useState, useEffect } from "react";
import FilteredCoinStats from "./FilteredCoinStats";

const FilteredCoinTable = ({ filter }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const api = async () => {
      const res = await fetch(`http://localhost:3001/coins/sort?sort=${filter}`);
      const resJson = await res.json();
      setStats(resJson.data.coins);
    }
    api();
  }, []);

  return (
    <table>
      <caption>{filter === 'listedAt' ? 'Newest Coin' : filter === 'price' ? 'Priciest Coin' : filter === 'change' ? 'Top Gainer' : filter === '24hVolume' ? 'Top 24h Volume Coin' : null}</caption>
      <tbody>
        {stats.map((elem, index) => <FilteredCoinStats key={index} icon={elem.iconUrl} symbol={elem.symbol} price={Number.parseFloat(elem.price)} change={elem.change} />)}
      </tbody>
    </table>
  );
};

export default FilteredCoinTable