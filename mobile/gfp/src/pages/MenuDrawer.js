import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import Contas from "./contas"; //coloquei em minusculo porque ele esta implicando com isso
import Estilos from "../styles/Estilos";
import { corSecundaria } from "../styles/Estilos";
import Categorias from "./Categorias";

const Drawer = createDrawerNavigator();

export default function MenuDrawer(){
    return(
        <Drawer.Navigator
        // Estilizando as barras de navegação do Drawer
            screenOptions={{
                headerStyle:{
                    backgroundColor: corSecundaria,
                    elevation: 0
                },
                headerTintColor: '#fff'
            }}
        >
            <Drawer.Screen name='Principal' component={Principal} />
            <Drawer.Screen name='Contas' component={Contas} />
            <Drawer.Screen name="Categorias" component={Categorias} />
        </ Drawer.Navigator>
    )
}