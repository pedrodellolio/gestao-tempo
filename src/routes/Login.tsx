import { Input } from "../components/ui/input";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import UndrawLogin from "../assets/undraw_login.svg";
import { LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { User } from "firebase/auth";

function Login() {
  const { SignInWithGoogle, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-row justify-evenly gap-48 items-center max-w-[1200px] mx-auto">
      <div className="w-96">
        <h1 className="font-semibold text-4xl mt-28">Entre na sua conta</h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          Faça o login e continue de onde parou
        </p>
        <img className="mt-20" src={UndrawLogin} width={500} alt="" />
      </div>
      <div className="flex flex-col items-center gap-5 bg-[var(--bg-secondary)] p-14 rounded-md mt-32">
        <p className="text-sm font-medium mb-2 self-start">
          Não possui uma conta?{" "}
          <Link className=" text-[var(--text-accent)]" to={"/auth/register"}>
            Registre-se
          </Link>
        </p>
        <form className="flex flex-col justify-center items-center gap-5 w-96">
          <div className="flex flex-col gap-3 w-full">
            <Label className="text-left">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="h-10 border-[var(--border-secondary)]"
              type="email"
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="text-left w-full">Senha</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="h-10 border-[var(--border-secondary)]"
              type="password"
            />
          </div>
          <Link
            className="text-sm font-medium self-end text-[var(--text-accent)]"
            to={"/"}
          >
            Esqueceu a senha?
          </Link>
          <br />
          <Button
            className="bg-[var(--accent)] w-full h-10"
            onClick={() => setUser({} as User)}
          >
            Entrar
          </Button>
        </form>

        <div className="flex flex-row items-center gap-5">
          <hr className="w-32 border-[var(--border-secondary)]" />
          <p>ou</p>
          <hr className="w-32 border-[var(--border-secondary)]" />
        </div>

        <Button
          className="w-full h-10 border-[var(--accent)] flex flex-row items-center gap-3"
          variant={"outline"}
          onClick={SignInWithGoogle}
        >
          <LogIn /> Entrar com Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
