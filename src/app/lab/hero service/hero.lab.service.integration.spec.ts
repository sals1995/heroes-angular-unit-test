// describe("3-hero service (http) integration testing:", () => {
    
//     it("getHeroes function: send request and receive response successfully", () => { })
//     it("updateHero function: send request and receive response successfully", () => { })
// })


import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HeroServiceForLab } from "./hero.lab.service";
import { Hero } from "../../hero";

    

describe("3-hero service (http) unit testing:", () => {
    let htttpController: HttpTestingController; 
    let heroService: HeroServiceForLab;
    let httpUrl = "http://localhost:3000/heroes";
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
          ],
        });
         htttpController = TestBed.inject(HttpTestingController);
        heroService = TestBed.inject(HeroServiceForLab);
    });
    it("getHeroes: should send GET request and return heroes", () => {
        heroService.getHeroes().subscribe(data => {
            expect(data.length).toBe(2);    });
        let req = htttpController.expectOne(httpUrl);
        expect(req.request.method).toBe("GET");
        req.flush([{ id: 1, name: "Hero1" }, { id: 2, name: "Hero2" }]);
        
    });
   it("updateHero function: send request and receive response successfully", () => {
  const updatedHero: Hero = { id: 1, name: "Hero1", strength: 100 };

  heroService.updateHero(updatedHero).subscribe(response => {
    expect(response).toEqual(updatedHero);
  });

  const req = htttpController.expectOne(httpUrl);
  expect(req.request.method).toBe("PUT");
  expect(req.request.body).toEqual(updatedHero);

  req.flush(updatedHero); 

    })

    afterEach(()=>{
        htttpController.verify();
    })
});
