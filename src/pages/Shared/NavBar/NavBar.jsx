import { Link } from "react-router-dom";
import logo from "../../../assets/home/Group 1.png"

const NavBar = () => {
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li tabIndex={0}>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order">Orders</Link>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar font-semibold fixed z-10 bg-opacity-30 max-w-screen-xl bg-black md:text-white md:py-4 py-2">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost md:w-52 w-4/5">
            <img src={logo} alt="" />
           </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <Link className="px-4 py-2 bg-slate-700 rounded text-white font-semibold duration-200 hover:bg-slate-950">Get started</Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
