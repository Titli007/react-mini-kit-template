import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate()

  function createPollHandler(){
    navigate('/question')
  }

  return (
    <div className=" text-gray-900">
    {/* Header */}
    

    {/* Main Content */}
    <div className="">
      <div className="bg-gray-200 rounded-3xl p-8 text-center">
        <button className="h-16 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center mx-auto mb-8 p-6">
          <FaPlus className="h-8 text-white" onClick={createPollHandler}/>
          <span className="sr-only">Create new question</span>
        </button>
        
        <h1 className="text-3xl font-bold mb-4">Create a new question</h1>
        
        <p className="text-gray-600 text-lg mb-12">
          Polls let you ask quick questions and get instant feedback—ideal for opinions,
          decisions, or fun!
        </p>

        <div className="flex items-center gap-2 text-gray-600 mb-8 justify-center">
          <div className="p-2 flex h-6 items-center justify-center rounded-full border border-gray-300">
            <span className="text-sm">i</span>
          </div>
          <p>Get started by creating your first poll</p>
        </div>

        {/* <a
          href="#"
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Terms and conditions
        </a> */}
      </div>
    </div>
  </div>
  )
}

export default Home
