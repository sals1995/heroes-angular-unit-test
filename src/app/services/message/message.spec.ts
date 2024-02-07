import { MessageService } from "./message.service"


describe("message service:",()=>{
  let messageService: MessageService
  beforeEach(()=>{
     messageService= new MessageService()
  })
    it('expect messages[] to be empty', () => {
      
      expect(messageService.messages).toHaveSize(0)
    });
    it("expect messages[] to contain a msg after adding it",()=>{
      messageService.add("testing ....")
      expect(messageService.messages[0].message).toBe("testing ....")
    })
    it("expect messages[] to be empty after adding a msg then clear()",()=>{
      messageService.add("testing ....")
      messageService.clear()
      expect(messageService.messages).toHaveSize(0)
    })
    
})