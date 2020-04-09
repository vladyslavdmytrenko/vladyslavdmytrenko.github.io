    var game = {
        quantityBomb: 0,
        quantityEmerald: 0,
        quantityStar: 0,
        createField: window.onload = function createField() {
            var minefield = document.querySelector(".minefield");
            //var randomcolor = "#"+((1<<24)*Math.random()|0).toString(16);
            fieldWidth = parseInt(minefield.getAttribute("fieldwidth"));
            fieldHeight = parseInt(minefield.getAttribute("fieldheigth"));
            minefield.setAttribute("style", "width:" + (fieldWidth*70) + "px; height: " + (fieldHeight*70) + "px;");

                for (var y = 0; y < fieldHeight; y++) {
                    for (var x = 0; x < fieldWidth; x++) {
                        var div = document.createElement("div");
                            div.classList.add("cell");
                            div.id = "cell" + y * fieldHeight + x;
                            div.setAttribute("x", x + "");
                            div.setAttribute("y", y + "");
                            div.onclick = onclickHandler;
                            div.oncontextmenu = onclickRight;
                            //div.style.backgroundColor =  randomcolor;    

                    function createBomb() {
                        if (game.quantityBomb < 3){
                            div.hasBomb = (Math.random() * 10) > 8.6;
                            if (!div.classList.contains('Emerald') && !div.classList.contains('Star') && div.hasBomb){
                                div.classList.add("bomb");
                                game.quantityBomb++;
                           }
                       }
                    }

                    function createStar() {
                        div.hasStar = (Math.random() * 10) > 8.9;
                        if (!div.classList.contains('bomb') && !div.classList.contains('Emerald') && div.hasStar){
                            div.classList.add("Star");
                            game.quantityStar++;
                        }
                    }

                    function createEmerald() {
                        if (game.quantityEmerald <= 0) {
                            div.hasEmerald = (Math.random() * 10) > 9;
                                if (!div.classList.contains('bomb')&& !div.classList.contains('Star') && div.hasEmerald){
                                    div.classList.add("Emerald");
                                    game.quantityEmerald++;
                                }
                        }                               
                    }

                    createBomb();
                    createStar();
                    createEmerald();
                    minefield.appendChild(div);

                    }
                }
                progress.createWindow();
        }
    };

    var progress = {
        score: 0,
        nowEmerald: 0,
        nowStar: 0,
        createWindow: function createWindow() { 
            $('body').prepend("<div class='progress'>" +
            "<div id='Star'>" +"Star " + "<div class='nowStar'>" + progress.nowStar + "</div>" +"/"+ game.quantityStar + "</div>" + 
            "<div id='Emerald'>" + "Emerald " + "<div class='nowEmerald'>" +progress.nowEmerald + "</div>" +"/"+ game.quantityEmerald + "</div>"+"</br>" +
            "<div>" +"Mine - 1 "+ "<img src='http://icons.iconarchive.com/icons/alecive/flatwoken/32/Apps-Gnome-Mines-icon.png' align='top'>" +"</br>"+"</br>" + "Star - 2"+"<img src='https://cdn2.iconfinder.com/data/icons/social-buttons-2/512/browser_favourites-32.png' align='top'>" +"</br>"+"</br>" + "Emerald - 3"+"<img src='http://findicons.com/files/icons/2344/faenza/32/emerald_theme_manager_icon.png' align='top'>" + "</div>" +"</br>" +
              "<div>" +'SCORE '+ progress.score + "</div>" +
              "</div>" );
        },
    };

    var menu = {
        winsGames:  0,
        loseGames: 0,
        reset: function () {
            progress.score = 0;
            progress.nowEmerald = 0;
            progress.nowStar = 0;
            game.quantityBomb = 0;
            game.quantityEmerald = 0;
            game.quantityStar = 0;
            $('.minefield').empty();
            $('.progress').remove();
            game.createField();
        },
        createBottomStartOver: $('menu.reset').ready( function createMenu () {
            $('body').prepend("<div class='menu'>" +
                      "<div id='startOver'> Start Over </div>" + 
                      "</div>" );
            $('#startOver').click(function(event){
                $ (menu.reset).ready(menu.reset());
                //$('#startOver').css("background", "#4C665B");
                });
            }),
        createStatistics: function () {
            $('div').eq(0).after("<div class='statistics'>" +
            "<div id='wins'>" + "Wins " + menu.winsGames +" "+ "lose " + menu.loseGames + "</div>"+
            "</div>" );
            },
    };

    menu.createStatistics();

    function onclickRight (event) {
        var main = this; 
        if (!$(main).hasClass("opened")) {
            $(main).addClass("flag open");
        }
        return false;
    };

    function onclickHandler(event){
        var cell = this;
        cell.classList.add("opened");
        var x = parseInt(cell.getAttribute("x"));
        var y = parseInt(cell.getAttribute("y"));
        //var xpos = event.clientX-185;
        //var ypos = event.clientY-90;
        //var sco = "";
        if($(cell).hasClass('flag open')){
            $(cell).removeClass("flag open");
        };

        if (cell.hasBomb){
           //cell.classList.add("fired");
           $('.statistics').remove();
           $('.progress').remove();
            progress.nowStar = 0; 
            progress.nowEmerald = 0;
            game.quantityBomb = 0;
            game.quantityEmerald = 0;
            game.quantityStar = 0;
            progress.score-=20;/* sco = "-20"*/;
            menu.loseGames++;
            menu.createStatistics();
            setTimeout("$('.minefield').empty()",300);
            setTimeout('game.createField();',500);
        };
        if((cell.hasStar && cell.classList.contains('opened') && !cell.classList.contains('activ')) || (cell.hasEmerald && cell.classList.contains('opened') && !cell.classList.contains('activ'))){
            
            if (cell.hasStar){
                cell.classList.add("activ");
                $('.nowStar').empty();
                progress.score+=10;
                progress.nowStar++;

                // var audio = new Audio(); // Создаём новый элемент Audio
                //     audio.src = 'bomb.mp3'; // Указываем путь к звуку "клика"
                //     audio.autoplay = true;

            $('.nowStar').append(progress.nowStar);
                if (progress.nowStar == game.quantityStar && progress.nowEmerald == game.quantityEmerald ){
                    $('.statistics').remove();
                    $('.progress').remove();
                    progress.nowStar = 0; 
                    progress.nowEmerald = 0;
                    game.quantityBomb = 0;
                    game.quantityEmerald = 0;
                    game.quantityStar = 0;
                    progress.score-=20;
                    menu.winsGames++;
                    menu.createStatistics();
                    $('.minefield').empty();
                    menu.createStatistics();
                        setTimeout("$('.minefield').empty()",300);
                        setTimeout('game.createField();',500);
                    
                }
            };
            if (cell.hasEmerald){
                    $('.nowEmerald').empty();
                    progress.score+=20;
                    progress.nowEmerald++;
                $('.nowEmerald').append(progress.nowEmerald);
                    if (progress.nowEmerald == game.quantityEmerald){
                        $('.statistics').remove();
                        $('.progress').remove();
                        progress.nowStar = 0; 
                        progress.nowEmerald = 0;
                        game.quantityBomb = 0;
                        game.quantityEmerald = 0;
                        game.quantityStar = 0;
                        progress.score-=20;
                        menu.winsGames++;
                        menu.createStatistics();
                        setTimeout("$('.minefield').empty()",300);
                        setTimeout('game.createField();',500);
                    };  
            };
        };
        if (!cell.classList.contains('Star') && !cell.classList.contains('Emerald')){
        var counter = 0;
            for (var y1=y-1; y1<=y+1; y1++ ) {
                for (var x1=x-1; x1<=x+1; x1++ ) {
                    if (y1>=0 && y1<fieldHeight && x1>=0 && x1<fieldWidth){
                        var keksik = document.querySelector(".cell[x='" + x1  + "'][y='" + y1 + "']");
                        var hasbomb = keksik.classList.contains('bomb') 
                        var hasStar = keksik.classList.contains('Star') && !keksik.classList.contains('opened') ;
                        var hasEmerald = keksik.classList.contains('Emerald') && !keksik.classList.contains('opened') ;
                        if (hasbomb){counter+=1;}
                        if (hasStar){counter+=2;}
                        if (hasEmerald){counter+=3;}
                    }
                }
            };
            if (counter == 0) {
                cell.textContent = "";
            }else{
               
            setTimeout(function(){
                cell.textContent = counter
            }, 200);
            }
        };
    };