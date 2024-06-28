const mockFindOne = jest.fn();

const User = {
  findOne: mockFindOne,
};

// Export the mock functions for use in tests
export { mockFindOne };
export default User;
