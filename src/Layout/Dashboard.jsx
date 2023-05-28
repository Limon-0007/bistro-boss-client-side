import React from "react";
import {
  FaBars,
  FaCalendarAlt,
  FaHome,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/UseCart";

const Dashboard = () => {
  const [cart] = useCart();
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
            <NavLink to="/dashboard/mycart">
              <FaShoppingCart></FaShoppingCart>
              My Cart
              <span className="badge badge-secondary">+{cart.length || 0}</span>
            </NavLink>
          </li>
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
            <NavLink to="/order/salad">Order</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
