# Code Syntax Highlighting Guide

Your blog now supports beautiful syntax highlighting with line numbers!

## Features

- **Line numbers** with a light green gutter (like SyntaxHighlighter)
- **Syntax highlighting** for multiple programming languages
- **Line highlighting** to emphasize specific lines
- **Inline code** styling

## Basic Code Blocks

Just use triple backticks with the language:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Highlighting Specific Lines

To highlight specific lines, add `{line-numbers}` after the language:

### Single line:
\`\`\`javascript{3}
function add(a, b) {
  const sum = a + b;
  return sum; // This line will be highlighted
}
\`\`\`

### Multiple lines (comma-separated):
\`\`\`python{1,3,5}
def greet(name):
  message = f"Hello, {name}!"
  print(message)
  return message
\`\`\`

### Line ranges:
\`\`\`typescript{2-4}
interface User {
  id: number;
  name: string;
  email: string;
}
\`\`\`

### Combination:
\`\`\`csharp{1,3-5,8}
public class Calculator
{
  public int Add(int a, int b)
  {
    return a + b;
  }
  
  public int Multiply(int a, int b) => a * b;
}
\`\`\`

## Supported Languages

- JavaScript/TypeScript
- Python
- C#/C/C++
- Java
- Rust
- Go
- PHP
- Ruby
- And many more!

## Inline Code

Use single backticks for \`inline code\` within text.
