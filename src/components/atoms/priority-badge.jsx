import PropTypes from "prop-types";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export const PriorityBadge = ({ status, className }) => {
  const statusColor = {
    medium:
      "!bg-green-50 hover:!bg-green-100 !text-primary border !border-green-200",
    high: "!bg-pink-50 hover:!bg-pink-100 !text-pink-600 border !border-pink-200",
    low: "!bg-amber-50 hover:!bg-amber-100 !text-amber-500 border !border-amber-200",
  };

  const statusConfig = {
    1: {
      label: "Low",
      color: statusColor.low,
      Icon: Clock,
    },
    2: {
      label: "Medium",
      color: statusColor.medium,
      Icon: Clock,
    },
    3: {
      label: "High",
      color: statusColor.high,
      Icon: Clock,
    },
  };

  if (!status) return null;

  const { color, label, Icon } = statusConfig[status];

  return (
    <Badge
      className={cn(
        "flex items-center justify-center space-x-1.5 rounded-full shadow-none w-fit truncate",
        color,
        className
      )}
    >
      <Icon size={14} />
      <div>{label}</div>
    </Badge>
  );
};

PriorityBadge.propTypes = {
  status: PropTypes.number,
  className: PropTypes.string,
};
