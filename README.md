# Text Comparison Tool

A React TypeScript application for comparing and analyzing text differences. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- Side-by-side text comparison
- Support for multiple formats (Plain Text, JSON, SQL)
- Real-time difference highlighting
- Local storage for saving comparisons
- Responsive design
- Format-specific syntax highlighting
- Input validation

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
- LocalStorage API

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or higher)
- Yarn package manager

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/dantelentsoe/comparsion-chromoe-extension.git
cd comparsion-chromoe-extension
```

2. Install dependencies

```bash
yarn install
```

3. Start the development server

```bash
yarn dev
```

4. Build for production

```bash
yarn build
```

## 🔧 Configuration

### Tailwind CSS Setup

1. Install Tailwind CSS and its dependencies

```bash
yarn add -D tailwindcss postcss autoprefixer
```

2. Generate Tailwind CSS configuration file

```bash
yarn dlx tailwindcss init -p
```

3. Update `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
```

### Project Structure

```
src/
├── components/
│   ├── Select/
│   │   └── Select.tsx
│   ├── Button.tsx
│   └── DiffViewer.tsx
├── types/
│   └── index.ts
├── styles/
│   └── index.css
├── App.tsx
└── main.tsx
```

## 🎯 Usage

1. Enter text in both panels
2. Select the format type (Plain Text, JSON, SQL)
3. Click "Compare" to see differences
4. Save comparisons for later reference

### Example Usage

```typescript
import { DiffViewer } from './components/DiffViewer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DiffViewer />
    </div>
  )
}
```

## 🔍 Available Scripts

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run tests
yarn test

# Lint code
yarn lint

# Format code
yarn format
```

## 🎨 Customization

### Custom Themes

Update the `tailwind.config.js` to add your own color schemes:

```javascript
theme: {
  extend: {
    colors: {
      custom: {
        primary: '#your-color',
        secondary: '#your-color',
      },
    },
  },
},
```

### Custom Components

Create your own components in the `src/components` directory:

```typescript
// src/components/CustomButton.tsx
import React from 'react'

interface CustomButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button onClick={onClick} className="custom-button-styles">
      {children}
    </button>
  )
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Dante Lentsoe**

- Github: [@dantelentsoe](https://github.com/dantelentsoe)
- Website: [Dante Lentsoe](https://dantelentsoe.com)

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

## 🐛 Known Issues

- None currently reported

## 🔜 Roadmap

- [ ] Add support for more file formats
- [ ] Implement advanced diff algorithms
- [ ] Add export functionality
- [ ] Implement real-time collaboration
- [ ] Add unit tests

## ❓ FAQ

**Q: How do I report a bug?**
A: Open an issue in the GitHub repository with a detailed description of the bug.

**Q: Can I contribute to this project?**
A: Yes! Please check the Contributing section above.

## 💬 Support

If you have any questions or need help, please:

1. Check the FAQ section
2. Open an issue in the repository
3. Contact the author directly

---

Made with ❤️ by [Dante Lentsoe](https://github.com/dantelentsoe)
