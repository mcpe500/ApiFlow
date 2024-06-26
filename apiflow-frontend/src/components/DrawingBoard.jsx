import React, { useState, useRef, useEffect } from "react";
import EndpointComponent from "./drawing/EndpointComponent";

export default function DrawingBoard() {
  const [shapes, setShapes] = useState([]);
  const boardRef = useRef(null);

  useEffect(() => {
    const board = boardRef.current;
    board.addEventListener("dragover", handleDragOver);
    board.addEventListener("drop", handleDrop);

    return () => {
      board.removeEventListener("dragover", handleDragOver);
      board.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData("text/plain");
    const boardRect = boardRef.current.getBoundingClientRect();
    const newShape = {
      id: Date.now(),
      type: shapeType,
      x: e.clientX - boardRect.left,
      y: e.clientY - boardRect.top,
    };
    setShapes([...shapes, newShape]);
  };

  const renderShape = (shape) => {
    switch (shape.type) {
      case "endpoint":
        return <EndpointComponent url="/api/v1/" />;
      default:
        return (
          <div
            className="absolute w-16 h-16 bg-blue-500 opacity-50 cursor-move"
            style={{
              borderRadius: shape.type === "circle" ? "50%" : "0",
            }}
          >
            {shape.type}
          </div>
        );
    }
  };

  return (
    <div
      ref={boardRef}
      className="w-full h-full bg-gray-800 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(#4a5568 1px, transparent 1px), linear-gradient(90deg, #4a5568 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}px`,
            top: `${shape.y}px`,
          }}
        >
          {renderShape(shape)}
        </div>
      ))}
    </div>
  );
}
