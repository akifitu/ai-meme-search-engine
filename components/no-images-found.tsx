/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Q2jvX35BnWA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

import Image from "next/image";
import Link from "next/link";

// Array of suggested meme searches
const suggestedSearches = [
  "cat memes",
  "programming jokes",
  "AI fails",
  "office humor",
  "blockchain memes",
  "dad jokes",
  "tech humor",
  "coffee addiction"
];

export const NoImagesFound = ({ query }: { query: string }) => {
  // If there is no query, show suggestions and Powered by Upstash below them
  if (!query || query.trim() === "") {
    return (
      <div className="flex flex-col items-center space-y-8 mt-4">
        {/* Suggested searches section - directly below search box */}
        <div className="w-full max-w-xl mx-auto">
          <h4 className="text-center text-gray-300 mb-4 font-medium">Try one of these searches:</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestedSearches.map((suggestion, index) => (
              <Link 
                key={index} 
                href={`/?q=${encodeURIComponent(suggestion)}`}
                className={`
                  py-2 px-4 rounded-full bg-gradient-to-r 
                  ${index % 3 === 0 ? 'from-[#34d399]/20 to-[#34d399]/30 hover:from-[#34d399]/30 hover:to-[#34d399]/40' : 
                    index % 3 === 1 ? 'from-[#34d399]/30 to-[#b8af4f]/30 hover:from-[#34d399]/40 hover:to-[#b8af4f]/40' : 
                    'from-[#b8af4f]/20 to-[#b8af4f]/30 hover:from-[#b8af4f]/30 hover:to-[#b8af4f]/40'}
                  text-white transition-all
                  ${index % 4 === 0 ? 'transform -rotate-1' : 
                    index % 4 === 1 ? 'transform rotate-1' : 
                    index % 4 === 2 ? 'transform -rotate-2' : 'transform rotate-2'}
                  ${index % 2 === 0 ? 'text-sm' : 'text-base'}
                `}
              >
                {suggestion}
              </Link>
            ))}
          </div>
        </div>
      
        {/* Horizontal layout with logo and text - positioned right below suggestions */}
        <div className="flex items-center justify-center space-x-4">
          <img
            src="/upstash-logo.svg"
            alt="Upstash Logo"
            width={60}
            height={60}
          />
          <h3 className="text-xl font-medium bg-gradient-to-r from-[#34d399] to-[#b8af4f] inline-block text-transparent bg-clip-text">
            Powered by Upstash
          </h3>
        </div>
      </div>
    );
  }

  // Otherwise show the "No memes found" message
  return (
    <div className="text-center p-12">
      <h3 className="text-lg font-medium">No memes found</h3>
      <p className="text-sm text-gray-500 mt-2">
        No memes were found for &quot;{query}&quot;. Try searching for something
        else.
      </p>
    </div>
  );
};
