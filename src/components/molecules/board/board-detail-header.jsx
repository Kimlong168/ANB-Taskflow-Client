import PropTypes from "prop-types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const BoardDetailHeader = ({
  currentBoard,
  isListView,
  setIsListView,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 border-b pb-4">
      <LeftHeader
        title={currentBoard.title}
        description={currentBoard.description}
      />
      <RightHeader isListView={isListView} setIsListView={setIsListView} />
    </div>
  );
};

const LeftHeader = ({ title, description }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 w-2/3">
      <Button
        variant="outline"
        className="bg-transparent"
        size="icon"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 text-primary" />
      </Button>
      <div className="space-y-0.5">
        <h2 className="text-xl font-semibold text-primary gap-2 uppercase line-clamp-1">
          {title}
        </h2>
        <p className="text-muted-foreground text-xs line-clamp-2">
          {description || "No description available"}
        </p>
      </div>
    </div>
  );
};

const RightHeader = ({ isListView, setIsListView }) => {
  return (
    <div className="flex items-center space-x-1 md:space-x-4">
      <div className="flex items-center space-x-2">
        <Label
          htmlFor="view-toggle"
          className={cn(
            "text-sm font-medium",
            isListView ? "text-muted-foreground" : "text-primary font-bold"
          )}
        >
          Board View
        </Label>
        <Switch
          id="view-toggle"
          checked={isListView}
          onCheckedChange={setIsListView}
        />
        <Label
          htmlFor="view-toggle"
          className={cn(
            "text-sm font-medium",
            !isListView ? "text-muted-foreground" : "text-primary font-bold"
          )}
        >
          List View
        </Label>
      </div>
    </div>
  );
};

LeftHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

RightHeader.propTypes = {
  setIsListView: PropTypes.func,
  isListView: PropTypes.bool,
};

BoardDetailHeader.propTypes = {
  setIsListView: PropTypes.func,
  isListView: PropTypes.bool,
  currentBoard: PropTypes.object.isRequired,
};
