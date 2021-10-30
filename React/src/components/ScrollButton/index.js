import React, {useState} from 'react'
import './style.css';


export default function ScrollButton({direction}) { 

    const [show, setShow] = useState(false);

    let scrollHandler = null;
    let scrollButtonClickHandler = null;

    if (direction === 'top') {
        scrollButtonClickHandler = (e) => {
            window.scrollTo(window.scrollX, 0);
        }
        scrollHandler = (e) => {
            if (window.scrollY < document.documentElement.clientHeight)
                setShow(false)
            else
                setShow(true);
        }
    } else if (direction === 'bottom') {
        scrollButtonClickHandler = (e) => {
            const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
            window.scrollTo(window.scrollX, scrollHeight);
        }
        scrollHandler = (e) => {
            console.log(window.scrollY)
            if (window.scrollY > document.documentElement.scrollHeight - document.documentElement.clientHeight - 200)
                setShow(false)
            else
                setShow(true);
        }
    }

    window.addEventListener('scroll', scrollHandler);
    if (!show) return null;
    return (
        <div className="scroll-button__container" data-type={direction}>
            <button className="scroll-button" onClick={scrollButtonClickHandler}>{direction}</button>
        </div>
    )
}
