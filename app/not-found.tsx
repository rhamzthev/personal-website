import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-normal mb-6 text-gray-300">Page not found</h2>
      <p className="text-gray-400 mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}