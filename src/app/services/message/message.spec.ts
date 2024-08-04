import { MessageService } from "./message.service";

describe("message service:",()=>{  
  let messageService:MessageService
  beforeEach(()=>{
    messageService= new MessageService()
  })
  it('should add msg correctly', () => {
    messageService.add("hello 1")
    expect(messageService.messages).toHaveSize(1)
    expect(messageService.messages[0].message).toBe("hello 1")

  });
  it("should clear all msgs correctly",()=>{
    messageService.add("hello 1")
    messageService.add("hello 2")

    messageService.clear()

    expect(messageService.messages).toHaveSize(0)
  })
})