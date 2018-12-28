var TILESIZE = 50;

$(function(){
    var canvas = $("#game")[0];
    var gc = canvas.getContext("2d");

    var ENTITIES = {
        EMPTY:0,
        CHARACTER:1,
        BOMB:2,
        WALL:3
    };

    var map = new Map(10, 10);
    var character = new Character(Math.floor(Math.random()*map.tab.length), Math.floor(Math.random()*map.tab[0].length));

    drawMap();

    function Character(x, y){
        this.x = x;
        this.y = y;

        if(map.tab[x][y][0][0].type === ENTITIES.EMPTY)
            map.tab[x][y][0] = new Entity(ENTITIES.CHARACTER, this);
    }

    function Entity(type, value){
        this.type = type;
        this.value = value;
    }

    function Map(width, height){
        this.tab = [];

        for(var x = 0; x < width; x++){
            this.tab.push([]);
            for(var y = 0; y < height; y++){
                this.tab[x].push([]);
                this.tab[x][y].push([]);
                this.tab[x][y][0].push(new Entity(ENTITIES.EMPTY));
            }
        }
    }

    function drawMap() {
        for (var x = 0; x < map.tab.length; x ++) {
            for (var y = 0; y < map.tab[0].length; y ++) {
                var entities = map.tab[x][y];

                gc.fillStyle = "#000000";
                gc.strokeStyle = "#000000";

                gc.strokeRect(x*TILESIZE, y*TILESIZE, TILESIZE, TILESIZE);

                for(var idx = 0; idx < entities.length; idx++){
                    var entity = entities[idx][0];
                    switch(entity.type){
                        case ENTITIES.CHARACTER : gc.fillStyle = "#2f6622"; break;
                        case ENTITIES.BOMB : break;
                        case ENTITIES.WALL : gc.fillStyle = "#424242"; break;
                        case ENTITIES.EMPTY : gc.fillStyle = "#FFFFFF";
                    }

                    //TODO Add sprites
                    gc.fillRect(x*TILESIZE, y*TILESIZE, TILESIZE, TILESIZE);
                }
            }
        }
    }
});