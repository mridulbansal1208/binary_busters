import { Link, useNavigate } from "react-router-dom";
import "./Header.css"

function Header() {

  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
    return
     {
      <div>
          <div className = "header">
          <Link to= "/"> HOME</Link>
            <span className="mt-3">Buy and sell online........in your city.</span>
            {!localStorage.getItem('token') ?
              <Link to= "/login"> LOGIN</Link> :
              <button onClick={handleLogout}>LOGOUT</button>
              }
              
          </div>
        </div>
    };
        
}
export default Header;