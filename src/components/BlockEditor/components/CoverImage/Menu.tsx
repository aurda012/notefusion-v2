import { Button } from "@/components/ui/shad-button";
import { Separator } from "@/components/ui/separator";
import BannerUpload from "../BannerUpload";

interface MenuProps {
  // eslint-disable-next-line no-unused-vars
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
  id: string;
  type: "workspace" | "file" | "folder";
}

const Menu: React.FC<MenuProps> = ({
  isDeleting,
  isUpdating,
  onDelete,
  id,
  type,
}) => {
  return (
    <div className="absolute bottom-4 right-24 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity">
      <BannerUpload id={id} dirType={type}>
        <Button
          type="button"
          className="cursor-pointer text-primary/70 text-xs transition duration-200 px-2 gap-2 bg-background rounded-r-none h-[26px] disabled:opacity-100"
          variant={"ghost"}
          size={"sm"}
          disabled={isUpdating || isDeleting}
        >
          <span className="select-none">Change</span>
        </Button>
      </BannerUpload>
      <div>
        <Separator orientation="vertical" />
      </div>
      <Button
        onClick={onDelete}
        type="button"
        className="cursor-pointer text-primary/70 text-xs transition duration-200 px-2 gap-2 bg-background rounded-l-none h-[26px] disabled:opacity-100"
        variant={"ghost"}
        size={"sm"}
        disabled={isUpdating || isDeleting}
      >
        <span className="select-none">Remove</span>
      </Button>
    </div>
  );
};

export default Menu;
