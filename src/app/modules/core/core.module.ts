import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// public Global service
import { GlobalAppService } from '@services/global-app.service';
import { CustomMaterialModule } from '@modules/custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
  ],
  providers: [GlobalAppService]
})
export class CoreModule  {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
 }
