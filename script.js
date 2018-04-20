var stories = [];
const save_name = "story_helper_by_zedrem";
const story_template = "<fieldset id=\"story_{0}\"><legend>{1}</legend><div id='content_{0}'><fieldset><legend>Characters</legend><div onclick='add_new_character({0})' class='button'>new Character</div><div id='chars_{0}'></div></fieldset></div></fieldset>";
const new_story = "<div><input type='text' placeholder='Story name' name='s_name'><input type='button' value='done' onclick='create_story()'></div>";
const character_template =
    "<fieldset><legend>{0}</legend><table>" +
    "<tr><td>Name:</td><td>{0}</td><td class='button' onclick='edit({6}, {7}, 0)'>edit</td></tr>" +
    "<tr><td>Group:</td><td>{1}</td><td class='button' onclick='edit({6}, {7}, 1)'>edit</td></tr>" +
    "<tr><td>Abilities:</td><td>{2}</td><td class='button' onclick='edit({6}, {7}, 2)'>edit</td></tr>" +
    "<tr><td>Alive:</td><td>{3}</td><td class='button' onclick='edit({6}, {7}, 3)'>edit</td></tr>" +
    "<tr><td>Allies:</td><td>{4}</td><td class='button' onclick='edit({6}, {7}, 4)'>edit</td></tr>" +
    "<tr><td>Enemies:</td><td>{5}</td><td class='button' onclick='edit({6}, {7}, 5)'>edit</td></tr>" +
    "<tr></tr></table></fieldset>";
const new_character =
    "<table><tr><td>Name:</td><td><input type='text' name='c_name'/></td></tr>" +
    "<tr><td>Group:</td><td><input type='text' name='c_group'/></td></tr>" +
    "<tr><td>Abilities:</td><td><input type='text' name='c_abilities'/></td></tr>" +
    "<tr><td>Alive:</td><td><input type='text' name='c_alive'/></td></tr>" +
    "<tr><td>Allies:</td><td><input type='text' name='c_allies'/></td></tr>" +
    "<tr><td>Enemies:</td><td><input type='text' name='c_enemies'/></td></tr>" +
    "<tr><td colspan='2' onclick='add_char({0})'>add</td></tr>" +
    "<tr></tr></table>";

// listeners
function edit(story, char, attr) {
    stories[story][1][char][attr] = prompt("Please enter the new value:", stories[story][1][char][attr]);
    update_stories();
}

function add_new_character(story) {
    $('#chars_' + story).html(formatString(new_character, story));
}

function add_char(story) {
    let num = stories[story][1].length;
    stories[story][1].push([$("input[name=c_name]").val(), $("input[name=c_group]").val(), $("input[name=c_abilities]").val(),
        $("input[name=c_alive]").val(), $("input[name=c_allies]").val(), $("input[name=c_enemies]").val(), story, num]);
    save_stories();
    load_stories();
}

function save_stories() {
    localStorage[save_name] = JSON.stringify(stories);
}

function load_stories() {
    try {
        stories = JSON.parse(localStorage[save_name]);
    }
    catch(e) {
        console.log(e)
    }
    update_stories();
}

function export_stories() {
    // TODO
}

function import_stories() {
    // TODO
}

function create_new_story() {
    $('#new').html(new_story);
}

function create_story() {
    stories.push([$("input[name=s_name]").val(), []]);
    update_stories();
}

// functions
function update_stories() {
    let tmp_story = "<div id='new'><div onclick=\"create_new_story()\" class='button'>new Story</div></div>";
    for (let index_of_story in stories) {
        tmp_story += formatString(story_template, index_of_story, stories[index_of_story][0]);
    }
    // $('#all_stories').html(tmp_story);
    document.getElementById("all_stories").innerHTML = tmp_story;
    for (let index_of_story in stories) {
        tmp_chars = "";
        let story = stories[index_of_story];
        for(let index_of_char in story[1]) {
            let char = story[1][0];
            tmp_chars += formatStringArr(character_template, char);
        }
        $('#chars_' + index_of_story).html(tmp_chars);
    }
    // $('#all_stories').tabs();
    save_stories();
}

function formatString(s) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return formatStringArr(s, args);
}

function formatStringArr(s, args) {
    var out = s;
    for (var i = 0; i < args.length; i++) {
        out = replace_all(out, "{" + i + "}", args[i]);
    }
    return out;
}

function replace_all(s, o, n) {
    while (s.indexOf(o) != -1) {
        s = s.replace(o, n);
    }
    return s;
}

window.onload = function () {
    load_stories();
};