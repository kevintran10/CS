import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
    </>
  )
}
export default Navbar