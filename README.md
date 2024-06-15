# DataDog DORA metrics deploment action

This action is send deployment event to [DataDog DORA Metrics](https://docs.datadoghq.com/dora_metrics/)

## Inputs

### `datadog-api-key`

**Required** API Access Key for DataDog. https://app.datadoghq.com/organization-settings/api-keys


### `datadog-service-name`

Servirce name in DataDog.

see: https://docs.datadoghq.com/ja/getting_started/tagging/unified_service_tagging/


### `datadog-env`

Env Name in DataDog.

see https://docs.datadoghq.com/ja/getting_started/tagging/unified_service_tagging/

### `started-at`

**Required** deployment start time (sec)

### `finished-at`

deloyment finish time (sec)

### `git-repository-url`

**unimplement**

git repository url of deployment. default current repository.


### `git-commit-sha`

**unimplement**

git commit sha of deployment. default current commit sha.


## Example usage

```yaml

steps:
  - id: deploy-start
    name: record deploy start time
    run: echo unix-time="$(date +%s)" >> "${GITHUB_OUTPUT}"

  - run: xxxxxxxxx # delivery code

  - uses: eiel/datadog-dora-metrics-deployment@v0.0.2
    with:
      datadog-service-name: "your service"
      datadog-api-key: ${{ secrets.DD_API_KEY }}
      datadog-env: "production"
      started-at: ${{ steps.deploy-start.outputs.unix-time }}
```

# Links

* [DataDog - Software Delivery - DORA Metrics](https://docs.datadoghq.com/dora_metrics/)
* [GitHub - DataDog/datadog-ci](https://github.com/DataDog/datadog-ci)
* [Docker Hub - datadog/ci](https://hub.docker.com/r/datadog/ci)
