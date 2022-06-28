import { getInput } from '@actions/core/lib/core';
import {
  IssuesAddLabelsParams,
  IssuesAddAssigneesParams,
  PullsCreateParams,
  PullsCreateReviewRequestParams,
} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/rest-endpoint-methods-types';

type Inputs =
  & PullsCreateParams
  & Required<
    Omit<PullsCreateReviewRequestParams, 'pull_number'>
  >
  & Required<
    Omit<IssuesAddLabelsParams, 'issue_number'>
  >
  & Required<
    Omit<IssuesAddAssigneesParams, 'issue_number'>
  >;

export function getInputs(): Inputs {
  const head = getInput('head', { required: true });
  const title = getInput('title', { required: true });
  const base = getInput('base') || 'master';
  const draft = getInput('draft') ? JSON.parse(getInput('draft')) : undefined;
  const body = getInput('body') || undefined;
  const assignees = getInput('assignees');
  const reviewers = getInput('reviewers');
  const team_reviewers = getInput('team_reviewers');
  const labels = getInput('labels');
  const repository = getInput('repository');

  const githubRepository = repository || process.env.GITHUB_REPOSITORY;

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
    assignees: assignees
      ? assignees.split(',').map(assignee => assignee.trim())
      : [],
    reviewers: reviewers
      ? reviewers.split(',').map(reviewer => reviewer.trim())
      : [],
    team_reviewers: team_reviewers
      ? team_reviewers.split(',').map(reviewer => reviewer.trim())
      : [],
    labels: labels
      ? labels.split(',').map(label => label.trim())
      : [],
  };
}
