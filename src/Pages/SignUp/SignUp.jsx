import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

import loginPhoto from '../../assets/authentication2.png';
import loginPhoto2 from '../../assets/authentication.png';


// already install react hook from

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();



    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password, data.photoURL, data.name)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {

                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            image: data.photoURL,
                            role: 'student'
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database');
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                        // console.log('user profile info updated');

                    })
                    .catch(error => console.log(error))
            })
    }
    // console.log(watch("example"))



    return (
        <div style={{ backgroundImage: `url(${loginPhoto2})` }} className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <img src={loginPhoto} alt="" />
                </div>
                <div style={{ backgroundImage: `url(${loginPhoto2})` }} className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border-red-600 mt-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="tel" {...register("phone", {
                                // required: true, minLength: 11,
                                // maxLength: 20, pattern: /^[0-9]{10}$/

                                required: "Phone number is required",
                                minLength: { value: 11, message: "Must be at least 11 digits" },
                                maxLength: { value: 20, message: "Must be at most 20 digits" },
                                // pattern: { value: /^[0-9]+$/, message: "Must be between 11 and 20 digits" }
                                pattern: { value: "[0-9]{3}-[0-9]{2}-[0-9]{3}", message: "Must be between 11 and 20 digits" }


                            })} placeholder="Phone Number" className="input input-bordered" />
                            {errors.phone && <span className="text-red-600">{errors.phone.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])./
                            })} name="password" placeholder="password" className="input input-bordered" />
                            {errors.password?.type === "required" && (<p className="text-red-600">Password is required</p>)}
                            {errors.password?.type === "minLength" && (<p className="text-red-600">Password must be 6 characters</p>)}
                            {errors.password?.type === "pattern" && (<p className="text-red-600">Password must have one Upper case one lower case, one number and one special characters</p>)}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-accent text-white" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className="mb-5 ml-5"><small>Already have an account <Link to="/login" className="text-green-600">Please Login</Link></small></p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default SignUp;