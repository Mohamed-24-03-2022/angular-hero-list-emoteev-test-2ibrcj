import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { reducer } from './hero/hero.reducer';
import { heroFeature, initialState } from './hero/hero.state';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DisplayHeroComponent } from './components/display-hero/display-hero.component';

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(heroFeature, reducer, { initialState }),
  ],
  declarations: [AppComponent, DisplayHeroComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
