// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEnrolled from "../../../Hooks/useEnrolled";





const MyEnrolledClass = () => {
    // const { user } = useAuth();
    // const axiosSecure = useAxiosSecure();
    const [enroll] = useEnrolled();

    // const { data: enrs = [] } = useQuery({
    //     queryKey: ['enrs', user.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/enrs/${user.email}`)
    //         return res.data;
    //     }
    // })


    return (
        <div className="">
            <h2>Total Enrolled Class: {enroll.length} </h2>
            {
                enroll.map(enr => (
                    <div key={enr._id} className="grid md:grid-cols-3 mb-10">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src={enr.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{enr.title}</h2>
                                <p>Name : {enr.name}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MyEnrolledClass;