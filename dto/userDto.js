export const createUserDto = (user) => {
  const { _id, email, username } = user;
  return { id: _id, email, username };
};
