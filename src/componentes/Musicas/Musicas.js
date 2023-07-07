import React, { useState } from 'react';
import {
    Botao,
    ContainerInputs,
    ContainerMusicas,
    InputMusica,
    Musica,
} from './styled';

const musicasLocal = [
    {
        artist: 'Artista 1',
        id: '1',
        name: 'Musica1',
        url: 'http://spoti4.future4.com.br/1.mp3',
    },
    {
        artist: 'Artista 2',
        id: '2',
        name: 'Musica2',
        url: 'http://spoti4.future4.com.br/2.mp3',
    },
    {
        artist: 'Artista 3',
        id: '3',
        name: 'Musica3',
        url: 'http://spoti4.future4.com.br/3.mp3',
    },
];

export default function Musicas(props) {
    const [musicas, setMusicas] = useState(musicasLocal);

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>
                            {musica.name} - {musica.artist}
                        </h3>
                        <audio src={musica.url} controls />
                        <button>X</button>
                    </Musica>
                );
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" />
                <InputMusica placeholder="musica" />
                <InputMusica placeholder="url" />
                <Botao>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    );
}
