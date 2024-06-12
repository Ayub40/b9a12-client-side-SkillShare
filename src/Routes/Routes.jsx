import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import TeacherHome from "../Pages/Dashboard/TeacherHome/TeacherHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TeachOnSkillShare from "../Pages/TeachOnSkillShare/TeachOnSkillShare";
import TeacherRequest from "../Pages/Dashboard/AdminHome/TeacherRequest";
import TeacherRoute from "./TeacherRoute";
import AddClass from "../Pages/Dashboard/TeacherHome/AddClass";
import AllClassed from "../Pages/Dashboard/AdminHome/AllClassed";
import SeeProgressDetails from "../Pages/Dashboard/AdminHome/SeeProgressDetails";
import Profile from "../Shared/Profile/Profile";
import MyClass from "../Pages/Dashboard/TeacherHome/MyClass";
import UpdateItem from "../Pages/Dashboard/TeacherHome/UpdateItem";
import AllClassAllowed from "../Pages/Home/AllCllassAllowed/AllClassAllowed";
import ClassDetails from "../Pages/Home/AllCllassAllowed/ClassDetails";
import Payment from "../Pages/Dashboard/StudentHome/Payment";
import MyEnrolledClass from "../Pages/Dashboard/StudentHome/MyEnrolledClass";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'teach',
                element: <TeachOnSkillShare></TeachOnSkillShare>
            },
            {
                path: 'allClassAllowed',
                element: <AllClassAllowed></AllClassAllowed>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // student (normal user) routes
            {
                path: 'studentHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'classDetails/:id',
                element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:1001/classes/${params.id}`)
            },
            {
                path: 'payment',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: 'myEnrollClass',
                element: <PrivateRoute><MyEnrolledClass></MyEnrolledClass></PrivateRoute>
            },
            // teacher routes
            {
                path: 'teacherHome',
                element: <TeacherRoute><TeacherHome></TeacherHome></TeacherRoute>
            },
            {
                path: 'addClasses',
                element: <TeacherRoute><AddClass></AddClass></TeacherRoute>
            },
            {
                path: 'myClass',
                element: <TeacherRoute><MyClass></MyClass></TeacherRoute>
            },
            {
                path: 'updateItem/:id',
                element: <TeacherRoute><UpdateItem></UpdateItem></TeacherRoute>,
                loader: ({ params }) => fetch(`http://localhost:1001/classes/${params.id}`)
            },
            // admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
                // element: <AdminHome></AdminHome>
            },

            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'teacherRequest',
                element: <AdminRoute><TeacherRequest></TeacherRequest></AdminRoute>
            },
            {
                path: 'allClasses',
                element: <AdminRoute><AllClassed></AllClassed></AdminRoute>
            },
            {
                path: 'seeProgressDetails/:id',
                element: <AdminRoute><SeeProgressDetails></SeeProgressDetails></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:1001/classes/${params.id}`)
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            }
        ]
    }
]);
