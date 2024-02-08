import { StrengthPipe } from "./strength.pipe";

describe("strength pipe:", () => {
  let pipe:StrengthPipe;
  beforeEach(()=>{
     pipe= new StrengthPipe()
  })
  it('expect transform to return "6 (weak)" when passing 6', () => {
    
    expect(pipe.transform(6)).toBe("6 (weak)")
  });
  it('expect transform to return string contains "strong" when passing 12', () => {
    
    expect(pipe.transform(12)).toContain("strong")
  });
})