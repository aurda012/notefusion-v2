import { FC, ReactNode } from "react";
import CustomDialogTrigger from "@/components/common/custom-dialog-trigger";
import TrashRestore from "./trash-restore";

interface TrashProps {
  children: ReactNode;
}

const Trash: FC<TrashProps> = ({ children }) => {
  return (
    <CustomDialogTrigger header="Trash" content={<TrashRestore />}>
      {children}
    </CustomDialogTrigger>
  );
};

export default Trash;
