import { useState, useEffect } from 'react';
import { 
  StarIcon,
  GitHubLogoIcon,
  ExternalLinkIcon,
} from '@radix-ui/react-icons';

const Typewriter = ({ text, delay = 50, startDelay = 0 }: { text: string; delay?: number; startDelay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!show) return;
    if (currentText.length < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentText.length]);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentText, text, delay, show]);

  return (
    <div className={`flex items-start gap-2 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <span className="text-gray-500 font-mono shrink-0">{'>'}</span>
      <span className="text-gray-300 font-mono text-sm md:text-base leading-relaxed">
        {currentText}
        <span className="inline-block w-2 h-4 ml-1 bg-gray-500 animate-pulse align-middle" />
      </span>
    </div>
  );
};

function App() {
  return (
    <div className="h-screen bg-black text-white selection:bg-white selection:text-black font-sans overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 overflow-hidden snap-start">
        <div className="w-full max-w-xl space-y-8 z-10">
          <div className="text-center">
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white mb-8">
              Muhamad Irsal Firansyah
            </h1>
            
            <div className="space-y-4 max-w-lg mx-auto text-left">
              <Typewriter 
                text="I'm a Frontend Engineer with 7++ years experience" 
                startDelay={500} 
              />
              <Typewriter 
                text="Love building backend APIs and setting up CI/CD pipelines" 
                startDelay={3000} 
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-gray-500">
          <a href="https://linkedin.com/in/irsal-firansyah" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/irsalsss" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen snap-start flex flex-col justify-center max-w-4xl mx-auto px-6 py-12 space-y-16">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-500">Selected Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* AI-Thread */}
          <div className="group space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold group-hover:text-gray-400 transition-colors">AI-Thread</h3>
              <div className="flex items-center gap-3">
                <a href="https://github.com/irsalsss/fe-multiapp" target="_blank" rel="noopener noreferrer" title="View Source" className="text-gray-600 hover:text-white transition-colors">
                  <GitHubLogoIcon className="w-4 h-4" />
                </a>
                <a href="https://i-faaza.com/app/ai-thread/" target="_blank" rel="noopener noreferrer" title="Live Preview" className="text-gray-600 hover:text-white transition-colors">
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-mono">
              An advanced AI-powered conversation interface. Built with modern web technologies to provide a seamless, real-time messaging experience with intelligent agents.
            </p>
            <div className="flex gap-4 text-xs uppercase tracking-widest font-bold text-emerald-500">
              <StarIcon />
              <span>Featured</span>
            </div>
          </div>

          {/* Irsal-notes */}
          <div className="group space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold group-hover:text-gray-400 transition-colors">Notes</h3>
              <div className="flex items-center gap-3">
                <a href="https://github.com/irsalsss/irsal-notes" target="_blank" rel="noopener noreferrer" title="View Source" className="text-gray-600 hover:text-white transition-colors">
                  <GitHubLogoIcon className="w-4 h-4" />
                </a>
                <a href="https://notes.irsal.me" target="_blank" rel="noopener noreferrer" title="Live Preview" className="text-gray-600 hover:text-white transition-colors">
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-mono">
              A comprehensive digital brain and note-taking application focused on friction-less writing and fast retrieval.
            </p>
            <div className="flex gap-2">
              <span className="text-[11px] px-1.5 py-0.5 border border-gray-800 text-gray-500 uppercase font-bold tracking-tighter">Next.js</span>
              <span className="text-[11px] px-1.5 py-0.5 border border-gray-800 text-gray-500 uppercase font-bold tracking-tighter">TS</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
