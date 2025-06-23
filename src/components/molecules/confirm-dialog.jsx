import PropTypes from "prop-types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const ConfirmDialog = (props) => {
  const {
    children,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    onConfirm,
    ...rest
  } = props;
  return (
    <AlertDialog {...rest}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="!bg-destructive !text-white"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
ConfirmDialog.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onConfirm: PropTypes.func,
  children: PropTypes.node,
};
