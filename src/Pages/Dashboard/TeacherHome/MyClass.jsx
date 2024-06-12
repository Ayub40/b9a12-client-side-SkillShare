import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import useClass from "../../../Hooks/useClass";

// my class er see details button nia kaj korbo,,,online e asle,,insa allah

const MyClass = () => {
    const { user, loading } = useAuth();
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    // const [classes, refetch] = useClass();

    const { data: classes, error, isLoading, refetch } = useQuery({
        queryKey: ['classes', user?.email],
        queryFn: async () => {
            // const res = await axiosPublic.get(`/users/profile/${user.email}`);
            const res = await axiosSecure.get(`/classes/teacher/${user.email}`);
            return res.data;
        },
        enabled: !!user, 
    });

    if (loading || isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching profile: {error.message}</div>;
    }


    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/classes/${item._id}`);
                if (res.data.deletedCount > 0) {
                    // Refetch to update the UI
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.title} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };


    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {classes.map(cls => (
                <div key={cls._id}>

                    <div className="w-80 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
                        <img src={cls.image} alt="" className="object-cover object-center w-full rounded-t-md h-60 w-60 dark:bg-gray-500" />
                        <div className="flex flex-col justify-between p-6 space-y-8">
                            <div className="space-y-2">
                                <p>Name : {cls.name}</p>
                                <p>Email : {cls.email}</p>
                                <p>Status : {cls.status}</p>
                                <h2 className="text-3xl font-semibold tracking-wide">{cls.title}</h2>
                                <p className="dark:text-gray-800">{cls.description}</p>
                                <p>${cls.price}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link to={`/dashboard/updateItem/${cls._id}`}>
                                    <button type="button" className="btn btn-outline border-0 border-b-4 mt-4 bg-[#E8E8E8] border-[#BB8506]">Update</button>
                                </Link>
                                <button
                                    onClick={() => handleDeleteItem(cls)}
                                    className="btn btn-outline border-0 border-b-4 mt-4 bg-[#E8E8E8] border-[#BB8506]">Delete
                                </button>
                                {
                                    cls.status === 'accepted' ?
                                        (
                                            <Link to={`/dashboard/my-class/${cls._id}`}>
                                                <button type="button" className="btn btn-outline border-0 border-b-4 mt-4 bg-[#E8E8E8] border-[#BB8506]">See Details</button>
                                            </Link>
                                        )
                                        :
                                        (<button type="button" className="btn btn-outline border-0 border-b-4 mt-4 bg-[#E8E8E8] border-[#BB8506]" disabled>See Details</button>)
                                }
                            </div>
                        </div>
                    </div>



                    {/* <div className="card w-96 h-96 glass mb-5">
                        <figure><img src={cls.image} alt="car!" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Life hack</h2>
                            <p>How to park your car at your garage?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Learn now!</button>
                            </div>
                        </div>
                    </div> */}
                </div>
            ))}
        </div>
    );
};

export default MyClass;






/**
 * 
 * 
 */