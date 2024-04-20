import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { API } from "@/lib/api";
import { randomUUID } from "crypto";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase/types";

export const useUploader = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const uploadFile = useCallback(
    async (file: File) => {
      setLoading(true);
      console.log("On Upload File", file);
      try {
        let filePath = "";
        const id = Math.random().toString(36).substring(0, 18);
        const { data, error } = await supabase.storage
          .from("editor-images")
          .upload(`${id}`, file, { cacheControl: "5", upsert: true });
        console.log(error);
        if (error) throw new Error();
        console.log(data);
        filePath = data.path;
        const { data: dataUrl } = await supabase.storage
          .from("editor-images")
          .getPublicUrl(filePath);
        const url = dataUrl?.publicUrl;
        // const url = await API.uploadImage();

        onUpload(url);
      } catch (errPayload: any) {
        const error =
          errPayload?.response?.data?.error || "Something went wrong";
        toast.error(error);
      }
      setLoading(false);
    },
    [onUpload, supabase.storage]
  );

  return { loading, uploadFile };
};

export const useFileUpload = (uploadFile: (file: File) => Promise<void>) => {
  const [loading, setLoading] = useState(false);
  // const supabase = createClientComponentClient();

  const fileInput = useRef<HTMLInputElement>(null);

  const handleUploadClick = useCallback(() => {
    fileInput.current?.click();
    const files = fileInput.current?.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  }, [uploadFile]);

  return { ref: fileInput, handleUploadClick };
};

export const useDropZone = ({
  uploader,
}: {
  uploader: (file: File) => void;
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedInside, setDraggedInside] = useState<boolean>(false);

  useEffect(() => {
    const dragStartHandler = () => {
      setIsDragging(true);
    };

    const dragEndHandler = () => {
      setIsDragging(false);
    };

    document.body.addEventListener("dragstart", dragStartHandler);
    document.body.addEventListener("dragend", dragEndHandler);

    return () => {
      document.body.removeEventListener("dragstart", dragStartHandler);
      document.body.removeEventListener("dragend", dragEndHandler);
    };
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      setDraggedInside(false);
      if (e.dataTransfer.files.length === 0) {
        return;
      }

      const fileList = e.dataTransfer.files;

      const files: File[] = [];

      for (let i = 0; i < fileList.length; i += 1) {
        const item = fileList.item(i);
        if (item) {
          files.push(item);
        }
      }

      if (files.some((file) => file.type.indexOf("image") === -1)) {
        return;
      }

      e.preventDefault();

      const filteredFiles = files.filter((f) => f.type.indexOf("image") !== -1);

      const file = filteredFiles.length > 0 ? filteredFiles[0] : undefined;

      if (file) {
        uploader(file);
      }
    },
    [uploader]
  );

  const onDragEnter = () => {
    setDraggedInside(true);
  };

  const onDragLeave = () => {
    setDraggedInside(false);
  };

  return { isDragging, draggedInside, onDragEnter, onDragLeave, onDrop };
};
