import './App.css';
import { useRef, useEffect } from 'react';

function ResizeableDiv({ children }) {
    const refBox = useRef(null);
    const refTop = useRef(null);
    const refRight = useRef(null);
    const refBottom = useRef(null);
    const refLeft = useRef(null);

    useEffect(() => {
        const resizeableElement = refBox.current;
        const styles = window.getComputedStyle(resizeableElement);
        let width = parseInt(styles.width, 10); // 100px -> 100
        let height = parseInt(styles.height, 10); // 100px -> 100

        let xCord = 0;
        let yCord = 0;

        resizeableElement.style.top = "150px";
        resizeableElement.style.left = "150px";

        //TOP
        const onMouseMoveTopResize = (event) => {
            const dy = event.clientY - yCord;
            height = height - dy;
            yCord = event.clientY;
            resizeableElement.style.height = `${height}px`;
        };

        const onMouseUpTopResize = () => {
            document.removeEventListener("mousemove", onMouseMoveTopResize);
        };

        const onMouseDownTopResize = (event) => {
            yCord = event.clientY;
            const styles = window.getComputedStyle(resizeableElement);
            resizeableElement.style.bottom = styles.bottom;
            resizeableElement.style.top = null;
            document.addEventListener("mousemove", onMouseMoveTopResize);
            document.addEventListener("mouseup", onMouseUpTopResize);
        };

        //RIGHT
        const onMouseMoveRightResize = (event) => {
            const dx = event.clientX - xCord;
            xCord = event.clientX;
            width = width + dx;
            resizeableElement.style.width = `${width}px`;
        };

        const onMouseUpRightResize = () => {
            document.removeEventListener("mousemove", onMouseMoveRightResize);
        };

        const onMouseDownRightResize = (event) => {
            xCord = event.clientX;
            resizeableElement.style.left = styles.left;
            resizeableElement.style.right = null;
            document.addEventListener("mousemove", onMouseMoveRightResize);
            document.addEventListener("mouseup", onMouseUpRightResize);
        };

        //BOTTOM
        const onMouseMoveBottomResize = (event) => {
            const dy = event.clientY - yCord;
            yCord = event.clientY;
            height = height + dy;
            resizeableElement.style.height = `${height}px`;
        };

        const onMouseUpBottomResize = () => {
            document.removeEventListener("mousemove", onMouseMoveBottomResize);
        };

        const onMouseDownBottomResize = (event) => {
            yCord = event.clientY;
            const styles = window.getComputedStyle(resizeableElement);
            resizeableElement.style.top = styles.top;
            resizeableElement.style.bottom = null;
            document.addEventListener("mousemove", onMouseMoveBottomResize);
            document.addEventListener("mouseup", onMouseUpBottomResize);
        };

        //LEFT
        const onMouseMoveLeftResize = (event) => {
            const dx = event.clientX - xCord;
            xCord = event.clientX;
            width = width - dx;
            resizeableElement.style.width = `${width}px`;
        };

        const onMouseUpLeftResize = () => {
            document.removeEventListener("mousemove", onMouseMoveLeftResize);
        };

        const onMouseDownLeftResize = (event) => {
            xCord = event.clientX;
            resizeableElement.style.right = styles.right;
            resizeableElement.style.left = null;
            document.addEventListener("mousemove", onMouseMoveLeftResize);
            document.addEventListener("mouseup", onMouseUpLeftResize);
        };

        // Mouse down event listener
        const resizerRight = refRight.current;
        resizerRight.addEventListener("mousedown", onMouseDownRightResize);

        const resizerTop = refTop.current;
        resizerTop.addEventListener("mousedown", onMouseDownTopResize);

        const resizerBottom = refBottom.current;
        resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);

        const resizerLeft = refLeft.current;
        resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

        // Cleanup function
        return () => {
            resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
            resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
            resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
            resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
        };
    }, []);

    return (
        <div className='wrapper'>
            <div ref={refBox} className='resizeable-box'>
                <div ref={refLeft} className='resizer rl'></div>
                <div ref={refTop} className='resizer rt'></div>
                <div ref={refRight} className='resizer rr'></div>
                <div ref={refBottom} className='resizer rb'></div>
                {children}
            </div>
        </div>
    );
}

export default ResizeableDiv;
