import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ChatInnerComponent } from './chat-inner.component';

@NgModule({
  declarations: [ChatInnerComponent],
  imports: [CommonModule, InlineSVGModule],
  exports: [ChatInnerComponent],
})
export class ChatInnerModule {}
