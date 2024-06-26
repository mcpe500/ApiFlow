import DrawingBoard from "../components/DrawingBoard";
import NavBarDrawingBoard from "../components/NavBarDrawingBoard";
import SideBarDrawingBoardLeft from "../components/SideBarDrawingBoardLeft";
import SideBarDrawingBoardRight from "../components/SideBarDrawingBoardRight";

export default function DrawingBoardPage() {
  return (
    <div className="flex flex-col h-screen">
      <NavBarDrawingBoard />
      <div className="flex flex-grow">
        <SideBarDrawingBoardLeft />
        <div className="flex-grow">
          <DrawingBoard />
        </div>
        <SideBarDrawingBoardRight />
      </div>
    </div>
  );
}
