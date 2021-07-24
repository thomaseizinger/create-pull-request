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
    - uses: actions/checkout@1.0.0
    
    - name: Create pull request
      uses: thomaseizinger/create-pull-request@master
      with:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        head: ${{ github.ref }}
        base: master
        title: "An automatically created PR!"
```

## Advanced usage

To get an idea of all inputs that are supported, have a look at [this file](./src/getInputs.ts) or the [tests](./__tests__/getInputs.test.ts).

For self-hosted runners behind a corporate proxy, set the https_proxy environment variable.

```yaml
- name: Create pull request
      uses: thomaseizinger/create-pull-request@master
      with:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        head: ${{ github.ref }}
        base: master
        title: "An automatically created PR!"
      env:
        https_proxy: http://<proxy_address>:<port>
```

### Action outputs

The following outputs can be set by action

- `number` - Number of the created pull request.
- `html_url` - URL of the created pull request.
- `created` - 'true' if pull request was successfully created, 'false' if pull request existed already.
