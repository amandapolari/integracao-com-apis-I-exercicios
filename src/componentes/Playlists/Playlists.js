import React, { useEffect, useState } from 'react';
import Musicas from '../Musicas/Musicas';
import axios from 'axios';

function Playlists() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        getAllPlaylists();
    }, []);

    const getAllPlaylists = () => {
        const headers = {
            headers: {
                Authorization: 'amanda-polari-easley',
            },
        };

        axios
            .get(
                `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`,
                headers
            )
            .then((resp) => {
                // console.log(resp.data.result.list);
                setPlaylists(resp.data.result.list);
            })
            .catch((err) => {
                // console.log('Erro: NÃO pegou todas as playlists', err.response);
            });
    };

    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} />;
            })}
        </div>
    );
}

export default Playlists;
