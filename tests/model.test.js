import Model from "../src/Classes/Model";

describe("Model", () => {
  it("Should set userName ", () => {
    Model.userName = "Kyle";
    expect(Model.userName).toBe("Kyle");
  });

  it("Should throw an error if different username ", () => {
    Model.userName = "Kyle Law";
    expect(Model.userName).not.toBe("Law Kyle");
  });

  it("Should set the user's score ", () => {
    Model.score = "999";
    expect(Model.score).toBe("999");
  });

  it("Should throw an error if wrong user score  ", () => {
    Model.score = "400";
    expect(Model.score).not.toBe("299");
  });
});
