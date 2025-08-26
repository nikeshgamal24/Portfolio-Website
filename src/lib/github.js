import axios from 'axios';
import { siteConfig } from '@/config/site';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  }
});

// Add token if available
if (import.meta.env.VITE_GITHUB_TOKEN) {
  githubApi.defaults.headers.common['Authorization'] = `token ${import.meta.env.VITE_GITHUB_TOKEN}`;
}

export const fetchRepos = async ({ username, token }) => {
  try {
    // Fetch repositories
    const reposResponse = await githubApi.get(`/users/${username}/repos`, {
      params: {
        per_page: 100,
        sort: 'updated',
        direction: 'desc'
      }
    });

    const repos = reposResponse.data;
    
    // Filter and map repositories
    const filteredRepos = repos
      .filter(repo => {
        // Apply filters from site config
        const { minStars, allowedTopics, includeRepos, excludeRepos } = siteConfig.projectFilters;
        
        // Check if repo is explicitly included
        if (includeRepos.includes(repo.name)) return true;
        
        // Check if repo is explicitly excluded
        if (excludeRepos.includes(repo.name)) return false;
        
        // Check minimum stars
        if (repo.stargazers_count < minStars) return false;
        
        // Check if repo has allowed topics (if topics are configured)
        if (allowedTopics.length > 0 && repo.topics) {
          const hasAllowedTopic = repo.topics.some(topic => allowedTopics.includes(topic));
          if (!hasAllowedTopic) return false;
        }
        
        return true;
      })
      .map(repo => ({
        slug: repo.name,
        title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        summary: repo.description || 'No description available',
        description: repo.description || 'No description available',
        tech: [repo.language].filter(Boolean),
        code: repo.html_url,
        live: repo.homepage || null,
        image: null, // GitHub doesn't provide project images
        tags: repo.topics || [],
        stars: repo.stargazers_count,
        updated: repo.updated_at,
        language: repo.language,
        fork: repo.fork,
        archived: repo.archived
      }))
      .filter(repo => !repo.fork && !repo.archived) // Exclude forks and archived repos
      .sort((a, b) => b.stars - a.stars); // Sort by stars descending

    return filteredRepos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    
    // Return null on error to trigger fallback to projects.json
    if (error.response?.status === 403) {
      console.warn('GitHub API rate limit exceeded. Consider adding a token.');
    }
    
    return null;
  }
};

export const fetchRepoTopics = async (username, repoName) => {
  try {
    const response = await githubApi.get(`/repos/${username}/${repoName}/topics`);
    return response.data.names || [];
  } catch (error) {
    console.error(`Error fetching topics for ${repoName}:`, error);
    return [];
  }
};

export const getGitHubUser = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
};
