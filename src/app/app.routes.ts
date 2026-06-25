import { Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { TemplateComponent } from './template/template.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';

export const routes: Routes = [
   {
      path: '',
      pathMatch: 'full',
      redirectTo: 'member',
   },
   {
        path: '',
        component: MemberComponent
   },
   {
       path: 'Create',
       component: MemberFormComponent
   },
   {
      path: 'edit/:id',
      component: MemberFormComponent
   },
   {
      path: 'template',
      component: TemplateComponent
   },
    { path: 'dashboard', component: DashboardComponent },
  { path: 'member', component: MemberComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'events', component: EventsComponent },
   {
    path: '**',
    component: MemberComponent
   }
];
