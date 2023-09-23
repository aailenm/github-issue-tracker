const issuesController = require("../controller");
const issues = require("./issues.json");

describe("issues controller", () => {
  const getIssuesMock = jest.fn();

  describe("#get", () => {
    const query = {};

    beforeEach(() => {
      require("../../integrations/github").getIssues = getIssuesMock;
      
      getIssuesMock.mockReturnValue({ data: issues });
    });

    it("returns the issues with incoming and calculated attributes", async () => {
      const result = await issuesController.get({ query });
      expect(Object.keys(result[0])).toEqual([
        "title",
        "number",
        "labels",
        "score",
        "workingDaysFromCreation",
        "opener",
        "url",
      ]);
    });

    it("returns the issues ordered by score descending, and unscored ones at the top", async () => {
      const [issue1, issue2, issue3] = await issuesController.get({ query });

      expect(issue1.score).toEqual("unscored");
      expect(issue2.score).toBeGreaterThan(issue3.score);
    });
  });
});
