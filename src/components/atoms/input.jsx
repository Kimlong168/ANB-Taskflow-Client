import { Input as _Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { Label } from "../ui/label";

export const Input = (props) => {
  const { label, description, required, className, error, ...field } = props;
  return (
    <div className={cn("w-full", className)}>
      <Label>
        {label} {required && <span className="text-red-600">*</span>}
      </Label>
      <_Input {...field} require={required} />
      {error && <p className="text-red-600 text-xs">{error}</p>}
      {description && <p>{description}</p>}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
};
