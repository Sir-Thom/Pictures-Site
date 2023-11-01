import React, { useEffect, useState,Suspense } from "react";
import { useQuery } from "react-query";
import ImageGrid from "./components/ImageGrid";
import ImageSlider from "./components/ImageSlider";
import Pagination from "./components/Pagination";
import Loader from "./components/LoadingScreen";
const PAGE_SIZE = 12; // Number of images per page

// Fetch images from the API
const fetchImages = async (currentPage: number, limit: number) => {
	try {
		const lastSeenId = (currentPage - 1) * limit;
		console.log(lastSeenId);
		const response = await fetch(
		
			`${
				import.meta.env.VITE_URL_API
			}/pictures/paginated/?last_seen_id=${lastSeenId}&limit=${limit}`
		);
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}
		const data = await response.json();

		// Check if there are fewer images than the limit remaining
		const remainingImages = Math.max(0, limit - data.length);

		if (remainingImages > 0) {
			// Fetch additional images only if there are additional images available
			const additionalResponse = await fetch(
				`${import.meta.env.VITE_URL_API}/pictures/paginated/?last_seen_id=${
					lastSeenId + data.length
				}&limit=${remainingImages}`
			);
			if (additionalResponse.ok) {
				const additionalData = await additionalResponse.json();
				data.push(...additionalData);
			}
		}

		return data;
	} catch (error) {
		console.error("Error fetching images:", error);
		throw error;
	}
};

// Fetch the total number of pages
const fetchTotalPages = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_URL_API}/picturescount`);
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		const data = await response.json();

		const totalImages = data.count;
		console.log("Total Images: " + totalImages);

		// Calculate the total number of pages based on PAGE_SIZE
		const totalPages = Math.ceil(totalImages / PAGE_SIZE);
		if (response.status === 404) {
			return Math.ceil(totalImages / PAGE_SIZE) - 1;
		}

		console.log("Total Pages: " + totalPages);

		return totalPages;
	} catch (error) {
		console.error("Error fetching total pages:", error);
		return 0; // Return a default value (e.g., 1) if an error occurs
	}
};

const App: React.FC = () => {
	const [selectedImage, setSelectedImage] = useState<any | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const { data: images, isLoading } = useQuery(["images", currentPage], () =>
		fetchImages(currentPage, PAGE_SIZE)
	);
	useEffect(() => {
		// Retrieve the current page from local storage
		const savedCurrentPage = localStorage.getItem("currentPage");

		if (savedCurrentPage) {
			setCurrentPage(Number(savedCurrentPage));
		}
	}, []);
	const { data: totalPages } = useQuery("totalPages", fetchTotalPages);

	const handleFirstPage = () => {
		setCurrentPage(1);
		localStorage.setItem("currentPage", String(1));
	};

	const handleLastPage = () => {
		setCurrentPage(totalPages as number);
		console.log("total page: " + totalPages + 1);
		localStorage.setItem("currentPage", String(totalPages));
	};

	const handleImageClick = (image: any) => {
		setSelectedImage(image);
	};

	const handleCloseSlider = () => {
		setSelectedImage(null);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		localStorage.setItem("currentPage", String(page));
	};

	return (
		<div className="  bg-gray-100 p-4 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
		  <h1 className="my-6 text-center text-2xl font-bold ">Image Gallery</h1>
		  {isLoading ? ( // Display the loading screen when data is loading
        <Loader />
      ) : (
        // Render the content when data is ready
        <>
          {images != null && <ImageGrid images={images} onImageClick={handleImageClick} />}
          {selectedImage && <ImageSlider images={[selectedImage]} onClose={handleCloseSlider} />}
          {totalPages !== undefined && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages as number}
              onPageChange={handlePageChange}
              onFirstPage={handleFirstPage}
              onLastPage={handleLastPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
