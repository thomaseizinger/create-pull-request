import { morph } from 'mock-env';
import { getInputs } from '../src/getInputs';

const MANDATORY_INPUTS = {
  INPUT_HEAD: 'refs/heads/feature/test',
  INPUT_TITLE: 'My test pull request',
  GITHUB_REPOSITORY: 'foo/bar',
};

it('should default base to master', function() {
  const inputs = morph(getInputs, {
    ...MANDATORY_INPUTS,
  });

  expect(inputs).toHaveProperty('base', 'master');
});

it('should parse "false" for draft as false', function() {
  const inputs = morph(getInputs, {
    ...MANDATORY_INPUTS,
    INPUT_DRAFT: 'false',
  });

  expect(inputs).toHaveProperty('draft', false);
});

it('should parse "true" for draft as true', function() {
  const inputs = morph(getInputs, {
    ...MANDATORY_INPUTS,
    INPUT_DRAFT: 'true',
  });

  expect(inputs).toHaveProperty('draft', true);
});

it('should include body if given', function() {
  const inputs = morph(getInputs, {
    ...MANDATORY_INPUTS,
    INPUT_BODY: 'Fixes #42',
  });

  expect(inputs).toHaveProperty('body', 'Fixes #42');
});

it('should parse owner and repo', function() {
  const inputs = morph(getInputs, {
    ...MANDATORY_INPUTS,
  });

  expect(inputs).toHaveProperty('owner', 'foo');
  expect(inputs).toHaveProperty('repo', 'bar');
});

it('should default to empty list of reviewers', function() {
  const inputs = morph(getInputs, {
    ...MANDATORY_INPUTS,
  });

  expect(inputs).toHaveProperty('reviewers', []);
});

it('should split reviewers by comma', function() {
  const inputs = morph(getInputs, {
    ...MANDATORY_INPUTS,
    INPUT_REVIEWERS: 'thomaseizinger,bonomat',
  });

  expect(inputs).toHaveProperty('reviewers', ['thomaseizinger', 'bonomat']);
});

it('should trim reviewer names', function() {
  const inputs = morph(getInputs, {
    ...MANDATORY_INPUTS,
    INPUT_REVIEWERS: 'd4nte, bonomat, luckysori',
  });

  expect(inputs).toHaveProperty('reviewers', ['d4nte', 'bonomat', 'luckysori']);
});
