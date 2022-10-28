# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Uses `node16` to run action. See [this](https://github.blog/changelog/2022-09-22-github-actions-all-actions-will-begin-running-on-node16-instead-of-node12/) for details

### Added

- Support for adding team reviewers by setting `team_reviewers`
- Support for adding assignees by setting `assignees`

## [1.2.0] - 2021-07-26

### Added

- Support for adding labels by setting `labels`
- Check for existing pull request and `created` action output

## [1.1.0] - 2021-06-16

### Added

- Git hook to make sure we always run `yarn build` before committing any Typescript changes. This should prevent dist/index.js from getting out of date.
- Support for setting a proxy using the `HTTPS_PROXY` environment variable
- Support for GitHub Enterprise by reading `process.env.GITHUB_REPOSITORY`

### Fixed

- action.yml suggested to use `github-token` as the input where as in reality, we are looking for an input `github_token` (note the underscore!)

## [1.0.0] - 2020-02-15

### Added

- Initial release!

[Unreleased]: https://github.com/thomaseizinger/create-pull-request/compare/1.2.0...HEAD
[1.2.0]: https://github.com/thomaseizinger/create-pull-request/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/thomaseizinger/create-pull-request/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/thomaseizinger/create-pull-request/compare/92284b92aff90f2100e022ed93d6e485240e8a36...1.0.0
