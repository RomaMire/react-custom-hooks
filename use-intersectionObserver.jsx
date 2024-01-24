import { useState, useEffect } from "react";

const useIntersectionObserver = (element, rootMargin) => {
	// mark an "element" as a useRef() and describe "rootMargin" as a string : "0px 0px -200px 0px"
	const [isVisible, setIsVisible] = useState(false); // "false" by default and if isIntersecting - we change the value on "true" if is intersecting

	const [isItem, setIsItem] = useState(null); //if thre is an item in the range, we change the state and also return it via hook later (but not necessarily)

	const [margin, setMargin] = useState(rootMargin); // directly assign the rootMargin into margin and handle that state later

	useEffect(() => {
		setMargin(rootMargin);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true); // change the "isVisible" state and return "true" - then, we can conditionally do sth which depends on the state "true/false"
						setIsItem(element?.current);
					} else if (!entry.isIntersecting) {
						setIsVisible(false);
					}
				});
			},
			{
				rootMargin: margin, //pass the string into rootMargin
			}
		);
		if (element.current) {
			observer.observe(element?.current);
		}

		return () => {
			observer.disconnect(); //cleaning the observer up
		};
	}, [element, margin]);

	return { isVisible, isItem }; // isVisible: "true/false" ; isItem: HTML element marked by useRef()
};

export default useIntersectionObserver;
