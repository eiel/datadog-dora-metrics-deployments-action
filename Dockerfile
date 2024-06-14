FROM datadog/ci:latest

# ENV DD_SERVICE
# ENV DD_ENV
# ENV DD_SITE
# ENV STARTED_AT
# ENV FINISHED_AT
# ENV GITHUB_SERVER_URL
# ENV GITHUB_REPOSITORY
# ENV GITHUB_SHA

RUN dora deployment \
  --started-at $STARTED_AT \
  --finished-at ${FINISH_AT:$(date +$%s)}\
  --git-repository-url ${GITHUB_SERVER_URL}/${GITHUB_REPOSTORY} \
  --git-commit-sha ${GITHUB_SHA} \
