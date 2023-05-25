import Button from './Button'

const Header = ({ title }) => {
const onClick = () => {
    console.log('Header click')
}

  return (
    <div className='header'>
      <h1>{title}</h1>
      <Button color='green' text='Hello' onClick={onClick} />
    </div>
  )
}

export default Header
