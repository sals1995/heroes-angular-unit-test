import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "../message/message.service";

describe("hero service:", () => {
  let httpTesting:HttpTestingController,service:HeroService,messageServiceSpy:jasmine.SpyObj<MessageService>;
  let heroesUrl = 'http://localhost:3000/heroes'; 

    beforeEach(()=>{
      messageServiceSpy=jasmine.createSpyObj(["add"])
      // 1
      TestBed.configureTestingModule({
        providers: [
          HeroService,
          // ... other test providers
          provideHttpClient(),
          provideHttpClientTesting(),
          {provide:MessageService,useValue:messageServiceSpy}//
        ],
      });
       httpTesting = TestBed.inject(HttpTestingController);
       service= TestBed.inject(HeroService)
    })
  it('getHero() should send request correctly then put res in observable', () => {
      service.getHero(12).subscribe({next:(data)=>{
        expect(data.name).toBe("spider man")
        expect(messageServiceSpy.add).toHaveBeenCalled()
      }})


     let testReq= httpTesting.expectOne(heroesUrl+"/"+12)
     expect(testReq.request.method).toBe("GET")
     testReq.flush({id:12,name:"spider man"})

     
  });
  it("addHero() should send req correctly then put res in observable",()=>{
    service.addHero({id:13,name:"front students",strength:30}).subscribe({next:(data)=>{
      expect(data.id).toBe(13)
    }})

   let testReq= httpTesting.expectOne(heroesUrl)
   expect(testReq.request.method).toBe("POST")
   expect(testReq.request.body.id).toBe(13)
    
   testReq.flush({id:13,name:"front students",strength:30})
  })
  afterEach(()=>{
    httpTesting.verify()
  })
})


