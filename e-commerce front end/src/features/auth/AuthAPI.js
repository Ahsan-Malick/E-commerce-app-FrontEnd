// A mock function to mimic making an async request for data
export function CreateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {"Content-Type":"application/json"}
    });

    const data = await response.json();
    resolve({ data });
  });
}


export function getUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/user");
    const data = await response.json();
    resolve({ data });
  });
}

export function CheckUser(userInfo) {
  return new Promise(async (resolve, reject) => {
    try{
    // const email = userInfo.email
    // const password = userInfo.password
    const response = await fetch(`http://localhost:8080/auth/login`,{
     method: "POST",
     body: JSON.stringify(userInfo),
     headers: {"Content-Type":"application/json"} 
    });
    const data = await response.json();
    console.log({data: data})
    if(data){
      // if(password === data[0].password){
      //   resolve({data:data[0]})
      // }
      // else{
        
      //   reject('password not matching')
      // }
      resolve({data})
    }
    else{reject('Incorrect email or password')}
  } catch (err){   
    console.log({error: err})
    reject('Incorrect email or password')
  }
  });
}
