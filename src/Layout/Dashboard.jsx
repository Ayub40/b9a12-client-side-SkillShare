import { FaBook, FaCalendar, FaHome, FaSearch, FaUsers } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { CgProfile } from "react-icons/cg";
import { CiSquareQuestion } from "react-icons/ci";
import { LiaSchoolSolid } from "react-icons/lia";
import useTeacher from "../Hooks/useTeacher";
// import useAuth from "../Hooks/useAuth";


const Dashboard = () => {

    // const { user } = useAuth();
    // TODO: get isAdmin value from the database
    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();

    // const isStudent = !isAdmin && !isTeacher;

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#D1A054]">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            (
                                <>
                                    <li><NavLink to='/dashboard/adminHome'>
                                        <FaHome></FaHome>
                                        Admin Home</NavLink>
                                    </li>
                                    <li><NavLink to='/dashboard/teacherRequest'>
                                        <CiSquareQuestion className="text-xl font-black" />
                                        Teacher Request</NavLink>
                                    </li>
                                    <li><NavLink to='/dashboard/users'>
                                        <FaUsers></FaUsers>
                                        Users</NavLink>
                                    </li>
                                    <li><NavLink to='/dashboard/allClasses'>
                                        <LiaSchoolSolid />
                                        All classes</NavLink>
                                    </li>
                                    <li><NavLink to='/dashboard/profile'>
                                        <CgProfile />
                                        Profile</NavLink>
                                    </li>

                                </>
                            )
                            : isTeacher ? (
                                <>
                                    <li><NavLink to='/dashboard/teacherHome'>
                                        <FaHome /> Teacher Home
                                    </NavLink></li>
                                    <li><NavLink to='/dashboard/addClasses'>
                                        <FaCalendar /> Add Class
                                    </NavLink></li>
                                    <li><NavLink to='/dashboard/myClass'>
                                        <FaBook /> My Class
                                    </NavLink></li>
                                    <li><NavLink to='/dashboard/profile'>
                                        <FaUsers /> Profile
                                    </NavLink></li>
                                </>
                            ) :

                                <>
                                    <li><NavLink to='/dashboard/studentHome'>
                                        <FaHome></FaHome>
                                        Student Home</NavLink>
                                    </li>
                                    <li><NavLink to='/dashboard/myEnrollClass'>
                                        <LiaSchoolSolid />
                                        My enroll class</NavLink>
                                    </li>

                                    {/* <li><NavLink to='/dashboard/payment'>
                                        Payment</NavLink>
                                    </li> */}

                                    <li><NavLink to='/dashboard/profile'>
                                        <CgProfile />
                                        My Profile</NavLink>
                                    </li>
                                </>
                    }

                    {/* shared nav links  */}

                    <div className="divider"></div>
                    <li><NavLink to='/'>
                        <FaHome></FaHome>
                        Home</NavLink>
                    </li>
                    <li><NavLink to='/order/salad'>
                        <FaSearch></FaSearch>
                        Menu</NavLink>
                    </li>
                    <li><NavLink to='/order/salad'>
                        {/* <FaVoicemail></FaVoicemail> */}
                        {/* <MdOutlineEmail /> */}
                        <MdEmail />
                        Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div >





        // <div className="flex">
        //     {/* Dashboard side bar */}
        //     <div className="w-64 min-h-screen bg-[#D1A054]">
        //         <ul className="menu p-4">
        //             {isAdmin ? (
        //                 <>
        //                     <li><NavLink to='/dashboard/adminHome'>
        //                         <FaHome /> Admin Home
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/addItems'>
        //                         <FaUtensils /> Add Item
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/manageItems'>
        //                         <FaList /> Manage Items
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/bookings'>
        //                         <FaBook /> Manage Bookings
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/users'>
        //                         <FaUsers /> All Users
        //                     </NavLink></li>
        //                 </>
        //             ) : isTeacher ? (
        //                 <>
        //                     <li><NavLink to='/dashboard/teacherHome'>
        //                         <FaHome /> Teacher Home
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/classes'>
        //                         <FaCalendar /> My Classes
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/assignments'>
        //                         <FaBook /> Assignments
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/students'>
        //                         <FaUsers /> Students
        //                     </NavLink></li>
        //                 </>
        //             ) : (
        //                 <>
        //                     <li><NavLink to='/dashboard/userHome'>
        //                         <FaHome /> Student Home
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/reservation'>
        //                         <FaCalendar /> Reservation
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/cart'>
        //                         <FaShoppingCart /> My Cart ({user.length})
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/review'>
        //                         <FaAd /> Add a Review
        //                     </NavLink></li>
        //                     <li><NavLink to='/dashboard/paymentHistory'>
        //                         <FaList /> Payment History
        //                     </NavLink></li>
        //                 </>
        //             )}
        //             {/* Shared nav links */}
        //             <div className="divider"></div>
        //             <li><NavLink to='/'>
        //                 <FaHome /> Home
        //             </NavLink></li>
        //             <li><NavLink to='/order/salad'>
        //                 <FaSearch /> Menu
        //             </NavLink></li>
        //             <li><NavLink to='/order/salad'>
        //                 <MdEmail /> Contact
        //             </NavLink></li>
        //         </ul>
        //     </div>
        //     {/* Dashboard content */}
        //     <div className="flex-1 p-8">
        //         <Outlet />
        //     </div>
        // </div>

    );
};

export default Dashboard;


{/* <li><NavLink to='/dashboard/cart'>
                            <FaShoppingCart></FaShoppingCart>
                            My Cart ({cart.length})</NavLink>
                        </li> */}



// {
//     isAdmin ? <>
//         <li><NavLink to='/dashboard/adminHome'>
//             <FaHome></FaHome>
//             Admin Home</NavLink>
//         </li>
//         <li><NavLink to='/dashboard/addItems'>
//             <FaUtensils></FaUtensils>
//             Add Item</NavLink>
//         </li>
//         <li><NavLink to='/dashboard/manageItems'>
//             <FaList></FaList>
//             Manage Items</NavLink>
//         </li>
//         <li><NavLink to='/dashboard/bookings'>
//             <FaBook></FaBook>
//             Manage Bookings</NavLink>
//         </li>
//         <li><NavLink to='/dashboard/users'>
//             <FaUsers></FaUsers>
//             All Users</NavLink>
//         </li>
//     </>
//         :
//     }