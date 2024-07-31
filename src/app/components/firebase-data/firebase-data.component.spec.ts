import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseDataComponent } from './firebase-data.component';

describe('FirebaseDataComponent', () => {
  let component: FirebaseDataComponent;
  let fixture: ComponentFixture<FirebaseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirebaseDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirebaseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
