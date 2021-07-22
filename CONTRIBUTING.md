# Contributing

Thank you for wanting to contribute!

This action has a set of integration tests that are unfortunately a bit tricky to run due to how GitHub handles permissions.

There are two sets of workflows:

1. Basic checks which run on every PR.
2. Integration tests which run only on the master branch.

To make it easier to merge contributions, please:

- Make pull requests from _your fork's master branch_.
- Enable actions on your fork.

This allows the integration tests to run on your fork, making it possible to see that a change works before merging it into `master` here.
