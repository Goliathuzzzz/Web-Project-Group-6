// Data model for user
// {
//     "username": "hetahar",
//     "password": "123456",
//     "email":" : "heppulipeppuli@proton.me"
// }

let userArray = [];
let nextId = 1;

function getAll() {
  return userArray;
}

function addOne(userData) {
  const { username, password, email } = userData;

  if (!username || !password || !email) {
    return false;
  }

  const newUser = {
    id: nextId++,
    ...userData,
  };

  userArray.push(newUser);
  return newUser;
}

function findById(id) {
  const numericId = parseInt(id);
  const item = userArray.find((user) => user.id === numericId);
  return item || false;
}

function updateOneById(id, updatedData) {
  const user = findById(id);
  if (user) {
    Object.assign(user, updatedData);
    return user;
  }
  return false;
}

function deleteOneById(id) {
  const user = findById(id);
  if (user) {
    const initialLength = userArray.length;
    userArray = userArray.filter((user) => user.id !== Number(id));
    return userArray.length < initialLength;
  }
  return false;
}

const User = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById,
};

module.exports = User;