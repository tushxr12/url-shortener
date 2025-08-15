export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm shadow-md h-16 flex items-center">
      <div className="max-w-6xl mx-auto px-4 w-full text-center">
        <p>
          © {new Date().getFullYear()} ShortLink. Made with <span className="text-red-500">♥</span> by <i className="underline"><a href="https://www.linkedin.com/in/tushxr12" target="_blank">Tushar</a></i>.
        </p>
      </div>
    </footer>
  );
}