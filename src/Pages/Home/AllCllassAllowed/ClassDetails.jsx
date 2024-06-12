import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEnrolled from "../../../Hooks/useEnrolled";
// import useEnrolled from "../../../Hooks/useEnrolled";



const ClassDetails = () => {
    const { _id, name, email, price, description, image, title } = useLoaderData();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [, refetch] = useEnrolled();


    const handleEnroll = () => {
        // console.log(enroll, user.email);
        if (user && user.email) {
            // TODo:
            const enrolledClass = {
                enrollId: _id,
                email: user.email,
                name,
                title,
                image,
                price,
                description,
                status: 'pending'
            }

            axiosSecure.post('/enrolled', enrolledClass)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.insertedId) {
                        // Swal.fire({
                        //     position: "top-end",
                        //     icon: "success",
                        //     title: `${name} added to your cart`,
                        //     showConfirmButton: false,
                        //     timer: 1500
                        // });
                        // refetch cart to update the cart items count
                        refetch();
                        navigate('/dashboard/payment')
                    }
                })

        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //    send the user the login page
                    // navigate('/login', { state: { from: location } })

                }
            });
        }
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto mt-28">

            <div className="w-80 h-[560px] rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
                <img src={image} alt="" className="object-cover object-center rounded-t-md h-60 w-60 dark:bg-gray-500 rounded" />
                <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold tracking-wide">Title :{title}</h2>
                        <p>Teacher Name : {name}</p>
                        <p>Teacher Email : {email}</p>
                        {/* <p>Status : {cls.status}</p> */}
                        <p className="dark:text-gray-800">{description}</p>
                        <p className="font-black">Price: ${price}</p>
                        {/* <Link to={"/dashboard/payment"}> */}
                        <Link>
                            <button
                                // onClick={() => handleEnroll(item)} 
                                onClick={handleEnroll}
                                className="btn btn-outline border-0 border-b-4 mt-3 mb-7 bg-[#E8E8E8] border-[#BB8506]">Pay Now !
                            </button>
                        </Link>
                    </div>
                    {/* <Link to={`/dashboard/classDetails/${_id}`}> */}

                </div>
            </div>


        </div>
    );
};

export default ClassDetails;