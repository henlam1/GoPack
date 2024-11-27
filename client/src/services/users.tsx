const BASE_URL = "http://localhost:5050/api/auth/google"

export async function getUser(idToken){
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({token: idToken})
            })
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response
    } catch (error) {
        console.error("A problem occured with retrieving user", error);
    }
    
}