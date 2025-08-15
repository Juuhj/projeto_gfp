import { useNavigate } from "react-router-dom";
import PaginaLogin from "../components/PaginaLogin";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #A0D1E6, #D0C3F1, #98D8B6)", minHeight: "100vh", display: "flex",  
          justifyContent: "center", alignItems: "center", padding: "0 1rem", overflow: "hidden", /* ← Remove o scroll */
        }}>
      <div
        className="w-full max-w-screen-xl flex flex-col md:flex-row justify-center items-center"
        style={{ maxWidth: "1250px", // Limita a largura para não ficar muito largo
        }}>
        {/* Texto à Esquerda */}
        <div
          className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left p-4"
          style={{ padding: "0 20px", // Adiciona um padding para não colar nos lados
          }}>
          <h1 className="text-3xl font-semibold text-[#503459] md:text-4xl">Seja Bem-Vindo de Volta</h1>
          <h3 className="text-xl text-[#503459] mb-4 md:mb-8">Acesse sua conta</h3>
          <p className="text-[#333333] text-lg md:text-xl"> Entre com suas credenciais para acessar todos os recursos.</p>
        </div>

        {/* Formulário de Login */}
        <div
          className="flex-1 flex justify-center items-center p-4"
          style={{ padding: "20px" }}
        >
          <PaginaLogin />
        </div>
      </div>
    </div>
  );
}
