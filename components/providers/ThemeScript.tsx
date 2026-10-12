// Resolve the theme before paint; the provider starts with matching server/client markup.
const themeScript = `(function(){var theme='system';try{var saved=localStorage.getItem('ai-history-theme');if(saved==='light'||saved==='dark')theme=saved;}catch(e){}var dark=theme==='dark'||(theme==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light';})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
