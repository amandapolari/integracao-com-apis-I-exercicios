import React, { useEffect, useState } from 'react';
import {
    Botao,
    ContainerInputs,
    ContainerMusicas,
    InputMusica,
    Musica,
} from './styled';
import axios from 'axios';

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([]);
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        getPlaylistTracks(props.playlist.id);
    }, []);

    const getPlaylistTracks = (playlistId) => {
        const headers = {
            headers: {
                Authorization: 'amanda-polari-easley',
            },
        };

        axios
            .get(
                `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistId}/tracks`,
                headers
            )
            .then((resp) => {
                // console.log(resp.data.result.tracks);
                setMusicas(resp.data.result.tracks);
            })
            .catch((err) => {
                // console.log(err.reponse);
            });
    };

    const addTrackToPlaylist = (playlistId) => {
        const headers = {
            headers: {
                Authorization: 'amanda-polari-easley',
            },
        };

        const body = {
            name,
            artist,
            url,
        };

        axios
            .post(
                `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistId}/tracks`,
                body,
                headers
            )
            .then(() => {
                // console.log('Funcinou: Adicionou Músicas');
                setName('');
                setArtist('');
                setUrl('');
                getPlaylistTracks(props.playlist.id);
            })
            .catch((err) => {
                // console.log('Erro: ', err);
            });
    };

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
                <InputMusica
                    placeholder="artista"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                />
                <InputMusica
                    placeholder="musica"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputMusica
                    placeholder="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Botao onClick={() => addTrackToPlaylist(props.playlist.id)}>
                    Adicionar musica
                </Botao>
            </ContainerInputs>
        </ContainerMusicas>
    );
}
