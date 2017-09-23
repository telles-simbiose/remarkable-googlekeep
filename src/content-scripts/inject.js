(function() {

    setTimeout(render, 0);

    function render() {
        document.querySelector('.notes-container').removeEventListener('DOMSubtreeModified', render, false);

        var converter = window.markdownit();
        var contentEditables = document.querySelectorAll('div[contenteditable="false"].h1U9Be-YPqjbf');

        for (var i = 0; i < contentEditables.length; i++) {
            var contentText = htmlDecode(contentEditables[i].innerHTML.replace(/<br>/g, '\n'));
            var output = converter.render(contentText);
            
            if (contentEditables[i].nextSibling.classList.contains('remarkable')) {
                contentEditables[i].nextSibling.innerHTML = output;
            }else {
                contentEditables[i].insertAdjacentHTML('afterend', '<div tabindex="0" class="remarkable">' + output + '</div>');
            }
        }
        document.querySelector('.notes-container').addEventListener('DOMSubtreeModified', render, false);
    }

    function htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
})();