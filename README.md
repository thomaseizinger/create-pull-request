# Create pull request

Does what it says on the tin - creates a pull request, nothing else.

## Usage

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
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        branch: ${{ github.ref }}
        title: "An automatically created PR!"
```
