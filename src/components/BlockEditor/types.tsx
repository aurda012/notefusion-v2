import { TiptapCollabProvider } from "@hocuspocus/provider";
import { File, Folder, workspace } from "@/lib/supabase/types";
import type { Doc as YDoc } from "yjs";

export interface BlockEditorProps {
  hasCollab: boolean;
  ydoc: YDoc;
  provider?: TiptapCollabProvider | null | undefined;
  dirDetails: File | Folder | workspace;
  fileId: string;
  dirType: "workspace" | "folder" | "file";
}

export type EditorUser = {
  clientId: string;
  name: string;
  color: string;
  initials?: string;
};
