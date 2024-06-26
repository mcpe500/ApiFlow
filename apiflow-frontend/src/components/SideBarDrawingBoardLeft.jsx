import React, { useState, useRef } from "react";
import EndpointComponent from "./drawing/EndpointComponent";

export default function SideBarDrawingBoardLeft() {
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(240); // Initial width
  const sidebarRef = useRef(null);

  const handleDragStart = (e, shape) => {
    e.dataTransfer.setData("text/plain", shape);
  };
  const startDragging = (e) => {
    setIsDragging(true);
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDragging);
  };

  const onDrag = (e) => {
    if (isDragging) {
      const newWidth =
        e.clientX - sidebarRef.current.getBoundingClientRect().left;
      setWidth(Math.max(200, newWidth)); // Minimum width of 200px
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDragging);
  };
  const [isGeneralDropdownOpen, setIsGeneralDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsGeneralDropdownOpen(!isGeneralDropdownOpen);
  };

  return (
    <div
      ref={sidebarRef}
      className="flex flex-col bg-gray-900 text-gray-300 h-screen overflow-hidden"
      style={{ width: `${width}px` }}
    >
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Shapes"
            className="w-full bg-gray-800 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="w-5 h-5 absolute right-3 top-2.5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          <button
            onClick={() => toggleDropdown("setIsGeneralDropdownOpen")}
            className="hover:text-gray-400"
          >
            <h3 className="font-semibold mb-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span>General</span>
            </h3>
          </button>
          {isGeneralDropdownOpen && (
            <div className="grid grid-cols-4 gap-2">
              {/* ... (keep all the existing shapes) */}

              <div
                className="w-16 h-16 bg-gray-800 rounded-md flex items-center justify-center cursor-move hover:bg-gray-700"
                draggable
                onDragStart={(e) => handleDragStart(e, "endpoint")}
              >
                <div className="scale-50">
                  <EndpointComponent url="/api/v1/" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          + More Shapes
        </button>
      </div>

      <div
        className="absolute top-0 right-0 w-1 h-full bg-gray-700 cursor-col-resize"
        onMouseDown={startDragging}
      ></div>
    </div>
  );
}
