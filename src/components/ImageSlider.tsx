import React from "react";

interface ImageSliderProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	images: any[]; // Replace 'any' with your image type
	onClose: () => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, onClose }) => {
	return (
		<div className="fixed left-0 top-0 z-50 flex h-screen w-screen justify-center bg-opacity-80 backdrop-blur-md backdrop-filter">
			<div className="relative">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute right-2 top-2 h-fit w-fit cursor-pointer  rounded-full bg-white px-2 text-3xl text-red-500 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
				>
					&times;
				</button>
				{/* Image gallery */}
				<div className="flex h-full items-center justify-center">
					{images.map((image) => (
						<img
							key={image.id}
							src={`data:image/jpg;base64,${image.data}`}
							alt={image.filename}
							className=" h-full w-screen object-contain"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImageSlider;
