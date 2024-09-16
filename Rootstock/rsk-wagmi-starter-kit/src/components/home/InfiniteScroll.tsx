import { useEffect, useRef } from "react";

export default function InfiniteScroll(): JSX.Element {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollerInner = useRef<HTMLUListElement>(null);

  const addAnimation = () => {
    scroller.current?.classList.add("active-scroller");
    const scrollerItems = Array.from(scrollerInner.current?.children || []);

    scrollerItems.forEach((item) => {
      const duplicate = item.cloneNode(true);
      scrollerInner.current?.appendChild(duplicate);
    });
  };

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, []);

  return (
    <div className="scroller" ref={scroller}>
      <ul className="inner-scroller" ref={scrollerInner}>
        <p className="paragraph">
          Join the Hackathon Bitcoin Meets Solidity Hackathon! Innovate,
          collaborate, and create the future with Rootstock.
        </p>
      </ul>
    </div>
  );
}
