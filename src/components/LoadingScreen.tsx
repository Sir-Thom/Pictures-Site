import { RiLoader3Fill, RiLoader4Line } from "react-icons/ri";

function LoadingScreen() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-700">
            <div className="text-3xl text-white">
                <RiLoader3Fill className="animate-spin text-indigo-500" size={100} />
            </div>
        </div>
    );
}

export default LoadingScreen;
