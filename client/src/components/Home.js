import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DesktopTable from "./DesktopTable";
import MobileTable from "./MobileTable";
import FilteredCoinTable from "./FilteredCoinTable";
import Filter from "./Filter";
import GlobalStats from "./GlobalStats";
import TableHead from "./TableHead";

export const Home = () => {
  const [globalStats, setGlobalStats] = useState([]);
  const [currencyStats, setCurrencyStats] = useState([]);
  const [bodyWidth, setBodyWidth] = useState(0);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [orderBy , setOrderBy ] = useState('');
  const [orderDirection, setOrderDirection] = useState('');

  const filter = ['listedAt', 'price', 'change', '24hVolume'];
  const th = ['Name (Date)', 'Price', '24h Change', '24h Volume', 'Market Cap']
  const filteredSearch = ['all', 'defi', 'stablecoin', 'nft', 'dex', 'exchange', 'staking', 'dao', 'meme', 'privacy'];

  const resizeObserver = new ResizeObserver(entries => {
    setBodyWidth(entries[0].contentRect.width);
  });

  const options = {
    root: document.getElementById('filter'),
    rootMargin: '0px',
    threshold: 0.5
  };

  const intersectionObserver = new IntersectionObserver(entries => {
    if (entries.length === 1) {
      if (entries[0].target === document.querySelector('#filter > button:first-of-type') && entries[0].isIntersecting === true) {
        document.getElementById('left-arrow').style.display = 'none';
      } else if (entries[0].target === document.querySelector('#filter > button:first-of-type') && entries[0].isIntersecting === false) {
        document.getElementById('left-arrow').style.display = 'block';
      } else if (entries[0].target === document.querySelector('#filter > button:last-of-type') && entries[0].isIntersecting === true) {
        document.getElementById('right-arrow').style.display = 'none';
      } else if (entries[0].target === document.querySelector('#filter > button:last-of-type') && entries[0].isIntersecting === false) {
        document.getElementById('right-arrow').style.display = 'block';
      }
    } else {
      if (entries[0].isIntersecting === true && entries[1].isIntersecting === true) {
        document.getElementById('right-arrow').style.display = 'none';
        document.getElementById('left-arrow').style.display = 'none';
      } else if (entries[0].isIntersecting === false && entries[1].isIntersecting === false) {
        document.getElementById('right-arrow').style.display = 'block';
        document.getElementById('left-arrow').style.display = 'block';
      } else if (entries[0].isIntersecting === true && entries[1].isIntersecting === false) {
        document.getElementById('right-arrow').style.display = 'block';
        document.getElementById('left-arrow').style.display = 'none';
      } else {
        document.getElementById('right-arrow').style.display = 'none';
        document.getElementById('left-arrow').style.display = 'block';

      }
    }
    
  }, options);

  useEffect(() => {
    resizeObserver.observe(document.querySelector('body'));
    [...document.querySelectorAll('#filter > *')].forEach(elem => {
      if (elem === document.querySelector('#filter > button:first-of-type') || elem === document.querySelector('#filter > button:last-of-type')) {
        intersectionObserver.observe(elem);
      }
    });

    const gobalCryptoStats = async () => {
      const res = await fetch('/stats');
      const resJson = await res.json();
      setGlobalStats([['Total Cryptocurrencies:', resJson.data.totalCoins.toLocaleString('en-US')], ['Total Markets:', resJson.data.totalMarkets.toLocaleString('en-US')], ['Total Market Cap:', Number.parseFloat(resJson.data.totalMarketCap).toLocaleString('en-US')], ['Total Exchanges:', resJson.data.totalExchanges.toLocaleString('en-US')], ['Total 24h Volume:', Number.parseFloat(resJson.data.total24hVolume).toLocaleString('en-US')]]);
    }
    gobalCryptoStats();
  }, []);

  useEffect(() => {
    const currencieSearch = async () => {
      const res = await fetch(`/coins?search=${search}&tags=${tag}&offset=${offset}&orderBy=${orderBy}&orderDirection=${orderDirection}`);
      const resJson = await res.json();
      setTotal(resJson.data.stats.total);
      setOffset(0)
      setCurrencyStats(resJson.data.coins);
    }
    currencieSearch()
  }, [search, tag, orderBy, orderDirection]);

  useEffect(() => {
    const currencieSearch = async () => {
      const res = await fetch(`/coins?search=${search}&tags=${tag}&offset=${offset}&orderBy=${orderBy}&orderDirection=${orderDirection}`);
      const resJson = await res.json();
      setTotal(resJson.data.stats.total);
      setCurrencyStats(resJson.data.coins);
    }
    currencieSearch()
  }, [offset]);

  const searchInput = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length !== 0) {
      document.querySelector('label').style.display = 'none';
    } else {
      document.querySelector('label').style.display = 'flex';
    }
  }

  const settingTag = () => {
    setTag(sessionStorage.getItem('tag'));
  }

  const scrollRight = () => {
    document.querySelector('#filter > button:last-of-type').scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'});
  }
  const scrollLeft = () => {
    document.querySelector('#filter > button:first-of-type').scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'end'});
  }

  const previousOffset = () => {
    setOffset(a => a !== 0 ? a-10 : 0);
  }
  const nextOffset = () => {
    setOffset(a => (total - (a+10)) > 0 ? a+10 : a);
  }

  const setOrderAndDirection = () => {
    setOrderBy(sessionStorage.getItem('orderBy'));
    setOrderDirection(sessionStorage.getItem('orderDirection'));
  }

  const reset = () => {
    setOrderBy('');
    setOrderDirection('');
  }

  return (
    <main>
      <div>
        <div id='global-stats'>
          <h1>Global Crypto Stats</h1>
          <dl>
            {globalStats.map((elem, index) => <GlobalStats key={index} stats={elem}/>)}
          </dl>
          {bodyWidth > 900 ? 
          <div id="filtered-coins">
            {filter.map((elem, index) => <FilteredCoinTable key={index} filter={elem} />)}
          </div> : null}
        </div>
      </div>
      
      <div id="table">
        <div id="search">
          <div>
            <label htmlFor="glass">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="2x" color="rgb(197, 197, 197)" />
            </label>
            <input onInput={searchInput} type="text" id="glass" placeholder="Search Coin Name" />
          </div>
          <div id="filter">
            <FontAwesomeIcon onClick={scrollLeft} id="left-arrow" icon="fa-solid fa-arrow-left-long" size="xl" color="gray" />
            {filteredSearch.map((elem, index) => <Filter key={index} name={elem} settingTag={settingTag} />)}
            <FontAwesomeIcon onClick={scrollRight} id="right-arrow" icon="fa-solid fa-arrow-right-long" size="xl" color="gray" />
          </div>
        </div>

        {bodyWidth > 900 ? 
        <DesktopTable currencyStats={currencyStats} >
          {th.map((elem, index) => <TableHead key={index} name={elem} setOrderAndDirection={setOrderAndDirection} reset={reset} />)} 
        </DesktopTable> : 
        <MobileTable currencyStats={currencyStats} />}

        <div id="btns">
          <button onClick={previousOffset}>previous</button>
          <p>{`${total !== 0 ? (offset / 10) + 1 : 0}/${Math.ceil(total / 10)}`}</p>
          <button onClick={nextOffset}>next</button>
        </div>
      </div>
    </main>
  )
}