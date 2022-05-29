import arrowUp from "../images/arrow-up.svg"
import arrowDown from "../images/arrow-down.svg"
import arrowUpActive from "../images/arrow-up-active.svg"
import arrowDownActive from "../images/arrow-down-active.svg"

const TableHead = ({ name, setOrderAndDirection, reset }) => {
  const a = (e) => {
    if (e.target.querySelector('p').textContent === 'Name (Date)') {
      sessionStorage.setItem('orderBy', 'listedAt');
    } else if (e.target.querySelector('p').textContent === 'Price') {
      sessionStorage.setItem('orderBy', 'price');
    } else if (e.target.querySelector('p').textContent === '24h Change') {
      sessionStorage.setItem('orderBy', 'change');
    } else if (e.target.querySelector('p').textContent === '24h Volume') {
      sessionStorage.setItem('orderBy', '24hVolume');
    } else if (e.target.querySelector('p').textContent === 'Market Cap') {
      sessionStorage.setItem('orderBy', 'marketCap');
    }

    const up = [...document.querySelectorAll('#arrows > .sort-up')].find(elem => elem.src.includes(arrowUpActive)) || false;
    const down = [...document.querySelectorAll('#arrows > .sort-down')].find(elem => elem.src.includes(arrowDownActive)) || false;

    if (e.target.querySelector('.sort-up') !== up && e.target.querySelector('.sort-down') !== down) {
      if (up) {
        up.src = arrowUp;
      } else if (down) {
        down.src = arrowDown
      };
      e.target.querySelector('.sort-up').src = arrowUpActive;
      sessionStorage.setItem('orderDirection', 'asc')
      setOrderAndDirection();
    } else if (e.target.querySelector('.sort-up') === up) {
      up.src = arrowUp;
      e.target.querySelector('.sort-down').src = arrowDownActive;
      sessionStorage.setItem('orderDirection', 'desc');
      setOrderAndDirection();
    } else if (e.target.querySelector('.sort-down') === down) {
      down.src = arrowDown;
      e.target.querySelector('.sort-up').src = arrowUp;
      reset()
    }
  }
  return (
    <th scope="col">
      <div onClick={a}>
        <p>{name}</p>
        <div id="arrows">
          <img className="sort-up" src={arrowUp} alt="arrow up" />
          <img className="sort-down" src={arrowDown} alt="arrow down" />
        </div>
      </div>    
    </th>
  )
}

export default TableHead