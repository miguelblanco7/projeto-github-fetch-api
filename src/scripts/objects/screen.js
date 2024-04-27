const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `  <div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                <p>${user.bio ?? 'Não possui Bio cadastrada 😢'}</p>
                                                <span>👥 Followers: ${user.followers}</span>&nbsp
                                                <span>🫂 Following: ${user.following}</span>
                                            </div>
                                        </div>`

        let repositoriesItems = '';
        user.repositories.forEach(repo => {
            repositoriesItems += `  <li>
                                        <a href="${repo.html_url}" target="_blank">${repo.name}
                                            <div>
                                                <span>🍴${repo.forks}</span>
                                                <span>⭐${repo.stargazers_count}</span>
                                                <span>👀${repo.watchers}</span>
                                                <span>🧑🏽‍💻${repo.language ?? 'Sem linguagem'}</span>
                                            </div>
                                        </a>
                                    </li>`
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += ` <div class="repositories">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItems}</ul>
                                            </div>`
        } else {
            this.userProfile.innerHTML += ` <div class="repositories">
                                                <h2>Repositórios</h2>
                                                <p>Usuário sem repositório cadastrado!</p>
                                            </div>`
        };

        let eventsItems = '';
        user.events.forEach(event => {
            if (event.type === "PushEvent") {
                eventsItems += `<li>
                                    <a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}
                                    </a><span> --&nbsp ${event.payload.commits[0].message}</span>
                                </li>`
            } else {
                eventsItems += `<li>
                                    <a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}
                                    </a><span> --&nbsp Criado um ${event.payload.ref_type}</span>
                                </li>`
            };
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += ` <div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItems}</ul>
                                            </div>`
        }
        else {
            this.userProfile.innerHTML += ` <div class="events">
                                                <h2>Eventos</h2>
                                                <p>Nenhum evento encontrado!</p>
                                            </div>`
        };
    },

    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuário não encontrado!</h3>'
    },
};

export { screen };