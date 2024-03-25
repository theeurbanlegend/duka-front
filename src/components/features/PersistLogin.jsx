import React, { useContext } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { childContext } from '../../App';
import { jwtDecode } from 'jwt-decode';
const PersistLogin = () => {
    const navigate = useNavigate();
    const { session, setSession } = useContext(childContext)
    const token = localStorage.getItem('accessToken');
    const [content, setContent] = React.useState(null);
    React.useEffect(() => {
        if (token||session) {
            try {
                let decoded
                decoded = jwtDecode(token ||session[0])
                const expiry = decoded.exp;
                const isExpired = expiry < Date.now() / 1000
                if (isExpired) {
                    toast.error("Your session has expired!")
                    navigate('/login');
                } else {
                    if(token) setSession([token])
                    // Set the content using setContent
                    setContent(<Outlet />)
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            navigate('/signup')
            toast.error('Please sign in to access Pharma Manager',{position:'top-center'})
        }
    }, [token, navigate]); // Add token and navigate to the dependency array

    return content;
};


export default PersistLogin