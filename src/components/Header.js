import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {

  return (
    <div className='header'>
      <h1>{title}</h1>
      {/* showAdd ? is the same as showAdd == true ? */}
      <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd} />
    </div>
  )
}

export default Header
