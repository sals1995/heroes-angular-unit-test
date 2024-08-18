import { MessageService } from "./message.service";

fdescribe("message service:",()=>{ 
  let messageService:MessageService
  beforeEach(()=>{
    messageService= new MessageService()
  })
  it('expect to add new msg', () => {
    messageService.add("msg 1")

    expect(messageService.messages).toHaveSize(1)
  });
  it("expect to clear msgs",()=>{
    messageService.add("msg..")
    messageService.add("msg..")
    messageService.add("msg..")
    
    messageService.clear()
    
    expect(messageService.messages).toHaveSize(0)
  })
})