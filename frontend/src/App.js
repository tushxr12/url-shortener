import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BackgroundLines } from "./components/ui/background-lines";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        const fullShortUrl = data.shortUrl;
        setShortUrl(fullShortUrl);
      } else {
        console.error("Error shortening URL:", data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Request failed:", error.message);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <BackgroundLines className="absolute inset-0 -z-10" />
      <main id="main-content" className="flex-1 flex justify-center items-center">
        {/* <BackgroundLines className="flex items-center justify-center w-full flex-col px-4"> */}

        <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            🔗 URL Shortener
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="url"
              placeholder="Paste your long URL here..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Shorten URL
            </button>
          </form>
          {shortUrl && (
            <div className="mt-6 text-center">
              <p className="mb-2">Your shortened URL:</p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline break-all"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="ml-2 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                >
                  {copied ? "✅" : "Copy"}
                </button>
              </div>
              {copied && (
                <div className="mt-3 text-green-400 text-sm transition-opacity duration-300">
                  Link copied to clipboard!
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;