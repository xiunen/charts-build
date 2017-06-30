class User{
  constructor(username){
    this.username = username;
  };

  greeting(){
    return `hello ${this.username}`;
  };

}

export default User;
