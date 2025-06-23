import { ProfileModal } from "@/components/organisms/profile-modal";
import { LayoutGrid } from "lucide-react";

export const BoardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <LayoutGrid className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Boards</h1>
        </div>
      </div>

      <ProfileModal />
    </div>
  );
};
