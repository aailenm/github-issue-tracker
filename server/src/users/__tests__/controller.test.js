const userController = require('../controller');
const users = require('./users.json');

describe("users controller", () => {
  const getUsersMock = jest.fn();

  beforeEach(() => {
    require("../../integrations/github").getUsers = getUsersMock;
    getUsersMock.mockReturnValue({ data: users })
  });

  describe("#get", () => {
    it("fetches github users and returns their username", async () => {
      expect(await userController.get()).toEqual(['octocat']);
    });
  });
});
