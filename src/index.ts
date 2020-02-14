import { setOutput, setFailed } from "@actions/core";
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
    const pullNumber = pullRequest.data.number

    const reviewers = getReviewers();

    if (reviewers.length > 0) {
      await octokit.pulls.createReviewRequest({
        owner: inputs.owner,
        repo: inputs.repo,
        pull_number: pullNumber,
        reviewers
      });
    }

    setOutput("number" ,pullNumber.toString());
  } catch (error) {
    setFailed(error.message);
  }
}

run();
