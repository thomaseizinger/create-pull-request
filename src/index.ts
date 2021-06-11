import { setFailed, setOutput } from "@actions/core";
import { Octokit } from "@octokit/action";
import { OctokitOptions } from "@octokit/core/dist-types/types";
import { getInputs } from "./getInputs";
import { HttpsProxyAgent } from "https-proxy-agent";

async function run(): Promise<void> {
  try {
    const { reviewers, baseurl, ...pullParams } = getInputs();

    const options: OctokitOptions = {};
    if (baseurl !== undefined) {
      options.baseUrl = `${baseurl}/api/v3`;
    }

    const proxy = process.env.https_proxy || process.env.HTTPS_PROXY;
    if (proxy) {
      options.request = {
        agent: new HttpsProxyAgent(proxy)
      };
    }

    const octokit = new Octokit(options);
    const pullRequest = await octokit.pulls.create(pullParams);
    const pullNumber = pullRequest.data.number;
    const htmlUrl = pullRequest.data.html_url;

    if (reviewers.length > 0) {
      await octokit.pulls.createReviewRequest({
        owner: pullParams.owner,
        repo: pullParams.repo,
        pull_number: pullNumber,
        reviewers
      });
    }

    setOutput("number", pullNumber.toString());
    setOutput("html_url", htmlUrl);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
