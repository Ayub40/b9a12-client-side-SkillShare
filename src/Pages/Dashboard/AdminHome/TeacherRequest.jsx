import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";


const TeacherRequest = () => {
    const { user } = useAuth();
    // console.log(user);
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['teacherRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teachers/teacher-requests');
            return res.data;
        }
    });


    const handleApprove = (user) => {
        axiosSecure.patch(`/teachers/teacher-requests/${user._id}/approve`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request Approved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleReject = (user) => {
        axiosSecure.patch(`/teachers/teacher-requests/${user._id}/reject`)
            .then(res => {
                // if (res.data.modifiedCount > 0) {
                if (res.data.success) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request Rejected",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };




    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Teacher Requests</h2>
                <h2 className="text-3xl">Total Requests: {requests.length}</h2>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Experience</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((user, index) => (
                                <tr className="hover" key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    {/* <td><img src={user.image} alt={user.name} style={{ width: '50px', height: '50px' }} /></td> */}
                                    {/* <td>{user.email}</td> */}
                                    <td><img src={user.image} alt="" /></td>
                                    <td>{user.experience}</td>
                                    <td>{user.title}</td>
                                    <td>{user.category}</td>
                                    <td>{user.status}</td>
                                    <td className="flex">
                                        {/* {
                                            user.role === 'teacher' ? 'Teacher' :
                                                <button onClick={() => handleApprove(user)} className="btn btn-success btn-sm">
                                                    <FaCheck className="text-white text-xs"></FaCheck>
                                                </button>
                                        } */}
                                        <button
                                            onClick={() => handleApprove(user)} disabled={user.status !== 'pending'} className="btn btn-success btn-sm mr-1 tooltip" data-tip="Approve">
                                            <FaCheck className="text-white text-xs"></FaCheck>
                                        </button>
                                        <button
                                            onClick={() => handleReject(user)} disabled={user.status !== 'pending'} className="btn btn-danger btn-sm tooltip" data-tip="Reject">
                                            <FaTimes className="text-white text-xl"></FaTimes>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherRequest;