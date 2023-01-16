import { useRef } from "react";
import clsx from "clsx";
import useLazyLoad from "./useLazyLoad";
import { Card } from './Card';
import { LoadingPosts } from './LoadingPosts';
import posts from './data.json';

//total page and show pages

const NUM_PER_PAGE = 6;
const TOTAL_PAGES = 3;

export const Posts = () => {
    const images = posts["data"];
    const triggerRef = useRef(null);
    const onGrabData = (currentPage) => {
        // This would be where you'll call your API
        return new Promise((resolve) => {
            //  logic or page and time cut
            setTimeout(() => {
                const data = images.slice(
                    ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
                    NUM_PER_PAGE * (currentPage % TOTAL_PAGES)
                );
                console.log(data);
                resolve(data);
            }, 2000);
        });
    };
    const { data, loading } = useLazyLoad({ triggerRef, onGrabData });
    return (
        <>
            <div className="grid grid-cols-3 gap-4 content-start">
                {/* card data maping*/}
                {data.map(image => {
                    return <Card email={image["email"]} owner={image["owner"]} imageUrl={image["imageUrl"]} />
                })}
            </div>
            <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
                <LoadingPosts />
            </div>
        </>
    );
}