import { AuthContext } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AtSign, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDialog } from "../molecules/confirm-dialog";
import { TbLogout2 } from "react-icons/tb";
import { formatDate } from "@/utils/format-date";

export const ProfileModal = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    handleLogout(() => navigate("/login"));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar className="h-10 w-10 border border-primary/80">
            <AvatarImage src={user.profilePicture} alt={user.name} />
            <AvatarFallback className="text-3xl text-primary">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="font-bold capitalize hidden lg:block">
            <span>User:</span> {user?.name}
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <Card className="border-0 shadow-none">
          <CardContent className="pt-4 flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4 border border-primary/80">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback className="text-6xl text-primary">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-2xl font-bold">{user.name}</h2>

            <div className="w-full space-y-3 mt-5">
              <div className="flex items-center gap-2">
                <AtSign className="h-4 w-4 text-secondary" />
                <span>{user.email || "N/A"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-secondary" />
                <span>Joined on {formatDate(user.createdAt)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            <ConfirmDialog
              title="Logout Confirmation"
              onConfirm={handleConfirm}
            >
              <Button
                variant="destructive"
                className="flex items-center space-x-1 h-9 px-2"
              >
                <TbLogout2 /> <span>Logout</span>
              </Button>
            </ConfirmDialog>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
