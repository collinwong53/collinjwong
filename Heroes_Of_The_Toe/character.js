function Character(name){
    this.name = name;
    this.skill;
    this.portrait;
    this.victory;
    this.sound;
    this.select;
    this.attack;
    this.icon;
    this.set_portrait = function(image){
        this.portrait = "images/" + image;
    }
    this.set_victory_sound = function(sound){
        this.sound = new Audio("sound/"+sound);
    }
    this.set_victory = function(gif){
        this.victory = 'url("images/'+ gif+'")'
    };
    this.set_skill = function(skill){
        this.skill = skill;
    };
    this.set_select_sound = function(sound){
        this.select = new Audio("sound/" + sound);
    }
    this.set_attack_sound = function(sound){
        this.attack = new Audio("sound/" + sound);
    }
    this.set_icon = function(iconImg) {
        this.icon = 'images/' + iconImg;
    }
}

// var character_specs = {
//     illidan: {
//         name: 'illidan',
//         sounds: {
//             select: 'illidan_select.mp3',
//             attack: 'illidan_attack.mp3',
//             victory: 'illidan_win.mp3'
//         },
//         animation: 'illidan_win.gif',
//         specialSkill: function(){
//             console.log('special skill!');
//         }
//     }
// }
var illidan = new Character("Illidan");
var hanzo = new Character("Hanzo");
var genji = new Character("Genji");
var arthas = new Character("Arthas");
var kerrigan = new Character("Kerrigan");
var raynor = new Character("Raynor");
var game = null;

var characters = {
    "Illidan":illidan,
    "Hanzo": hanzo,
    "Genji":genji,
    "Arthas":arthas,
    "Kerrigan":kerrigan,
    "Raynor":raynor
};



illidan.set_select_sound("illidan_select.mp3");
illidan.set_attack_sound("illidan_attack.mp3");
illidan.set_portrait("illidan_portrait.png");
illidan.set_skill(gameSkills.illidanSkill);
illidan.set_victory("illidan_win.gif");
illidan.set_victory_sound("illidan_win.mp3");
illidan.set_icon("illidan_icon.png");

genji.set_select_sound("genji_select.mp3");
genji.set_attack_sound("genji_attack.mp3");
genji.set_portrait("genji_portrait.png");
genji.set_skill(gameSkills.genjiSkill);
genji.set_victory("genji_win.gif");
genji.set_victory_sound("genji_win.mp3");
genji.set_icon("genji_icon.png");

hanzo.set_select_sound("hanzo_select.mp3");
hanzo.set_attack_sound("hanzo_attack.mp3");
hanzo.set_portrait("hanzo_portrait.png");
hanzo.set_skill(gameSkills.hanzoSkill);
hanzo.set_victory("hanzo_win.gif");
hanzo.set_victory_sound("hanzo_win.mp3");
hanzo.set_icon("hanzo_icon.png");

arthas.set_select_sound("arthas_select.mp3");
arthas.set_attack_sound("arthas_attack.mp3");
arthas.set_portrait("lich_king_portrait.png");
arthas.set_victory("arthas_win.gif");
arthas.set_skill(gameSkills.arthasSkill);
arthas.set_victory_sound("arthas_win.mp3");
arthas.set_icon("lich_king_icon.png");

raynor.set_select_sound("raynor_select.mp3");
raynor.set_attack_sound("raynor_attack.mp3");
raynor.set_portrait("raynor_portrait.png");
raynor.set_victory("raynor_win.gif");
raynor.set_skill(gameSkills.jimSkill);
raynor.set_victory_sound("raynor_win.mp3");
raynor.set_icon("raynor_icon.png");

kerrigan.set_select_sound("kerrigan_select.mp3");
kerrigan.set_attack_sound("kerrigan_attack.mp3");
kerrigan.set_portrait("kerrigan_portrait.png");
kerrigan.set_victory("kerrigan_win.gif");
kerrigan.set_skill(gameSkills.kerriganSkill);
kerrigan.set_victory_sound("kerrigan_win.mp3");
kerrigan.set_icon("kerrigan_icon.png");
