import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { Hero } from '../../hero';


@Component({
  selector: 'app-messages-lab',
  templateUrl: './messages.lab.component.html',
  styleUrls: ['./messages.lab.component.css']
})
export class MessagesComponentForLab implements OnInit {
  
  /**@param messageService: has a message string array*/
  
  constructor(public messageService: MessageService) {}


  messages: {id:number,message:string}[] = [];

  ngOnInit()
  {
    this.messages = this.messageService.messages

  }

  addMessage(message: string) {
    const newMessage = { id: this.messages.length + 1, message };
    this.messages.push(newMessage);
    this.messageService.add(message);
  }


}
