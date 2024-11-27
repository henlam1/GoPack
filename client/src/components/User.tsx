export default function User({name, email, picture, logOut}) {
    return (
        <div>
            <img src={picture} alt="user image"/>
            <h3>User Logged In</h3>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}