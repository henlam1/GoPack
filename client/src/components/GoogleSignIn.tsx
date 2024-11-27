import { GoogleLogin } from '@react-oauth/google';
import { getUser } from '../services/users';

export default function GoogleSignIn({ setProfile }) {
    const handleLoginSuccess = async (response) => {
        console.log("response: ", response);
        const idToken = response.credential; 
        const userInfo = await fetchUserInfo(idToken);
        setProfile(userInfo);
    }
    const handleLoginFailure = (error) => { 
        console.error('Login failed:', error); 
    };
    const fetchUserInfo = async (idToken) => { 
        try { 
            const response = await getUser(idToken);
            const userInfo = await response?.json(); 
            console.log('User Info:', userInfo); 
            return userInfo;
        } catch (error) { 
            console.error('Error fetching user info:', error); 
        } };
    return (
    <div>
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
        />
    </div>)
}