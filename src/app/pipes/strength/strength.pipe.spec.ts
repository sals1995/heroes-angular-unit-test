import { StrengthPipe } from "./strength.pipe";

fdescribe("strength pipe:", () => { 
  let pipe:StrengthPipe
  beforeEach(()=>{
    pipe= new StrengthPipe()
  })
  it('expect to return weak when passing 8', () => {
    expect( pipe.transform(8) ).toBe("8 (weak)")
  });
  it('expect to return strong when passing 15', () => {
    
    expect( pipe.transform(15) ).toContain("strong")
  });
})