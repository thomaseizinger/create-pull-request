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
      uses: thomaseizinger/create-pull-request@master
      with:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        branch: ${{ github.ref }}
        title: "An automatically created PR!"
```

## Advanced usage

To get an idea of all inputs that are supported, have a look at [this file](./src/getInputs.ts) or the [tests](./__tests__/getInputs.test.ts).
