interface ResultProps {
  question: string;
  answer: string;
  handleClick: () => void;
}

const gradientStyle = {
background: 'linear-gradient(1.28deg, #FFFFFF 1.09%, #D8E4D8 98.91%)',
};


function Result({ 
question,
answer,
handleClick,  
}: ResultProps) {
  return (
    <> 
      <div className="flex flex-col items-center justify-center p-6 gap-10 relative">
          <div
          className="flex items-center justify-center rounded-md p-3 bg-white opacity-90">
          <span className="text-xl text-gray-500 whitespace-pre-line">
              { question }
          </span>
          </div>

      <div className="flex items-center justify-center bg-[#D8E4D8] p-3 shadow-lg rounded-lg"
          style={gradientStyle}>
          <span className="text-gray-600 text-lg whitespace-pre-line">
              { answer }
          </span>
          </div>
      </div>

    <button onClick={handleClick}
    className="bg-[#5BC17F] rounded-full shadow-lg mt-6 w-60 h-10 flex items-center justify-center">
    <span className="text-lg text-white">Go Back to Main Page</span>
    </button>
    </> 
  )
}

export default Result;
