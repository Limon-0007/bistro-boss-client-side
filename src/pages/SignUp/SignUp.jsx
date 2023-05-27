import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/Providers";
import Swal from "sweetalert2";

const SignUp = () => {
  <Helmet>
    <title>Bistro Boss || Sign Up</title>
  </Helmet>;
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        reset();
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'User created successfully',
                showConfirmButton: false,
                timer: 1200
              })
              navigate("/")
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col md:flex-row md:px-20 px-4">
        <div className="text-center md:w-1/2 md:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
          <p className="py-6 md:pe-8 text-justify font-semibold text-sm">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100 font-semibold">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  Name is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  Photo URL is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  Email is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])/,
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  Password must be 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  Password must be one uppercase, one Lowercase, one special
                  character and one number
                </p>
              )}
            </div>
            <div className="form-control mt-4">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <p className="text-center font-semibold text-orange-500 mb-6">
            <small>
              Already have an account?{" "}
              <Link className="hover:underline" to="/login">
                Please Login
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
