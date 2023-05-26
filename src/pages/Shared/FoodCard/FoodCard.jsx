import React from "react";

const FoodCard = ({ items }) => {
  const { image, name, recipe, price } = items;
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Image not found" className="rounded relative h-52 w-full" />
        <p className="absolute top-3 right-3 text-sm bg-slate-900 text-white py-1 px-2 rounded">${price}</p>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg font-bold">{name}</h2>
        <p className="font-semibold text-xs">{recipe}</p>
        <div className="card-actions">
          <button className="btn btn-outline border-0 px-6 border-b-4 mt-8 text-yellow-500 uppercase">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
