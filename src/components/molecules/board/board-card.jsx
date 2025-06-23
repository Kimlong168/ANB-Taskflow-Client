import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { formatDate } from "@/utils/format-date";
import { ItemControlMenu } from "@/components/atoms/item-control-menu";

export const BoardCard = ({ board, handleEditBoard, handleDeleteBoard }) => {
  return (
    <Card className="group border hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary truncate transition-colors">
                {board.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {board.description || "No description available"}
            </p>
          </div>

          <ItemControlMenu
            onEdit={() => handleEditBoard(board)}
            onDelete={() => handleDeleteBoard(board)}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Link to={`/boards/${board._id}`} className="block">
          <Button
            variant="ghost"
            className="!px-0 group-hover:!px-3 w-full justify-between text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
          >
            <span>View Board</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3 pt-3 border-t">
          <Clock className="h-3 w-3" />
          <span>Created on {formatDate(board.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

BoardCard.propTypes = {
  board: PropTypes.object.isRequired,
  handleEditBoard: PropTypes.func.isRequired,
  handleDeleteBoard: PropTypes.func.isRequired,
};
