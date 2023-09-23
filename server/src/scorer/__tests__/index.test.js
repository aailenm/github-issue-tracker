const createScorer = require("../index");
const tk = require("timekeeper");

describe("createScorer", () => {
  const calculateScore = createScorer();

  describe("when no custom behavior is provided", () => {
    describe("it uses Rotunda's default behavior - so:", () => {
      describe("given an issue", () => {
        const issue = {
          labels: [],
        };

        describe("when the issue doesnt have any labels", () => {
          it("uses Rotunda's defaults behavior, returning unscored", () => {
            expect(calculateScore(issue)).toEqual("unscored");
          });
        });

        describe("when the issue has labels", () => {
          const aLabel = {
            id: 3320357275,
            node_id: "MDU6TGFiZWwzMzIwMzU3Mjc1",
            url: "https://api.github.com/repos/rotundasoftware/rotunda-qa-demo/labels/Store",
            name: "Store",
            color: "9A2081",
            default: false,
            description: "",
          };
          const anotherLabel = {
            id: 3320358616,
            node_id: "MDU6TGFiZWwzMzIwMzU4NjE2",
            url: "https://api.github.com/repos/rotundasoftware/rotunda-qa-demo/labels/Web%20Terminal",
            name: "Web Terminal",
            color: "C2E0C6",
            default: false,
            description: "",
          };
          const midPriorityLabel = {
            id: 3320313471,
            node_id: "MDU6TGFiZWwzMzIwMzEzNDcx",
            url: "https://api.github.com/repos/rotundasoftware/rotunda-qa-demo/labels/Low%20Priority",
            name: "Mid Priority",
            color: "4FB47B",
            default: false,
            description: "TTL 14 days",
          };
          const criticalPriorityLabel = {
            id: 3320312802,
            node_id: "MDU6TGFiZWwzMzIwMzEyODAy",
            url: "https://api.github.com/repos/rotundasoftware/rotunda-qa-demo/labels/Mid%20Priority",
            name: "Critical Priority",
            color: "F7CE46",
            default: false,
            description: "TTL 7 days",
          };

          describe("but it doesnt have any priority label", () => {
            beforeEach(() => {
              issue.labels.push(aLabel, anotherLabel);
            });

            it("returns unscored", () => {
              expect(calculateScore(issue)).toEqual("unscored");
            });
          });

          describe("but it has a priority label", () => {
            const thursday = "2021-09-16T12:41:02Z";
            const friday = "2021-09-17T12:41:02Z";

            beforeEach(() => {
              issue.labels.push(aLabel, midPriorityLabel);
              issue.created_at = thursday;
              tk.freeze(friday);
            });

            it("returns the weight of its priority label times the floor of the number of working days since it was created", () => {
              // working days difference = 2
              expect(calculateScore(issue)).toEqual(40);
            });
          });

          describe("but it has more than one priority label", () => {
            beforeEach(() => {
              issue.labels.push(midPriorityLabel, criticalPriorityLabel);
            });

            it("uses the weight of the highest priority label", () => {
              // working days difference = 2
              expect(calculateScore(issue)).toEqual(2000);
            });
          });
        });
      });
    });
  });

  describe("when custom behavior is provided", () => {
    const issue = {
        labels: [],
      };
    const returnAlwaysTwo = (_) => 2;
    const calculateScore = createScorer(returnAlwaysTwo);

    it("use the custom behavior", () => {
        expect(calculateScore(issue)).toEqual(2);
    });
  });
});
