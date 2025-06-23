import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import {
  Select as _Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

export const Select = (props) => {
  const {
    options,
    onChange,
    defaultValue,
    value,
    placeholder,
    className,
    required,
    label,
    error,
    description,
  } = props;
  if (options.length === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      <Label>
        {label} {required && <span className="text-red-600">*</span>}
      </Label>
      <_Select
        defaultValue={defaultValue}
        value={value}
        onValueChange={(v) => onChange(v)}
      >
        <SelectTrigger className="w-full text-start capitalize">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {options?.map((x, i) => (
            <SelectItem key={i} value={x.value}>
              {x.label}
            </SelectItem>
          ))}
        </SelectContent>
      </_Select>
      {error && <p className="text-red-600 text-xs">{error}</p>}
      {description && <p>{description}</p>}
    </div>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
};
