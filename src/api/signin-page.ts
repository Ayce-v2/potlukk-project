export type VerifyUserResponse = {
    username: string;
    password: string;
    allergies: [];
    userId: number;
    fname: string;
    lname: string;

}

export async function verifyUser(username: string, password: string) : Promise<VerifyUserResponse> {
      
  try {
      const response = await fetch('http://127.0.0.1:8000/verify', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username,
          password
        })
      });
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      localStorage.setItem("userauthentication", "true")  
      const json: VerifyUserResponse = await response.json();  
      localStorage.setItem("loggedinUser", json.fname)  
      return json;

  } catch (error) {
      alert('Error verifying user --> ' + error);
      throw error;
  }
}
