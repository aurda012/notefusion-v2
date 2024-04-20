import CustomDialogTrigger from "@/components/common/custom-dialog-trigger";
import SettingsForm from "./settings-form";
import { FC, ReactNode } from "react";

interface SettingsProps {
  children: ReactNode;
}

const Settings: FC<SettingsProps> = ({ children }) => {
  return (
    <CustomDialogTrigger header="Settings" content={<SettingsForm />}>
      {children}
    </CustomDialogTrigger>
  );
};

export default Settings;
