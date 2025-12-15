import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeBlock.css';

interface CodeBlockProps {
  children: string;
  className?: string;
  inline?: boolean;
}

const CodeBlock = ({ children, className, inline }: CodeBlockProps) => {
  // Extract language from className (format: language-js, language-python, etc.)
  const match = /language-(\w+)(?:\{([\d,-]+)\})?/.exec(className || '');
  const language = match?.[1] || 'text';
  const highlightLines = match?.[2] || '';

  // Parse highlight lines (e.g., "1,3-5,8" -> [1, 3, 4, 5, 8])
  const parseHighlightLines = (lineStr: string): number[] => {
    if (!lineStr) return [];
    
    const lines: number[] = [];
    const parts = lineStr.split(',');
    
    parts.forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (start !== undefined && end !== undefined && !isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            lines.push(i);
          }
        }
      } else {
        const lineNum = Number(part);
        if (!isNaN(lineNum)) {
          lines.push(lineNum);
        }
      }
    });
    
    return lines;
  };

  const linesToHighlight = parseHighlightLines(highlightLines);

  // For inline code, just return a simple code element
  if (inline) {
    return <code className="inline-code">{children}</code>;
  }

  return (
    <div className="code-block-wrapper">
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        showLineNumbers={true}
        wrapLines={true}
        lineProps={(lineNumber) => {
          const style: React.CSSProperties = { 
            display: 'block',
            paddingLeft: '0.8em',
            paddingRight: '0.8em',
          };
          const props: any = { style };
          if (linesToHighlight.includes(lineNumber)) {
            style.backgroundColor = 'rgba(200, 200, 200, 0.2)';
            props.className = 'highlighted-line';
          }
          return props;
        }}
        customStyle={{
          margin: 0,
          padding: '1em',
          backgroundColor: '#ffffff',
          border: 'none',
          borderRadius: '3px',
          fontSize: '1.2em',
          lineHeight: '1.5',
          fontFamily: 'Monaco, "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
          fontWeight: '400',
          color: '#1a1a1a',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'Monaco, "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
            fontWeight: '500',
          }
        }}
        lineNumberStyle={{
          minWidth: '3em',
          paddingRight: '0.5em',
          paddingLeft: '0.5em',
          marginRight: '1em',
          backgroundColor: 'transparent',
          color: '#0d3d0d',
          userSelect: 'none',
          textAlign: 'center',
          fontSize: '0.9em',
          fontWeight: 'bold',
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
