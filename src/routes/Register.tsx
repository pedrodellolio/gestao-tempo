import { Input } from "../components/ui/input";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import UndrawMyPassword from "../assets/undraw_my_password.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  return (
    <div className="flex flex-row justify-evenly items-center mx-40">
      <div className="w-96">
        <h1 className="font-semibold text-4xl mt-28">Crie sua conta</h1>
        <p className="mt-2 text-[var(--text-secondary)]">
         Transforme a maneira como você trabalha
        </p>
        <img className="mt-20" src={UndrawMyPassword} width={300} alt="" />
      </div>
      <div className="flex flex-col items-center gap-5 bg-[var(--bg-secondary)] p-14 rounded-md mt-32">
        <p className="text-sm font-medium mb-2 self-start">
          Já possui uma conta?{" "}
          <Link className=" text-[var(--text-accent)]" to={"/login"}>
            Faça o login
          </Link>
        </p>
        <form className="flex flex-col justify-center items-center gap-5 w-96">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-left w-full">Nome</Label>
              <Input
                value={nome}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu nome"
                className="h-10 border-[var(--border-secondary)]"
                type="text"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-left w-full">Sobrenome</Label>
              <Input
                value={sobrenome}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu sobrenome"
                className="h-10 border-[var(--border-secondary)]"
                type="email"
                autoFocus
              />
            </div>
          </div>
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
          <div className="flex flex-col gap-3 w-full">
            {/* <Label className="text-left w-full">Confirme sua senha</Label> */}
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirme sua senha"
              className="h-10 border-[var(--border-secondary)]"
              type="password"
            />
          </div>
          <br />
          <Button className="bg-[var(--accent)] w-full h-10">Entrar</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
