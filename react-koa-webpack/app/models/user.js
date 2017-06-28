class User{
  constructor(username){
    this.username = username;
  };

  greeting(){
    return `hello ${this.username}`;
  };
  
}

module.exports = User;
