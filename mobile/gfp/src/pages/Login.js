import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FontAwesome, MaterialIcons } from 'react-native-vector-icons';  
import { enderecoServidor } from '../components/utils.jsx';
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    async function botaoEntrar() {
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
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.loginBox}>
                <Text style={styles.title}>Acesse sua conta</Text>
                <Text style={styles.subtitle}>Gestor Financeiro Pessoal</Text>
                <Text style={styles.title2}>Email</Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={20} color="#503459" style={styles.icon} />
                    <TextInput
                        placeholder='Digite seu email'
                        style={styles.input2}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <Text style={styles.title2}>Senha</Text>
                <View style={styles.inputContainer}>
                    <MaterialIcons name="lock" size={20} color="#503459" style={styles.icon} />
                    <TextInput
                        placeholder='Digite sua senha'
                        secureTextEntry
                        style={styles.input2}
                        value={senha}
                        onChangeText={setSenha}
                    />
                </View>
                 <TouchableOpacity onPress={() => navigation.navigate('RecuperacaoSenha')}>
                        <Text style={styles.link}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                {/* Botão Entrar */}
                <View style={styles.linksContainer}></View>
                    <TouchableOpacity style={styles.button} onPress={botaoEntrar}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                <View />
                {/* Quero mover mais para o centro */}
                    <TouchableOpacity onPress={() => navigation.navigate('CriarConta')}>
                        <Text style={styles.link}>Criar uma nova conta</Text>
                    </TouchableOpacity>
                </View>
                {/* Quero um View com as borbas arredondadas com recursos do app apresentando-os, podem ter talvez duas views separadas assim, todas relativamente transparentes */}
                <Text>sla</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // quero colocar um gradiente no fundo, as mesmas cores do botão (que vou colocar gradiente) mais com padrões divertidos
        // na verdade queria que o fundo tivesse um gradiente mais escuro com um efeito https://vincentgarreau.com/particles.js/
        flex: 1,
        backgroundColor: '#d0c3f1', // Cor de fundo clara
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loginBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Caixa de login transparente
        padding: 20,
        borderRadius: 8,
        width: 300,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // sombra sutil
        textAlign: 'center',
    },
    logo: {
        height: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#503459',
        marginBottom: 10,
        fontFamily: 'Poppins', // Fonte mais bonita
    },
    subtitle: {
        fontSize: 16,
        color: '#503459',
        marginBottom: 20,
        fontFamily: 'Poppins',
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#503459',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#ffffff',
    },
    icon: {
        marginRight: 10,
    },
    input2: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
    },
    button: {
        // quero colocar um gradiente no botão (a cor deve combinar com #503459, não necessariamente precisar ser um roxo ou lilás, pode ser rosa, azul, laranja ou até mesmo amarelo, o que combinar mais)
        width: '100%',
        backgroundColor: '#503459',
        paddingVertical: 12,
        borderRadius: 4,
        marginBottom: 10,
        opacity: 0.9, // Slight opacity for button
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
    },
    linksContainer: {
        // Quero mover ele mais para a direita, mais para o fim
        marginTop: 10,
    },
    link: {
        color: '#503459',
        fontSize: 16,
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
});
