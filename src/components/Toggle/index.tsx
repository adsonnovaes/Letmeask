import { useEffect, useState } from 'react';
import { setTheme } from '../../utils/theme';

import './styles.scss';

function Toggle() {
  const [togClass, setTogClass] = useState('dark');
  let theme = localStorage.getItem('theme');

  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
      setTogClass('dark')
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setTheme('theme-light');
      setTogClass('light')
    }
  }, [theme])

  const handleOnClick = () => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
      setTogClass('light')
    } else {
      setTheme('theme-dark');
      setTogClass('dark')
    }
  }

  return (
    <div className="container--toggle">
      {
        togClass === "light" ?
          <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked />
          :
          <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
      }
      <label htmlFor="toggle" className="toggle--label">
        <span className="toggle--label-background"></span>
      </label>
    </div>
  )
}

export default Toggle;