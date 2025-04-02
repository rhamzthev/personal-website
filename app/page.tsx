/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { getGithubRepos, getGithubUser } from '@/lib/github';
import ContactForm from '@/components/ContactForm';

export default async function Home() {
  const githubUsername = 'rhamzthev';
  const [repos, user] = await Promise.all([
    getGithubRepos(githubUsername),
    getGithubUser(githubUsername)
  ]);

  const featuredRepos = repos.slice(0, 3);

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bg-gradient-radial from-gray-900 to-black w-full h-full"></div>
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-red-900/20 to-transparent rounded-full filter blur-3xl animate-slow-pulse"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-red-800/10 to-transparent rounded-full filter blur-3xl animate-slow-pulse delay-2"></div>
      </div>

      <section className="relative min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-8 xl:px-12 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-5xl md:text-6xl font-normal text-white animate-fade-in">
                Hi, I&apos;m <span className="text-primary font-bold">Rhamsez Thevenin</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 font-light animate-fade-in-delay-1">
                Full-Stack Developer
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl animate-fade-in-delay-2">
              I&apos;m a software engineer with expertise in full-stack development who creates practical applications through modern technologies, drawing on diverse experiences in martial arts, music, and philosophy to bring a distinctive approach to technical problem-solving and innovation.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-delay-3">
                <Link href="/portfolio" className="btn-primary">
                  View My Work
                </Link>
                <a href="/resume.pdf" className="btn-secondary" download>
                  Download Resume
                </a>
              </div>
              <div className="flex items-center gap-4 pt-6 animate-fade-in-delay-4">
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/rhamzthev" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:rhamzthev@example.com" className="social-link" aria-label="Email">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end animate-fade-in-delay-2">
              <div className="relative w-56 h-56 md:w-72 md:h-72">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-gray-900/40 rounded-full blur-md animate-slow-spin"></div>
                <div className="glass-morphism relative rounded-full overflow-hidden w-full h-full border-4 border-gray-800/50 shadow-glow">
                  <img 
                    src="/pfp.jpg"
                    alt="Rhamsez Tjevenin"
                    className="object-cover hover:scale-105 transition-transform duration-700 w-full h-full"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 bottom-8 flex flex-col items-center animate-centered-bounce">
            <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <h2 className="text-3xl font-bold mb-2 text-center">
            <span className="text-primary">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12">Recent work from my portfolio</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRepos.map((repo, index) => (
              <Link 
                key={repo.id}
                href={`/portfolio/${repo.name}`}
                className="group"
              >
                <div className="glass-card h-full p-6 relative overflow-hidden animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="neomorphic-icon mb-4 text-red-500 bg-gray-900">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map(topic => (
                      <span 
                        key={topic} 
                        className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full">
                        +{repo.topics.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <span className="text-red-500 group-hover:translate-x-1 transition-transform inline-flex items-center">
                      View project 
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                  {/* <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-gradient-to-br from-red-500/10 to-red-700/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div> */}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/portfolio" className="btn-primary">
              <span>View All Projects</span>
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-24 relative">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <h2 className="text-3xl font-bold mb-2 text-center">
            <span className="text-primary">
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12">Let&apos;s discuss on how I can be of service to you.</p>
          <div className="glass-card max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="neomorphic-icon-sm text-red-500 mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <a href="mailto:rhamzthev@gmail.com" className="hover:text-red-500 transition-colors">
                        rhamzthev@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="neomorphic-icon-sm text-red-500 mr-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Location</p>
                      <p>Boston, MA</p>
                    </div>
                  </div>
                  <div className="pt-6">
                    <h4 className="text-sm text-gray-400 mb-3">Connect with me</h4>
                    <div className="flex space-x-4">
                      <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="neomorphic-icon-sm text-red-500 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="https://linkedin.com/in/rhamzthev" target="_blank" rel="noopener noreferrer" className="neomorphic-icon-sm text-red-500 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:border-l border-gray-800/50">
                <h3 className="text-xl font-bold mb-4">Quick Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}