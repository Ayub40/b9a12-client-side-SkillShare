import { Link } from "react-router-dom";
import logo from '../../assets/images.png';
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import useTeacher from "../../Hooks/useTeacher";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            // .then(error => console.log(error))

    }

    const navOptions = <>
        <li><Link to='/'>Home</Link> </li>
        <li><Link to='/allClassAllowed'>All Classes</Link></li>
        <li><Link to='/teach'>Teach On SkillShare</Link></li>

    </>


    return (
        <div className="navbar fixed z-10 top-0 max-w-screen-xl bg-opacity-30 bg-[#244D61] text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <div className="flex gap-2">
                    <img className="w-10 rounded-full h-9 mt-2" src={logo} alt="" />
                    <a className="btn btn-ghost text-xl">SkillShare</a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end mr-28">

                {user ? (
                    <div className="dropdown dropdown-left">
                        <div tabIndex={0} role="button" className="m-1">
                            <img className="rounded-full w-11" src={user.photoURL || "https://i.ibb.co/z6TYbrc/user.png"} alt="User Profile" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#5689C0] rounded-box w-56">
                            <li className="mb-1 ml-2 md:px-12">{user.displayName}</li>
                            {isAdmin && (
                                <li>
                                    <Link to='/dashboard/adminHome'>
                                        <button className="btn btn-sm mb-1 ml-2 md:px-12">Dashboard</button>
                                    </Link>
                                </li>
                            )}
                            {isTeacher && !isAdmin && (
                                <li>
                                    <Link to='/dashboard/teacherHome'>
                                        <button className="btn btn-sm mb-1 ml-2 md:px-12">Dashboard</button>
                                    </Link>
                                </li>
                            )}
                            {!isAdmin && !isTeacher && (
                                <li>
                                    <Link to='/dashboard/studentHome'>
                                        <button className="btn btn-sm mb-1 ml-2 md:px-12">Dashboard</button>
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button onClick={handleLogOut} className="btn btn-sm mb-1 ml-2 md:px-8">Log Out</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to='/login'>
                        <button className="sm:btn btn-outline ml-2 px-12 mb-2">Sign In</button>
                    </Link>
                )}














                {/* {
                    user ?
                        (
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="m-1">
                                    <img className="rounded-full w-11" src={user.photoURL || "https://i.ibb.co/z6TYbrc/user.png"} alt="User Profile" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#5689C0] rounded-box w-52">
                                    <li className="mb-1 ml-2 md:px-12">{user.displayName}</li>
                                    {isAdmin ? (
                                        <li>
                                            <Link to='/dashboard/adminHome'>
                                                <button className="btn btn-sm mb-1 ml-2 md:px-12">Dashboard</button>
                                            </Link>
                                        </li>
                                    ) : (
                                        <li>
                                            <Link to='/dashboard/studentHome'>
                                                <button className="btn btn-sm mb-1 ml-2 md:px-12">Dashboard</button>
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <button onClick={handleLogOut} className="btn btn-sm ml-2 md:px-12">Log Out</button>
                                    </li>
                                </ul>
                            </div>
                        ) :
                        (
                            <Link to='/login'>
                                <button className="sm:btn btn-outline ml-2 px-12 mb-2">Sign In</button>
                            </Link>
                        )
                } */}

            </div>
        </div>
    );
};

export default Navbar;