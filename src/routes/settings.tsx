import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/date-picker";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Home() {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());

  return (
    <form className="px-10">
      <div className="w-1/2 flex flex-col gap-4">
        <p className="mb-4 font-semibold text-lg">Perfil</p>
        <Avatar className="w-28 h-28">
          <AvatarImage src="" alt={user?.displayName ?? ""} />
          <AvatarFallback className="text-4xl">PD</AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col gap-4">
          <div>
            <label>Nome de Usuário</label>
            <Input className="mt-2" />
          </div>
          <div>
            <label>E-mail</label>
            <Input className="mt-2" />
          </div>
          <div className="flex flex-col">
            <label>Data de Nascimento</label>
            <DatePicker
              className="mt-2 w-full border-border h-9"
              value={date}
              setValue={setDate}
            />
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-4 mt-10">
        <p className="mb-4 font-semibold text-lg">Preferências</p>

        <label>Tema</label>
        <div className="flex flex-row gap-4">
          <div>
            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Light
            </span>
          </div>

          <div>
            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </div>
        </div>
      </div>

      <Button className="mt-10">Atualizar Preferências</Button>
    </form>
  );
}
export default Home;
