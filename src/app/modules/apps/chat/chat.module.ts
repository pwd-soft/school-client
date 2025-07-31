import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import {
  CardsModule, ChatInnerModule, DropdownMenusModule
} from '../../../_metronic/partials';
import { ChatComponent } from '../chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { DrawerChatComponent } from './drawer-chat/drawer-chat.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';

@NgModule({
  declarations: [
    ChatComponent,
    PrivateChatComponent,
    GroupChatComponent,
    DrawerChatComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    DropdownMenusModule,
    ChatInnerModule,
    CardsModule,
    InlineSVGModule,
  ],
})
export class ChatModule {}
