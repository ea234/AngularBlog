import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ContactFormComponent } from './contact-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ContactFormComponent', () =>
{
  let component: ContactFormComponent;

  let fixture: ComponentFixture<ContactFormComponent>;

  let getNewTestbed = async ( value?: { contact_name?: string; contact_email?: string; contact_subject?: string; contact_text?: string; } ) =>
  {
    console.log( "TestContactFormComponent getNewTestbed" );

    await TestBed.configureTestingModule({

      declarations: [ ContactFormComponent ],

      schemas : [ NO_ERRORS_SCHEMA ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

    setFormValue( value );
  };

  function setFormValue( value?: { contact_name?: string; contact_email?: string; contact_subject?: string; contact_text?: string; })
  {
    if ( value )
    {
      const contact_form = component.myUserForm;

      if ( value.contact_name    !== undefined ) contact_form.get( 'contact_name'    )!.setValue( value.contact_name );

      if ( value.contact_email   !== undefined ) contact_form.get( 'contact_email'   )!.setValue( value.contact_email );

      if ( value.contact_subject !== undefined ) contact_form.get( 'contact_subject' )!.setValue( value.contact_subject );

      if ( value.contact_text    !== undefined ) contact_form.get( 'contact_text'    )!.setValue( value.contact_text );

      contact_form.markAsTouched();
    }
  }


  it( 'should create', async () =>
  {
    await getNewTestbed();

    expect( component ).toBeTruthy();

    expect( component.showContactForm()    ).toBeTrue();

    expect( component.showConfirmMessage() ).toBeFalse();
  });


  it( 'should be invalid when all fields are empty', async () =>
  {
    await getNewTestbed( { contact_name: '', contact_email: '', contact_subject: '', contact_text: '' } );

    expect( component.myUserForm.valid ).toBeFalse();

    const errors = Object.values( component.myUserForm.errors || {} );

    expect( component.myUserForm.get('contact_name')!.errors ).toBeTruthy();
  });


  it( 'should be valid when all fields are properly set', async () =>
  {
    let test_objekt = { contact_name:    'John Doe',
                        contact_email:   'john.doe@court.com',
                        contact_subject: 'Test to be made',
                        contact_text:    'This is my Testtext' };

    await getNewTestbed( test_objekt );

    expect( component.myUserForm.valid ).toBeTrue();


    expect( component.myUserForm.get( 'contact_name' )!.errors ).toBeFalsy();

    expect( component.myUserForm.get( 'contact_name' )!.value ).toBe( test_objekt.contact_name );


    expect( component.myUserForm.get( 'contact_email' )!.errors ).toBeFalsy();

    expect( component.myUserForm.get( 'contact_email' )!.value ).toBe( test_objekt.contact_email );


    expect( component.myUserForm.get( 'contact_subject' )!.errors ).toBeFalsy();

    expect( component.myUserForm.get( 'contact_subject' )!.value ).toBe( test_objekt.contact_subject );


    expect( component.myUserForm.get( 'contact_text' )!.errors ).toBeFalsy();

    expect( component.myUserForm.get( 'contact_text' )!.value ).toBe( test_objekt.contact_text );
  });


  it( 'should require contact_name (minLength 2)', async () =>
  {
    await getNewTestbed( { contact_name: 'A' } );

    const ctrl : AbstractControl | null = component.myUserForm.get( 'contact_name' )!;

    const ctrl2 : AbstractControl | null = component.contact_name;

    let knz_equals = ctrl === ctrl2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl.errors ) .toBeTruthy();

    expect( ctrl.errors?.[ 'required'  ] ).toBeFalsy();

    expect( ctrl.errors?.[ 'minlength' ] ).toBeTruthy();
  });


  it( 'should enforce maxLength for contact_name (250)', async () =>
  {
    const long_string : string = 'a'.repeat(251);

    await getNewTestbed({ contact_name: long_string });

    const ctrl = component.myUserForm.get( 'contact_name' )!;

    expect( ctrl.errors ).toBeTruthy();

    expect( ctrl.errors?.[ 'maxlength' ] ).toBeTruthy();
  });


  it( 'should not allow false eMail-Adress', async () =>
  {
    await getNewTestbed( { contact_email: 'not-an-email' } );

    let ctrl = component.myUserForm.get('contact_email')!;

    expect( ctrl.errors ).toBeTruthy();

    expect( ctrl.errors?.[ 'notAEmail'   ] ).toBeTruthy();
    expect( ctrl.errors?.[ 'validateMsg' ] ).toBeTruthy();

    setFormValue( { contact_email: 'test@example.com' } );

    expect( ctrl.errors ).toBeFalsy();

    expect( ctrl.errors?.[ 'notAEmail'   ] ).toBeFalsy();
    expect( ctrl.errors?.[ 'validateMsg' ] ).toBeFalsy();

    setFormValue( { contact_email: '.no.start@with.dot.com' } );

    expect( ctrl.errors ).toBeTruthy();

    expect( ctrl.errors?.[ 'notAEmail'   ] ).toBeTruthy();
    expect( ctrl.errors?.[ 'validateMsg' ] ).toBeTruthy();
  });


  it( 'should not allow valid eMail-Adress', async () =>
  {
    await getNewTestbed( { contact_email: 'test@example.com' } );

    let ctrl = component.myUserForm.get('contact_email')!;

    expect( ctrl.errors ).toBeFalsy();

    expect( ctrl.errors?.[ 'notAEmail'   ] ).toBeFalsy();
    expect( ctrl.errors?.[ 'validateMsg' ] ).toBeFalsy();
  });



  it( 'should require subject with minLength 5 and maxLength 150', async () =>
  {
    await getNewTestbed( { contact_subject: 'abcd' } );

    const ctrl = component.myUserForm.get( 'contact_subject' )!;

    expect( ctrl.errors ) .toBeTruthy();

    expect( ctrl.errors?.[ 'required'  ] ).toBeFalsy();

    expect( ctrl.errors?.[ 'minlength' ] ).toBeTruthy();
    expect( ctrl.errors?.[ 'maxlength' ] ).toBeFalsy();

    /*
     * ----- valid length
     */

    setFormValue( { contact_subject: 'Test Subject with valid length' } );

    expect( ctrl.errors ).toBeFalsy();

    expect( ctrl.errors?.[ 'minlength' ] ).toBeFalsy();

    /*
     * ----- length to long
     */

    const long_string : string = 'a'.repeat( 151 );

    setFormValue( { contact_subject: long_string } );

    expect( ctrl.errors ).toBeTruthy();

    expect( ctrl.errors?.[ 'minlength' ] ).toBeFalsy();
    expect( ctrl.errors?.[ 'maxlength' ] ).toBeTruthy();
  });


  it( 'should require messagetext with minLength and maxLength', async () =>
  {
    await getNewTestbed( { contact_text: 'abcd' } );

    const ctrl = component.myUserForm.get( 'contact_text' )!;

    expect( ctrl.errors ) .toBeTruthy();

    expect( ctrl.errors?.[ 'required'  ] ).toBeFalsy();

    expect( ctrl.errors?.[ 'minlength' ] ).toBeTruthy();
    expect( ctrl.errors?.[ 'maxlength' ] ).toBeFalsy();

    /*
     * ----- valid length
     */

    setFormValue( { contact_text: 'Test Subject with valid length' } );

    expect( ctrl.errors ).toBeFalsy();

    expect( ctrl.errors?.[ 'minlength' ] ).toBeFalsy();
    expect( ctrl.errors?.[ 'maxlength' ] ).toBeFalsy();

    /*
     * ----- length to long
     */

    const long_string : string = 'a'.repeat( 2001 );

    setFormValue( { contact_text: long_string } );

    expect( ctrl.errors ).toBeTruthy();

    expect( ctrl.errors?.[ 'minlength' ] ).toBeFalsy();
    expect( ctrl.errors?.[ 'maxlength' ] ).toBeTruthy();
  });


  it( 'should return contact_name control', async () =>
  {
    await getNewTestbed( { contact_name: 'Testtext' } );

    const ctrl : AbstractControl | null = component.myUserForm.get( 'contact_name' )!;

    const ctrl2 : AbstractControl | null = component.contact_name;

    let knz_equals = ctrl === ctrl2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl ) .toBeTruthy();

    expect( ctrl2 ) .toBeTruthy();
  });


  it( 'should return contact_email control', async () =>
  {
    await getNewTestbed( { contact_email: 'test@example.com' } );

    const ctrl : AbstractControl | null = component.myUserForm.get( 'contact_email' )!;

    const ctrl2 : AbstractControl | null = component.contact_email;

    let knz_equals = ctrl === ctrl2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl ) .toBeTruthy();

    expect( ctrl2 ) .toBeTruthy();
  });


  it( 'should return contact_subject control', async () =>
  {
    await getNewTestbed( { contact_subject: 'abcdef' } );

    const ctrl : AbstractControl | null = component.myUserForm.get( 'contact_subject' )!;

    const ctrl2 : AbstractControl | null = component.contact_subject;

    let knz_equals = ctrl === ctrl2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl ) .toBeTruthy();

    expect( ctrl2 ) .toBeTruthy();
  });


  it( 'should return contact_text control', async () =>
  {
    await getNewTestbed( { contact_text: 'Testtext' } );

    const ctrl : AbstractControl | null = component.myUserForm.get( 'contact_text' )!;

    const ctrl2 : AbstractControl | null = component.contact_text;

    let knz_equals = ctrl === ctrl2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl ) .toBeTruthy();

    expect( ctrl2 ) .toBeTruthy();
  });


  it( 'should validate correct email-adresses', async () =>
  {
    await getNewTestbed( { contact_email: 'email.adress@valid.com' } );

    let str_arr : string[] = [

      "t@e.st",
      "te_st@example.com",

      "name1.name2@domain.tld",
      "name1.name2@subdomain1.domain.tld",
      "name1.name2@subdomain1.subdomain2.domain.tld"
    ];

    for ( let arr_index : number = 0; arr_index < str_arr.length; arr_index++ )
    {
      expect( component.validateEmailAdress( str_arr[ arr_index ] ) ).toBeNull();
    }
  });


  it( 'should give an error on incorrect email-adresses', async () =>
  {
    await getNewTestbed( { contact_email: 'email.adress@not.valid.com' } );

    let str_arr : string[] = [

      "",
      "test",
      ".test@example.com",
      "_test@example.com",
      "test.@example.com",
      "test@.example.com",
      "test@example.com.",
      "test@@example.com",
      "test@example@com",
      "@example.com",
      "example.com@",
      "test.example.com",
      "test@examplecom",
      "te.st@examplecom",
      "te..st@example.com",
    ];

    for ( let arr_index : number = 0; arr_index < str_arr.length; arr_index++ )
    {
      expect( component.validateEmailAdress( str_arr[ arr_index ] ) ).not.toBeNull();;
    }
  });

});
