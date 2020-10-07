document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {accordion: false});
 });

const element = document.getElementById("bottom-page");
element.addEventListener('click', sendEmail);