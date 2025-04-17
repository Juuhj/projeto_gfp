import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config()

// Conexão com o Supabase usando connectionString
// const BD = new Pool({
//     connectionString: "postgres://postgres.sguugivenyucuyfaegcl:uJ41uOtbuqQJXzV2@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
//     ssl: {
//         rejectUnauthorized: false // O Supabase requer SSL
//     }
// });

// const BD = new Pool({
//     connectionString: POSTGRES_URL_NON_POOLING="postgres://postgres.sxrdcyatuhfbrpucpyqk:XgqmuetCaabw19WA@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
//     ssl:{
//         rejectUnauthorized: false
//     }
// })

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bd_gfp',
    password: 'admin',
    port: 5432,
})

const testarConexao = async () => {
    try{
        const client = await BD.connect();//tenta estabelecer a conexao com o banco de dados
        console.log("✔ Conexao com o banco de dados estabelecida");
        client.release(); // libera o client
    }catch(error){
        // console.error("Erro ao conectar ao banco de dados", error.message)
        console.log("Erro ao conectar ao banco de dados", error.message)
    }
}


export { BD, testarConexao};