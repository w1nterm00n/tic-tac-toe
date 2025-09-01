let players = {
    playerX: {
        tag: "X"
    },
    player0: {
        tag: "0"
    },
    getPersonName: function () {
        const formNode = document.getElementById('enter_names_fields');
        if (!(formNode instanceof HTMLFormElement))
            return;
        Array.from(formNode.elements).forEach((el) => {
            if (!(el instanceof HTMLInputElement))
                return;
            if (!el.name)
                return;
            const { name, value } = el;
            if (name == "playerX_name") { //adding names to players objects
                this.playerX.name = value;
            }
            else {
                this.player0.name = value;
            }
            ;
        });
    },
};
export default players;
