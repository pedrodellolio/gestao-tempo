import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "../../components/ui/label";
import UndrawLogin from "../../assets/undraw_login.svg";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";

function Login() {
  const { SignInWithGoogle, SignInWithEmailAndPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      SignInWithEmailAndPassword(email, password);
      toast.success("Logado");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row justify-evenly gap-48 items-center max-w-[1200px] mx-auto">
      <div className="w-96">
        <h1 className="font-semibold text-4xl mt-28">Entre na sua conta</h1>
        <p className="mt-2 text-muted-foreground">
          Faça o login e continue de onde parou.
        </p>
        <img className="mt-20" src={UndrawLogin} width={500} alt="" />
      </div>
      <div className="flex flex-col items-center gap-5 bg-[var(--bg-secondary)] p-14 rounded-md mt-32">
        <p className="text-sm font-medium mb-2 self-start">
          Não possui uma conta?{" "}
          <Link className="text-primary" to={"/auth/register"}>
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
              type="password"
            />
          </div>
          {/* <Link
            className="text-sm font-medium self-end text-[var(--text-accent)]"
            to={"/"}
          >
            Esqueceu a senha?
          </Link> */}
          <LoadingButton
            type="submit"
            text="Entrar"
            isLoading={isLoading}
            onClick={handleLogin}
          />
        </form>

        <div className="flex flex-row items-center gap-5 w-full">
          <hr className="w-full" />
          <p>ou</p>
          <hr className="w-full" />
        </div>

        <Button
          className="w-full flex flex-row items-center gap-3"
          variant={"outline"}
          onClick={SignInWithGoogle}
        >
          <LogIn size={22} className="text-muted-foreground" /> Entrar com
          Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
