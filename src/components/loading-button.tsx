import { Button, ButtonProps } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  isLoading: boolean;
  text: string;
};

export default function LoadingButton(props: Props & ButtonProps) {
  return (
    <Button  {...props} disabled={props.isLoading} className="w-full mt-2">
      {props.isLoading ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <p>{props.text}</p>
      )}
    </Button>
  );
}
