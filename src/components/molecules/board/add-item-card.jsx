import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const AddItemCard = ({ onClick, className, title }) => {
  return (
    <Card
      className={cn(
        "border-dashed border-2 flex items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer !bg-transparent",
        className
      )}
    >
      <Button
        onClick={onClick}
        variant="ghost"
        className="h-full w-full text-muted-foreground"
      >
        <Plus className="h-4 w-4" />
        {title}
      </Button>
    </Card>
  );
};

AddItemCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};
