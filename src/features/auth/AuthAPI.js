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

export function CheckUser(userInfo) {
  return new Promise(async (resolve, reject) => {
    const email = userInfo.email
    const password = userInfo.password
    const response = await fetch(`http://localhost:8080/user?email=${email}`);
    const data = await response.json();
    if(data.length){
      if(password === data[0].password){
        resolve({data:data[0]})
      }
      else{
        reject('email or password not matching')
      }
    }
    else{reject('email or password not matching')}
  });
}
