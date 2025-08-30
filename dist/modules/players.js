let players = {
    playerX: {
        tag: "X",
        name: ""
    },
    player0: {
        tag: "0",
        name: ""
    },
    getPersonName: function () {
        let form = document.getElementById('enter_names_fields');
        const { elements } = form;
        Array.from(elements)
            .filter((item) => !!item.name)
            .map(function (element) {
            const { name, value } = element;
            if (name == "playerX_name") { //добавляем имена в объекты игроков
                players.playerX.name = value;
            }
            else {
                players.player0.name = value;
            }
            ;
        });
    },
};
export default players;
