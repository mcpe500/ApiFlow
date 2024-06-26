import DrawingBoard from "../components/DrawingBoard";
import NavBarDrawingBoard from "../components/NavBarDrawingBoard";
import SideBarDrawingBoardLeft from "../components/SideBarDrawingBoardLeft";
import SideBarDrawingBoardRight from "../components/SideBarDrawingBoardRight";

export default function DrawingBoardPage() {
  return (
    <>
      <NavBarDrawingBoard />
      <SideBarDrawingBoardLeft />
      <SideBarDrawingBoardRight />
      <DrawingBoard />
    </>
  );
}
