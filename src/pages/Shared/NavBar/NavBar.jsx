import { Link } from "react-router-dom";
import logo from "../../../assets/home/Group 1.png";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/Providers";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then((result) => {
        Swal.fire("Log out Success");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li tabIndex={0}>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Orders</Link>
      </li>
      <li>
        <Link to="/">
          <button className="btn gap-2">
            <FaShoppingCart className="text-xl"></FaShoppingCart>
            <div className="badge badge-secondary">+0</div>
          </button>
        </Link>
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
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-slate-700 rounded text-white font-semibold duration-200 hover:bg-slate-950 me-4"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-hover dropdown-end me-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow text-slate-900 menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
