async function fetchAndStoreAccessToken(code) {
    const response = await fetch(discovery.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: 'eb6a7c3efac150b9902e',
        client_secret: '93aa26482af9d6e31d398f6d31e8e6002ce53325',
        code,
        redirect_uri: 'exp://172.16.238.178:8081',
      }),
    });
    
    const json = await response.json();
    if (json.access_token) {
      await saveToken(json.access_token);
    }
}

async function fetchUserRepositories(accessToken) {
    const response = await fetch('https://api.github.com/user/repos', {
      headers: {
        'Authorization': `token ${accessToken}`,
      },
    });

    const repos = await response.json();
    if (response.ok) {
      return repos.map(repo => ({ label: repo.name, value: repo.name }));
    } else {
        throw new Error('Failed to fetch repositories');
    }
  }

export {fetchAndStoreAccessToken, fetchUserRepositories}