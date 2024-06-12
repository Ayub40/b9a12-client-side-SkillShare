import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://skillshare-server-zeta.vercel.app'
})


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;