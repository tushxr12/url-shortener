export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded"
      >
        Skip to main content
      </a>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" aria-label="Go to homepage" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Short<span className="text-blue-400">Link</span>
          </h1>
        </a>

        <nav aria-label="Main navigation" className="space-x-4 hidden sm:block">
          <a href="https://www.linkedin.com/in/tushxr12" target="_blank" className="hover:text-blue-400 transition-colors">LinkedIn</a>
          <a href="https://github.com/tushxr12/url-shortener" target="_blank" className="hover:text-blue-400 transition-colors">Github</a>
        </nav>
      </div>
    </header>
  );
}