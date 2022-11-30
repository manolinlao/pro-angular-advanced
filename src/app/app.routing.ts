import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './core/components/form/form.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { TableComponent } from './core/components/table/table.component';
import { ProductCountComponent } from './core/components/product-count/product-count.component';
import { CategoryCountComponent } from './core/components/category-count/category-count.component';

const childRoutes: Routes = [
  { path: 'products', component: ProductCountComponent },
  { path: 'categories', component: CategoryCountComponent },
  { path: '', component: ProductCountComponent },
];

const routes: Routes = [
  { path: 'form/:mode/:id', component: FormComponent },
  { path: 'form/:mode', component: FormComponent },
  { path: 'does', redirectTo: '/form/create', pathMatch: 'prefix' },
  { path: 'table', component: TableComponent, children: childRoutes },
  { path: 'table/:category', component: TableComponent, children: childRoutes },
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
