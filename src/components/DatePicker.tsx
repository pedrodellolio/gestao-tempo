import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { cn } from "../../@/lib/utils";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { PopoverClose } from "@radix-ui/react-popover";

interface Props {
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
}

function DatePicker(props: Props) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-8 w-44 justify-start text-left font-normal border border-[var(--border)]",
              !props.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.value ? (
              format(props.value, "dd/MM/yy")
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <PopoverClose>
            <Calendar
              locale={ptBR}
              mode="single"
              selected={props.value}
              onSelect={props.setValue}
            />
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default DatePicker;
