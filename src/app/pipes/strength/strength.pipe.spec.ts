import { StrengthPipe } from "./strength.pipe"


fdescribe("strength pipe:", () => {//group spec
    let pipe: StrengthPipe
    beforeEach(()=>{
         pipe= new StrengthPipe()
    })
    it("expect to return '8 (weak)' when passing 8",()=>{//spec ==> test case
      
        expect( pipe.transform(8) ).toBe('8 (weak)')
    })
    it("expect to return '15 (strong)' when passing 15",()=>{
        expect(pipe.transform(15)).toContain("strong")
    })
})