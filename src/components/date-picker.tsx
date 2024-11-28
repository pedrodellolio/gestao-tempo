import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";

interface Props {
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
  className?: string;
}

function DatePicker(props: Props) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              `h-8 w-44 justify-start text-left font-normal border border-[var(--border)] ${props.className}`,
              !props.value && `text-muted-foreground`
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
          {/* <PopoverClose> */}
            <Calendar
              locale={ptBR}
              mode="single"
              selected={props.value}
              onDayClick={props.setValue}
            />
          {/* </PopoverClose> */}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default DatePicker;
