import core from "@actions/core";
import github from "@actions/github";
import { getInputsWithDefaults } from "./getInputsWithDefaults";
import { getReviewers } from "./getReviewers";

async function run(): Promise<void> {
  try {
    const token: string = core.getInput("github-token", { required: true });
    const octokit = new github.GitHub(token);

    const inputs = getInputsWithDefaults();

    const pullRequest = await octokit.pulls.create({
      ...inputs,
      ...github.context.repo
    });

    const reviewers = getReviewers();

    if (reviewers.length > 0) {
      await octokit.pulls.createReviewRequest({
        ...github.context.repo,
        pull_number: pullRequest.data.id,
        reviewers
      });
    }

    core.setOutput("number" ,pullRequest.data.number.toString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
