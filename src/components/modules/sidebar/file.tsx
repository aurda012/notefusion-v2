"use client";

import EmojiPicker from "@/components/common/emoji-picker";
import TooltipComponent from "@/components/common/tooltip-component";
import { toast } from "@/components/ui/use-toast";
import { useAppState } from "@/hooks/useAppState";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { updateFile } from "@/lib/supabase/queries";
import clsx from "clsx";
import { Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface FileProps {
  title: string;
  id: string;
  iconId: string;
  folderId: string;
}

const File: React.FC<FileProps> = ({ title, id, iconId, folderId }) => {
  const { state, dispatch, workspaceId } = useAppState();
  const { user } = useSupabaseUser();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const fileTitle: string | undefined = useMemo(() => {
    const stateTitle = state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.folders.find((folder) => folder.id === folderId)
      ?.files.find((file) => file.id === id)?.title;
    if (title === stateTitle || !stateTitle) return title;
    return stateTitle;
  }, [state, workspaceId, id, title, folderId]);

  //Navigate the user to a different page
  const navigatatePage = () => {
    // console.log("Filed Clicked");
    router.push(`/dashboard/${workspaceId}/${folderId}/${id}`);
  };

  const onChangeEmoji = async (selectedEmoji: string) => {
    if (!workspaceId) return;
    dispatch({
      type: "UPDATE_FILE",
      payload: {
        folderId,
        workspaceId,
        fileId: id,
        file: { iconId: selectedEmoji },
      },
    });
    const { error } = await updateFile({ iconId: selectedEmoji }, id, path);
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not update the emoji for this folder",
      });
    } else {
      toast({
        title: "Success",
        description: "Update emoji for the folder",
      });
    }
  };

  const handleBlur = async () => {
    if (!isEditing) return;
    setIsEditing(false);
    if (!fileTitle) return;
    const { error } = await updateFile({ title: fileTitle }, id, path);
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not update the title for this file",
      });
    } else
      toast({
        title: "Success",
        description: "File title changed.",
      });
  };

  const fileTitleChange = (e: any) => {
    if (!workspaceId) return;
    if (id) {
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

  //move to trash
  const moveToTrash = async () => {
    if (!user?.email || !workspaceId) return;

    dispatch({
      type: "UPDATE_FILE",
      payload: {
        file: { inTrash: `Deleted by ${user?.email}` },
        folderId: folderId,
        workspaceId,
        fileId: id,
      },
    });
    const { data, error } = await updateFile(
      { inTrash: `Deleted by ${user?.email}` },
      id,
      path
    );
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not move the folder to trash",
      });
    } else {
      toast({
        title: "Success",
        description: "Moved folder to trash",
      });
    }
  };

  //double click handler
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  return (
    <div
      className="dark:text-white whitespace-nowrap flex justify-between items-center w-full relative group/file ml-6 mb-1"
      onClick={navigatatePage}
    >
      <div
        className="flex 
    gap-2 
    items-center 
    justify-center 
    overflow-hidden"
      >
        <div className="relative">
          <EmojiPicker getValue={onChangeEmoji}>{iconId}</EmojiPicker>
        </div>
        <input
          type="text"
          value={fileTitle}
          className={clsx(
            "outline-none overflow-hidden w-[140px] text-Neutrals/neutrals-7",
            {
              "bg-muted cursor-text": isEditing,
              "bg-transparent cursor-pointer": !isEditing,
            }
          )}
          readOnly={!isEditing}
          onDoubleClick={handleDoubleClick}
          onBlur={handleBlur}
          onChange={fileTitleChange}
        />
      </div>
      <div className="h-full hidden rounded-sm absolute right-10 items-center justify-center group-hover/file:block">
        <TooltipComponent message="Delete Folder">
          <Trash
            onClick={moveToTrash}
            size={15}
            className="hover:dark:text-white dark:text-Neutrals/neutrals-7 transition-colors"
          />
        </TooltipComponent>
      </div>
    </div>
  );
};
export default File;
