import { PET_MOODS } from '../utils/petutils';

async function fetchAndStoreAccessToken(code) {
    const response = await fetch(discovery.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.SCHEME,
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

  async function fetchRepositoryCommits(accessToken, owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `token ${accessToken}`,
        },
    });

    const commits = await response.json();
    if (response.ok) {
        return commits.map(commit => ({
            sha: commit.sha,
            author: commit.commit.author.name,
            message: commit.commit.message,
            date: commit.commit.author.date,
        }));
    } else {
        throw new Error('Failed to fetch commit history');
    }
}

async function fetchGitHubUsername(accessToken) {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();
    return userData.login;  // 'login' is the field in the response that holds the GitHub username.
  } catch (error) {
    console.error('Error fetching GitHub username:', error);
    throw error;  // Rethrow to allow the caller to handle it.
  }
}

async function moodBasedOnCommits(commits) {
  const latestCommit = commits[0];
  const today = new Date();
  const commitDate = new Date(latestCommit.date);
  const daysSinceLastCommit = (today - commitDate) / (1000 * 60 * 60 * 24);

  if (daysSinceLastCommit < 1) {
    return PET_MOODS.VERY_HAPPY.text;
  } else if (daysSinceLastCommit < 3) {
    return PET_MOODS.HAPPY.text;
  } else if (daysSinceLastCommit < 3 && daysSinceLastCommit > 7) {
    return PET_MOODS.NEUTRAL.text;
  } else if (daysSinceLastCommit < 7 && daysSinceLastCommit > 10) {
    return PET_MOODS.SAD.text;
  } else {
    return PET_MOODS.VERY_SAD.text;
  }
} 

export { fetchAndStoreAccessToken, fetchUserRepositories, fetchRepositoryCommits, fetchGitHubUsername, moodBasedOnCommits };
