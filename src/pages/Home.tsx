import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/notebooks", {
      state: { openUpload: true },
    });
  };
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      {/* Hero Section */}
      <div className='p-6 max-w-7xl mx-auto'>
        {/* Main Heading */}
        <div className='text-center py-12'>
          <h1 className='text-5xl font-bold text-blue-600 mb-4'>
            AI-LLM Notebook
          </h1>
          <p className='text-xl text-blue-500 font-medium'>
            Transform your documents into interactive knowledge sources
          </p>
        </div>

        {/* Feature Cards */}
        <div className='grid md:grid-cols-3 gap-6 mt-12'>
          {/* Card 1 */}
          <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-blue-500'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-blue-700 mb-2'>Upload Documents</h3>
            <p className='text-blue-600'>
              Support for PDF, DOCX, TXT, and images with automatic OCR text extraction
            </p>
          </div>

          {/* Card 2 */}
          <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-blue-500'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-blue-700 mb-2'>AI Analysis</h3>
            <p className='text-blue-600'>
              Get intelligent summaries, structured notes, and context-aware answers
            </p>
          </div>

          {/* Card 3 */}
          <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-blue-500'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-blue-700 mb-2'>Interactive Chat</h3>
            <p className='text-blue-600'>
              Ask questions and get instant answers from your documents using AI
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center mt-16'>
          <button 
          onClick={handleGetStarted}
          className='px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105'>
            Get Started Now
          </button>
          <p className='mt-4 text-blue-500'>
            Start transforming your documents into smart notebooks
          </p>
        </div>

        {/* Stats Section */}
        <div className='grid md:grid-cols-4 gap-6 mt-16 bg-blue-600 rounded-2xl p-8 text-white'>
          <div className='text-center'>
            <p className='text-4xl font-bold'>24+</p>
            <p className='text-blue-200 mt-2'>Documents Processed</p>
          </div>
          <div className='text-center'>
            <p className='text-4xl font-bold'>156+</p>
            <p className='text-blue-200 mt-2'>Questions Answered</p>
          </div>
          <div className='text-center'>
            <p className='text-4xl font-bold'>42+</p>
            <p className='text-blue-200 mt-2'>Notes Generated</p>
          </div>
          <div className='text-center'>
            <p className='text-4xl font-bold'>8+</p>
            <p className='text-blue-200 mt-2'>Notebooks Created</p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className='mt-16'>
          <h2 className='text-3xl font-bold text-blue-600 text-center mb-8'>
            How It Works
          </h2>
          <div className='grid md:grid-cols-4 gap-4'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
                1
              </div>
              <h4 className='font-bold text-blue-700 mb-2'>Upload</h4>
              <p className='text-blue-600 text-sm'>Upload your document</p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
                2
              </div>
              <h4 className='font-bold text-blue-700 mb-2'>Process</h4>
              <p className='text-blue-600 text-sm'>AI extracts and analyzes</p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
                3
              </div>
              <h4 className='font-bold text-blue-700 mb-2'>Interact</h4>
              <p className='text-blue-600 text-sm'>Ask questions and learn</p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
                4
              </div>
              <h4 className='font-bold text-blue-700 mb-2'>Save</h4>
              <p className='text-blue-600 text-sm'>Create smart notebooks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home