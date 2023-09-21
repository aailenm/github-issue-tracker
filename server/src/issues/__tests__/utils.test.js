const { calculateWorkingDays, defaultScoreCalculation } = require("../utils");
const tk = require("timekeeper");

describe("utils", () => {
  describe("#calculateWorkingDays", () => {
    const twoMondaysBefore = "2021-09-06T12:41:02Z";
    const previousMonday = "2021-09-13T12:41:02Z";
    const previousSaturday = "2021-09-11T12:41:02Z";
    const friday = "2021-09-17T12:41:02Z";
    const saturday = "2021-09-18T12:41:02Z";
    const sunday = "2021-09-19T12:41:02Z";

    describe("when today is weekend", () => {
      tk.freeze(sunday);

      describe("when the given date is on weekend", () => {
        describe("when it is the same week", () => {
          it("returns no day difference", () => {
            expect(calculateWorkingDays(saturday)).toEqual(0);
          });
        });

        describe("when it is not the same week", () => {
          it("returns the weekday difference", () => {
            expect(calculateWorkingDays(previousSaturday)).toEqual(5);
          });
        });
      });

      describe("when the given date is on weekday", () => {
        describe("when it is the same week", () => {
          it("returns the date difference", () => {
            expect(calculateWorkingDays(friday)).toEqual(1);
          });
        });

        describe("when it is a different week", () => {
          it("returns the weekday difference (excluding saturday and sunday)", () => {
            expect(calculateWorkingDays(twoMondaysBefore)).toEqual(10);
          });
        });
      });
    });

    describe("when today is weekday", () => {
      tk.freeze(friday);

      describe("when the given date is on weekend", () => {
        it("returns the day difference without taking into account weekends", () => {
          expect(calculateWorkingDays(previousSaturday)).toEqual(5);
        });
      });

      describe("when the given date is on weekday", () => {
        describe("when it is the same week", () => {
          it("returns the date difference", () => {
            expect(calculateWorkingDays(previousMonday)).toEqual(5);
          });
        });

        describe("when it is a different week", () => {
          it("returns the weekday difference (excluding weekends)", () => {
            expect(calculateWorkingDays(twoMondaysBefore)).toEqual(10);
          });
        });
      });
    });

    describe("if a date is not provided", () => {
      it("fails", () => {
        expect(() => calculateWorkingDays(null)).toThrow("Date not provided");
      });
    });
  });

  describe("#defaultScoreCalculation", () => {
    describe("given an issue", () => {
      const issue = {
        labels: [],
      };

      describe("when the issue doesnt have any labels", () => {
        it("returns unscored", () => {
          expect(defaultScoreCalculation(issue)).toEqual("unscored");
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
            expect(defaultScoreCalculation(issue)).toEqual("unscored");
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
            expect(defaultScoreCalculation(issue)).toEqual(40);
          });
        });

        describe("but it has more than one priority label", () => {
          beforeEach(() => {
            issue.labels.push(midPriorityLabel, criticalPriorityLabel);
          });

          it("uses the weight of the highest priority label", () => {
            // working days difference = 2
            expect(defaultScoreCalculation(issue)).toEqual(2000);
          });
        });
      });
    });
  });
});
