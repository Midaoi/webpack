function dialog() {};
dialog.prototype = {
    alert: function() { alert(1) },
    confirm: function() {},
    prompt: function() {},
}
export default dialog;
