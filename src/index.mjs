import { env } from 'process';
import { EOL }  from 'os';

function createRequest({ dd_host, api_key, service, env, started_at, finished_at, commit_sha, repository_url }) {
  const url = `https://api.${dd_host}/api/v2/dora/deployment`;
  return new Request(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'DD-API-KEY': api_key
    },
    body: JSON.stringify({
      data: {
        attributes: {
	  service,
	  env,
	  started_at,
	  finished_at,
	  git: {
	    commit_sha,
	    repository_url,
	  }
	}
      }
    }),
  });
}

export function postDeploymentRequest() {
  return createRequest({
    dd_host: env.DD_SITE || 'datadoghq.com',
    api_key: env["INPUT_DATADOG-API-KEY"],
    service: env["INPUT_DATADOG-SERVICE-NAME"],
    env: env["INPUT_DATADOG-ENV"],
    started_at: Number((env["INPUT_STARTED-AT"]) ?? 0) * 1e12,
    finished_at: Number(env["INPUT_FINISHED-AT"]) * 1e12 ?? Date.now() * 1e6,
    commit_sha: env["INPUT_GIT-COMMIT-SHA"] ?? env.GITHUB_SHA,
    repostiory_url: env["INPUT_GIT-EPOSITORY-URL"] ?? `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}`,
  });
}

function println(line) {
  process.stdout.write(line + EOL);
}

export async function run() {
  const request = postDeploymentRequest();
  try {
    const res = await fetch(request);
    println(JSON.stringify(res.json()));
  } catch(e) {
    println(e.toString());
  }
}

await run();
