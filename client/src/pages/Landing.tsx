import { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import AllPackingLists from "../features/packingList/AllPackingLists";
import GoogleSignIn from "../components/GoogleSignIn";
import { useNavigate } from 'react-router-dom';
import User from '../components/User';

export default function Landing(){
    const [ profile, setProfile ] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        googleLogout();
        setProfile(null);
    }

    return(
        <div className="text-center">
            <div className="card w-96 shadow-xl card-bordered mx-auto">
                <div className="card-body items-center text-center">
                    <div className="card-title">Packing Lists</div>
                    <AllPackingLists />
                    <button 
                        className="btn btn-accent w-80" 
                        type="submit" 
                        onClick={() => navigate("/create")}
                    >
                        Add New
                    </button>
                    {profile ? (
                        <User
                            name={profile.name}
                            email={profile.email}
                            picture={profile.picture}
                            logOut={logout}
                        />
                        ) : (
                        <GoogleSignIn
                            setProfile={setProfile}
                        />
                        )}
                    
                </div>
            </div>
        </div>
    )
}