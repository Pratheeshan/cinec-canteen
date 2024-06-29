// models/userModel.js

const users = [
    { userId: 'user1', password: 'password1' },
    { userId: 'user2', password: 'password2' }
  ];
  
module.exports = {
    findUser: (userId, password) => users.find(u => u.userId === userId && u.password === password)
};