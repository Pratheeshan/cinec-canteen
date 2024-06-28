// models/userModel.js

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];
  
module.exports = {
    findUser: (username, password) => users.find(u => u.username === username && u.password === password)
};