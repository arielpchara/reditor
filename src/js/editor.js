(function ($) {

    var socket = io('http://'+location.host);


    var savecode = function (editor) {
        socket.emit('write', {
                filepath: filepath,
                content: editor.getValue()
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
            socket.on('file', function (data) {
              editor.setOption("value", data.content);
              console.log(data);
              if( data.mimetype ){
                editor.setOption("mode", data.mimetype);
                var info = CodeMirror.findModeByMIME(data.mimetype);
                CodeMirror.autoLoadMode(editor, info.mode);
              }
            });
            socket.emit('file',{filepath:filepath});
            editor.on('change', savecode);
        }

        $(window).bind("beforeunload",function() {
          if( confirm("Proccess on the server will close!") ){
            socket.emit('exit');
          }
        });
    });
})(jQuery);
