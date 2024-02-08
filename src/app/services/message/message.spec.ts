import { MessageService } from "./message.service";

describe("message service:",()=>{
  let messageService:MessageService
  beforeEach(()=>{
    messageService= new MessageService()
  })
  it('expect messages [] to be empty', () => {
    expect(messageService.messages).toEqual([])
  });
  it("expect to add a msg in messages[] after calling add()",()=>{
    messageService.add("msg 1")
    expect(messageService.messages).toHaveSize(1)
  })
  it("expect to clear messages[] after calling clear()",()=>{
    messageService.add("msg 1")
    messageService.add("msg 2")
    messageService.clear()
    expect(messageService.messages).toHaveSize(0)
  })
})