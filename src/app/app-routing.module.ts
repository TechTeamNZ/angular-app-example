import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/services';
import { MainComponent } from 'app/layouts/main/main.component';
import { LoginComponent } from 'app/containers/login/login.component';
import { NotFoundComponent } from 'app/containers/not-found/not-found.component';
import { OrderComponent } from 'app/containers/order/order.component';
import { OverviewComponent } from 'app/containers/overview/overview.component';
import { UserComponent } from 'app/containers/user/user.component';
import { environment } from 'environments/environment';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: 'order',
        component: OrderComponent,
        data: {
          title: 'Orders',
        }
      },
      {
        path: 'overview',
        component: OverviewComponent,
        data: {
          title: 'Overview',
        }
      },
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'Users',
        }
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Page not found (404)'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: !environment.production })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }