import React from "react";
import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/UseCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Deleted from cart successfully!",
                showConfirmButton: false,
                timer: 1200,
              });
              refetch();
            }
          });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Bistro Boss || My Cart</title>
      </Helmet>
      <div className="font-semibold flex justify-between uppercase mb-10 items-center">
        <h2>Total Items: {cart.length}</h2>
        <h2>Total Price: ${total}</h2>
        <button className="bg-[#d1a054] btn-sm rounded text-white font-semibold hover:bg-slate-800 duration-200">
          Pay Now
        </button>
      </div>
      {/* table */}

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="font-semibold text-sm">
            {cart.map((row, index) => (
              <tr key={row._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squire w-20 h-20">
                        <img src={row.image} alt="Image not found" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{row.name}</td>
                <td>${row.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(row._id)}
                    className="btn btn-ghost btn-md bg-red-600 text-white rounded"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
