import UserSchema from "../../../models/user";

/**
 * User service functions.
 * @namespace
 * @global
 */

const userServices = {

  /**
   * Finds a single user based on a query.
   * @param {Object} query - Criteria to match a user in the database.
   * @returns {Promise<userResult|null>} A promise that resolves with the found user or null if no user is found.
   * @memberof userServices
   */

  createUser: async (insertObj) => {
    return await UserSchema.create(insertObj);
  },

  findUser: async (query) => {
    return await UserSchema.findOne(query);
  },
}

module.exports = { userServices };
