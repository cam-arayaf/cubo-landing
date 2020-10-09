document.addEventListener('DOMContentLoaded', () => {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, { accordion: false });

    const bottomPage = document.querySelector("#bottom-page");
    bottomPage.addEventListener('click', sendEmailData);
});