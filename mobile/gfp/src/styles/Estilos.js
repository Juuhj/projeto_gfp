export const corPrincipal = '#59b6ff'
export const corSecundaria ='#706ef9'
export const corTextos = '#f2f2f2' 
export const corFundo = '#0d0d0d'
export const corFundo2 = '#262626'
export const corBranco = '#ffffff'
export const corDestaque = '#503459' 

export const corGradienteInicio = '#503459'   // Início do gradiente (mesmo roxo)
export const corGradienteFim = '#ff79c6'      // Rosa neon suave (harmoniza com o roxo)


const Estilos = {
    conteudo:{
        flex: 1,
        width: '100%',
        backgroundColor: corFundo
    },
    conteudoHeader:{
        flex: 1,
        backgroundColor: corSecundaria // Escolher uma cor adequada
    },
    conteudoCorpo:{
        flex: 1,
        backgroundColor: corBranco,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding:10
    },
   container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    gradienteFundo: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 10,
    opacity: 0.95,
    backgroundImage: 'linear-gradient(90deg, #503459, #ff79c6)',
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
    imagemLista:{
        width: 35,
        height: 35,
        marginRight:10
    },
    imagemLista2:{
        width: 35,
        height: 35,
        marginRight:10,
        borderRadius:25,
        backgroundColor: '#900'
    },
    itemLista:{
        flexDirection: 'row',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 7
    },
    textContainer:{
        flex: 1
    },
    nomeLista:{
        fontSize: 16,
        fontWeight:'bold',
        color: corSecundaria
    },
    inputCad: {
        marginTop: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff'
    },

    
}

export default Estilos;