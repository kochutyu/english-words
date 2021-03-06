import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 1. firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { RegistrationFormComponent } from './components/modal/registration-form/registration-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';
import { LearnNewWordsComponent } from './pages/learn-new-words/learn-new-words.component';
import { RepeatWordsComponent } from './pages/repeat-words/repeat-words.component';
import { NotLearnedWordsComponent } from './pages/not-learned-words/not-learned-words.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloader.config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    RegistrationFormComponent,
    NavbarComponent,
    HomeComponent,
    CardComponent,
    DropDownMenuComponent,
    LearnNewWordsComponent,
    RepeatWordsComponent,
    NotLearnedWordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // 3. Initialize
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

