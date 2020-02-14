import { morph } from "mock-env";
import { getInputsWithDefaults } from "../src/getInputsWithDefaults";

const MANDATORY_INPUTS = {
  INPUT_HEAD: "refs/heads/feature/test",
  INPUT_TITLE: "My test pull request"
};

it("should default base to master", function() {
  const inputs = morph(getInputsWithDefaults, {
    ...MANDATORY_INPUTS
  });

  expect(inputs).toEqual({
    head: "refs/heads/feature/test",
    title: "My test pull request",
    base: "master"
  });
});

it('should parse "false" for draft as false', function() {
  const inputs = morph(getInputsWithDefaults, {
    ...MANDATORY_INPUTS,
    INPUT_DRAFT: "false"
  });

  expect(inputs).toEqual({
    head: "refs/heads/feature/test",
    title: "My test pull request",
    base: "master",
    draft: false
  });
});

it('should parse "true" for draft as true', function() {
  const inputs = morph(getInputsWithDefaults, {
    ...MANDATORY_INPUTS,
    INPUT_DRAFT: "true"
  });

  expect(inputs).toEqual({
    head: "refs/heads/feature/test",
    title: "My test pull request",
    base: "master",
    draft: true
  });
});

it("should include body if given", function() {
  const inputs = morph(getInputsWithDefaults, {
    ...MANDATORY_INPUTS,
    INPUT_BODY: "Fixes #42"
  });

  expect(inputs).toEqual({
    head: "refs/heads/feature/test",
    title: "My test pull request",
    base: "master",
    body: "Fixes #42"
  });
});
