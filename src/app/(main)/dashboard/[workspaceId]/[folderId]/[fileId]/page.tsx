"use client";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "@/components/BlockEditor";
import DarkModeSwitcher from "@/components/common/dark-mode-switcher";
import {
  getFileDetails,
  getFolderDetails,
  getWorkspaceDetails,
} from "@/lib/supabase/queries";
import Loading from "@/components/common/loading";

export default function Document({ params }: { params: { fileId: string } }) {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<any | {}>({});
  const searchParams = useSearchParams();

  const hasCollab = parseInt(searchParams.get("noCollab") as string) !== 1;

  const { fileId } = params;

  useEffect(() => {
    const dataFetch = async () => {
      const { data, error } = await getFileDetails(fileId);
      if (error || !data.length) redirect("/dashboard");
      setFileDetails(data[0]);
    };
    dataFetch();
  }, [fileId]);

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
          name: `${fileId}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? "",
          token: collabToken,
          document: ydoc,
        })
      );
    }
  }, [setProvider, collabToken, ydoc, fileId, hasCollab]);

  if (hasCollab && (!collabToken || !provider)) return;

  return (
    <>
      {Object.keys(fileDetails).length === 0 && <Loading />}
      <DarkModeSwitcher />
      <BlockEditor
        hasCollab={hasCollab}
        ydoc={ydoc}
        provider={provider}
        dirType="file"
        fileId={fileId}
        dirDetails={fileDetails}
      />
    </>
  );
}
