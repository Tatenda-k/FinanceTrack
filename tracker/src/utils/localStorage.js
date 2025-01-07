export const addUserToLocalStorage = (user) => {

    localStorage.setItem('user', JSON.stringify(user));
}
  
  export const removeUserFromLocalStorage = () => {
    console.log('need to add logic or make protected rounte')
    localStorage.removeItem('user');
  };

  
  export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user');
    console.log('getting user from local storage')
    console.log(typeof(result));
    if(result && result !== "undefined"){
     try{
      let user=  JSON.parse(result)
      console.log("result was defined");
      return user}
      catch(error){
        console.log("Error parsing user data from local storage ");
      }
    }
  
    console.log("here no user");
    return null;
  };