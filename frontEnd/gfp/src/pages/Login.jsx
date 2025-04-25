import { useNavigate, Link } from "react-router-dom";
import  PaginaLogin from "../components/PaginaLogin";

export default function Login(){
    const navigate = useNavigate();

//     return(
       
//         <div style={{backgroundColor:"#d0c3f1", minHeight: "100vh" }}>
//             {/* <h1 style={{textAlign:"center", color: "#503459"}}>Tela de Login</h1> */}
//             <div style={{}} ></div>
//             <div style={{display: 'flex', flexDirection:'row', justifyContent:"center", alignItems:'center', height: '80vh'}}>
//                  <PaginaLogin /></div>
//             {/* <button onClick={() => navigate("/principal")}>Entrar</button> */}
//         </div>
//     );
// }
    return(
        <div style={{backgroundColor:"#d0c3f1", minHeight: "100vh", display:"flex", justifyContent:"center" }}>
            {/* <h1 style={{textAlign:"center", color: "#503459"}}>Tela de Login</h1> */}
            
            <div style={{display: 'flex', justifyContent: 'space-between', height: '80vh', alignItems: 'center', width:"1250px"}}>
                <div style={{flex: 1, display: 'flex', justifyContent: 'flex-start'}}>

                    <h2 style={{color: "#503459"}}>Texto do lado esquerdo</h2>
                </div>
                
                <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems:"center", height:'100vh'}}>
                    <PaginaLogin />
                </div>
            </div>
            {/* <button onClick={() => navigate("/principal")}>Entrar</button> */}
        </div>
    );
}
