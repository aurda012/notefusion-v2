"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import Image from "next/image";
import { Icons } from "@/components/ui/react-icons";
import { cn } from "@/lib/utils";
import Menu from "./Menu";
import { useAppState } from "@/hooks/useAppState";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  updateFile,
  updateFolder,
  updateWorkspace,
} from "@/lib/supabase/queries";
import { revalidatePath } from "next/cache";

interface CoverImageProps {
  id: string;
  coverImage: string;
  type: "workspace" | "file" | "folder";
}

const CoverImage: React.FC<CoverImageProps> = ({ id, coverImage, type }) => {
  const supabase = createClientComponentClient();
  const { workspaceId, folderId, dispatch } = useAppState();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const path = usePathname();

  const isLoading = isDeleting || isUpdating;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  const onDelete = async () => {
    console.log("Clicked");
    setIsDeleting(true);
    if (type === "file") {
      if (!folderId || !workspaceId) return;
      dispatch({
        type: "UPDATE_FILE",
        payload: { file: { bannerUrl: "" }, fileId: id, folderId, workspaceId },
      });
      await supabase.storage.from("file-banners").remove([`banner-${id}`]);
      await updateFile({ bannerUrl: "" }, id, path);
    }
    if (type === "folder") {
      if (!workspaceId) return;
      dispatch({
        type: "UPDATE_FOLDER",
        payload: { folder: { bannerUrl: "" }, folderId: id, workspaceId },
      });
      await supabase.storage.from("file-banners").remove([`banner-${id}`]);
      await updateFolder({ bannerUrl: "" }, id, path);
    }
    if (type === "workspace") {
      dispatch({
        type: "UPDATE_WORKSPACE",
        payload: {
          workspace: { bannerUrl: "" },
          workspaceId: id,
        },
      });
      await supabase.storage.from("file-banners").remove([`banner-${id}`]);
      await updateWorkspace({ bannerUrl: "" }, id, path);
    }
    setIsDeleting(false);
  };

  return (
    <div className="h-[200px] md:h-[280px] w-full relative group shrink-0">
      <Image
        src={`${coverImage}`}
        className="object-cover md:object-left z-0 bg-accent"
        alt="cover image"
        quality={95}
        priority
        fill
      />

      {/* Status */}
      <div
        className={cn(
          "bg-black/50 absolute inset-0 w-full h-full hidden",
          isLoading && "block"
        )}
      >
        <div className="absolute bottom-5 right-5 w-max h-max text-white flex items-center gap-1">
          <Icons.loader className="h-3 w-3 animate-spin" />
          {isDeleting && (
            <span className="font-semibold text-sm">Deleting</span>
          )}
          {isUpdating && (
            <span className="font-semibold text-sm">Updating</span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full max-w-[900px] mx-auto px-10 md:px-24">
        {!isLoading ? (
          <Menu
            isDeleting={isDeleting}
            isUpdating={isUpdating}
            onDelete={onDelete}
            id={id}
            type={type}
          />
        ) : null}
        {/* <MenuDialog
          isLoading={isLoading}
          isOpen={isOpen}
          onDelete={onDelete}
          id={id}
          toggle={toggle}
        /> */}
      </div>
    </div>
  );
};

export default CoverImage;
