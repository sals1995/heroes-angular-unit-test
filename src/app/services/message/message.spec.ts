import { MessageService } from "./message.service"


fdescribe("message service:",()=>{
    let messageService: MessageService
    beforeEach(()=>{
         messageService= new MessageService()
    })
    it("expect msg[] to be empty",()=>{
       
       expect(messageService.messages.length).toBe(0)
    })
    it("expect add() to add new msg to msg[]",()=>{
        messageService.add("new msg")

        expect(messageService.messages.length).toBe(1)
    })
    it("expect msg[] to be empty after clear()",()=>{
        messageService.add("new msg 1")
        messageService.add("new msg 2")

        messageService.clear()
        expect(messageService.messages.length).toBe(0)
    })
})