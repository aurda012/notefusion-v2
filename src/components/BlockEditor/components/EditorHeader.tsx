import { Icon } from "@/components/ui/Icon";
import { EditorInfo } from "./EditorInfo";
import { EditorUser } from "../types";
import { WebSocketStatus } from "@hocuspocus/provider";
import { Toolbar } from "@/components/ui/Toolbar";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useAppState } from "@/hooks/useAppState";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/react-icons";

export type EditorHeaderProps = {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  characters: number;
  words: number;
  collabState: WebSocketStatus;
  users: EditorUser[];
  isSaving: boolean;
};

export const EditorHeader = ({
  characters,
  collabState,
  users,
  words,
  isSidebarOpen,
  toggleSidebar,
  isSaving,
}: EditorHeaderProps) => {
  const { state, workspaceId } = useAppState();
  const path = usePathname();

  const breadCrumbs = useMemo(() => {
    if (!path || !state.workspaces || !workspaceId) return;
    const segments = path
      .split("/")
      .filter((val) => val !== "dashboard" && val);
    const workspaceDetails = state.workspaces.find(
      (workspace) => workspace.id === workspaceId
    );

    const folderSegment = segments[1];
    const folderDetails = workspaceDetails?.folders.find(
      (folder) => folder.id === folderSegment
    );
    const folderBreadCrumb = folderDetails
      ? `${folderDetails.iconId} ${folderDetails.title}`
      : "";

    if (segments.length === 2) {
      return `${folderBreadCrumb}`;
    }

    const fileSegment = segments[2];
    const fileDetails = folderDetails?.files.find(
      (file) => file.id === fileSegment
    );
    const fileBreadCrumb = fileDetails
      ? `/ ${fileDetails.iconId} ${fileDetails.title}`
      : "";

    return `${folderBreadCrumb} ${fileBreadCrumb}`;
  }, [state, path, workspaceId]);

  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-inherit dark:text-white dark:border-neutral-800">
      <div className="flex flex-row gap-x-1.5 items-center">
        <div className="hidden lg:flex items-center gap-x-1.5">
          <Toolbar.Button
            tooltip={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggleSidebar}
            active={isSidebarOpen}
            className={isSidebarOpen ? "bg-transparent" : ""}
          >
            <Icon name={isSidebarOpen ? "PanelLeftClose" : "PanelLeft"} />
          </Toolbar.Button>
        </div>
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-semibold">
          {breadCrumbs}
        </span>
        <div
          className={cn(
            "items-center gap-1 opacity-0 hidden md:flex",
            isSaving && "opacity-60"
          )}
        >
          <Icons.loader className="h-3 w-3 animate-spin" />
          <span>Saving...</span>
        </div>
      </div>
      <EditorInfo
        characters={characters}
        words={words}
        collabState={collabState}
        users={users}
      />
    </div>
  );
};
