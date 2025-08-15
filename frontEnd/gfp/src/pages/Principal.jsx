import React, { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../UsuarioContext'
import { useNavigate, Link, Routes, Route, useLocation, Form } from 'react-router-dom';
import Dashboard from './Dashboard';
import logo from '../assets/logo2.png';
import "../components/PaginaLogin.css";
import {MdAdd, MdClose, MdGridView, MdLogout, MdPeople, MdCached, MdCreditCard, MdOutlineLocalOffer, MdMenu} from 'react-icons/md';
import Contas from './contas';

export default function Principal() {
    const { dadosUsuario, setDadosUsuario, carregando } = useContext(UsuarioContext);

    const [menuAberto, setMenuAberto] = useState(false);

    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (!dadosUsuario && !carregando) {
            navigate('/login');
        }
    }, [dadosUsuario, carregando, navigate]);

    const botaoLogout = () => {
        try {
            localStorage.removeItem('UsuarioLogado');
            setDadosUsuario(null);
            navigate('/');
        } catch (error) {
            console.error('Erro ao deslogar:', error);
        }
    };

    
    return (
        <div className='flex h-screen font-sans bg-gradient-to-b from-[#A0D1E6] via-[#D0C3F1] to-[#98D8B6]'>
            {/* div para fechar o menu clicando fora */}
            <div className={`fixed inset-0 bg-transparent bg-opacity-80 z-30 md:hidden
                ${menuAberto == true ? 'block' : 'hidden'}`}
                onClick={() => setMenuAberto(false)}>
            </div>

            {/* Sidebar */}
            <section className={`fixed top-0 left-0 h-full w-64 bg-[#1e86cb]
                text-gray-200 flex flex-col z-40 transform transition-transform
                md:relative md:w-20 lg:w-64 md:translate-x-0
                ${menuAberto == true ? 'translate-x-0' : '-translate-x-full'}
                `}>
                <div className='flex justify-between items-center mb-6 p-4
                    border-b border-white'>
                    <div className='flex gap-2 items-center'>
                        <img src={logo} alt='logo GFP' className='w-8 h-8' />
                        <span className='text-xl font-bold md:hidden lg:block h1Login'>GFP</span>
                    </div>
                    <button className='md:hidden hover:text-[#3498db] transition-colors' onClick={() => setMenuAberto(false)}>
                        <MdClose  className='w-6 h-6'/>
                    </button>
                </div>
                <nav className='flex-1'>
                    <div className='px-4 lg:px-6 mb-2'>
                        <Link to='/dashboard' onClick={() => setMenuAberto(false)}
                            className={`flex items-center gap-2 p-3 rounded-lg transition-colors
                                duration-200 ${location.pathname == '/dashboard' ?
                                    'bg-[#a997d6] text-white shadow-md' : 'hover:bg-[#a997d6]'
                                }
                            `}
                        >
                            <MdGridView className='w-8 h-8 text-white'/>
                            <span className='font-medium md:hidden lg:block text-white h1Login'>Dashboard</span>

                        </Link>
                    </div>
                    <div className='px-4 lg:px-6 mb-2'>
                        <Link to='/transacoes' onClick={() => setMenuAberto(false)}
                            className={`flex items-center gap-2 p-3 rounded-lg transition-colors
                                duration-200 ${location.pathname == '/transacoes' ?
                                    'bg-[#a997d6] text-white shadow-md' : 'hover:bg-[#a997d6]'
                                }
                            `}
                        >
                            <MdCached className='w-8 h-8 text-white'/>
                            <span className='font-medium md:hidden lg:block text-white h1Login'>Transações</span>

                        </Link>
                    </div>
                    <div className='px-4 lg:px-6 mb-2'>
                        <Link to='/contas' onClick={() => setMenuAberto(false)}
                            className={`flex items-center gap-2 p-3 rounded-lg transition-colors
                                duration-200 ${location.pathname == '/contas' ?
                                    'bg-[#a997d6] text-white shadow-md' : 'hover:bg-[#a997d6]'
                                }
                            `}
                        >
                            <MdCreditCard className='w-8 h-8 text-white'/>
                            <span className='font-medium md:hidden lg:block text-white h1Login'>Contas</span>

                        </Link>
                    </div>
                    <div className='px-4 lg:px-6 mb-2'>
                        <Link to='/categorias' onClick={() => setMenuAberto(false)}
                            className={`flex items-center gap-2 p-3 rounded-lg transition-colors
                                duration-200 ${location.pathname == '/categorias' ?
                                    'bg-[#a997d6] text-white shadow-md' : 'hover:bg-[#a997d6]'
                                }
                            `}
                        >
                            <MdOutlineLocalOffer className='w-8 h-8 text-white'/>
                            <span className='font-medium md:hidden lg:block text-white h1Login'>Categorias</span>

                        </Link>
                    </div>
                </nav>
                                                                 {/*  border-white */}
                <div className='p-4 lg:p-6 border-t bg-[#a997d6]
                    hover:bg-[#a997d6] text-white font-bold py-2 px-4 rounded-lg m-4 '>
                    <button className='flex w-full items-center justify-center'>
                        <MdAdd className='w-8 h-8 text-white h1Login' />
                        <span className='md:hidden lg:block text-white'>Nova Transação</span>
                    </button>
                </div>
                    <div className='border-t border-white pt-4'>
                        <div className='flex items-center p-2'>
                            <MdPeople className='w-10 h-10 p-2 bg-[#1e86cb]
                             text-purple-300 rounded-full' />
                             <div className='ml-3 md:hidden lg:block'>
                                <p className='font-bold text-white'>{dadosUsuario?.nome}</p>
                                <p className='text-white'>{dadosUsuario?.email}</p>
                             </div>
                        </div>
                        <button className='flex gap-2 items-center w-full justify-center p-3
                            text-white' onClick={botaoLogout}>
                            <MdLogout className='w-8 h-8 text-white' />
                            <span className='md:hidden lg:block text-white'>Sair</span>
                        </button>
                    </div>
            </section>
            {/* Conteúdo Principal */}
            <section className='flex-1 p-4 text-gray-100 overflow-auto'>
                <header className='flex items-center mb-3'>
                    <button className='md:hidden' onClick={() => setMenuAberto(true)}>
                        <MdMenu className='w-8 h-8 text-white'/>
                    </button>
                    <div className='flex items-center justify-center flex-1 gap-2 md:hidden'>
                        <img src={logo} alt="Logo GFP" className='w-8 h-8' />
                        <span className='font-bold text-xl'>GFP</span>
                    </div>
                </header>

                <main>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/contas' element={<Contas />} />
                    </Routes>
                </main>
                
            </section>
        </div>
    );
}
