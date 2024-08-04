import { StrengthPipe } from "./strength.pipe";

describe("strength pipe:", () => { 
  let pipe:StrengthPipe
  beforeEach(()=>{
    pipe= new StrengthPipe()
  })   
  it('should return "3 (weak)" when passing 3', () => {
   expect( pipe.transform(3)).toBe("3 (weak)")
  });
  it("should return '12 (strong)' when passing 12",()=>{
    expect(pipe.transform(12)).toContain("strong")
  })
})