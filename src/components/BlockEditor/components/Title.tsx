import { useAppState } from "@/hooks/useAppState";
import { updateFile, updateFolder } from "@/lib/supabase/queries";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const Title = ({
  title,
  id,
  type,
}: {
  title: string;
  id: string;
  type: string;
}) => {
  const { state, dispatch, workspaceId, folderId } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  const path = usePathname();

  const fileTitle: string | undefined = useMemo(() => {
    if (type === "folder") {
      const stateTitle = state.workspaces
        .find((workspace) => workspace.id === workspaceId)
        ?.folders.find((folder) => folder.id === id)?.title;
      if (title === stateTitle || !stateTitle) return title;
      return stateTitle;
    }
    if (type === "file") {
      const stateTitle = state.workspaces
        .find((workspace) => workspace.id === workspaceId)
        ?.folders.find((folder) => folder.id === folderId)
        ?.files.find((file) => file.id === id)?.title;
      if (title === stateTitle || !stateTitle) return title;
      return stateTitle;
    }
    if (type === "workspace") {
      const stateTitle = state.workspaces.find(
        (workspace) => workspace.id === workspaceId
      )?.title;
      if (title === stateTitle || !stateTitle) return title;
      return stateTitle;
    }
  }, [state, workspaceId, id, title, folderId, type]);

  const handleBlur = async () => {
    if (!isEditing) return;
    setIsEditing(false);
    if (!fileTitle) return;
    if (type === "folder") {
      await updateFolder({ title }, id, path);
    }
    if (type === "file") {
      const { error } = await updateFile({ title: fileTitle }, id, path);
      if (error) {
        console.log(error);
      }
    }
  };

  const fileTitleChange = (e: any) => {
    if (!workspaceId || !folderId || !id) return;
    if (type === "folder") {
      dispatch({
        type: "UPDATE_FOLDER",
        payload: {
          folder: { title: e.target.value },
          folderId: id,
          workspaceId,
        },
      });
    }
    if (type === "file") {
      dispatch({
        type: "UPDATE_FILE",
        payload: {
          file: { title: e.target.value },
          folderId,
          workspaceId,
          fileId: id,
        },
      });
    }
  };

  return (
    <div className="text-4xl font-bold relative h-20 flex flex-col justify-center w-full">
      <h1 className="outline-none py-5 opacity-0 sr-only">{fileTitle}</h1>
      <input
        type="text"
        value={fileTitle}
        className={
          "appearance-none outline-none py-5 absolute inset-0 bg-transparent"
        }
        onBlur={handleBlur}
        onChange={fileTitleChange}
        disabled={type === "workspace"}
      />
    </div>
  );
};
export default Title;
