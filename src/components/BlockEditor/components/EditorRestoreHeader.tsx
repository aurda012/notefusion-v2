import { Button } from "@/components/ui/shad-button";
import { useAppState } from "@/hooks/useAppState";
import {
  deleteFile,
  deleteFolder,
  updateFile,
  updateFolder,
} from "@/lib/supabase/queries";
import { usePathname, useRouter } from "next/navigation";

const EditorRestoreHeader = ({
  fileId,
  type,
  inTrash,
}: {
  fileId: string;
  type: string;
  inTrash: string;
}) => {
  const { workspaceId, folderId, dispatch } = useAppState();
  const router = useRouter();
  const path = usePathname();

  const restoreFileHandler = async () => {
    if (type === "file") {
      if (!folderId || !workspaceId) return;
      dispatch({
        type: "UPDATE_FILE",
        payload: { file: { inTrash: "" }, fileId, folderId, workspaceId },
      });
      await updateFile({ inTrash: "" }, fileId, path);
    }
    if (type === "folder") {
      if (!workspaceId) return;
      dispatch({
        type: "UPDATE_FOLDER",
        payload: { folder: { inTrash: "" }, folderId: fileId, workspaceId },
      });
      await updateFolder({ inTrash: "" }, fileId, path);
    }
  };

  const deleteFileHandler = async () => {
    if (type === "file") {
      if (!folderId || !workspaceId) return;
      dispatch({
        type: "DELETE_FILE",
        payload: { fileId, folderId, workspaceId },
      });
      await deleteFile(fileId);
      router.replace(`/dashboard/${workspaceId}`);
    }
    if (type === "folder") {
      if (!workspaceId) return;
      dispatch({
        type: "DELETE_FOLDER",
        payload: { folderId: fileId, workspaceId },
      });
      await deleteFolder(fileId);
      router.replace(`/dashboard/${workspaceId}`);
    }
  };

  return (
    <article
      className="py-2 
          z-40 
          bg-[#EB5757] 
          flex  
          md:flex-row 
          flex-col 
          justify-center 
          items-center 
          gap-4 
          flex-wrap"
    >
      <div
        className="flex 
            flex-col 
            md:flex-row 
            gap-2 
            justify-center 
            items-center"
      >
        <span className="text-white">This {type} is in the trash.</span>
        <Button
          size="sm"
          variant="outline"
          className="bg-transparent
                border-white
                text-white
                hover:bg-white
                hover:text-[#EB5757]
                "
          onClick={restoreFileHandler}
        >
          Restore
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="bg-transparent
                border-white
                text-white
                hover:bg-white
                hover:text-[#EB5757]
                "
          onClick={deleteFileHandler}
        >
          Delete
        </Button>
      </div>
      <span className="text-sm text-white">{inTrash}</span>
    </article>
  );
};
export default EditorRestoreHeader;
