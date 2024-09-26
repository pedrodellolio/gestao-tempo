import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import UndrawMyPassword from "../../assets/undraw_my_password.svg";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas devem ser iguais.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
        // await addDoc(collection(db, "users"), {
        //   uid: user.uid,
        //   firstName: firstName,
        //   lastName: lastName,
        //   email: user.email,
        // });
        navigate("/");
        toast.success("Usuário criado com sucesso!");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <Link className="text-primary" to={"/auth/login"}>
            Faça o login
          </Link>
        </p>
        <form
          onSubmit={handleRegister}
          className="flex flex-col justify-center items-center gap-5 w-96"
        >
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-left w-full">Nome</Label>
              <Input
                autoComplete="off"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Digite seu nome"
                type="text"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-left w-full">Sobrenome</Label>
              <Input
                autoComplete="off"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Digite seu sobrenome"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="text-left">Email</Label>
            <Input
              autoComplete="off"
              autoSave="off"
              aria-autocomplete="none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="text-left w-full">Senha</Label>
            <Input
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              type="password"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="text-left w-full">Confirme sua senha</Label>
            <Input
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
              type="password"
            />
          </div>
          <LoadingButton text="Entrar" isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
}

export default Register;
