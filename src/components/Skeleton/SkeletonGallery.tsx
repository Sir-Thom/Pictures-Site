import SkeletonCard from "./SkeletonCard";
export default function SkeletonGallery() {
    return (
        <div className="grid grid-cols-1 mx-8   gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
        ))}
        </div>
    );
    
}



