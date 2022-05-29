const Filter = ({ name, settingTag }) => {
  const tag = (e) => {
    sessionStorage.setItem('tag', name === 'all' ? '' : name);
    settingTag();
    [...document.querySelectorAll('#filter > button')].map(elem => {
      if (elem !== e.target) {
        elem.style.backgroundColor = 'unset';
      }
    });
    e.target.style.backgroundColor = 'rgba(69, 181, 101, 0.074)';
  }
  return (
    <button onClick={tag}>{name}</button>
  )
}

export default Filter