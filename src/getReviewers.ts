import { getInput } from "@actions/core/lib/core";

export function getReviewers(): string[] {
  const reviewers = getInput("reviewers");
  if (!reviewers) {
    return [];
  }

  return reviewers.split(",");
}
