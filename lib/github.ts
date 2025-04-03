import { cache } from 'react';
import { revalidateTag } from 'next/cache';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  topics: string[];
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  watchers_count: number;
}

// Enhanced type definitions to eliminate 'any' usage

// Define proper types for cache entries
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Define GitHub API response types
interface GithubUserResponse {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface GithubRepoResponse {
  id: number;
  name: string;
  description: string | null;
  topics: string[] | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  watchers_count: number;
}

// Define options type for githubFetch
interface GithubFetchOptions {
  headers?: Record<string, string>;
  revalidate?: number;
  tags?: string[];
  bypassMemoryCache?: boolean;
}

// Update the GLOBAL_CACHE definition
const GLOBAL_CACHE = global as unknown as {
  _githubCache?: Map<string, CacheEntry<unknown>>;
};

// Create a persistent cache map that survives between requests in development
// This dramatically improves performance during development
if (!GLOBAL_CACHE._githubCache) {
  GLOBAL_CACHE._githubCache = new Map();
}

const memoryCache = GLOBAL_CACHE._githubCache;

// Cache metrics for performance monitoring
export const CACHE_METRICS = {
  hits: 0,
  misses: 0,
  evictions: 0,
  totalRequests: 0,
  backgroundRefreshes: 0
};

/**
 * Enhanced GitHub API client with optimized caching
 * @param url The GitHub API URL to fetch
 * @param options Request options including cache configuration
 */
async function githubFetch<T>(url: string, options: GithubFetchOptions = {}): Promise<T> {
  // Create a cache key from the URL and auth status (without exposing token)
  const cacheKey = `${url}${options.headers?.Authorization ? '_authed' : ''}`;
  
  // Check memory cache first if not explicitly bypassed
  if (!options.bypassMemoryCache && memoryCache.has(cacheKey)) {
    const cached = memoryCache.get(cacheKey) as CacheEntry<T>;
    const cacheAge = Date.now() - cached.timestamp;
    const maxAge = (options.revalidate || 3600) * 1000;
    
    // If cache is still fresh, return it immediately
    if (cacheAge < maxAge) {
      console.log(`[GitHub API] Cache hit for ${url}`);
      CACHE_METRICS.hits++;
      return cached.data;
    }
    
    // If cache exists but is stale, return it but refresh in background
    console.log(`[GitHub API] Stale cache hit for ${url}, refreshing in background`);
    CACHE_METRICS.hits++; // Still counts as a hit since we're using the cache
    refreshCacheInBackground(url, cacheKey, options);
    return cached.data;
  }
  
  // Cache miss or bypass - fetch fresh data
  CACHE_METRICS.misses++;
  return fetchFreshData<T>(url, cacheKey, options);
}

/**
 * Refreshes cache in background without blocking the request
 */
async function refreshCacheInBackground(url: string, cacheKey: string, options: GithubFetchOptions) {
  setTimeout(() => {
    fetchFreshData(url, cacheKey, options).catch(err => 
      console.error(`Background refresh failed for ${url}:`, err)
    );
  }, 0);
}

/**
 * Fetches fresh data from GitHub API and updates caches
 */
async function fetchFreshData<T>(url: string, cacheKey: string, options: GithubFetchOptions): Promise<T> {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  const headers: Record<string, string> = {
    'Accept': options.headers?.Accept || 'application/vnd.github.v3+json',
    ...(token ? { 'Authorization': `token ${token}` } : {}),
    ...options.headers,
  };

  try {
    console.log(`[GitHub API] Fetching ${url}`);
    const response = await fetch(url, {
      headers,
      next: {
        revalidate: options.revalidate || 3600, // Default 1 hour
        tags: options.tags || []
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
    }

    // Parse response based on content type
    let result;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }
    
    // Update memory cache
    memoryCache.set(cacheKey, { 
      data: result,
      timestamp: Date.now()
    });
    
    return result as T;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
}

// Define varying cache durations based on data type
export const CACHE_DURATIONS = {
  REPOS_LIST: 1800,        // 30 minutes for repo list
  REPO_DETAILS: 3600,      // 1 hour for individual repo details 
  REPO_README: 7200,       // 2 hours for readme content
  REPO_LANGUAGES: 43200,   // 12 hours for language stats
  USER_PROFILE: 86400,     // 24 hours for user profile data
};

/**
 * Gets GitHub user profile with extended caching
 */
export const getGithubUser = cache(async (username: string) => {
  return githubFetch<GithubUserResponse>(
    `https://api.github.com/users/${username}`,
    {
      revalidate: CACHE_DURATIONS.USER_PROFILE,
      tags: [`github-user-${username}`]
    }
  );
});

/**
 * Gets GitHub repositories with optimized caching
 */
export const getGithubRepos = cache(async (username: string): Promise<GithubRepo[]> => {
  const repos = await githubFetch<GithubRepoResponse[]>(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    {
      revalidate: CACHE_DURATIONS.REPOS_LIST,
      tags: [`github-repos-${username}`]
    }
  );
  
  return repos.map(repo => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    topics: repo.topics || [],
    html_url: repo.html_url,
    homepage: repo.homepage,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count || 0,
    updated_at: repo.updated_at,
    created_at: repo.created_at,
    pushed_at: repo.pushed_at,
    watchers_count: repo.watchers_count || 0
  }));
});

/**
 * Gets repository README with optimal caching
 */
export const getRepoReadme = cache(async (username: string, repo: string): Promise<string> => {
  try {
    return await githubFetch<string>(
      `https://api.github.com/repos/${username}/${repo}/readme`,
      {
        headers: { Accept: 'application/vnd.github.v3.html' },
        revalidate: CACHE_DURATIONS.REPO_README,
        tags: [`github-readme-${username}-${repo}`]
      }
    );
  } catch (error) {
    // Handle missing README gracefully
    if (error instanceof Error && error.message.includes('404')) {
      return '';
    }
    throw error;
  }
});

/**
 * Gets repository language statistics with extended caching
 */
export const getRepoLanguages = cache(async (username: string, repo: string) => {
  return githubFetch<Record<string, number>>(
    `https://api.github.com/repos/${username}/${repo}/languages`,
    {
      revalidate: CACHE_DURATIONS.REPO_LANGUAGES,
      tags: [`github-languages-${username}-${repo}`]
    }
  );
});

/**
 * Consolidated function to get all repo details at once
 * This significantly improves performance by making parallel requests
 */
export const getRepoDetails = cache(async (username: string, repoName: string) => {
  // First, check if repo exists in our repos list
  const repos = await getGithubRepos(username);
  const repo = repos.find(r => r.name === repoName);
  
  if (!repo) {
    return { repo: null, readme: '', languages: {} };
  }
  
  // Fetch everything else in parallel
  const [readme, languages] = await Promise.all([
    getRepoReadme(username, repoName),
    getRepoLanguages(username, repoName)
  ]);
  
  return {
    repo,
    readme,
    languages
  };
});

/**
 * Manually revalidate GitHub API cache tags
 */
export async function revalidateGithubCache(username: string, repoName?: string) {
  // Always revalidate user and repos list
  revalidateTag(`github-user-${username}`);
  revalidateTag(`github-repos-${username}`);
  
  // If specific repo provided, revalidate its data
  if (repoName) {
    revalidateTag(`github-readme-${username}-${repoName}`);
    revalidateTag(`github-languages-${username}-${repoName}`);
  }
}