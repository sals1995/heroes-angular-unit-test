import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "../message/message.service";


describe("hero service:", () => {
  it('dummy test', () => {
    expect(true).toBeTrue();
  });
})


