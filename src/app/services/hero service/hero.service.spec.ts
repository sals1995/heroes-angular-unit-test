import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
import { MessageService } from "../message/message.service";
import { HeroService } from "./hero.service";
import { provideHttpClient } from "@angular/common/http";

describe("hero service:", () => {
  let spy,messageServiceMock:jasmine.SpyObj<MessageService>, service: HeroService, httpTesting: HttpTestingController
  let heroesUrl = 'http://localhost:3000/heroes'
  beforeEach(() => {
    spy = jasmine.createSpyObj(["add"])

    TestBed.configureTestingModule({
      //1
      providers: [
        HeroService,
        // ... other test providers//
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MessageService, useValue: spy }
      ],
    });
    //2
    service = TestBed.inject(HeroService)
    messageServiceMock= TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>
    httpTesting = TestBed.inject(HttpTestingController);
    //3
  })
  it('getHero function', () => {
    service.getHero(1).subscribe({next:(data)=>{
      expect(data.name).toContain("spider")
    }})

    let reqTest = httpTesting.expectOne(heroesUrl + "/1")
    expect(reqTest.request.method).toBe("GET")


    reqTest.flush({id:1,name :"spider man",strength:10})
    expect(messageServiceMock.add).toHaveBeenCalled()
  });
  it("addHero",()=>{
    service.addHero({id:200,name:"Abo obida",strength:1000}).subscribe({next:data=>{
      expect(data.strength).toBe(1000)
    }})
    
    let req= httpTesting.expectOne(heroesUrl)
    expect(req.request.method).toBe("POST")
    
    req.flush({id:200,name:"Abo obida",strength:1000})
    expect(messageServiceMock.add).toHaveBeenCalled()
  })
})


