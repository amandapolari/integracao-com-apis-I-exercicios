# Integração de APIs I - Exercícios

## Índice

-   [1. Configurações Iniciais](#1-configurações-iniciais)
-   [2. Exercicio 1](#exercício-1)
-   [3. Exercício 2](#exercício-2)
-   [4. Exercício 3](#exercício-3)
-   [5. Exercício 4](#exercício-4)
-   [6. Exercício 5](#exercício-5)

## 1. Configurações Iniciais

-   Para esse exercício utilizaremos o `axios` e a `API Labefy`
    -   Para utilizar o `axios`, rode no terminal:
        ```
        npm install axios
        ```
    -   Após a instalação, importe-o no topo da página que irá utilizar o axios:
        ```
        import axios from 'axios'
        ```
    -   [Link da API Labefy](https://documenter.getpostman.com/view/7549981/SztBc8eT?version=latest)

## Exercício 1

### Enunciado:

Primeiramente leia a documentação da API, para entender o que cada endpoint **precisa** para ser consumido e **fornece** como resposta. Dados, headers, parâmetros, etc.

### Minha Resolução:

[ ✔ ]

## Exercício 2

### Enunciado:

Para iniciar no código, iremos mudar o arquivo `Playlists.js`. Atualmente as playlists estão como dados mockados no arquivo, mas precisamos que elas venham da API. Altere a origem das playlists. Lembre-se de instalar o `axios`, e importá-lo quando for necessário.

### Minha Resolução:

1. Instalei e importei o axios;
2. Utilizei o endpoint `getAllPlaylists` que precisa do input: `headers`
3. Criei a função de faz a requisição para pegar o nome das playlists da seguinte forma:

    ```
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
    ```

4. Criei um useEffect para que toda vez que apágina for montada a função de pegar todas as playlists seja chamada:

    ```
    useEffect(() => {
            getAllPlaylists();
        }, []);
    ```

-   Obs: O nome da playlist setá sendo passado por props para o componente que irá renderiza-lo:
    ```
    return (
            <div>
                {playlists.map((playlist) => {
                    return <Musicas key={playlist.id} playlist={playlist} />;
                })}
            </div>
        );
    ```

## Exercício 3

### Enunciado:

Agora que já conseguimos consumir as playlists da API, vamos modificar as músicas. Elas também estão como dados mockados e precisam vir da API.
Atenção para este endpoint: como a API sabe de qual playlist estamos importando as músicas?

### Minha Resolução:

1. Importe o `axios` para o componente `Musicas.js`;
2. Utilizei o endpoint `getPlaylistTracks` que precisa dos inputs: `headers` e `path param`
3. Fiz a função da requisição e também chamei esta função no useEffect para que ela seja executada quando a página for montada:

    ```
    const [musicas, setMusicas] = useState([]);

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
    ```

## Não inicie os exercícios a seguir antes de ter conseguido resolver os 3 acima!

## Exercício 4

### Enunciado:

Já possuímos os dados vindos da API, mas agora precisamos criar uma função para enviar novas músicas para cada playlist.
(caso prefira, você pode utilizar o link http://spoti4.future4.com.br/1.mp3, mudando apenas o número de cada música, de 1 a 98)

### Minha Resolução:

1.  Utilizei o endpoint `addTrackToPlaylist` que precisa dos inputs: `headers`, `path params` e `body`
2.  Para isso precisei adicionar mais três estados e aplicar os inputs controlados:

        ```
        const [name, setName] = useState('');
        const [artist, setArtist] = useState('');
        const [url, setUrl] = useState('');
        ```

        ```
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
        ```

    3 . Criei a função que adiciona música à playlist:

    ```
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

    ```

## Exercício 5

### Enunciado:

Para finalizar, precisamos criar uma função para remover as músicas de uma playlist (note que já temos um botão no layout para isso, marcado com `x` ao lado de cada música)

### Minha Resolução:

1.  Utilizei o endpoint `removeTrackFromPlaylist` que precisa dos inputs: `headers`, `path params` que possui: `playlistId` e `trackId`
2. montei a função da seguinte maneira:
    ```
    const removeTrackFromPlaylist = (trackId) => {
            const headers = {
                headers: {
                    Authorization: 'amanda-polari-easley',
                },
            };

            axios
                .delete(
                    `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${trackId}`,
                    headers
                )
                .then(() => {
                    getPlaylistTracks(props.playlist.id);
                })
                .catch((err) => {
                    // console.log('Não removeu', err.response);
                });
        };
    ```
3. E chamei no botão correspondente:
    ```
    <button
                                onClick={() => {
                                    removeTrackFromPlaylist(musica.id);
                                }}
                            >
                                X
    </button>
    ```