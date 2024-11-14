import User from "../models/User.js";

class UserRepository {
  /**
   * Find a user by email.
   * @param {string} email - The email of the user to find.
   * @returns {Promise<User|null>} A promise that resolves to the user if found, else null.
   */
  static async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error('Error finding user by email: ' + error.message);
    }
  }

  /**
   * Create a new user.
   * @param {Object} userData - The data of the user to create.
   * @returns {Promise<User>} A promise that resolves to the newly created user.
   */
  static async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error('Error creating new user: ' + error.message);
    }
  }

  // Additional repository methods (e.g., update, delete) can be added here as needed.
}

export default UserRepository;
