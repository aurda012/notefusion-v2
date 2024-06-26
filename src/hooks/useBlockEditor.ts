import { useEffect, useMemo, useState } from "react";

import { Editor, JSONContent, useEditor } from "@tiptap/react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";
import type { Doc as YDoc } from "yjs";

import { ExtensionKit } from "@/extensions/extension-kit";
import { userColors, userNames } from "../lib/constants";
import { randomElement } from "../lib/utils";
import { EditorUser } from "../components/BlockEditor/types";
import { useSidebar } from "./useSidebar";
import { initialContent } from "@/lib/data/initialContent";
import { useSupabaseUser } from "./useSupabaseUser";
import { DebouncedState } from "use-debounce";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  ydoc,
  provider,
  content,
  debouncedUpdates,
}: {
  ydoc: YDoc;
  provider?: TiptapCollabProvider | null | undefined;
  content: JSONContent;
  debouncedUpdates: DebouncedState<({ editor }: any) => Promise<void>>;
}) => {
  const { user, userData } = useSupabaseUser();
  const leftSidebar = useSidebar();
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    WebSocketStatus.Connecting
  );

  const editor = useEditor(
    {
      autofocus: true,
      // onCreate: ({ editor }) => {
      //   provider?.on("synced", () => {
      //     if (editor.isEmpty) {
      //       editor.commands.setContent(initialContent);
      //     }
      //   });
      // },
      content,
      onUpdate: (e) => debouncedUpdates(e),
      extensions: [
        ...ExtensionKit({
          provider,
        }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: userData
              ? userData.fullName
                ? userData.fullName
                : userData.email
              : user?.email,
            color: randomElement(userColors),
            clientId: user?.id,
          },
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    [ydoc, provider]
  );

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return [];
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(" ");
      const firstName = names?.[0];
      const lastName = names?.[names.length - 1];
      const initials = `${firstName?.[0] || "?"}${lastName?.[0] || ""}`;

      return { ...user, initials: initials.length ? initials : "?" };
    });
  }, [editor?.storage.collaborationCursor?.users]);

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  useEffect(() => {
    provider?.on("status", (event: { status: WebSocketStatus }) => {
      setCollabState(event.status);
    });
  }, [provider]);

  window.editor = editor;

  return { editor, users, characterCount, collabState, leftSidebar };
};
