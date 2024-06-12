import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useEnrolled = () => {
    // tan stack query
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: enroll = [], isPending: loading } = useQuery({
        queryKey: ['enroll', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrolled/${user.email}`)  //carts name ta server er sathe milte hobe
            return res.data;
        }
    })

    return [enroll, refetch, loading]
};

export default useEnrolled;