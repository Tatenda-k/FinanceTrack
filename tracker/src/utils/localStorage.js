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
    console.log(result);
    let user = null
    if(result){
     
      user=  JSON.parse(result)

      return user
    }
  

    return user;
  };