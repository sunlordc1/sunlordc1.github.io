// A story in Tour
//** People in tour **//
var transporter;
transporter = {
    //Transporter action 
    goTo: function (content) {
        this.content = content;
        switch (content) {
            case 'home':
                page.singlePage('home')
                break;
            case 'player':
                page.singlePage('player')
                break;
            case 'event':
                page.singlePage('event')
                break;
            case 'pick-and-round':
                page.singlePage('pick-and-round')
                break;
            case 'draft':
                page.singlePage('draft')
                break;
            default:
                return console.log('Im transporter, i dont know what is comming :(')
        }
    },

};

//** Asset,layout and component for view **//
var layout;
var component;
var page;
var data;
var titlePage;
var slugPage;
var action;
var filterAthele;
/** This is include layout of page **/

page = {
    singlePage: function (content) {
        this.content = content;
        let thisPage = page;
        localStorage.currentPage = content;
        switch (content) {
            case 'player':
                titlePage = 'Danh sách cầu thủ';
                slugPage = 'player';
                document.querySelector('#content').innerHTML = `
                ${layout.home('menu')}
                <!--Content-->
                ${component.getComponent('Header')}
                <section class="fpl-player-list">
                    <div class="grid-container">
                        <div class="grid-x grid-padding-x">
                            ${component.getComponent('List Player')}
                        </div>
                    </div>
                </section>
                <!--End Content-->
            `;
                //Add event click for player card, if click then show data of they
                Array.from(document.getElementsByClassName("fpl-player-block")).forEach(function (element) {
                    element.addEventListener('click', function () {
                        thisPlayer = this
                        idPlayer = thisPlayer.getAttribute("data-player-id")

                        dataPlayer = _.find(data.player, {'id': idPlayer})

                        if (typeof (dataPlayer) != "undefined") {
                            document.getElementById('modal-content').innerHTML = `
                            <h1 class="player-profile-name">${dataPlayer.name}</h1>
                            <div class="grid-x">
                                <div class="cell medium-6 large-4">   
                                    <div class="player-profile-block" style="position:relative">
                                        <img src="${dataPlayer.image}" class="img-responsive"/>
                                        <span class="player-profile-position">${dataPlayer.position}</span>
                                        ${dataPlayer.position2 != null ? `<div class="player-profile-position-2">${dataPlayer.position2}</div>` : ``}   
                                        <span class="player-profile-score"> ${dataPlayer.point} / 10</span>
                                    </div>
                                </div>
                                <div class="cell medium-6 large-8">
                                <div class="player-profile-note" >
                                    <p>
                                        <span class="note">
                                            Tuổi :  ${dataPlayer.age}
                                        </span>
                                    </p>
                                    <p>
                                        <span class="note">
                                            Chiều cao : ${dataPlayer.height}
                                        </span>
                                    </p>
                                    <span class="note">
                                        Kinh nghiệm :
                                    </span>
                                    <p>
                                        ${dataPlayer.notes}
                                    </p>
                                  
                                </div>
                               
                                </div>
                            </div>
                        `
                        } else {
                            document.getElementById('modal-content').innerHTML = `
                            Không có dữ liệu cầu thủ này
                        `
                        }

                    });
                });

                $(document).foundation() // Call foundation render 
                break;
            case 'home':
                titlePage = 'Trang chủ';
                slugPage = 'home';
                document.querySelector('#content').innerHTML = `
                    ${layout.home('menu')}
                    <!--Content-->
                        Đây là trang chủ
                    <!--End Content-->
                `;
                $(document).foundation() // Call foundation render 
                break;
            case 'event':
                titlePage = 'Luật lệ - Nội dung sự kiện';
                slugPage = 'event';
                document.querySelector('#content').innerHTML = `
                    ${layout.home('menu')}
                    <!--Content-->
                      Đây là trang sự kiện
                    <!--End Content-->
                `;
                $(document).foundation() // Call foundation render 
                break;
            case 'pick-and-round':
                titlePage = 'Pick And Round';
                slugPage = 'pick-and-round';


                //Localstorage team
                //--dataTeam
                if (!localStorage.dataTeam) {
                    refreshLocalStorage('dataTeam', data.team)
                } else {
                    // console.log(JSON.parse(localStorage.dataTeam))                    
                }
                //--firstTeam
                if (!localStorage.thisTeam) {
                    refreshLocalStorage('thisTeam', _.first(data.team))
                } else {
                    // console.log(JSON.parse(localStorage.thisTeam))                    
                }
                //render view
                document.querySelector('#content').innerHTML = `
                ${layout.home('menu')}
                <!--Content-->
                ${component.getComponent('Header')}
                <section class="fpl-player-list">
                    <div class="grid-container fluid">
                        
                                <div class="grid-x grid-padding-x">
                                    <div class="large-1 medium-2 small-12 cell">
                                        ${component.getComponent('List Logo Team')}
                                    </div>
                                    <div class="large-11 medium-10 small-12 cell">
                                        <div class="grid-x grid-padding-x" id="fpl-player-list-block">
                                            ${component.getComponent('List Player Pick')}
                                        </div>
                                    </div>
                                </div>
                        
                    </div>
                </section>
                <!--End Content-->
                `


                //event click to a club/team

                Array.from(document.getElementsByClassName('fpl-club')).forEach(function (element) {
                    element.addEventListener('click', function () {
                        refreshLocalStorage('thisTeam', _.find(JSON.parse(localStorage.teamListCurrent), {id: element.getAttribute('data-id')}))
                        document.querySelectorAll('.team-active').forEach(team => {
                            team.classList.remove('team-active')
                        })
                        element.classList.add('team-active')
                        document.getElementById('fpl-player-list-block').innerHTML = `
                            ${component.getComponent('List Player Pick')}
                        `
                        event()
                    });
                });

            function event() {
                Array.from(document.getElementsByClassName("fpl-player-block")).forEach(function (element) {
                    element.addEventListener('click', function () {
                        thisPlayer = this
                        idPlayer = thisPlayer.getAttribute("data-player-id")

                        dataPlayer = _.find(data.player, {'id': idPlayer})
                        if (typeof (dataPlayer) != "undefined") {
                            document.getElementById('modal-content').innerHTML = `
                            <h1 class="player-profile-name">${dataPlayer.name}</h1>
                        
                            <div class="grid-x">
                                <div class="cell medium-6 large-4">   
                                    <div class="player-profile-block" style="position:relative">
                                        <img src="${dataPlayer.image}" class="img-responsive"/>
                                        <span class="player-profile-position">${dataPlayer.position}</span>
                                        ${dataPlayer.position2 != null ? `<div class="player-profile-position-2">${dataPlayer.position2}</div>` : ``}
                                        ${dataPlayer.is_captain == null ? `<span class="player-profile-score"> ${dataPlayer.point} / 10</span>` : `<span class="player-profile-score"> <i class="fi-star"></i> Đội trưởng</span>`}
                                    </div>
                                </div>
                                <div class="cell medium-6 large-8">
                                <div class="player-profile-note" >
                                    <p>
                                        <span class="note">
                                            Tuổi :  ${dataPlayer.age}
                                        </span>
                                    </p>
                                    <p>
                                        <span class="note">
                                            Chiều cao : ${dataPlayer.height}
                                        </span>
                                    </p>
                                    <span class="note">
                                       Kinh nghiệm :
                                    </span>
                                    <p>
                                        ${dataPlayer.notes}
                                    </p>
                                </div>
                               
                                </div>
                            </div>
                        `
                        } else {
                            document.getElementById('modal-content').innerHTML = `
                            Không có dữ liệu cầu thủ này
                        `
                        }

                    });
                });
                Array.from(document.getElementsByClassName("fpl-player-change")).forEach(function (element) {
                    let idPlayer = element.getAttribute('data-player-id')
                    element.addEventListener('click', function () {
                            action = 'change';
                            document.getElementById('modal-content').innerHTML = `
                        <section class="fpl-player-list" style="padding-top:30px;">
                            <div class="grid-container fluid">
                                <h2>Đổi cầu thủ </h2>
                                <div class="grid-x grid-padding-x">
                                    ${component.getComponent('List Player Current')}
                                </div>
                            </div>
                        </section>`;
                            //Add player to team action
                            Array.from(document.getElementsByClassName("change-player")).forEach(function (element) {
                                element.addEventListener('click', function () {

                                        let popPlayer; // player when click for pop to array list player
                                        let currentListPlayer = JSON.parse(localStorage.playerListCurrent); // All player in group, push when player join a team
                                        let thisTeam = JSON.parse(localStorage.thisTeam);
                                        let teamListCurrent = JSON.parse(localStorage.teamListCurrent);
                                        let playerWillChange = _.find(thisTeam.listPlayer, {'id': idPlayer})

                                        for (var i = 0; i < currentListPlayer.length; i++) {
                                            if (currentListPlayer[i].id == element.getAttribute('data-player-id')) {
                                                popPlayer = currentListPlayer.splice(i, 1);

                                            }
                                        }
                                        for (var i = 0; i < thisTeam.listPlayer.length; i++) {
                                            if (thisTeam.listPlayer[i].id == idPlayer) {
                                                thisTeam.listPlayer[i] = popPlayer[0]
                                            }
                                        }

                                        currentListPlayer.push(playerWillChange)
                                        for (var i = 0; i < teamListCurrent.length; i++) {
                                            if (teamListCurrent[i].id == thisTeam.id) {
                                                teamListCurrent[i] = thisTeam
                                            }
                                        }
                                        refreshLocalStorage('teamListCurrent', teamListCurrent) // Update change of localstorage
                                        refreshLocalStorage('thisTeam', thisTeam) // Update change of localstorage
                                        refreshLocalStorage('playerListCurrent', currentListPlayer) // Update change of localstorage
                                        $('#modal-player').foundation('close');
                                        transporter.goTo('pick-and-round')
                                    }
                                )
                            });
                        }
                    )
                });
                Array.from(document.getElementsByClassName("fpl-player-add")).forEach(function (element) {
                    element.addEventListener('click', function () {
                            action = 'add';
                            filterAthele = 'all'; // This important for filter in component List Player Current
                            callViewFilter()

                            function callViewFilter() {
                                document.getElementById('modal-content').innerHTML = `
                                <section class="fpl-player-list" style="padding-top:30px;">
                                    <div class="grid-container fluid">
                                        <h2>Chọn cầu thủ: <span class="fpl-player-filter fpl-pick-find-all">Tất cả</span> <span class="fpl-player-filter fpl-pick-find-center">C</span> <span class="fpl-player-filter fpl-pick-find-sf">SF</span> <span class="fpl-player-filter fpl-pick-find-pf">PF</span> <span class="fpl-player-filter fpl-pick-find-pg">PG</span> <span class="fpl-player-filter fpl-pick-find-sg">SG</span></h2>
                                  
                                        <div class="grid-x grid-padding-x">
                                            
                                            ${component.getComponent('List Player Current')}
                                        </div>
                                    </div>
                                </section>`;

                                //Add player to team action
                                Array.from(document.getElementsByClassName("pick-player")).forEach(function (element) {
                                    element.addEventListener('click', function () {
                                            let popPlayer; // player when click for pop to array list player
                                            let currentListPlayer = JSON.parse(localStorage.playerListCurrent); // All player in group, push when player join a team
                                            let thisTeam = JSON.parse(localStorage.thisTeam);
                                            let teamListCurrent = JSON.parse(localStorage.teamListCurrent);
                                            for (var i = 0; i < currentListPlayer.length; i++) {
                                                if (currentListPlayer[i].id == element.getAttribute('data-player-id')) {
                                                    popPlayer = currentListPlayer.splice(i, 1);
                                                }
                                            }
                                            thisTeam.listPlayer.push(popPlayer[0])
                                            for (var i = 0; i < teamListCurrent.length; i++) {
                                                if (teamListCurrent[i].id == thisTeam.id) {
                                                    teamListCurrent[i] = thisTeam
                                                }
                                            }
                                            refreshLocalStorage('teamListCurrent', teamListCurrent) // Update change of localstorage
                                            refreshLocalStorage('thisTeam', thisTeam) // Update change of localstorage
                                            refreshLocalStorage('playerListCurrent', currentListPlayer) // Update change of localstorage
                                            $('#modal-player').foundation('close');
                                            transporter.goTo('pick-and-round')
                                        }
                                    )
                                });
                            }

                            function addEventFilterPlayer() {
                                document.getElementsByClassName("fpl-pick-find-all")[0].addEventListener('click', function () {
                                    filterAthele = "all";
                                    callViewFilter()
                                    addEventFilterPlayer()
                                });
                                document.getElementsByClassName("fpl-pick-find-center")[0].addEventListener('click', function () {
                                    filterAthele = "C";
                                    callViewFilter()
                                    addEventFilterPlayer()
                                });
                                document.getElementsByClassName("fpl-pick-find-pg")[0].addEventListener('click', function () {
                                    filterAthele = "PG";
                                    callViewFilter()
                                    addEventFilterPlayer()
                                });
                                document.getElementsByClassName("fpl-pick-find-sf")[0].addEventListener('click', function () {
                                    filterAthele = "SF";
                                    callViewFilter()
                                    addEventFilterPlayer()
                                });
                                document.getElementsByClassName("fpl-pick-find-sg")[0].addEventListener('click', function () {
                                    filterAthele = "SG";
                                    callViewFilter()
                                    addEventFilterPlayer()
                                });
                                document.getElementsByClassName("fpl-pick-find-pf")[0].addEventListener('click', function () {
                                    filterAthele = "PF";
                                    callViewFilter()
                                    addEventFilterPlayer()
                                });
                            }

                            addEventFilterPlayer()
                        }
                    )
                });

                Array.from(document.getElementsByClassName("fpl-player-push-back")).forEach(function (element) {
                    element.addEventListener('click', function () {
                            console.log('Đã trả')
                            let popPlayer; // player when click for pop to array list player
                            let currentListPlayer = JSON.parse(localStorage.playerListCurrent); // All player in group, push when player join a team
                            let thisTeam = JSON.parse(localStorage.thisTeam);
                            let teamListCurrent = JSON.parse(localStorage.teamListCurrent);


                            for (var i = 0; i < thisTeam.listPlayer.length; i++) {
                                if (thisTeam.listPlayer[i].id == element.getAttribute('data-player-id')) {
                                    popPlayer = thisTeam.listPlayer.splice(i, 1);
                                }
                            }
                            currentListPlayer.push(popPlayer[0])
                            for (var i = 0; i < teamListCurrent.length; i++) {
                                if (teamListCurrent[i].id == thisTeam.id) {
                                    teamListCurrent[i] = thisTeam
                                }
                            }
                            refreshLocalStorage('teamListCurrent', teamListCurrent) // Update change of localstorage
                            refreshLocalStorage('thisTeam', thisTeam) // Update change of localstorage
                            refreshLocalStorage('playerListCurrent', currentListPlayer) // Update change of localstorage
                            $('#modal-player').foundation('close');
                            transporter.goTo('pick-and-round')
                        }
                    )
                });
                car("menu-item")

            }

                event()

                $(document).foundation() // Call foundation render 
                break;
            case 'draft':
                titlePage = 'DRAFT';
                slugPage = 'draft';


                //Localstorage team
                //--dataTeam
                if (!localStorage.dataTeam) {
                    refreshLocalStorage('dataTeam', data.team)
                } else {
                    // console.log(JSON.parse(localStorage.dataTeam))                    
                }
                //--firstTeam
                if (!localStorage.thisTeam) {
                    refreshLocalStorage('thisTeam', _.first(data.team))
                } else {
                    // console.log(JSON.parse(localStorage.thisTeam))                    
                }

                document.querySelector('#content').innerHTML = `
                    ${layout.home('menu')}
                    <!--Content-->
                    ${component.getComponent('Header')}
                    <section class="fpl-player-list">
                    <div class="grid-container fluid">
        
                    
                                <div class="grid-x grid-padding-x">
                                    <div class="large-1 medium-1 small-12 cell">
                                        
                                    </div>
                                    ${component.getComponent('Draft Table')}
                            
                                    <div class="large-1 medium-1 small-12 cell">
                                        
                                    </div>
                                </div>
                        
                    </div>
                     </section>
                    <!--End Content-->
                `;
                $(document).foundation() // Call foundation render 
                break;
            default:
                localStorage.currentPage = 'home'
                return console.log('Im traveller, i dont know what is comming :(')
        }
    },

};
layout = {
    //Traveller talk with translator
    home: function (content) {
        this.content = content;
        let thisLayout = layout;
        switch (content) {
            case 'menu':
                return `<div class="title-bar" data-responsive-toggle="fpl-basketball" data-hide-for="medium">
                <button class="menu-icon" type="button" data-toggle="fpl-basketball"></button>
                <div class="title-bar-title">Menu</div>
              </div>
              
              <div class="top-bar" id="fpl-basketball">
                <div class="top-bar-left">
                  <ul class="dropdown menu" data-dropdown-menu>
                    <li class="menu-item home ${slugPage == "home" ? 'active-menu' : ''}" data-page="home"><img src="./src/library/images/logo.PNG" width="50px" height="50px"/><span class="menu-title-mobile">Trang chủ</span></li>
                    <li class="menu-item ${slugPage == "player" ? 'active-menu' : ''}" data-page="player"><a href="#">Cầu thủ</a></li>
                    <li class="menu-item ${slugPage == "event" ? 'active-menu' : ''}" data-page="event"><a href="#">Luật lệ & Nội dung sự kiện</a></li>
                    <li class="menu-item ${slugPage == "pick-and-round" ? 'active-menu' : ''}" data-page="pick-and-round"><a href="#">Pick and round</a></li>
                    <li class="menu-item ${slugPage == "draft" ? 'active-menu' : ''}" data-page="draft"><a href="#">FPL Draft</a></li>
                
                  </ul>
                </div>
               
              </div>`

            default:
                return console.log('Im traveller, i dont know what is comming :(')
        }
    },

};
component = {
    //Transporter action 
    getComponent: function (content) {
        this.content = content;
        switch (content) {
            case 'Header':
                return `<header id="header">
                <h1>${titlePage}</h1>
       
            </header>`
                break;
            case 'List Player':
                let viewPlayer = '';

                data.player.forEach(player => {

                    viewPlayer += `<div class="large-3 medium-4 small-12 cell">
                    <div class="fpl-player-block" data-player-id="${player.id}" data-open="modal-player">
                        <div class="fpl-player-thumbmail">
                        <div class="image-block">
                            <img src="${player.image}" class="img-responsive"
                            draggable="false">
                        </div>
                        </div>
                        <img src="${_.find(data.team, {'id': player.team_id}).logo}" class="fpl-player-team-logo" />
                        <div class="fpl-player-overlay"></div>
                        ${typeof player.is_captain !== 'undefined' ? `<div class="fpl-player-point"><i class="fi-star"></i> Đội trưởng</div>` : `<div class="fpl-player-point">Point : ${player.point} </div>`}
                        <div class="fpl-player-position">${player.position}</div> 
                        ${player.position2 != null ? `<div class="fpl-player-position-2">${player.position2}</div>` : ``}
                        <div class="fpl-player-content">
                            <div class="fpl-player-info">
                                <h3 class="fpl-player-name">
                                    <a href="#">${player.name}</a>
                                </h3>
                              
                            </div>
                        </div>
                    </div>
                </div>`;
                })


                return viewPlayer;
                break;
            case 'List Player Current':
                let playerListCurrentView = '';
                let playerListCurrent = JSON.parse(localStorage.playerListCurrent)
                let playerListShow = [];
                switch (filterAthele) {
                    case'all':
                        playerListShow = JSON.parse(localStorage.playerListCurrent)
                        break;
                    case'SF':
                        playerListShow = _.merge(_.filter(playerListCurrent, {'position': 'SF'}), _.filter(playerListCurrent, {'position2': 'SF'}));
                        break;
                    case'SG':
                        playerListShow = _.merge(_.filter(playerListCurrent, {'position': 'SG'}), _.filter(playerListCurrent, {'position2': 'SG'}));
                        break;
                    case'PF':
                        playerListShow = _.merge(_.filter(playerListCurrent, {'position': 'PF'}), _.filter(playerListCurrent, {'position2': 'PF'}));
                        break;
                    case'C':
                        playerListShow = _.merge(_.filter(playerListCurrent, {'position': 'C'}), _.filter(playerListCurrent, {'position2': 'C'}));
                        break;
                    case'PG':
                        playerListShow = _.merge(_.filter(playerListCurrent, {'position': 'PG'}), _.filter(playerListCurrent, {'position2': 'PG'}));
                        break;
                    default:
                        break;
                }
                playerListShow.forEach(player => {
                    if (typeof player.is_captain == 'undefined') {
                        playerListCurrentView += `<div class="large-3 medium-4 small-12 cell">
                        <div class="fpl-player-block${action == 'add' ? ' pick-player' : action == 'change' ? ' change-player' : ''}" data-player-id="${player.id}" >
                            <div class="fpl-player-thumbmail">
                            <div class="image-block">
                                <img src="${player.image}" class="img-responsive"
                                draggable="false">
                            </div>
                            </div>
                            <img src="${_.find(data.team, {'id': player.team_id}).logo}" class="fpl-player-team-logo" />
                            <div class="fpl-player-overlay"></div>
                            ${typeof player.is_captain !== 'undefined' ? `<div class="fpl-player-point"><i class="fi-star"></i> Đội trưởng</div>` : `<div class="fpl-player-point">Point : ${player.point} </div>`}
                            <div class="fpl-player-position">${player.position}</div>
                            ${player.position2 != null ? `<div class="fpl-player-position-2">${player.position2}</div>` : ``}
                            <div class="fpl-player-content">
                        
                                <div class="fpl-player-info">
                                    <h3 class="fpl-player-name">
                                        <a href="#">${player.name}</a>
                                    </h3>
                                
                                </div>
                            </div>
                        </div>
                    </div>`;
                    }
                })


                return playerListCurrentView;
                break;
            case 'List Player Pick':
                let viewPlayerPick = '';
                let thisTeamPick = JSON.parse(localStorage.thisTeam)
                viewPlayerPick += `<div class="large-12 medium-12 small-12 cell">
                    <h1><i class="fi-social-dribbble"></i> ${thisTeamPick.name}</h1>
             
                    <p class="fpl-total-points">Tổng số điểm : <span>${_.sumBy(thisTeamPick.listPlayer, function (player) {
                    return player.point;
                })} / ${(_.sumBy(data.player, function (player) {
                    return player.point;
                }) / 2) + 5}</span></p>
                </div>`
                thisTeamPick.listPlayer.forEach(player => {

                    viewPlayerPick += `<div class="large-2 medium-4 small-12 cell">
                    <div class="player-pick-block">
                    <div class="fpl-player-block " data-player-id="${player.id}" data-open="modal-player">
                        <div class="fpl-player-thumbmail">
       
                        <div class="image-block-pick">
                            <img src="${player.image}" class="img-responsive"
                            draggable="false">
                        </div>
                        </div>
                        <img src="${_.find(data.team, {'id': player.team_id}).logo}" class="fpl-player-team-logo" />
                        <div class="fpl-player-overlay"></div>
                        ${typeof player.is_captain !== 'undefined' ? `<div class="fpl-player-point"><i class="fi-star"></i> Đội trưởng</div>` : `<div class="fpl-player-point">Point : ${player.point} </div>`}
                
                        <div class="fpl-player-position">${player.position}</div>
                        ${player.position2 != null ? `<div class="fpl-player-position-2">${player.position2}</div>` : ``}
                        <div class="fpl-player-content">
                     
                            <div class="fpl-player-info">
                                <h3 class="fpl-player-name-pick">
                                    <a href="#">${player.name}</a>
                                </h3>
                             
                            </div>
                        </div>
                    </div>
                    ${typeof player.is_captain == 'undefined' ? `
                    <div class="fpl-player-push-back" data-player-id="${player.id}"><p class="text-center">Trả lại</p></div>
                    <div class="fpl-player-change" data-player-id="${player.id}" data-open="modal-player"><p class="text-center">Thay đổi</p></div>` : ``}
                    </div>
                </div>`;
                })

                viewPlayerPick += `<div class="large-2 medium-4 small-12 cell">
                    <div class="fpl-player-add" data-open="modal-player">
                                <span class="add-player-button">+</span>
                                <span class="add-player-text">Thêm thành viên</span>
                    </div>
                </div>`;


                return viewPlayerPick;
                break;

            case'List Logo Team':
                let viewLogoTeam = '';
                let firstTeam = '0'
                data.team.forEach(team => {
                    viewLogoTeam += `<img src="${team.logo}" class="fpl-club${JSON.parse(localStorage.thisTeam).id == team.id ? ' team-active' : ' '}" style="" data-id="${team.id}"/>`;
                })

                return viewLogoTeam;

                break;
            case'Draft Table':
                console.log(data.draft.length);
                let viewdraft = '';
                let viewplayer = '';
                let logodraft = '';
                data.draft.forEach(draftturn => {
                    let viewplayer = '';
                    let logodraft = '';
                    draftturn.forEach(player => {
                        logodraft = '';
                        data.team.forEach(team => {
                            if (team.id == player.team_id) {
                                logodraft = team.logo;
                            }

                        })
                        if (player.team_id == '0') {
                            logodraft = './src/library/images/unknow.jpg';
                        }
                        viewplayer += `
                        <div class="fpl-draft-player-add" data-open="modal-player">
                                                <img class="fpl-draft-logo-team" src="${logodraft}" />
                                                <div class="fpl-draft-player-name">${player.name}</div>
                                            </div>
                        `
                    });

                    viewdraft += `      
                    <div class="large-2 medium-2 small-5 cell">
                        ${viewplayer}
                    </div>`;
                })

                return viewdraft;

                break;
            default:
                return console.log('Im transporter, i dont know what is comming :(')
        }
    },

};
data = {
    player: [
        {
            "id": "2",
            "name": "Nguyễn Minh Hiếu",
            "point": 10,
            "image": "./src/library/images/p1.jpg",
            "notes": "Học lực Khá ",
            "position": "PF",
            "position2": "SF",
            "age": "18",
            "height": "1m65",
            "team_id": "3"
        }
        ,
        {
            "id": "3",
            "name": "Nguyễn Tiến Đạt",
            "point": 10,
            "image": "./src/library/images/p5.jpg",
            "notes": "Mình không định lấy đâu ahihi",
            "position": "PG",
            "position2": "SF",
            "age": "24",
            "height": "1m60",
            "team_id": "3"
        },


    ],
    team: [
        {
            id: "1",
            name: 'TTS',
            logo: './src/library/images/p4.jpg',
            info: 'Team Hà Thạch Sơn',
            listPlayer: [
                {
                    "id": "0",
                    "name": "Hà Thạch Sơn",
                    "point": 0,
                    "captain_team": 1,
                    "is_captain": true,
                    "image": "./src/library/images/p4.jpg",
                    "notes": "“Ăn gì lấy nốt ra đây cho a thanh toán”",
                    "position": "PF",
                    "position2": "SF",
                    "age": "23",
                    "height": "1m72",
                    "team_id": "1"
                }
            ]
        },
        {
            id: "2",
            name: 'TNC',
            logo: './src/library/images/p3.jpg',
            info: 'Team NamCon',
            listPlayer: [
                {
                    "id": "1",
                    "name": "Nam Con",
                    "point": 0,
                    "captain_team": 2,
                    "is_captain": true,
                    "image": "./src/library/images/p3.jpg",
                    "notes": "Mình không định lấy đâu ahihi",
                    "position": "SG",
                    "position2": null,
                    "age": "21",
                    "height": "1m73",
                    "team_id": "2"
                }
            ]
        },
        {
            id: "3",
            name: 'FPL',
            logo: './src/library/images/logo.png',
            info: 'FPL',
            listPlayer: [

            ]
        },
    ],
    draft: [
        [
            {
                "id": "10",
                "name": "Nguyễn Thị Hóng Hớt",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "1"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },

        ],
        [
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },

        ],
        [
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },

        ],
        [
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "2"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },

        ],
        [
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },
            {
                "id": "10",
                "name": "Nguyễn Thị Hồng Hào",
                "point": 0,
                "captain_team": 2,
                "is_captain": true,
                "image": "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/98574651_2922460661177500_6917419974126469120_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=jRZkmD8sG4AAX-xka79&_nc_ht=scontent.fhan2-3.fna&oh=87051f3e8cbf6e309db1ab8e27a7270a&oe=5F7BF48D",
                "notes": "Đã từng tham gia Giải hs thpt , giải svien , giải trẻ clb 2016 , HBL 2016,HBL 2017 , giải các clb hà nội 2016",
                "position": "SG",
                "position2": null,
                "age": "21",
                "height": "1m73",
                "team_id": "0"
            },

        ],


    ],


    something: 'none'

}

function car(className) {
    Array.from(document.getElementsByClassName(className)).forEach(function (element) {
        element.addEventListener('click', function () {
            transporter.goTo(element.getAttribute('data-page'))
            car("menu-item")
        });
    });
}

function refreshLocalStorage(name, data) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(name, JSON.stringify(data));
    } else {
        alert('Trình duyệt không hỗ trợ chức năng này')
    }
}

function resetData() {
    localStorage.clear();
    transporter.goTo('home');
    localStorage.playerListCurrent = JSON.stringify(data.player);
    localStorage.teamListCurrent = JSON.stringify(data.team);
    car("menu-item")
}

document.addEventListener("DOMContentLoaded", function (event) {
    if (typeof (Storage) !== "undefined") {
        if (!localStorage.currentPage) {
            transporter.goTo('home')
        } else {
            transporter.goTo(localStorage.currentPage)
        }
        if (!localStorage.playerListCurrent) {
            localStorage.playerListCurrent = JSON.stringify(data.player);
        }
        if (!localStorage.teamListCurrent) {
            localStorage.teamListCurrent = JSON.stringify(data.team);
        }
    } else {
        alert('Trình duyệt không được hỗ trợ')
    }

    car("menu-item")
});
// window.onload = function () {

// }






