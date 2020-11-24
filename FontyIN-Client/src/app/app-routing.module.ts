import { DialogAddProfileComponent } from './profile/dialog-add-profile/dialog-add-profile.component';
import { SelectedMessageComponent } from './messages/selected-message/selected-message.component';
import { MessagesComponent } from './messages/messages.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConnectionComponent } from './connection/connection.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';

import {PostComponent} from './post/post.component';
import {UpdatePostComponent} from './update-post/update-post.component';
import {PostDetailsComponent} from './post-details/post-details.component'


import {UserSettingsComponent} from './user-settings/user-settings.component';
import { FilterUsersComponent } from './filter-users/filter-users.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from  './auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: LoginComponent
},
{
  path: 'profile',
  component: UserComponent,
  canActivate: [ AuthGuard ]
},
{
  path: 'users/:id/profiles/:profileId', 
  component: ProfileComponent,
  canActivate: [ AuthGuard ]
},{
  path: 'posts', 
  component: NewsfeedComponent,
  canActivate: [ AuthGuard ]
},
{
  path: 'update-post/:id',
  component: UpdatePostComponent,
  canActivate: [ AuthGuard ]
},
{
  path: 'post/:id',
  component: PostDetailsComponent,
  canActivate: [ AuthGuard ]
},
  {
    path: 'users/:id/connections',
    component: ConnectionComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'users/:id/messages',
    component: HomeComponent,
    canActivate: [ AuthGuard ] // MessageComponent
},
{
  path: 'settings',
  component: UserSettingsComponent,
  canActivate: [ AuthGuard ]
},
{
  path: 'users/filter',
  component: FilterUsersComponent,
  canActivate: [ AuthGuard ]
},
{
  path:'register', 
  component: RegistrationComponent
},
{
  path: 'messages',
  component: MessagesComponent,
    children: [
        {
            path: ':conversationId',
            component: SelectedMessageComponent,
            canActivate: [ AuthGuard ]
        }
    ],
    canActivate: [ AuthGuard ]

},
{
  path: 'addProfile',
  component: DialogAddProfileComponent,
  canActivate: [ AuthGuard ]
},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
