import { getInput } from '@actions/core/lib/core';
import {
  IssuesAddLabelsParams,
  PullsCreateParams,
  PullsCreateReviewRequestParams,
} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/rest-endpoint-methods-types';

type Inputs =
  & PullsCreateParams
  & Required<
    Omit<PullsCreateReviewRequestParams, 'pull_number' | 'team_reviewers'>
  >
  & Required<
    Omit<IssuesAddLabelsParams, 'issue_number'>
  >;

export function getInputs(): Inputs {
  const head = getInput('head', { required: true });
  const title = getInput('title', { required: true });
  const base = getInput('base') || 'master';
  const draft = getInput('draft') ? JSON.parse(getInput('draft')) : undefined;
  const body = getInput('body') || undefined;
  const reviewers = getInput('reviewers');
  const labels = getInput('labels');

  const githubRepository = process.env.GITHUB_REPOSITORY;

  if (!githubRepository) {
    throw new Error('GITHUB_REPOSITORY is not set');
  }

  const [owner, repo] = githubRepository.split('/');

  return {
    head,
    base,
    title,
    draft,
    body,
    owner,
    repo,
    reviewers: reviewers
      ? reviewers.split(',').map(reviewer => reviewer.trim())
      : [],
    labels: labels
      ? labels.split(',').map(label => label.trim())
      : [],
  };
}
