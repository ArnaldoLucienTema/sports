'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">Players Net documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-fe75f874b83c12c217de50a19757f838"' : 'data-target="#xs-components-links-module-AppModule-fe75f874b83c12c217de50a19757f838"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-fe75f874b83c12c217de50a19757f838"' : 'id="xs-components-links-module-AppModule-fe75f874b83c12c217de50a19757f838"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompetitionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompetitionComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CreateAccountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateAccountComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EditUserInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditUserInfoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FilterUserInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterUserInfoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MatchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatchComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RecommendationModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecommendationModalComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TeamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TeamMediaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamMediaComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TeamPlayerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamPlayerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TeamPlayerEvaluationModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamPlayerEvaluationModalComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TeamProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamProfileComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TeamRosterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamRosterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TeamStatsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamStatsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TryoutModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TryoutModalComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UserInfoProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserInfoProfileComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/User_infoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">User_infoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/User_infoMediaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">User_infoMediaComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/User_infoStatsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">User_infoStatsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-fe75f874b83c12c217de50a19757f838"' : 'data-target="#xs-injectables-links-module-AppModule-fe75f874b83c12c217de50a19757f838"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-fe75f874b83c12c217de50a19757f838"' : 'id="xs-injectables-links-module-AppModule-fe75f874b83c12c217de50a19757f838"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenericUserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>GenericUserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MatchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MatchService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeamService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TeamService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserInfoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UserInfoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UserService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/Achievement.html" data-type="entity-link">Achievement</a>
                    </li>
                    <li class="link">
                        <a href="classes/CompetitionSeason.html" data-type="entity-link">CompetitionSeason</a>
                    </li>
                    <li class="link">
                        <a href="classes/CompetitionViewModel.html" data-type="entity-link">CompetitionViewModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/Country.html" data-type="entity-link">Country</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExternalIds.html" data-type="entity-link">ExternalIds</a>
                    </li>
                    <li class="link">
                        <a href="classes/FilterSearch.html" data-type="entity-link">FilterSearch</a>
                    </li>
                    <li class="link">
                        <a href="classes/MatchViewModel.html" data-type="entity-link">MatchViewModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/Media.html" data-type="entity-link">Media</a>
                    </li>
                    <li class="link">
                        <a href="classes/ParentErrorStateMatcher.html" data-type="entity-link">ParentErrorStateMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/PasswordValidator.html" data-type="entity-link">PasswordValidator</a>
                    </li>
                    <li class="link">
                        <a href="classes/PlayerMatch.html" data-type="entity-link">PlayerMatch</a>
                    </li>
                    <li class="link">
                        <a href="classes/Recommendation.html" data-type="entity-link">Recommendation</a>
                    </li>
                    <li class="link">
                        <a href="classes/SearchEntityViewmodel.html" data-type="entity-link">SearchEntityViewmodel</a>
                    </li>
                    <li class="link">
                        <a href="classes/SkillSet.html" data-type="entity-link">SkillSet</a>
                    </li>
                    <li class="link">
                        <a href="classes/TeamAdditionalInfo.html" data-type="entity-link">TeamAdditionalInfo</a>
                    </li>
                    <li class="link">
                        <a href="classes/TeamMatch.html" data-type="entity-link">TeamMatch</a>
                    </li>
                    <li class="link">
                        <a href="classes/TeamPlayer.html" data-type="entity-link">TeamPlayer</a>
                    </li>
                    <li class="link">
                        <a href="classes/TeamSeason.html" data-type="entity-link">TeamSeason</a>
                    </li>
                    <li class="link">
                        <a href="classes/TeamViewModel.html" data-type="entity-link">TeamViewModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/TryOut.html" data-type="entity-link">TryOut</a>
                    </li>
                    <li class="link">
                        <a href="classes/User.html" data-type="entity-link">User</a>
                    </li>
                    <li class="link">
                        <a href="classes/UserInfoSearch.html" data-type="entity-link">UserInfoSearch</a>
                    </li>
                    <li class="link">
                        <a href="classes/UserInfoSeason.html" data-type="entity-link">UserInfoSeason</a>
                    </li>
                    <li class="link">
                        <a href="classes/UserInfoViewModel.html" data-type="entity-link">UserInfoViewModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/UsernameValidator.html" data-type="entity-link">UsernameValidator</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/PlayerService.html" data-type="entity-link">PlayerService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                </li>
                <li class="link">
                    <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
