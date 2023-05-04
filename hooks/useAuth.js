import {useState, useEffect} from 'react';
import axios from 'axios';
import {extractTokenFromCookie} from "@/helpers/extractToken";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                //GET THE TOKEN
                const token = extractTokenFromCookie(document.cookie);

                const response = await axios.get(`https://api.easydietkw.com/api/v1/get/verify/token`, {
                    params: {
                        token: token,
                    }
                });
                setIsAuthenticated(true);
                setUserData(response.data);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        fetchData();
    }, []);

    return {isAuthenticated, userData};
};