# Create pull request

Does what it says on the tin - creates a pull request.

## Usage

```yaml
```yaml
name: "Create PR"
on: push

jobs:
  create-pr-on-push:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    
    - name: Create pull request
      uses: thomaseizinger/create-pull-request@v1
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        branch: 
        base: master
        title: "Merge "
        reviewers: ${{ github.event.issue.user.login }}
        body: |
          Resolves #${{ github.event.issue.number }} 
```

```
