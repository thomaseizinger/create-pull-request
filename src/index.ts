import { setFailed, setOutput } from '@actions/core';
import { OctokitOptions } from '@octokit/core/dist-types/types';
import { Octokit } from '@octokit/action';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { getInputs } from './getInputs';

async function run(): Promise<void> {
  try {
    const { reviewers, labels, ...pullParams } = getInputs();

    const options: OctokitOptions = {};
    options.baseUrl = process.env.GITHUB_API_URL;

    const proxy = process.env.https_proxy || process.env.HTTPS_PROXY;
    if (proxy) {
      options.request = {
        agent: new HttpsProxyAgent(proxy),
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
        reviewers,
      });
    }

    if (labels.length > 0) {
      await octokit.issues.addLabels({
        owner: pullParams.owner,
        repo: pullParams.repo,
        issue_number: pullNumber,
        labels: labels,
      });
    }

    setOutput('number', pullNumber.toString());
    setOutput('html_url', htmlUrl);
    setOutput('created', 'true');
  } catch (error) {
    if (error.message && error.message.includes('A pull request already exists')) {
      setOutput('created', 'false');
    } else {
      setFailed(error.message);
    }
  }
}

run();
