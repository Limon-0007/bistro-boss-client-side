import React from "react";
import {
  FaBars,
  FaBook,
  FaCalendarAlt,
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/UseCart";
import useAdmin from "../Hooks/UseAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  // TODO: lod data from the server to to have dynamic isAdmin based on data
  // const isAdmin = true;
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content px-8 mt-6">
        {/* flex flex-col items-center justify-center */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60 font-semibold text-sm bg-[#d1a054]">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addItem">
                  <FaUtensils></FaUtensils>
                  Add an Item
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaWallet></FaWallet>
                  Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/bookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendarAlt></FaCalendarAlt>
                  Reservations
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/payment">
                  <FaWallet></FaWallet>
                  Payment History
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/myCart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart
                  <span className="badge badge-secondary">
                    +{cart.length || 0}
                  </span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <FaHome></FaHome>Home{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <FaBars></FaBars> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaShoppingBag></FaShoppingBag>
              Order</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
