// src/app/layout.tsx

// Importing the styling (css) component
import './globals.css'

// Importing the Web3Provider component
import { Web3Provider } from '../components/Web3Provider';

// setting up metadata
export const metadata = {
  title: 'Multi-Chain dApp',
  description: 'A Next.js dApp supporting multiple chains',
};

// Defining the RootLayout component
// App Router component that wraps all pages
export default function RootLayout({
  children, // children is a prop that represents the content of the page components
}: {
  children: React.ReactNode // TypeScript type definition for the children prop
}) {
  return (
    // The html element is the root of the document
    // lang="en" sets the language of the document to English
    <html lang="en">
      <body>

        {/* 
            {children} represents the content of each page
            This will be dynamically replaced with the content of whatever page is currently being rendered
          */}
          
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}