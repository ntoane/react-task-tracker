import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {

  // This Hook gives us access to path name
  const location = useLocation()

  return (
    <div className='header'>
      <h1>{title}</h1>
      {/* showAdd ? is the same as showAdd == true ? */}
      {location.pathname == '/' && <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd}
      />}
    </div>
  )
}

export default Header
