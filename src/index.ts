import core from "@actions/core";
import {Octokit} from "@octokit/action";
import { getInputsWithDefaults } from "./getInputsWithDefaults";
import { getReviewers } from "./getReviewers";

async function run(): Promise<void> {
  try {
    const octokit = new Octokit();

    const inputs = getInputsWithDefaults();

    const pullRequest = await octokit.pulls.create({
      ...inputs
    });

    const reviewers = getReviewers();

    if (reviewers.length > 0) {
      await octokit.pulls.createReviewRequest({
        owner: inputs.owner,
        repo: inputs.repo,
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
