import React from "react";

interface ImageGridProps {
	images: any[]; // Replace 'any' with your image type
	onImageClick: (image: any) => void; // Replace 'any' with your image type
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageClick }) => {
	return (
		<div className="grid grid-cols-1 mx-8   gap-6 md:grid-cols-2 lg:grid-cols-3">
			{images.map((image) => (
				<div
					key={image.id}
					onClick={() => onImageClick(image)}
					className="transform cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
				>
					<img
						src={`data:image/jpg;base64,${image.data}`}
						alt={image.filename}
						className="object-fit aspect-square w-full rounded-lg"
					/>
				</div>
			))}
		</div>
	);
};

export default ImageGrid;
