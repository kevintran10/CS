import Navbar from "./Navbar/Navbar";
import Rawg from "./RawgAPI/Rawg"

import './Navbar/Navbar.css'
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import SignUpForm from "./SignUp/SignUpForm";

function App() {
 

  return (
    <>
      
      <Navbar />
      <Route path="/" element={<Rawg />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<SignUpForm />} />
    </>
  )
}

export default App
