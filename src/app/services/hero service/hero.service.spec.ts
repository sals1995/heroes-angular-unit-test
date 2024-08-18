import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "../message/message.service";


fdescribe("hero service:", () => {
  let service:HeroService,httpTesting:HttpTestingController,messageServiceMock:jasmine.SpyObj<MessageService>
  const heroesUrl = 'http://localhost:3000/heroes'; 

  beforeEach(()=>{
    messageServiceMock=jasmine.createSpyObj(["add"])
    TestBed.configureTestingModule({
      providers: [
        // ... other test providers
        provideHttpClient(),
        provideHttpClientTesting(),
        HeroService,
        { provide:MessageService,useValue:messageServiceMock }
      ],
    });
     httpTesting = TestBed.inject(HttpTestingController);
    service=TestBed.inject(HeroService)
  })
  it('getHero', () => {
    service.getHero(12).subscribe({next:(data)=>{
      expect(data.name).toBe("bat man")
      
    }})

   let testReq= httpTesting.expectOne(heroesUrl+"/12")
   expect(testReq.request.method).toBe("GET")

   testReq.flush({id:12,name:"bat man",strength:20})
  });
})


