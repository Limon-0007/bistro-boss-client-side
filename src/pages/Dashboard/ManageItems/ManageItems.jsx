import React from "react";
import SectionTitle from "./../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import useMenu from "../../../Hooks/useMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();
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
        axiosSecure
          .delete(`/menu/${id}`, {
            method: "DELETE",
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Deleted item successfully!",
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
        <title>Bistro Boss || Manage Items</title>
      </Helmet>
      <SectionTitle
        heading="Manage All Items"
        subHeading="Hurry up!"
      ></SectionTitle>
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
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="font-semibold text-sm">
            {menu.map((row, index) => (
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
                <td className="text-right">${row.price}</td>
                <th>
                  <button
                    // onClick={() => handleEdit(row._id)}
                    className="btn btn-ghost btn-md bg-yellow-600 text-white rounded"
                  >
                    <FaEdit className="text-lg"></FaEdit>
                  </button>
                </th>
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

export default ManageItems;
