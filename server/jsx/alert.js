// show a custom window with given title & mulit-line message(array of lines)
// eslint-disable-next-line no-unused-vars
function alert_User_Multiline(tl, msgArr, confBtn) {
    var dia = new Window("dialog", tl);
    var i;
    for (i = 0; i < msgArr.length; i++) {
        dia.add("statictext", undefined, msgArr[i]);
    }
    var btns = dia.add("group");
    btns.alignment =  ["", "fill"];
    btns.createBtn = btns.add("button", undefined, confBtn, {name: "ok"});
    btns.createBtn.active = true;
    
    dia.show();
    return true;
}