import { getRepoDetails, getGithubRepos } from '@/lib/github';
import { processCodeBlocks } from '@/lib/highlight';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaGithub, FaExternalLinkAlt, FaStar, FaEye, FaCalendar, FaMarkdown } from 'react-icons/fa';
import 'highlight.js/styles/atom-one-dark.css';

// Set dynamic metadata
export async function generateMetadata(props: {
  params: Promise<{ repoName: string }>
}) {

  const { repoName } = await props.params;

  const { repo } = await getRepoDetails('rhamzthev', repoName);
  if (!repo) return { title: 'Project Not Found' };
  
  return {
    title: `${repo.name} | Portfolio`,
    description: repo.description || 'Project details',
  };
}

// Pre-generate static params for popular repos
export async function generateStaticParams() {
  const repos = await getGithubRepos('rhamzthev');
  
  // Pre-render the top 10 repos to improve performance
  return repos.slice(0, 10).map(repo => ({
    repoName: repo.name,
  }));
}

export default async function RepoPage(props: {
  params: Promise<{ repoName: string }>
}) {
  const username = 'rhamzthev';
  
  const { repoName } = await props.params;


  try {
    // Use the consolidated optimized function that fetches all data at once
    const { repo, readme, languages } = await getRepoDetails(username, repoName);
    
    if (!repo) {
      return notFound();
    }

    // Process readme if it exists
    const processedReadme = readme ? await processCodeBlocks(readme) : '<p>No README available for this project.</p>';

    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    const languagePercentages = Object.entries(languages).map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 1000) / 10
    })).sort((a, b) => b.percentage - a.percentage);

    return (
      <main className="bg-gradient-radial from-gray-900 to-gray-950 min-h-screen">
        <div className="container-custom py-16 pt-20">
          <Link
            href="/portfolio"
            className="text-primary hover:text-primary-light transition-colors duration-300 mb-8 inline-flex items-center group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span className="ml-2 hover:underline">Back to all projects</span>
          </Link>

          <div className="mb-12 border-l-4 border-primary pl-6 animate-fade-in">
            <h1 className="text-5xl font-bold font-serif text-white mb-4 tracking-tight">
              {repo.name.replace(/-/g, ' ')}
            </h1>

            {repo.description && (
              <p className="text-xl text-gray-300 mb-6 font-serif max-w-2xl">
                {repo.description}
              </p>
            )}

            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {repo.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-4 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-primary transition-colors duration-300"
                  >
                    {topic.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <FaGithub className="mr-2" />
                View on GitHub
              </a>

              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-gray-600 text-white hover:border-primary hover:text-primary rounded-md transition-all duration-300"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Visit Website
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 hover:border-gray-700 rounded-xl overflow-hidden shadow-lg shadow-black/20 transition-all duration-300">
                {processedReadme ? (
                  <div className="p-0">
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-full h-24 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
                      <div className="absolute left-0 bottom-0 w-full h-24 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>

                      <div
                        className="custom-readme p-6 px-8"
                        dangerouslySetInnerHTML={{ __html: processedReadme }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-16 text-gray-400">
                    <FaMarkdown className="text-5xl mb-4 text-gray-600" />
                    <p className="text-xl font-medium mb-2">No README available</p>
                    <p className="text-gray-500">This project doesn&apos;t have a README file yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-6 shadow-lg shadow-black/20 transition-all duration-300">
                <h2 className="text-xl font-bold font-serif mb-5 pb-3 border-b border-gray-800 flex items-center">
                  <span className="w-2 h-6 bg-primary rounded-full mr-3"></span>
                  Languages
                </h2>

                {languagePercentages.length > 0 ? (
                  <div className="space-y-4">
                    {languagePercentages.map(({ name, percentage }) => (
                      <div key={name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{name}</span>
                          <span className="text-primary">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-dark to-primary h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No language data available</p>
                )}
              </div>

              <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-6 shadow-lg shadow-black/20 transition-all duration-300">
                <h2 className="text-xl font-bold font-serif mb-5 pb-3 border-b border-gray-800 flex items-center">
                  <span className="w-2 h-6 bg-primary rounded-full mr-3"></span>
                  Stats
                </h2>

                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-300">
                      <FaCalendar className="mr-2 text-gray-500" />
                      Created
                    </span>
                    <span className="font-medium">{new Date(repo.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-300">
                      <FaCalendar className="mr-2 text-gray-500" />
                      Updated
                    </span>
                    <span className="font-medium">{new Date(repo.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-300">
                      <FaStar className="mr-2 text-yellow-500" />
                      Stars
                    </span>
                    <span className="font-medium">{repo.stargazers_count}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center text-gray-300">
                      <FaEye className="mr-2 text-blue-400" />
                      Watchers
                    </span>
                    <span className="font-medium">{repo.watchers_count}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading repository:', error);
    return (
      <div className="container-custom py-16 pt-20">
        <p>Failed to load repository data. Please try again later.</p>
        <Link href="/portfolio" className="text-primary hover:underline">
          Return to portfolio
        </Link>
      </div>
    );
  }
}