import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddItem = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imageHostingURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name, price, category, recipe } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            image: imgURL,
          };
          axiosSecure.post("/menu", newItem).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                icon: "success",
                title: "Item Added Successfully!",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          });
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss || Add an Item</title>
      </Helmet>
      <SectionTitle
        subHeading="what's new"
        heading="Add an item"
      ></SectionTitle>
      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full flex flex-col bg-slate-200 rounded p-8 mb-10"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Recipe Name*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Recipe Name"
            className="input input-bordered w-full"
            {...register("name", { required: true, maxLength: 120 })}
          />
        </div>
        {/* flex */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* dropdown */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold">Category*</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered font-semibold"
              defaultValue="Pick one"
            >
              <option disabled>Pick one</option>
              <option>Pizza</option>
              <option>Soup</option>
              <option>Salad</option>
              <option>Drinks</option>
              <option>Dessert</option>
            </select>
          </div>
          {/* price */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Price"
              className="input input-bordered w-full max-w-xs"
              {...register("price", { required: true })}
            />
          </div>
        </div>
        {/* textarea */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Recipe Details*</span>
          </label>

          <textarea
            className="textarea textarea-bordered"
            placeholder="Recipe Details"
            {...register("recipe", { required: true })}
          ></textarea>
        </div>
        {/* add file */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Item Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-ghost w-full max-w-xs bg-slate-300 font-semibold"
          />
        </div>
        {/* submit */}
        <div>
          <button
            className="mt-6 bg-[#946b2d] rounded px-4 py-2 text-white flex items-center gap-1 duration-200 hover:bg-[#643f08]"
            type="submit"
          >
            Add an Item <FaUtensils></FaUtensils>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
