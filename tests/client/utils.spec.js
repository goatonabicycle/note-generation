import "jest";
import {
  createSharableUrl,
  removeUrlParameter,
} from "../../src/client/public/js/utils";

test("createSharableUrl - no parameters should return the main domain", () => {
  const result = createSharableUrl();
  expect(result).toEqual("http://localhost/");
});

test("createSharableUrl - a single key parameter should build the correct url containing the key", () => {
  const result = createSharableUrl([{ name: "key", value: "a" }]);
  expect(result).toEqual("http://localhost/?key=a");
});

test("createSharableUrl - multiple parameters should build the correct url containing multiple items", () => {
  const result = createSharableUrl([
    { name: "key", value: "a" },
    { name: "mode", value: "lydian" },
  ]);
  expect(result).toEqual("http://localhost/?key=a&mode=lydian");
});

test("removeUrlParameter - removing the last parameter (mode) should leave us with only the key parameter", () => {
  const result = removeUrlParameter(
    "http://localhost/?key=a&mode=lydian",
    "mode"
  );
  expect(result).toEqual("http://localhost/?key=a");
});

test("removeUrlParameter - removing the first parameter (key) should leave us with only the mode parameter", () => {
  const result = removeUrlParameter(
    "http://localhost/?key=a&mode=lydian",
    "key"
  );
  expect(result).toEqual("http://localhost/?mode=lydian");
});
