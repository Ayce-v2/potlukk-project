
export type NewUser = {
    username: string
    password: string
    fname: string,
    lname: string,
    allergies:string []
}

export type Lukker = {
    userId:number
    username: string
    password: string
    fname: string
    lname: string
    allergies:string []
}

export async function createNewUser(newUser:NewUser):Promise<Lukker> {
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers", {
        method: "Post",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type":"application/json"
        }
    });

    const user:Lukker = await httpResponse.json();
    return user;
}

export async function getUsers():Promise<Lukker[]> {
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers");
    const lukkers:Lukker[] = await httpResponse.json();
    return lukkers;
}