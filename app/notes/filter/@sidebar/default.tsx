import { tags } from "@/constants/tags";
import SidebarNotes from "./SidebarNotes";

const NotesSidebar = async () => {
  return <SidebarNotes tags={tags} />;
};

export default NotesSidebar;
