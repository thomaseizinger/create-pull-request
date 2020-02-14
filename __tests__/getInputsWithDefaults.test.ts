import { morph } from "mock-env";
import { getInputsWithDefaults } from "../src/getInputsWithDefaults";

const MANDATORY_INPUTS = {
  INPUT_HEAD: "refs/heads/feature/test",
  INPUT_TITLE: "My test pull request",
  GITHUB_REPOSITORY: "foo/bar"
};

it("should default base to master", function() {
  const inputs = morph(getInputsWithDefaults, {
    ...MANDATORY_INPUTS
  });

  expect(inputs).toHaveProperty("base", "master");
});

it('should parse "false" for draft as false', function() {
  const inputs = morph(getInputsWithDefaults, {
    ...MANDATORY_INPUTS,
    INPUT_DRAFT: "false"
  });

  expect(inputs).toHaveProperty("draft", false);
});

it('should parse "true" for draft as true', function() {
  const inputs = morph(getInputsWithDefaults, {
    ...MANDATORY_INPUTS,
    INPUT_DRAFT: "true"
  });

  expect(inputs).toHaveProperty("draft", true);
});

it("should include body if given", function() {
  const inputs = morph(getInputsWithDefaults, {
    ...MANDATORY_INPUTS,
    INPUT_BODY: "Fixes #42"
  });

  expect(inputs).toHaveProperty("body", "Fixes #42");
});

it("should parse owner and repo", function() {
  const inputs = morph(getInputsWithDefaults, {
    ...MANDATORY_INPUTS
  });

  expect(inputs).toHaveProperty("owner", "foo");
  expect(inputs).toHaveProperty("repo", "bar");
});
