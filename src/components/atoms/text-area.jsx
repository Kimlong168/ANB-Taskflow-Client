import { Textarea as _Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";

export const Textarea = ({ label, description, required, error, ...field }) => {
  return (
    <div className="w-full">
      <label>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <_Textarea {...field} require={required} />
      {error && <p className="text-red-600 text-xs">{error}</p>}
      {description && <p className="text-gray-600 text-sm">{description}</p>}
    </div>
  );
};

Textarea.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.string,
  error: PropTypes.string,
};
