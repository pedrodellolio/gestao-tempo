import { Paintbrush } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { PopoverClose } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  setValue: (value: string) => void;
  className?: string;
}

const solids = [
  "#E2E2E2",
  "#ff75c3",
  "#ffa647",
  "#ffe83f",
  "#9fff5b",
  "#70e2ff",
  "#cd93ff",
  "#09203f",
];

function ColorPicker(props: Props) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[220px] justify-start text-left font-normal",
              !props.value && "text-muted-foreground",
              props.className
            )}
          >
            <div className="w-full flex items-center gap-2">
              {props.value ? (
                <div
                  className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                  style={{ background: props.value }}
                ></div>
              ) : (
                <Paintbrush className="h-4 w-4" />
              )}
              <div className="truncate flex-1">
                {props.value ? props.value : "Pick a color"}
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <PopoverClose>
            <div className="flex flex-wrap gap-1 mt-0">
              {solids.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                  onClick={() => props.setValue(s)}
                />
              ))}
            </div>

            <Input
              id="custom"
              value={props.value}
              className="col-span-2 h-8 mt-4"
              onChange={(e) => props.setValue(e.currentTarget.value)}
            />
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default ColorPicker;
