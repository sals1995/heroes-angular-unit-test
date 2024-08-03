import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
import { MessageService } from "../message/message.service";
import { HeroService } from "./hero.service";
import { provideHttpClient } from "@angular/common/http";
import { appConfig } from "../../app.config";

describe("hero service:", () => {
  let messageServiceMock, service: HeroService, httpTesting: HttpTestingController
  let heroesUrl = 'http://localhost:3000/heroes'
  beforeEach(() => {
    messageServiceMock = jasmine.createSpyObj(["add"])

    TestBed.configureTestingModule(Object.assign({}, appConfig, {
      //1
      providers: [
        // ... other test providers//
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MessageService, useValue: messageServiceMock }
      ],
    }));
    //2
    httpTesting = TestBed.inject(HttpTestingController);
    //3
    service = TestBed.inject(HeroService)
  })
  it('getHero function', () => {
    service.getHero(1).subscribe({next:(data)=>{
      expect(data.name).toContain("spider")
    }})

    let reqTest = httpTesting.expectOne(heroesUrl + "/1")
    expect(reqTest.request.method).toBe("GET")


    reqTest.flush({id:1,name :"spider man",strength:10})
  });
  it("addHero",()=>{
    service.addHero({id:200,name:"Abo obida",strength:1000}).subscribe({next:data=>{
      expect(data.strength).toBe(1000)
    }})

   let req= httpTesting.expectOne(heroesUrl)
    expect(req.request.method).toBe("POST")

    req.flush({id:200,name:"Abo obida",strength:1000})
  })
})


