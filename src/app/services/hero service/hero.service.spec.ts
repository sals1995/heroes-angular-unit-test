import { TestBed } from "@angular/core/testing"
import { MessageService } from "../message/message.service"
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroService } from "./hero.service";


describe("hero service:", () => {
    it('dummy test', () => {
        expect(true).toBeTrue();
    });
})