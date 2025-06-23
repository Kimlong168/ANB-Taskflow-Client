import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

export const FormWrapper = ({
  children,
  title,
  isOpen,
  handleOpen,
  handleSubmit,
  isUpdating,
  disabled,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-secondary">
          {children}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => handleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={disabled}>
              {isUpdating ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  isUpdating: PropTypes.bool,
};
