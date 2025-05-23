import React, {useState, useEffect, useLayoutEffect} from "react";
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos, { corPrincipal } from '../styles/Estilos';
import {enderecoServidor} from '../components/utils';
import { corPrimaria } from '../styles/Estilos';
import { useIsFocused } from "@react-navigation/native";


export default function Categorias({ navigation }) {
    const [categorias, setCategorias] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [atualizando, setAtualizando] = useState(false);

    const isFocused = useIsFocused();

    const buscarCategorias = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/categorias`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${usuario.token}`
                }
            });
            const dados = await resposta.json();
            setCategorias(dados.categorias);
        } catch (error) {
            console.error('Erro ao buscar categorias', error);
        }
    };

    const buscarUsuarioLogado = async () => {
        const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
        if (usuarioLogado) {
            setUsuario(JSON.parse(usuarioLogado));
        } else {
            navigation.navigate('Login');
        }
    };

    useEffect(() => {
        buscarUsuarioLogado();
    }, []);

    useEffect(() => {
        if (isFocused == true) {
            buscarCategorias();
        }
    }, [isFocused, usuario]);

    const desativarCategoria = async (id) => {
        try {
            const resposta = await fetch(`${enderecoServidor}/categorias/desativar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${usuario.token}`
                }
            });

            if (resposta.ok) {
                buscarCategorias();
            }
        } catch (error) {
            console.error('Erro ao desativar categoria:', error);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('CadCategorias')}>
                    <MaterialIcons name="add" size={28} color="#fff" style={{ marginRight: 15 }} />
                </TouchableOpacity>
            )
        });
    });

    const exibirItemLista = ({ item }) => {
        return (
            <TouchableOpacity style={Estilos.itemLista}>
                <View style={{
                    backgroundColor: item.cor,
                    width:40,
                    height:40,
                    borderRadius: 25,
                    alignItems:'center',
                    justifyContent: 'center'
                 }} >
                    <MaterialIcons name="category" size={20} color={corPrincipal}/>
                </View>
                <View style={Estilos.textContainer}>
                    <Text>{item.tipo_transacao}</Text>
                    <Text style={Estilos.nomeLista}>{item.nome}</Text>
                </View>
                <MaterialIcons name="edit" size={24} color={corPrincipal}
                    onPress={() => navigation.navigate('CadCategorias', { categoria: item })} />
                <MaterialIcons name="delete" size={24} color={corPrimaria}
                    onPress={() => desativarCategoria(item.id_categoria)} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
                <Text>Categorias</Text>
                <FlatList
                    data={categorias}
                    renderItem={exibirItemLista}
                    keyExtractor={(item) => item.id_categoria}  //.toString()
                    RefreshControl={
                        <RefreshControl refreshing={atualizando} onRefresh={buscarCategorias} colors={[corPrincipal]}/>
                    }
                />
            </View>
        </View>
    );
}

// import React, {useState, useEffect, useLayoutEffect} from "react";
// import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Estilos, { corPrincipal } from '../styles/Estilos';
// import {enderecoServidor} from '../components/utils';
// import { corPrimaria } from '../styles/Estilos';
// import { useIsFocused } from "@react-navigation/native";

// export default function Categorias({ navigation }) {
//     const [categorias, setCategorias] = useState([]);
//     const [usuario, setUsuario] = useState({});
//     const isFocused = useIsFocused();

//     const buscarCategorias = async () => {
//         try {
//             const resposta = await fetch(`${enderecoServidor}/categorias`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${usuario.token}`
//                 }
//             });
//             const dados = await resposta.json();
//             setCategorias(dados.categorias);
//         } catch (error) {
//             console.error('Erro ao buscar categorias', error);
//         }
//     };

//     const buscarUsuarioLogado = async () => {
//         const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
//         if (usuarioLogado) {
//             setUsuario(JSON.parse(usuarioLogado));
//         } else {
//             navigation.navigate('Login');
//         }
//     };

//     useEffect(() => {
//         buscarUsuarioLogado();
//     }, []);

//     useEffect(() => {
//         if (isFocused == true) {
//             buscarCategorias();
//         }
//     }, [isFocused, usuario]);

//     const desativarCategoria = async (id) => {
//         try {
//             const resposta = await fetch(`${enderecoServidor}/categorias/desativar/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${usuario.token}`
//                 }
//             });

//             if (resposta.ok) {
//                 buscarCategorias();
//             }
//         } catch (error) {
//             console.error('Erro ao desativar categoria:', error);
//         }
//     };

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             headerRight: () => (
//                 <TouchableOpacity onPress={() => navigation.navigate('CadCategorias')}>
//                     <MaterialIcons name="add" size={28} color="#fff" style={{ marginRight: 15 }} />
//                 </TouchableOpacity>
//             )
//         });
//     });

//     const exibirItemLista = ({ item }) => {
//         return (
//             <TouchableOpacity style={Estilos.itemLista}>
//                 <Image 
//                     // source={require('../assets/logo.png')}

//                     style={Estilos.imagemLista2} />
//                 <View style={Estilos.textContainer}>
//                     <Text>{item.tipo_transacao}</Text>
//                     <Text style={Estilos.nomeLista}>{item.nome}</Text>
//                 </View>
//                 <MaterialIcons name="edit" size={24} color={corPrincipal}
//                     onPress={() => navigation.navigate('CadCategorias', { categoria: item })} />
//                 <MaterialIcons name="delete" size={24} color={corPrimaria}
//                     onPress={() => desativarCategoria(item.id_categoria)} />
//             </TouchableOpacity>
//         );
//     };

//     return (
//         <View style={Estilos.conteudoHeader}>
//             <View style={Estilos.conteudoCorpo}>
//                 <Text>Categorias</Text>
//                 <FlatList
//                     data={categorias}
//                     renderItem={exibirItemLista}
//                     keyExtractor={(item) => item.id_categoria.toString()}
//                 />
//             </View>
//         </View>
//     );
// }

