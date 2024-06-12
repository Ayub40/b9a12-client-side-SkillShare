import { Link } from "react-router-dom";
import useClass from "../../../Hooks/useClass";


const AllClassAllowed = () => {
    const [classes] = useClass();
    const allClass = classes.filter(item => item.status === 'accepted')


    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto mt-28">
            {allClass.map(cls => (
                <div key={cls._id}>

                    <div className="w-80 h-[550px] rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
                        <img src={cls.image} alt="" className="object-cover object-center rounded-t-md h-60 w-60 dark:bg-gray-500 rounded" />
                        <div className="flex flex-col justify-between p-6 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-semibold tracking-wide">Title :{cls.title}</h2>
                                <p>Name : {cls.name}</p>
                                {/* <p>Email : {cls.email}</p> */}
                                {/* <p>Status : {cls.status}</p> */}
                                <p className="dark:text-gray-800">{cls.description}</p>
                                <p>${cls.price}</p>
                            </div>
                            <Link to={`/dashboard/classDetails/${cls._id}`}>
                                <button className="btn btn-outline border-0 border-b-4 mt-3 bg-[#E8E8E8] border-[#BB8506]">Enroll Now !</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllClassAllowed;