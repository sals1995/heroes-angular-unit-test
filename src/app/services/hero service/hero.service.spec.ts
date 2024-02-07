import { TestBed } from "@angular/core/testing";
import{HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from"@angular/common/http/testing"
import { MessageService } from "../message/message.service";
import { HeroService } from "./hero.service";

describe("hero service:", () => {
    let mockMessageService,service:HeroService,httpTesting:HttpTestingController,URL = 'http://localhost:3000/heroes'
    beforeEach(()=>{
        mockMessageService= jasmine.createSpyObj(["add"])
        TestBed.configureTestingModule({
            //1
            imports:[HttpClientTestingModule],
            //2
            providers: [
              // ... other test providers
              provideHttpClientTesting(),
              {provide:MessageService,useValue:mockMessageService}
            ],
          });
          //3
           httpTesting = TestBed.inject(HttpTestingController);
           //4
         service= TestBed.inject(HeroService)
    })
    it('expect getHero to send req correctly then receive res correctly', () => {
        service.getHero(2).subscribe({next:data=>{
            expect(data.name).toBe("superman")
        }})

       let req= httpTesting.expectOne(URL+"/2")
       expect(req.request.method).toBe("GET")

       req.flush({id:2,name:"superman",strength:10})
    });
    it("expect addHero to send req correctly then receive res correctly",()=>{
        let hero={id:100,name:"Mena",strength:100}
        service.addHero(hero).subscribe({next:h=>{
            expect(h).toEqual(hero)
        }})

       let reqTest= httpTesting.expectOne(URL)
       expect(reqTest.request.method).toBe("POST")

       reqTest.flush(hero)
    })
})


