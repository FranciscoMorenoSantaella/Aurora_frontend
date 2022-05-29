import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeadercwithbackbuttonComponent } from './headercwithbackbutton.component';

describe('HeadercwithbackbuttonComponent', () => {
  let component: HeadercwithbackbuttonComponent;
  let fixture: ComponentFixture<HeadercwithbackbuttonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadercwithbackbuttonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadercwithbackbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
