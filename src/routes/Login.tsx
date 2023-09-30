import { usePreferences } from "../hooks/usePreferences";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import DeathStar from "../assets/death-star.svg";

import UndrawCompletedTasks from "../assets/undraw_completed_tasks.svg";
import { Label } from "../components/ui/label";
function Login() {
  const { isMenuOpen } = usePreferences();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-row justify-center items-center">
      {/* <div
        className="flex justify-center m-4 w-[60%] rounded-md"
        style={{
          height: "calc(100vh - 32px)",
          backgroundImage: `url(${DeathStar})`, // Set the background image
          backgroundSize: "contain", // Adjust the image size to cover the div
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "repeat", // Prevent image repetition
        }}
      >
        <div className="absolute top-20 left-20 w-64">
          <h1 className="text-lg font-medium">Organize seus compromissos</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Crie sua agenda e nunca mais perca um compromisso!
          </p>
        </div>
        <img src={UndrawCompletedTasks} alt="" width={400} className="mt-28" />
      </div> */}
      <form className="bg-[var(--bg-secondary)] p-14 rounded-md flex flex-col justify-center items-center gap-3 mt-32">
        <Label className="text-left w-full">Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          className="h-10 border-[var(--border-secondary)]"
          type="email"
          autoFocus
        />
        <Label className="text-left w-full">Senha</Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className="h-10 border-[var(--border-secondary)]"
          type="password"
        />
        <Link
          className="text-sm font-medium self-end text-[var(--text-accent)]"
          to={"/"}
        >
          Esqueceu a senha?
        </Link>
        <Button className="bg-[var(--accent)] w-64 h-10">Entrar</Button>
        <Link className="text-sm text-[var(--text-secondary)]" to="/register">
          Não possui uma conta?{" "}
          <span className="text-[var(--text-accent)] font-medium">
            Registre-se
          </span>
        </Link>
      </form>
    </div>
  );
}

export default Login;
