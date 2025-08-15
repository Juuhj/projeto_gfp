import React, {useState, useEffect, useLayoutEffect} from "react";
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl, Modal, TextInput, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos, { corBranco, corPrincipal } from '../styles/Estilos';
import {enderecoServidor, listaCores, listaIcones} from '../components/utils';
import { corPrimaria } from '../styles/Estilos';
import { useIsFocused } from "@react-navigation/native";


export default function Categorias({ navigation }) {
    const [categorias, setCategorias] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [atualizando, setAtualizando] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [nomeCategoria, setNomeCategoria] = useState('');
    const [categoriaSelecionada, setCategoriaSeleciona] = useState(null)

    const [corModalVisible, setCorModalVisible] = useState(false);
    const [iconeModalVisible, seticoneModalVisible] = useState(false);
    const [cor, setCor] = useState('#ffa0aa');
    const [icone, setIcone] = useState()


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
                <View style={Estilos.textoListaContainer}>
                    <Text style={[Estilos.nomeLista, Estilos.corLista2]}>{item.nome}</Text>
                    <Text>R$0.00 {/* Tenho que calcular os gasto de cada categoria? eu acho*/}</Text>
                </View>

                <MaterialIcons
                    name="edit"
                    size={24}
                    color={corBranco}
                    onPress={() => botaoEditar(item)}
                />
                   
                <MaterialIcons
                    name="delete"
                    size={24}
                    color={corBranco}
                    onPress={() => botaoExcluir(item.id_categoria)}
                />
            </TouchableOpacity>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity>
                    <MaterialIcons name="add" size={28} color='#fff'
                    style={{marginRight:15}}
                    onPress={() => setModalVisible(true)}/>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const botaoSalvar = async () =>{
        try{
            const dados = {
                nome: nomeCategoria,
                tipo_transacao: 'SAIDA',
                id_usuario: usuario.id_usuario,
                icone: icone,
                cor: cor
            }

            let endpoint = `${enderecoServidor}/categorias`
            let metodo = 'POST'

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuario.token}`
                },
                body: JSON.stringify(dados)
            })

            if (resposta.ok){
                alert('Categoria salva com sucesso!');
                setModalVisible(false);
                setNomeCategoria('');
                buscarDadosAPI();
            }

        }catch(error){
            alert('Erro ao salvar categoria: ' + error);
            console.error('Erro ao salvar categoria:', error);
        }
    }

    const botaoEditar = (item) => {
        setCategoriaSeleciona(item);
        setNomeCategoria(item.nome);
        setCor(item.cor);
        setIcone(item.icone);
        setModalVisible(true);
    }

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
            <Modal visible={modalVisible} transparent={true} animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
                <View style={Estilos.modalFundo}>
                    <View style={Estilos.modalConteudo}>
                        <Text style={Estilos.modalTitulo}>Categoria</Text>
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <TextInput style={Estilos.inputModal}
                            placeholder="Nome da Categoria"
                            placeholderTextColor={'#aaa'}
                            value="nomeCategoria"
                            onChangeText={setNomeCategoria}
                            />
                            <TouchableOpacity style={[Estilos.corBotao, {backgroundColor: cor}]} onPress={() => setCorModalVisible(true)}/>
                            <TouchableOpacity style={Estilos.iconeBotao} onPress={() => seticoneModalVisible(true)}>
                                <MaterialIcons name={icone} size={24} color={'#fff'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={Estilos.modalBotoes}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)}/>
                            <Button title="Salvar" onPress={botaoSalvar}/>
                        </View>
                    </View>
                </View>

            </Modal>
            {/* Modal de seleção de cor */}
            <Modal
                visible={corModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setCorModalVisible(false)}>
                <View style={Estilos.modalFundo}>
                    <View style={Estilos.SeletorContainer}>
                        <Text style={Estilos.modalTitulo}>Escolha uma cor</Text>
                        <View style={Estilos.listaModal}>
                            {listaCores.map((corItem) => (
                                <TouchableOpacity
                                    key={corItem}
                                    style={[Estilos.corBotao, { backgroundColor: corItem }]}
                                    onPress={() => {
                                        setCor(corItem);
                                        setCorModalVisible(false);
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de seleção de ícone */}
            <Modal
                visible={iconeModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIconeModalVisible(false)}>

                <View style={Estilos.modalFundo}>
                    <View style={Estilos.SeletorContainer}>
                        <Text style={Estilos.modalTitulo}>Escolha um ícone</Text>
                        <View style={Estilos.listaModal}>
                            {listaIcones.map((iconeItem) => (
                                <TouchableOpacity
                                    key={iconeItem}
                                    style={Estilos.iconeBotao}
                                    onPress={() => {
                                        setIcone(iconeItem);
                                        setIconeModalVisible(false);
                                    }}>
                                    <MaterialIcons name={iconeItem} size={24} color="#FFF" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}