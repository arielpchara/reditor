(function ($) {
    var savecode = function (editor) {
        $.ajax({
            url:location.pathname,
            type:'POST',
            data: {
                content: editor.getValue()
            }
        }).done(function (r) {
            console.log(r);
        });
    };
    var textarea = $('textarea')[0];
    if( textarea ){
        CodeMirror.modeURL = "/lib/CodeMirror/mode/%N/%N.js";
        var editor = CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            // matchTags: true,
            autoCloseTags: true,
            extraKeys: {
                'Ctrl-S': savecode
            },
            theme: 'dracula'
        });
    }
    $(function() {
        if ( filepath ) {
            $.getJSON('/read/' + filepath)
                .done(function(response) {
                    editor.setOption("value", response.content);
                    editor.setOption("mode", response.mimetype);
                    var info = CodeMirror.findModeByMIME(response.mimetype);
                    CodeMirror.autoLoadMode(editor, info.mode);
                });
        }
    });
})(jQuery);
