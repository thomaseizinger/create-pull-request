import { setFailed, setOutput } from "@actions/core";
import { Octokit } from "@octokit/action";
import { getInputs } from "./getInputs";

async function run(): Promise<void> {
  try {
    const { reviewers, ...pullParams } = getInputs();

    const octokit = new Octokit();
    const pullRequest = await octokit.pulls.create(pullParams);
    const pullNumber = pullRequest.data.number;

    if (reviewers.length > 0) {
      await octokit.pulls.createReviewRequest({
        owner: pullParams.owner,
        repo: pullParams.repo,
        pull_number: pullNumber,
        reviewers
      });
    }

    setOutput("number", pullNumber.toString());
  } catch (error) {
    setFailed(error.message);
  }
}

run();
