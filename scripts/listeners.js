document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems, { accordion: false });
    document.querySelector("#bottom-page").addEventListener('click', sendEmailData);
});