"use client";

import { EditorContent, JSONContent, PureEditorContent } from "@tiptap/react";
import React, {
  startTransition,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";

import { LinkMenu } from "@/components/menus";

import { useBlockEditor } from "@/hooks/useBlockEditor";

import "@/styles/index.css";

import { Sidebar } from "@/components/Sidebar";
import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { BlockEditorProps } from "./types";
import { EditorHeader } from "./components/EditorHeader";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import { useAppState } from "@/hooks/useAppState";
import { usePathname, useRouter } from "next/navigation";
import {
  updateFile,
  updateFolder,
  updateWorkspace,
} from "@/lib/supabase/queries";
import EditorRestoreHeader from "./components/EditorRestoreHeader";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EditorDetails from "./components/EditorDetails";
import { ScrollArea } from "../ui/scroll-area";
import CoverImage from "./components/CoverImage";
import { File, Folder, workspace } from "@/lib/supabase/types";

export const BlockEditor = ({
  ydoc,
  provider,
  dirDetails,
  dirType,
  fileId,
}: BlockEditorProps) => {
  const supabase = createClientComponentClient();
  const { state, workspaceId, folderId, dispatch } = useAppState();
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const menuContainerRef = useRef(null);
  const editorRef = useRef<PureEditorContent | null>(null);
  const [content, setContent] = useState<JSONContent>(
    dirDetails?.data ? JSON.parse(dirDetails.data) : ""
  );

  const details = useMemo(() => {
    let selectedDir;
    if (dirType === "file") {
      selectedDir = state.workspaces
        .find((workspace) => workspace.id === workspaceId)
        ?.folders.find((folder) => folder.id === folderId)
        ?.files.find((file) => file.id === fileId);
    }
    if (dirType === "folder") {
      selectedDir = state.workspaces
        .find((workspace) => workspace.id === workspaceId)
        ?.folders.find((folder) => folder.id === fileId);
    }
    if (dirType === "workspace") {
      selectedDir = state.workspaces.find(
        (workspace) => workspace.id === fileId
      );
    }

    if (selectedDir) {
      return selectedDir;
    }

    return dirDetails;
  }, [state, workspaceId, folderId, fileId, dirType, dirDetails]);

  console.log({ details });

  const updateEditorJson = useCallback(
    async (editorJson: JSONContent) => {
      try {
        setSaving(true);
        if (dirType == "workspace") {
          dispatch({
            type: "UPDATE_WORKSPACE",
            payload: {
              workspace: { data: JSON.stringify(editorJson) },
              workspaceId: fileId,
            },
          });
          await updateWorkspace(
            { data: JSON.stringify(editorJson) },
            fileId,
            path
          );
        }
        if (dirType == "folder") {
          if (!workspaceId) return;
          dispatch({
            type: "UPDATE_FOLDER",
            payload: {
              folder: { data: JSON.stringify(editorJson) },
              workspaceId,
              folderId: fileId,
            },
          });
          await updateFolder(
            { data: JSON.stringify(editorJson) },
            fileId,
            path
          );
        }
        if (dirType == "file") {
          if (!workspaceId || !folderId) return;
          dispatch({
            type: "UPDATE_FILE",
            payload: {
              file: { data: JSON.stringify(editorJson) },
              workspaceId,
              folderId: folderId,
              fileId,
            },
          });
          await updateFile({ data: JSON.stringify(editorJson) }, fileId, path);
        }

        startTransition(() => {
          // Force a cache invalidation.
          router.refresh();
        });
      } catch (error) {
      } finally {
        startTransition(() => {
          setSaving(false);
        });
      }
    },
    [router, setSaving, dispatch, workspaceId, folderId, fileId, dirType, path]
  );

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON() as JSONContent;
    setContent(json);
    await updateEditorJson(json);
  }, 1000);

  const { editor, users, characterCount, collabState, leftSidebar } =
    useBlockEditor({ ydoc, provider, content, debouncedUpdates });

  const displayedUsers = users.slice(0, 3);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <Sidebar
        isOpen={leftSidebar.isOpen}
        onClose={leftSidebar.close}
        editor={editor}
      />
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        {details.inTrash && (
          <EditorRestoreHeader
            fileId={fileId}
            type={dirType}
            inTrash={details.inTrash}
          />
        )}
        <EditorHeader
          characters={characterCount.characters()}
          collabState={collabState}
          users={displayedUsers}
          words={characterCount.words()}
          isSidebarOpen={leftSidebar.isOpen}
          toggleSidebar={leftSidebar.toggle}
        />
        <ScrollArea className="h-[calc(100vh_-_48px)]" type="always">
          <main className="flex flex-col h-[inherit]">
            {details.bannerUrl && (
              <CoverImage
                coverImage={
                  supabase.storage
                    .from("file-banners")
                    .getPublicUrl(details.bannerUrl).data.publicUrl
                }
                id={fileId}
                type={dirType}
              />
            )}
            <EditorDetails details={details} fileId={fileId} type={dirType} />
            <EditorContent
              editor={editor}
              // @ts-ignore
              ref={editorRef}
              className="flex-1 overflow-y-auto"
            />
            <ContentItemMenu editor={editor} />
            <LinkMenu editor={editor} appendTo={menuContainerRef} />
            <TextMenu editor={editor} />
            <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
            <TableRowMenu editor={editor} appendTo={menuContainerRef} />
            <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
            <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default BlockEditor;
