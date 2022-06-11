import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditmyaccountPage } from './editmyaccount.page';

const routes: Routes = [
  {
    path: '',
    component: EditmyaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditmyaccountPageRoutingModule {}
