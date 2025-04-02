import { cache } from 'react';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  topics: string[];
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number; // Add this missing property
  updated_at: string;
  created_at: string; // Add this property
  pushed_at: string;
  watchers_count: number; // Add this property
}

type GithubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

type LanguageData = {
  [key: string]: number;
};

export const getGithubUser = cache(async (username: string): Promise<GithubUser> => {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  const headers: Record<string, string> = {};
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  
  const response = await fetch(`https://api.github.com/users/${username}`, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.statusText}`);
  }
  
  return response.json();
});

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Include authorization if you have a token
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      // Add cache control for production
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    return repos.map((repo: GithubRepo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      topics: repo.topics || [],
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count || 0, // Corrected property name
      updated_at: repo.updated_at,
      created_at: repo.created_at, // Add this property
      watchers_count: repo.watchers_count || 0 // Add this property
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export const getRepoReadme = cache(async (username: string, repo: string): Promise<string> => {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3.html'
  };
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  
  const response = await fetch(`https://api.github.com/repos/${username}/${repo}/readme`, { 
    headers 
  });
  
  if (response.status === 404) {
    return ''; // No README found
  }
  
  if (!response.ok) {
    throw new Error(`Failed to fetch README: ${response.statusText}`);
  }
  
  return response.text();
});

export const getRepoLanguages = cache(async (username: string, repo: string): Promise<LanguageData> => {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  const headers: Record<string, string> = {};
  
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  
  const response = await fetch(`https://api.github.com/repos/${username}/${repo}/languages`, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repo languages: ${response.statusText}`);
  }
  
  return response.json();
});