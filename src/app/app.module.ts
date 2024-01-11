import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiComponent } from './components/ui/ui.component';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatComponent } from './components/chat/chat.component';
import { CdkDrag, CdkDropList, CdkDropListGroup, } from '@angular/cdk/drag-drop';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ColorPanelComponent } from './components/color-panel/color-panel.component';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { HotToastModule } from '@ngneat/hot-toast';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ProfileComponent } from './components/profile/profile.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    SidenavComponent,
    DashboardComponent,
    ChatComponent,
    DashboardItemComponent,
    CommentItemComponent,
    DialogComponent,
    DialogBodyComponent,
    ColorPanelComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    EditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    HotToastModule.forRoot(),
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
