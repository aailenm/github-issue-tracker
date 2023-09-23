const { calculateWorkingDays } = require("../workingDaysCalculator");
const tk = require("timekeeper");

describe("workingDaysCalculator", () => {
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
});
