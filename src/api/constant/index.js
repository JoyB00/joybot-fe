import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_ENDPOINT;

const useAxios = axios.create({baseURL: BASE_URL});


export default useAxios;
