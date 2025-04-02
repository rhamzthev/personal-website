import hljs from 'highlight.js';
import { JSDOM } from 'jsdom';

/**
 * Processes HTML content to apply syntax highlighting to code blocks
 */
export function processCodeBlocks(html: string): string {
  // Use JSDOM to parse the HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Find all code elements inside pre tags that don't have GitHub highlighting
  const codeBlocks = document.querySelectorAll('pre code:not([class*="pl-"])');
  
  codeBlocks.forEach(codeBlock => {
    // Detect language from class name (GitHub adds class="language-xxx")
    const classNames = Array.from(codeBlock.classList);
    const languageClass = classNames.find(className => 
      className.startsWith('language-')
    );
    
    let language = '';
    if (languageClass) {
      language = languageClass.replace('language-', '');
      
      // Skip highlighting for specific languages
      if (['mermaid', 'math', 'latex'].includes(language)) {
        return;
      }
    }
    
    // Apply syntax highlighting
    const content = codeBlock.textContent || '';
    let highlighted;
    
    try {
      if (language && hljs.getLanguage(language)) {
        // Highlight with detected language
        highlighted = hljs.highlight(content, { language });
      } else {
        // Auto-detect language
        highlighted = hljs.highlightAuto(content);
      }
      
      // Replace content with highlighted HTML
      codeBlock.innerHTML = highlighted.value;
      
      // Add the highlighted language class if detected
      if (highlighted.language) {
        codeBlock.classList.add(`hljs-${highlighted.language}`);
      }
      
      // Add hljs class for styling
      codeBlock.classList.add('hljs');
    } catch (e) {
      console.error('Error applying syntax highlighting:', e);
    }
  });
  
  return dom.serialize();
}