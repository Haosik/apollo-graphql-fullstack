module.exports = {
  Query: {
    launches: (_, __, { dataSources }) => dataSources.launchApi.getAllLaunches(),
    launch: (_, { id }, { dataSources }) => dataSources.launchApi.getLaunchById({ launchId: id }),
    me: (_, __, { dataSources }) => dataSources.userApi.findOrCreateUser()
  }
};
