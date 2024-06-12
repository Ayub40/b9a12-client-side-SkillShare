import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const Profile = () => {
    // const { user, loading } = useContext(AuthContext);
    const { user, loading } = useAuth();
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: profile, error, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            // const res = await axiosPublic.get(`/users/profile/${user.email}`);
            const res = await axiosSecure.get(`/users/profile/${user.email}`);
            return res.data;
        },
        enabled: !!user, // Only run the query if the user is defined
    });

    if (loading || isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching profile: {error.message}</div>;
    }



    return (
        <div className="m-10 max-w-sm">
            <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
                <div className="relative mx-auto w-36 rounded-full">
                    <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                    {/* <img className="mx-auto h-auto w-full rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" /> */}
                    <img className="mx-auto h-auto w-full rounded-full" src={profile.image} alt="" />
                </div>
                <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">{profile.name}</h1>
                {/* <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{profile.role}</h3>
                <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!</p> */}
                <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                    <li className="flex items-center py-3 text-sm">
                        <span>Role :</span>
                        <span className="ml-auto"><span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">{profile.role}</span></span>
                    </li>
                    <li className="flex items-center py-3 text-sm">
                        <span>Email :</span>
                        <span className="ml-auto">{profile.email}</span>
                    </li>
                    <li className="flex items-center py-3 text-sm">
                        <span>Phone Number :</span>
                        <span className="ml-auto">{profile.phone}</span>
                    </li>
                </ul>
            </div>
        </div>








        // <div>
        //     <h1>My Profile</h1>
        //     <img src={profile.image} alt={profile.name} />
        //     <p><strong>Name:</strong> {profile.name}</p>
        //     <p><strong>Role:</strong> {profile.role}</p>
        //     <p><strong>Email:</strong> {profile.email}</p>
        //     <p><strong>Phone:</strong> {profile.phone}</p>
        // </div>
    );
};

export default Profile;