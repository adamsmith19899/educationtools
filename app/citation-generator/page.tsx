import { ToolLayout } from "@/components/tool-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Citation Generator - APA, MLA, Chicago Style Citations | Informi Education Online",
  description:
    "Generate accurate citations in APA, MLA, and Chicago styles. Perfect for academic papers, research projects, and scholarly writing.",
  keywords:
    "citation generator, APA citations, MLA citations, Chicago style, bibliography, academic writing, research citations",
}

export default function CitationGenerator() {
  return (
    <ToolLayout toolName="Citation Generator">
      <div className="space-y-8">
        {/* Tool Interface */}
        <div className="bg-white border-4 border-black p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <button className="bg-primary text-white p-3 border-2 border-black font-bold hover:bg-secondary hover:text-black transition-colors">
                APA STYLE
              </button>
              <button className="bg-white text-black p-3 border-2 border-black font-bold hover:bg-secondary transition-colors">
                MLA STYLE
              </button>
              <button className="bg-white text-black p-3 border-2 border-black font-bold hover:bg-secondary transition-colors">
                CHICAGO STYLE
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold mb-2">Source Type</label>
                <select className="w-full p-3 border-2 border-black text-lg">
                  <option>Book</option>
                  <option>Journal Article</option>
                  <option>Website</option>
                  <option>Newspaper</option>
                  <option>Magazine</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">Author</label>
                <input type="text" placeholder="Last, First M." className="w-full p-3 border-2 border-black text-lg" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold mb-2">Title</label>
                <input type="text" placeholder="Source title" className="w-full p-3 border-2 border-black text-lg" />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">Publication Year</label>
                <input type="text" placeholder="2024" className="w-full p-3 border-2 border-black text-lg" />
              </div>
            </div>

            <button className="w-full bg-accent text-black p-4 border-2 border-black font-bold text-xl hover:bg-secondary transition-colors">
              GENERATE CITATION
            </button>

            <div className="bg-gray-100 border-2 border-black p-4">
              <h3 className="font-bold text-lg mb-2">Generated Citation:</h3>
              <p className="text-lg font-mono bg-white p-3 border-2 border-black">
                Smith, J. A. (2024). <em>Academic Writing Guide</em>. University Press.
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-secondary border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">HOW TO USE</h2>
          <ol className="space-y-3 text-lg">
            <li>
              <strong>1. Choose Style:</strong> Select APA, MLA, or Chicago citation style
            </li>
            <li>
              <strong>2. Select Source Type:</strong> Choose the type of source you're citing
            </li>
            <li>
              <strong>3. Fill Information:</strong> Enter author, title, publication details
            </li>
            <li>
              <strong>4. Generate Citation:</strong> Click to create properly formatted citation
            </li>
            <li>
              <strong>5. Copy & Use:</strong> Copy the citation to your bibliography or works cited page
            </li>
          </ol>
        </div>

        {/* Description */}
        <div className="bg-accent border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">DESCRIPTION</h2>
          <p className="text-lg leading-relaxed">
            The Citation Generator creates accurate, properly formatted citations in major academic styles including
            APA, MLA, and Chicago. This tool ensures your research papers meet academic standards and helps you avoid
            plagiarism by properly crediting sources. Whether you're writing essays, research papers, or dissertations,
            this generator saves time and ensures consistency in your bibliographic references.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">TIPS</h2>
          <ul className="space-y-3 text-lg">
            <li>
              <strong>Double-Check Information:</strong> Verify all source details before generating citations
            </li>
            <li>
              <strong>Know Your Style:</strong> Check assignment requirements for the required citation style
            </li>
            <li>
              <strong>Keep Records:</strong> Save source information as you research to make citing easier
            </li>
            <li>
              <strong>Use Consistent Format:</strong> Stick to one citation style throughout your paper
            </li>
            <li>
              <strong>Include Page Numbers:</strong> Add specific page numbers for direct quotes and paraphrases
            </li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
