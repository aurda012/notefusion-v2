import EmojiPicker from "@/components/common/emoji-picker";
import BannerUpload from "./BannerUpload";
import {
  updateFile,
  updateFolder,
  updateWorkspace,
} from "@/lib/supabase/queries";
import { useAppState } from "@/hooks/useAppState";
import { Button } from "@/components/ui/shad-button";
import { Icons } from "@/components/ui/react-icons";
import { usePathname } from "next/navigation";
import Title from "./Title";

const EditorDetails = ({
  details,
  fileId,
  type,
}: {
  details: any;
  fileId: string;
  type: "workspace" | "file" | "folder";
}) => {
  const { workspaceId, folderId, dispatch } = useAppState();
  const path = usePathname();

  const iconOnChange = async (icon: string) => {
    if (!fileId) return;
    if (type === "workspace") {
      dispatch({
        type: "UPDATE_WORKSPACE",
        payload: { workspace: { iconId: icon }, workspaceId: fileId },
      });
      await updateWorkspace({ iconId: icon }, fileId, path);
    }
    if (type === "folder") {
      if (!workspaceId) return;
      dispatch({
        type: "UPDATE_FOLDER",
        payload: {
          folder: { iconId: icon },
          workspaceId,
          folderId: fileId,
        },
      });
      await updateFolder({ iconId: icon }, fileId, path);
    }
    if (type === "file") {
      if (!workspaceId || !folderId) return;

      dispatch({
        type: "UPDATE_FILE",
        payload: { file: { iconId: icon }, workspaceId, folderId, fileId },
      });
      await updateFile({ iconId: icon }, fileId, path);
    }
  };

  return (
    <div
      className="w-full 
    self-center 
    lg:max-w-2xl  xl:max-w-3xl
    pl-20
    lg:pl-0
    flex 
    flex-col
    lg:mt-8"
    >
      <div className="text-[80px] mb-2">
        <EmojiPicker getValue={iconOnChange}>
          <div
            className="w-[100px]
          cursor-pointer
          transition-colors
          h-[100px]
          flex
          items-center
          justify-center
          hover:bg-muted
          rounded-xl"
          >
            {details.iconId}
          </div>
        </EmojiPicker>
      </div>
      {!details.bannerUrl && (
        <div className="inline-flex gap-2 mb-4">
          <BannerUpload id={fileId} dirType={type}>
            <Button
              type="button"
              className="cursor-pointer text-sm md:!opacity-80 group-hover:!opacity-80 transition-opacity duration-200 px-2 gap-2"
              variant={"ghost"}
              size={"sm"}
            >
              <Icons.Image className="h-4 w-4" />
              <span>Add Cover</span>
            </Button>
          </BannerUpload>
        </div>
      )}
      <Title title={details.title} id={fileId} type={type} />
    </div>
  );
};
export default EditorDetails;
