import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';

import { HomeComponent } from './home';
import { AddEditVoComponent } from './home/add-edit-vo/add-edit-vo.component';
import { UploadReferenceComponent } from './upload-reference/upload-reference.component';
import { EachesComponent } from './eaches/eaches.component';
import { SideBarComponent } from './share/side-bar/side-bar.component';
import { NavBarComponent } from './share/nav-bar/nav-bar.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AddEditVoComponent,
        UploadReferenceComponent,
        EachesComponent,
        SideBarComponent,
        NavBarComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };