import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';



export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    if (!ongId) {
        history.push('/');
    }

    async function handleNewIncident(e) {
        e.preventDefault();

        try {
            await api.post('incidents', {
                title,
                description,
                value
            }, {
                headers: {
                    Authorization: ongId
                }
            });
            history.push('/profile');
        } catch (err) {
            console.log(err);
            alert('Erro ao cadastrar novo caso.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição" ></textarea>
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em reais" />
                    <button
                        className="button"
                        type="submit" >Cadastrar</button>
                </form>
            </div>
        </div>
    );
}