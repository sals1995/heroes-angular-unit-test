import { StrengthPipe } from "./strength.pipe";

describe("strength pipe:", () => {
    it('expect to return string contains weak when passing 5', () => {
      let pipe= new StrengthPipe()
      expect(pipe.transform(5)).toContain("weak")
    });
    it('expect to return string contains strong when passing 15', () => {
      let pipe= new StrengthPipe()
      expect(pipe.transform(15)).toContain("strong")
    });
})