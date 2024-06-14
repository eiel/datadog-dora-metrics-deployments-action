FROM datadog/ci:latest

# use docker-ci env var
ENV DD_SERVICE=
ENV DD_ENV=
ENV DD_SITE=
ENV DD_BETA_COMMANDS_ENABLED=1

ENTRYPOINT datadog-ci dora deployment \
  --started-at ${STARTED_AT} \
  --finished-at ${FINISHED_AT:=$(date +%s)} \
  --git-repository-url ${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY} \
  --git-commit-sha ${GITHUB_SHA}
