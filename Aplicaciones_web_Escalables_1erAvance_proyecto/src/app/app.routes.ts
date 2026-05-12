import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign-up/sign-up';
import { Profile } from './pages/profile/profile';
import { ProfileManagement } from './pages/profile-management/profile-management';
import { GamesList } from './pages/games-list/games-list';
import { GameDetail } from './pages/game-detail/game-detail';
import { AddGame } from './pages/add-agame/add-agame';

export const routes: Routes = [
    { path: 'home', component: HomePage},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'sign-up', component: SignUp },
    { path: 'profile', component: Profile },
    { path: 'profile-management', component: ProfileManagement },
    { path: 'games', component: GamesList },
    { path: 'game/:id', component: GameDetail },
    { path: 'add-game', component: AddGame }
];
