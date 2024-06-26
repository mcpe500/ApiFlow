import React, { useState } from "react";

export default function NavBarDrawingBoard() {
  const [lastChangeMessage, setLastChangeMessage] = useState(
    "Last change 25 days ago"
  );
  const [fileName, setFileName] = useState("Untitled Diagram.drawio");
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
  const [isEditDropdownOpen, setIsEditDropdownOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isArrangeDropdownOpen, setIsArrangeDropdownOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    const dropdowns = {
      setIsFileDropdownOpen,
      setIsEditDropdownOpen,
      setIsViewDropdownOpen,
      setIsArrangeDropdownOpen,
    };
    Object.keys(dropdowns).forEach((key) => {
      if (key === dropdown) {
        dropdowns[key]((prev) => !prev);
      } else {
        dropdowns[key](false);
      }
    });
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-orange-600 w-10 h-10 rounded mr-3"></div>
          <span className="font-semibold text-lg">{fileName}</span>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="relative">
            <button
              onClick={() => toggleDropdown("setIsFileDropdownOpen")}
              className="hover:text-gray-400"
            >
              File
            </button>
            {isFileDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-gray-700 border border-gray-600 rounded shadow-lg z-10">
                {[
                  "Save",
                  "Share...",
                  "Synchronize",
                  "Open from",
                  "Open Recent",
                  "New...",
                  "Rename...",
                  "Make a Copy...",
                  "Open Folder...",
                  "Move to Folder...",
                  "Import from",
                  "Export as",
                  "Embed",
                  "Publish",
                  "New Library",
                  "Open Library from",
                  "Revision History...",
                  "Properties...",
                  "Page Setup...",
                  "Print...",
                  "Close",
                ].map((item) => (
                  <a
                    href="#"
                    key={item}
                    className="block px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => toggleDropdown("setIsEditDropdownOpen")}
              className="hover:text-gray-400"
            >
              Edit
            </button>
            {isEditDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-gray-700 border border-gray-600 rounded shadow-lg z-10">
                {[
                  "Undo",
                  "Redo",
                  "Cut",
                  "Copy",
                  "Copy as Image",
                  "Paste",
                  "Delete",
                  "Duplicate",
                  "Find/Replace",
                  "Edit Data...",
                  "Edit Tooltip...",
                  "Edit Style...",
                  "Edit Geometry...",
                  "Edit",
                  "Edit Link...",
                  "Open Link",
                  "Select Vertices",
                  "Select Edges",
                  "Select All",
                  "Select None",
                  "Lock/Unlock",
                ].map((item) => (
                  <a
                    href="#"
                    key={item}
                    className="block px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => toggleDropdown("setIsViewDropdownOpen")}
              className="hover:text-gray-400"
            >
              View
            </button>
            {isViewDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-gray-700 border border-gray-600 rounded shadow-lg z-10">
                {[
                  { name: "Format", shortcut: "Ctrl+Shift+P" },
                  { name: "Outline", shortcut: "Ctrl+Shift+O" },
                  { name: "Layers", shortcut: "Ctrl+Shift+L" },
                  { name: "Tags", shortcut: "Ctrl+K" },
                  { name: "Comments" },
                  { name: "Search Shapes" },
                  { name: "Scratchpad" },
                  { name: "Shapes", shortcut: "Ctrl+Shift+K" },
                  { name: "Page View" },
                  { name: "Page Scale..." },
                  { name: "Units" },
                  { name: "Page Tabs" },
                  { name: "Tooltips" },
                  { name: "Ruler" },
                  { name: "Grid", shortcut: "Ctrl+Shift+G" },
                  { name: "Guides" },
                  { name: "Connection Arrows", shortcut: "Alt+Shift+A" },
                  { name: "Connection Points", shortcut: "Alt+Shift+O" },
                  { name: "Reset View", shortcut: "Enter/Home" },
                  { name: "Zoom In", shortcut: "Ctrl + / Alt+Mousewheel" },
                  { name: "Zoom Out", shortcut: "Ctrl - / Alt+Mousewheel" },
                  { name: "Fullscreen" },
                ].map((item) => (
                  <a
                    href="#"
                    key={item.name}
                    className="block px-4 py-2 text-sm hover:bg-gray-600 flex justify-between"
                  >
                    <span>{item.name}</span>
                    {item.shortcut && (
                      <span className="text-gray-400 text-xs">
                        {item.shortcut}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => toggleDropdown("setIsArrangeDropdownOpen")}
              className="hover:text-gray-400"
            >
              Arrange
            </button>
            {isArrangeDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-gray-700 border border-gray-600 rounded shadow-lg z-10">
                {[
                  { name: "To Front", shortcut: "Ctrl+Shift+F" },
                  { name: "To Back", shortcut: "Ctrl+Shift+B" },
                  { name: "Bring Forward", shortcut: "Ctrl+Alt+Shift+F" },
                  { name: "Send Backward", shortcut: "Ctrl+Alt+Shift+B" },
                  { name: "Direction", submenu: true },
                  {
                    name: "Rotate shape only by 90° / Reverse",
                    shortcut: "Ctrl+R",
                  },
                  { name: "Align", submenu: true },
                  { name: "Distribute", submenu: true },
                  { name: "Navigation", submenu: true },
                  { name: "Insert", submenu: true },
                  { name: "Layout", submenu: true },
                  { name: "Group", shortcut: "Ctrl+G" },
                  { name: "Ungroup", shortcut: "Ctrl+Shift+U" },
                  { name: "Remove from Group" },
                  { name: "Clear Waypoints", shortcut: "Alt+Shift+R" },
                  { name: "Autosize", shortcut: "Ctrl+Shift+Y" },
                ].map((item) => (
                  <a
                    href="#"
                    key={item.name}
                    className={`block px-4 py-2 text-sm hover:bg-gray-600 flex justify-between ${
                      item.submenu ? "submenu" : ""
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.shortcut && (
                      <span className="text-gray-400 text-xs">
                        {item.shortcut}
                      </span>
                    )}
                    {item.submenu && <span className="text-gray-400">▶</span>}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#" className="hover:text-gray-400">
            Extras
          </a>
          <a href="#" className="hover:text-gray-400">
            Help
          </a>
          <span className="ml-4">{lastChangeMessage}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500">
            Share
          </button>
          <span>USER NAME</span>
          <button className="focus:outline-none">
            <i className="fas fa-moon"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
