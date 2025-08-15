import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FontAwesome, MaterialIcons } from 'react-native-vector-icons';  
import { enderecoServidor } from '../components/utils.jsx';
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from '../styles/Estilos';


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    async function botaoLogin() {
        try {
            if (email === "" || senha == "") {
                throw new Error('Preencha todos os campos');
            }
            const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    senha: senha,
                })
            });
            if (resposta.ok) {
                const dados = await resposta.json();
                AsyncStorage.setItem('UsuarioLogado', JSON.stringify(dados));
                navigation.navigate("MenuDrawer");
            } else {
                setMensagem('Email ou senha incorretos ❌');
                throw new Error('Email ou senha incorretos ❌');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            alert(error.message);
            return;
        }
    }

    return (
        <View style={Estilos.container}>
            {/* Logo */}
            <View style={Estilos.loginBox}>
                <Text style={Estilos.title}>Acesse sua conta</Text>
                <Text style={Estilos.subtitle}>Gestor Financeiro Pessoal</Text>
                <Text style={Estilos.title2}>Email</Text>
                <View style={Estilos.inputContainer}>
                    <FontAwesome name="envelope" size={20} color="#503459" style={Estilos.icon} />
                    <TextInput
                        placeholder='Digite seu email'
                        style={Estilos.input2}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <Text style={Estilos.title2}>Senha</Text>
                <View style={Estilos.inputContainer}>
                    <MaterialIcons name="lock" size={20} color="#503459" style={Estilos.icon} />
                    <TextInput
                        placeholder='Digite sua senha'
                        secureTextEntry
                        style={Estilos.input2}
                        value={senha}
                        onChangeText={setSenha}
                    />
                </View>
                 <TouchableOpacity onPress={() => navigation.navigate('RecuperacaoSenha')}>
                        <Text style={Estilos.link}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                {/* Botão Entrar */}
                <View style={Estilos.linksContainer}></View>
                    <TouchableOpacity style={Estilos.button} onPress={botaoLogin}>
                        <Text style={Estilos.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                {/* <View /> */}
                {/* Quero mover mais para o centro */}
                    <TouchableOpacity onPress={() => navigation.navigate('CriarConta')}>
                        <Text style={Estilos.link}>Criar uma nova conta</Text>
                    </TouchableOpacity>
                </View>
                {/* Quero um View com as borbas arredondadas com recursos do app apresentando-os, podem ter talvez duas views separadas assim, todas relativamente transparentes */}
                <Text>sla</Text>
        </View>
    );
}
