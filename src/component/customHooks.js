import React, { useCallback, useEffect, useRef } from "react";

export const useFetch = (data, dispatch) => {
    useEffect(() => {
        dispatch({type: 'FETCHING_IMAGES', fetching: true})
        fetch(`https://picsum.photos/v2/list?page=${data.page}&limit=10`)
        .then(data => data.json())
        .then(images => {
            dispatch({type: 'STACK_IMAGES', images})
            dispatch({type: 'FETCHING_IMAGES', fetching: false})
        })
        .catch(e => {
            dispatch({type: 'FETCHING_IMAGES', fetching: false})
            return e;
        })
    }, [dispatch, data.page])
}


export const useInfiniteScroll = (scrollRef, dispatch) => {
    const scrollObserver = useCallback(
        node => {
            new IntersectionObserver(enteries => {
                enteries.forEach(en => {
                    if(en.intersectionRatio > 0){
                        dispatch({type: "ADVANCE_PAGE"})
                    }
                });
            }).observe(node)
        },
        [dispatch]
    );
    useEffect(() => {
        if(scrollRef.current){
            scrollObserver(scrollRef.current)
        }
    }, [scrollObserver, scrollRef])
}

export const useLazyLoading = (imgSelector, items) => {
    const imgObserver = useCallback(node => {
        const intObs = new IntersectionObserver(enteries => {
            enteries.forEach(en => {
                if(en.intersectionRatio > 0){
                    const currentImg = en.target;
                    const newImgSrc = currentImg.dataset.src;

                    if(!newImgSrc){
                        console.error('Image source invalid')
                    }else{
                        currentImg.src = newImgSrc;
                    }
                    intObs.unobserve(node)
                }
            });
        })
        intObs.observe(node)
    }, [])

    const imagesRef = useRef(null)

    useEffect(() => {
        imagesRef.current = document.querySelectorAll(imgSelector)
        if(imagesRef.current){
            imagesRef.current.forEach(img => imgObserver(img))
        }
    }, [imgObserver, imagesRef, imgSelector, items])
}