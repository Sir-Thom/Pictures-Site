import Pagination from '../components/Pagination';
import ImageGrid from '../components/ImageGrid';
import ImageSlider from '../components/ImageSlider';
import SkeletonGallery from '../components/Skeleton/SkeletonGallery';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import Navbar from '../components/Navbar';

const PAGE_SIZE = 12; 
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const fetchImages = async (currentPage: number, limit: number, _token: string)  => {
    try {
        const lastSeenId = (currentPage - 1) * limit;
        console.log(lastSeenId);
        const response = await fetch(
            `${import.meta.env.VITE_URL_API}/pictures/paginated/?last_seen_id=${lastSeenId}&limit=${limit}`,
            {
                headers: {
                    
                    'Content-Type': 'application/json',
                   
                },
                credentials: 'include',
            }
        );
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
};
// Fetch the total number of pages
export const fetchTotalPages = async (_token: string) => {
    try {
        console.log(getCookie('token'))
        const response = await fetch(`${import.meta.env.VITE_URL_API}/pictures/count/`, {
          
            headers: {
                
                'Content-Type': 'text/plain',
    
            },
			credentials: 'include',
			
        });
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const totalImages = data;

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
        return 0;
    }
};

const Picture: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
	const [cookies] = useCookies(['token']);
	const token = cookies.token;
    const { data: images, isLoading } = useQuery(["images", currentPage], () =>
        fetchImages(currentPage, PAGE_SIZE, token as string)
    );
    const { data: totalPages } = useQuery(["totalPages"], () => fetchTotalPages(token as string));

    const handleFirstPage = () => {
        setCurrentPage(1);
        localStorage.setItem("currentPage", String(1));
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages as number);
        console.log("total page: " + (totalPages as number + 1));
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
        <div className="  ">
            <Navbar />
            {isLoading ? (
                <SkeletonGallery />
            ) : (
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

export default Picture;
