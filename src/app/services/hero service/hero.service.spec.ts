import { TestBed } from "@angular/core/testing"
import { MessageService } from "../message/message.service"
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroService } from "./hero.service";


fdescribe("hero service:", () => {
    let mockMessageService:jasmine.SpyObj<MessageService>,service:HeroService,httpController:HttpTestingController
    ,heroesUrl = 'http://localhost:3000/heroes'
    beforeEach(()=>{
        mockMessageService= jasmine.createSpyObj(['add'])

        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[provideHttpClientTesting(),
                {provide:MessageService,useValue:mockMessageService}
            ]
        })

      service=  TestBed.inject(HeroService)
      httpController= TestBed.inject(HttpTestingController)

    })
    it("getHero",()=>{
        service.getHero(2).subscribe({next:(data)=>{
            expect(data.name).toBe("super man")
        }})

       let req= httpController.expectOne(heroesUrl+"/2")
       expect(req.request.method).toBe("GET")

       req.flush({id:2,name:"super man",strength:10})

      
    })
    it("addHero",()=>{
        let heroToAdd={id:20,name:"bat man",strength:14}
        service.addHero(heroToAdd).subscribe({next:(data)=>{
            expect(data.name).toBe(heroToAdd.name)
        }})

       let req= httpController.expectOne(heroesUrl)
       expect(req.request.method).toBe("POST")

       req.flush(heroToAdd)
    })
    afterEach(()=>{
        httpController.verify()
    })
})