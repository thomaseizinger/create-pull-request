"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const exec_1 = require("@actions/exec");
const github_1 = __importDefault(require("@actions/github"));
const extractVersion_1 = __importDefault(require("./extractVersion"));
const to_vfile_1 = require("to-vfile");
const updateChangelog_1 = __importDefault(require("./updateChangelog"));
const formatDate_1 = __importDefault(require("./formatDate"));
const buildBumpCommand_1 = __importDefault(require("./buildBumpCommand"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = core_1.default.getInput("github-token");
            const bumpCommandInput = core_1.default.getInput("bump-command");
            const octokit = new github_1.default.GitHub(token);
            const issueTitle = github_1.default.context.payload.issue.title;
            const issueAuthor = github_1.default.context.payload.issue.user.login;
            const version = extractVersion_1.default(issueTitle);
            const today = formatDate_1.default(new Date());
            const releaseBranch = `release/${version}`;
            yield exec_1.exec("git", ["checkout", "-b", releaseBranch]);
            const changelog = yield to_vfile_1.read("CHANGELOG.md", { encoding: "utf-8" });
            const newChangelog = yield updateChangelog_1.default(changelog, version, today);
            yield to_vfile_1.write(newChangelog, { encoding: "utf-8" });
            yield exec_1.exec("git", ["add", "CHANGELOG.md"]);
            yield exec_1.exec("git", [
                "commit",
                "--message",
                `Update CHANGELOG for release of version ${version}`
            ]);
            const bumpCommand = buildBumpCommand_1.default(bumpCommandInput, version);
            yield exec_1.exec(bumpCommand.exec, bumpCommand.args);
            yield exec_1.exec("git", [
                "commit",
                "--all",
                "--message",
                `Bump version to ${version}`
            ]);
            yield exec_1.exec("git", ["push", "-u", "origin", releaseBranch]);
            const pullRequest = yield octokit.pulls.create(Object.assign(Object.assign({ head: releaseBranch, base: "master" }, github_1.default.context.repo), { title: `Release version ${version}` }));
            yield octokit.pulls.createReviewRequest(Object.assign(Object.assign({}, github_1.default.context.repo), { pull_number: pullRequest.data.id, reviewers: [issueAuthor] }));
            core_1.default.setOutput("version", version);
            core_1.default.setOutput("branch", releaseBranch);
        }
        catch (error) {
            core_1.default.setFailed(error.message);
        }
    });
}
run();
