import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useClass from "../../../Hooks/useClass";
import Swal from "sweetalert2";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import { data } from "autoprefixer";


const AllClassed = () => {
    const [classes, refetch] = useClass();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();



    const handleApprove = async (item) => {
        // console.log(item);
        const res = await axiosSecure.patch(`/classes/class-requests/${item._id}/approve`);
        // console.log(res);
        if (res.data) {
            // console.log(res);

            // alert(' ldkjflaskj');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class Approved",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };


    const handleReject = async (item) => {
        // console.log(item);
        const res = await axiosSecure.patch(`/classes/class-requests/${item._id}/reject`);
        // console.log(res.data);
        if (res.data) {
            // console.log(res.data);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class Rejected",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
        // console.log('with image url', res.data);
    };

    const handleProgressClick = (item) => {
        if (item.status === 'accepted') {
            navigate(`/dashboard/seeProgressDetails/${item._id}`);
        }
    };


    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All itemes</h2>
                <h2 className="text-3xl">Total item: {classes.length}</h2>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Description</th>
                            {/* <th>Category</th> */}
                            <th>Progress</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((item, index) => (
                                <tr className="hover" key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.title}</td>
                                    <td><img src={item?.image} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
                                    <td>{item.email}</td>
                                    <td>{item.description}</td>
                                    {/* <td>{item.name}</td> */}
                                    {/* <td>{item.category}</td> */}
                                    <td>
                                        <button
                                            className="btn"
                                            disabled={item.status === 'rejected'}
                                            onClick={() => handleProgressClick(item)}
                                        >{item.status == 'accepted' ? "See progress" : "see progress"}</button>
                                    </td>
                                    <td className="flex">
                                        {/* {
                                            item.role === 'teacher' ? 'Teacher' :
                                                <button onClick={() => handleApprove(item)} itemName="btn btn-success btn-sm">
                                                    <FaCheck itemName="text-white text-xs"></FaCheck>
                                                </button>
                                        } */}
                                        <button
                                            onClick={() => handleApprove(item)} disabled={item.status !== 'pending'} className="btn btn-success btn-sm mr-1 tooltip" data-tip="Approved">
                                            <IoMdCheckmark className="text-white text-xs"></IoMdCheckmark>
                                        </button>
                                        <button
                                            onClick={() => handleReject(item)} disabled={item.status !== 'pending'} className="btn btn-danger btn-sm tooltip" data-tip="Reject">
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

export default AllClassed