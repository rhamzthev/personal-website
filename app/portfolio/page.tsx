import { getGithubRepos } from '@/lib/github';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import { Suspense } from 'react';

interface TopicCounts {
  [topic: string]: number;
}

const PortfolioContent = async () => {
  const githubUsername = 'rhamzthev';
  const repos = await getGithubRepos(githubUsername);

  // Count topic occurrences across all repos with proper typing
  const topicCounts = repos.reduce((counts: TopicCounts, repo) => {
    (repo.topics || []).forEach(topic => {
      counts[topic] = (counts[topic] || 0) + 1;
    });
    return counts;
  }, {} as TopicCounts);

  // Sort topics by frequency (most used first) and convert to array of objects
  // with both the topic name and count for the FilterBar component
  const sortedTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([topic, count]) => ({ name: topic, count }));

  return (
    <section className="pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">
              My Portfolio
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Explore my projects and see what I&apos;ve been working on.
          </p>
        </div>

        <div className="relative z-20">
          <FilterBar topics={sortedTopics} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8" id="projects-grid">
          {repos.map((repo, index) => (
            <ProjectCard
              key={repo.id}
              repo={repo}
              index={index}
            />
          ))}
        </div>

        {repos.length === 0 && (
          <div className="glass-card p-8 text-center animate-fade-in">
            <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No Projects Found</h3>
            <p className="text-gray-400">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen pb-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bg-gradient-radial from-gray-900 to-black w-full h-full"></div>
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-red-900/20 to-transparent rounded-full filter blur-3xl animate-slow-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-red-800/10 to-transparent rounded-full filter blur-3xl animate-slow-pulse delay-2"></div>
      </div>

      <Suspense>
        <PortfolioContent />
      </Suspense>
    </main>
  );
}