import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {

  const axiosPublic =useAxiosPublic();


  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {createUser, updateUserProfile} = useContext(AuthContext);
  const navigate =useNavigate();


  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
        .then( () => {
            //create user entry in the  database
            const userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
              if(res.data.insertedId){
                console.log('user added to the database');
                reset();
                Swal.fire({
                icon: "success",
                
                text: "User created successfully",
               
                });
                navigate('/')
              }
            })
            
        })
        .catch(error => console.log(error))
    })

  };

  // console.log(watch("example"))

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  {...register("name", { required: true })}
                  name="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  {...register("photoURL", { required: true })}
                  
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  name="email"
                  className="input input-bordered"
                  // required
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                  })}
                  name="password"
                  className="input input-bordered"
                />
                {/* {errors.password && <span className="text-red-600">Password is required</span>} */}
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less then 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one uppercase character, one lowercase
                    character, one number and one special character
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                {/* <button className="btn btn-primary">Sign Up</button> */}
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className="text-center">
              <small>
                All ready have an account?{" "}
                <Link to="/login">
                  <span className="text-blue-600">Please login</span>
                </Link>
              </small>
            </p>
            <div className="divider px-7"></div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
