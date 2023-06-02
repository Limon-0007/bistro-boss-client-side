import React, { useContext } from "react";
import { AuthContext } from "../../../Providers/Providers";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../Hooks/UseCart";

const FoodCard = ({ items }) => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { image, name, recipe, price, _id } = items;

  const handleAddToCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        image,
        recipe,
        price,
        email: user.email,
      };
      fetch("https://bistro-boss-server-liard.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Added to cart successfully!",
              showConfirmButton: false,
              timer: 1200,
            });
          }
        });
    } else {
      Swal.fire({
        text: "Please login first to add this cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Image not found"
          className="rounded relative h-52 w-full"
        />
        <p className="absolute top-3 right-3 text-sm bg-slate-900 text-white py-1 px-2 rounded">
          ${price}
        </p>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg font-bold">{name}</h2>
        <p className="font-semibold text-xs">{recipe}</p>
        <div className="card-actions">
          <button
            onClick={() => handleAddToCart(items)}
            className="btn btn-outline border-0 px-6 border-b-4 mt-8 text-yellow-500 uppercase"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
