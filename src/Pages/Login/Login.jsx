import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import loginPhoto from '../../assets/authentication2.png';
import loginPhoto2 from '../../assets/authentication.png';
import SocialLogin from "../SignUp/SocialLogin";
import Swal from "sweetalert2";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Login = () => {
    // const [disabled, setDisabled] = useState(true);
    // const axiosPublic = useAxiosPublic();

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    console.log('state in the location login page', location.state);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const result = await signIn(email, password);
            const user = result.user;
            console.log(user);
            Swal.fire({
                title: "User Login Successful",
                showClass: {
                    popup: 'animate__animated animate__fadeInUp animate__faster'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown animate__faster'
                }
            });
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <div style={{ backgroundImage: `url(${loginPhoto2})` }} className="hero min-h-screen bg-base-200 login-item">
            <div className="hero-content flex-col md:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <img src={loginPhoto} alt="Login" />
                </div>
                <div style={{ backgroundImage: `url(${loginPhoto2})` }} className="card w-1/2 max-w-sm shadow-2xl bg-base-100 border">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="email"
                                className="input input-bordered"
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                placeholder="password"
                                className="input input-bordered"
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <input className="btn  btn-accent text-white" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='mb-4 ml-4'><small>New Here? Create an account   <Link className="text-[#FF8C47] font-bold" to="/signup">Please Sign Up</Link></small></p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;