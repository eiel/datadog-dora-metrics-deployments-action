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

git repository url of deployment. default current repository.

### `git-commit-sha`

git commit sha of deployment. default current commit sha.


## Example usage

```yaml

steps:
  - name: record deploy start time
    run: echo deploy-started-at="$(date +%s)" >> "${GITHUB_ENV}"

  - run: xxxxxxxxx # delivery code

  - uses: eiel/datadog-dora-metrics-deployment
    env:
      DD_API_KEY: ${{ secrets.DD_API_KEY }}
    with:
      service-name: eiel/datadog-dora-metrics-deployments-action
      datadog-env: ${{ github.ref_name }}
      started-at: ${{ env.deploy-started-at }}
      finished-at: "${{ env.deploy-finished-at }}"
```

# Links

* [DataDog - Software Delivery - DORA Metrics](https://docs.datadoghq.com/dora_metrics/)
* [GitHub - DataDog/datadog-ci](https://github.com/DataDog/datadog-ci)
* [Docker Hub - datadog/ci](https://hub.docker.com/r/datadog/ci)
