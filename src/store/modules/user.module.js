const state = {
  user: null,
};

const getters = {
  userProfile: (vState) => vState.user,
};

const flattenUserObj = (obj) => {
  const { firstName, middleName, lastName } = obj.name;
  const user = {
    ...obj,
    firstName,
    middleName,
    lastName,
  };
  delete user.name;
  return user;
};

const mutations = {
  setUser(vState, profile) {
    console.log('xxxxxxxx', profile);
    vState.user = flattenUserObj(profile);
  },
};

export default {
  state,
  getters,
  mutations,
};
