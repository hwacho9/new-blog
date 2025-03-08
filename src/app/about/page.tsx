export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">About Me</h1>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="prose prose-blue max-w-none">
          <p>Hello, thank you for visiting my blog.</p>

          <p>
            This blog is a space where I share my thoughts and experiences on
            various topics that interest me. I plan to write about technology,
            daily life, hobbies, and more.
          </p>

          <h2>Interests</h2>
          <ul>
            <li>Programming</li>
            <li>Reading & Writing</li>
            <li>Photography</li>
            <li>Music</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Email: csh77776@gmail.com
            <br />
            GitHub:{" "}
            <a
              href="https://github.com/hwacho9"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/hwacho9
            </a>
            <br />
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/sunghwacho"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/sunghwacho
            </a>
          </p>

          {/* Resume Download Button */}
          <div className="my-6 flex justify-center">
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download Resume
            </a>
          </div>

          <blockquote>
            &ldquo;The only way to do great work is to love what you do.&rdquo;
            - Steve Jobs
          </blockquote>
        </div>
      </div>
    </div>
  );
}
