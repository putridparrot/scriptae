import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../content/posts');

// Ensure directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

const topics = [
  'React Performance',
  'TypeScript Tips',
  'Web Development',
  'JavaScript Patterns',
  'CSS Tricks',
  'Node.js Best Practices',
  'Testing Strategies',
  'Database Design',
  'API Development',
  'DevOps Essentials'
];

const authors = ['Alice Developer', 'Bob Engineer', 'Charlie Coder', 'Diana Tech'];

const sampleContent = [
  'Understanding the fundamentals is crucial for building robust applications.',
  'In this comprehensive guide, we explore advanced techniques and best practices.',
  'Let\'s dive deep into the core concepts that every developer should know.',
  'This article covers practical examples and real-world scenarios.',
  'Learn how to optimize your workflow and improve productivity.'
];

function generatePost(index) {
  const topic = topics[index % topics.length];
  const author = authors[index % authors.length];
  const date = new Date(2024, 0, 1);
  date.setDate(date.getDate() + index);
  
  const slug = `post-${String(index + 1).padStart(3, '0')}`;
  const title = `${topic} - Part ${index + 1}`;
  const excerpt = sampleContent[index % sampleContent.length];
  
  const content = `---
title: "${title}"
date: "${date.toISOString().split('T')[0]}"
author: "${author}"
excerpt: "${excerpt}"
---

# ${title}

${excerpt}

## Introduction

This post is part of our comprehensive series on ${topic.toLowerCase()}. We'll explore various aspects and provide practical insights that you can apply immediately.

## Key Concepts

### Concept 1: Fundamentals

Understanding the basics is essential. Here are the core principles:

- Point one about fundamentals
- Point two about best practices
- Point three about common patterns

### Concept 2: Advanced Techniques

Once you master the basics, you can move on to more advanced topics:

\`\`\`javascript
// Example code snippet
function example() {
  console.log('This is a sample code block');
  return true;
}
\`\`\`

### Concept 3: Real-World Applications

Let's see how this applies in practice:

1. Use case one
2. Use case two
3. Use case three

## Code Example

Here's a more detailed example:

\`\`\`typescript
interface Config {
  name: string;
  version: number;
}

class Application {
  private config: Config;
  
  constructor(config: Config) {
    this.config = config;
  }
  
  run(): void {
    console.log(\`Running \${this.config.name} v\${this.config.version}\`);
  }
}
\`\`\`

## Best Practices

When working with ${topic.toLowerCase()}, keep these best practices in mind:

- **Practice 1**: Always validate input
- **Practice 2**: Write clear, maintainable code
- **Practice 3**: Test thoroughly
- **Practice 4**: Document your work
- **Practice 5**: Stay updated with latest trends

## Common Pitfalls

Avoid these common mistakes:

| Pitfall | Solution |
|---------|----------|
| Not planning ahead | Create a detailed roadmap |
| Ignoring edge cases | Comprehensive testing |
| Over-engineering | Keep it simple |

## Conclusion

We've covered a lot of ground in this article. Remember to practice these concepts and apply them in your projects. Stay tuned for more articles in this series!

### Further Reading

- Related article 1
- Related article 2
- Official documentation

Thanks for reading!
`;

  const filePath = path.join(postsDir, `${slug}.md`);
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${slug}.md`);
}

// Generate 100 posts
console.log('Generating 100 test posts...');
for (let i = 0; i < 100; i++) {
  generatePost(i);
}
console.log('Done! Created 100 posts.');
