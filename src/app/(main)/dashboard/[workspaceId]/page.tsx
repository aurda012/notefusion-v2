"use client";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "@/components/BlockEditor";
import DarkModeSwitcher from "@/components/common/dark-mode-switcher";
import { getWorkspaceDetails } from "@/lib/supabase/queries";

export default function Document({
  params,
}: {
  params: { workspaceId: string };
}) {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [workspaceDetails, setWorkspaceDetails] = useState<any | {}>({});
  const searchParams = useSearchParams();

  const hasCollab = parseInt(searchParams.get("noCollab") as string) !== 1;

  const { workspaceId } = params;

  useEffect(() => {
    const dataFetch = async () => {
      const { data, error } = await getWorkspaceDetails(workspaceId);
      if (error || !data.length) redirect("/dashboard");
      setWorkspaceDetails(data[0]);
    };
    dataFetch();
  }, [workspaceId]);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch("/api/collaboration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      const { token } = data;

      // set state when the data received
      setCollabToken(token);
    };

    dataFetch();
  }, []);

  const ydoc = useMemo(() => new YDoc(), []);

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new TiptapCollabProvider({
          name: `${workspaceId}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? "",
          token: collabToken,
          document: ydoc,
        })
      );
    }
  }, [setProvider, collabToken, ydoc, workspaceId, hasCollab]);

  if (hasCollab && (!collabToken || !provider)) return;

  return (
    <>
      <DarkModeSwitcher />
      <BlockEditor
        hasCollab={hasCollab}
        ydoc={ydoc}
        provider={provider}
        dirType="workspace"
        fileId={workspaceId}
        dirDetails={workspaceDetails}
      />
    </>
  );
}
