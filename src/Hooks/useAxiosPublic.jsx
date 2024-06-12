import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'http://localhost:1001'
})


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;