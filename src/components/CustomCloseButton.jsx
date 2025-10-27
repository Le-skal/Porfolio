import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import "./CustomCloseButton.css";

export const CustomCloseButton = ({ onClick, className = "", isClosing = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const { t } = useLanguage();

    const handleClick = () => {
        setIsClicked(true);

        // Wait for fade-out to complete before closing
        setTimeout(() => {
            // Call the onClick handler to close the modal/navigate
            if (onClick) {
                onClick();
            }
        }, 800); // Time for cross and button to fade out
    };

    return (
        <>
            <button
                className={`custom-close-button ${className} ${isClosing ? "closing" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <span className="close-text">{t("closeAllProjects")}</span>
            </button>

            {createPortal(
                <>
                    {/* Filter overlay - keep visible with cross, then fade */}
                    <div className={`filter-overlay ${(isHovered || isClicked) ? "active" : ""} ${isClosing ? "closing" : ""}`} />

                    {/* Animated cross bars - stay visible, then fade with button */}
                    <div className={`cross-container ${isClosing ? "closing" : ""}`}>
                        <div className={`cross-bar bar-1 ${(isHovered || isClicked) ? "animate" : ""}`} />
                        <div className={`cross-bar bar-2 ${(isHovered || isClicked) ? "animate" : ""}`} />
                    </div>
                </>,
                document.body
            )}
        </>
    );
};
