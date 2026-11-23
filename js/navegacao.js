(function iniciarMenuMobile() {
    const botao = document.querySelector(".botao-menu");
    if (!botao) return;

    const menu = document.getElementById(botao.getAttribute("aria-controls"));
    if (!menu) return;

    function menuAberto() {
        return botao.getAttribute("aria-expanded") === "true";
    }

    function atualizarMenu(aberto) {
        botao.setAttribute("aria-expanded", String(aberto));
        botao.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
    }

    function alternarMenu() {
        atualizarMenu(!menuAberto());
    }

    function fecharMenu() {
        if (!menuAberto() || botao.getClientRects().length === 0) return false;

        atualizarMenu(false);
        botao.focus({ preventScroll: true });
        return true;
    }

    function tratarEscape(evento) {
        if (evento.key === "Escape" && fecharMenu()) {
            evento.preventDefault();
        }
    }

    function tratarLink(evento) {
        if (evento.target.closest("a[href]")) {
            fecharMenu();
        }
    }

    botao.addEventListener("click", alternarMenu);
    botao.closest("nav").addEventListener("keydown", tratarEscape);
    menu.addEventListener("click", tratarLink);
    botao.disabled = false;
})();
