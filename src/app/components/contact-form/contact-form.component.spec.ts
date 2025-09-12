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

    const ctrl_input_1 : AbstractControl | null = component.myUserForm.get( 'contact_name' )!;

    const ctrl_input_2 : AbstractControl | null = component.contact_name;

    let knz_equals = ctrl_input_1 === ctrl_input_2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl_input_1.errors ).toBeTruthy();

    expect( ctrl_input_1.errors?.[ 'required'  ] ).toBeFalsy();

    expect( ctrl_input_1.errors?.[ 'minlength' ] ).toBeTruthy();
  });


  it( 'should enforce maxLength for contact_name (250)', async () =>
  {
    const long_string : string = 'a'.repeat(251);

    await getNewTestbed({ contact_name: long_string });

    const ctrl_input_1 = component.myUserForm.get( 'contact_name' )!;

    expect( ctrl_input_1.errors ).toBeTruthy();

    expect( ctrl_input_1.errors?.[ 'maxlength' ] ).toBeTruthy();
  });


  it( 'should not allow false eMail-Adress', async () =>
  {
    await getNewTestbed( { contact_email: 'not-an-email' } );

    let ctrl_input_1 = component.myUserForm.get( 'contact_email' )!;

    expect( ctrl_input_1.errors ).toBeTruthy();

    expect( ctrl_input_1.errors?.[ 'notAEmail'   ] ).toBeTruthy();
    expect( ctrl_input_1.errors?.[ 'validateMsg' ] ).toBeTruthy();

    setFormValue( { contact_email: 'test@example.com' } );

    expect( ctrl_input_1.errors ).toBeFalsy();

    expect( ctrl_input_1.errors?.[ 'notAEmail'   ] ).toBeFalsy();
    expect( ctrl_input_1.errors?.[ 'validateMsg' ] ).toBeFalsy();

    setFormValue( { contact_email: '.no.start@with.dot.com' } );

    expect( ctrl_input_1.errors ).toBeTruthy();

    expect( ctrl_input_1.errors?.[ 'notAEmail'   ] ).toBeTruthy();
    expect( ctrl_input_1.errors?.[ 'validateMsg' ] ).toBeTruthy();
  });


  it( 'should not allow valid eMail-Adress', async () =>
  {
    await getNewTestbed( { contact_email: 'test@example.com' } );

    let ctrl_input_1 = component.myUserForm.get( 'contact_email' )!;

    expect( ctrl_input_1.errors ).toBeFalsy();

    expect( ctrl_input_1.errors?.[ 'notAEmail'   ] ).toBeFalsy();
    expect( ctrl_input_1.errors?.[ 'validateMsg' ] ).toBeFalsy();
  });


  it( 'should require subject with minLength 5 and maxLength 150', async () =>
  {
    await getNewTestbed( { contact_subject: 'abcd' } );

    const ctrl_input_1 = component.myUserForm.get( 'contact_subject' )!;

    expect( ctrl_input_1.errors ).toBeTruthy();

    expect( ctrl_input_1.errors?.[ 'required'  ] ).toBeFalsy();

    expect( ctrl_input_1.errors?.[ 'minlength' ] ).toBeTruthy();
    expect( ctrl_input_1.errors?.[ 'maxlength' ] ).toBeFalsy();

    /*
     * ----- valid length
     */

    setFormValue( { contact_subject: 'Test Subject with valid length' } );

    expect( ctrl_input_1.errors ).toBeFalsy();

    expect( ctrl_input_1.errors?.[ 'minlength' ] ).toBeFalsy();

    /*
     * ----- length to long
     */

    const long_string : string = 'a'.repeat( 151 );

    setFormValue( { contact_subject: long_string } );

    expect( ctrl_input_1.errors ).toBeTruthy();

    expect( ctrl_input_1.errors?.[ 'minlength' ] ).toBeFalsy();
    expect( ctrl_input_1.errors?.[ 'maxlength' ] ).toBeTruthy();
  });


  it( 'should require messagetext with minLength and maxLength', async () =>
  {
    await getNewTestbed( { contact_text: 'abcd' } );

    const ctrl_input_1 = component.myUserForm.get( 'contact_text' )!;

    expect( ctrl_input_1.errors ).toBeTruthy();

    expect( ctrl_input_1.errors?.[ 'required'  ] ).toBeFalsy();

    expect( ctrl_input_1.errors?.[ 'minlength' ] ).toBeTruthy();
    expect( ctrl_input_1.errors?.[ 'maxlength' ] ).toBeFalsy();

    /*
     * ----- valid length
     */

    setFormValue( { contact_text: 'Test Subject with valid length' } );

    expect( ctrl_input_1.errors ).toBeFalsy();

    expect( ctrl_input_1.errors?.[ 'minlength' ] ).toBeFalsy();
    expect( ctrl_input_1.errors?.[ 'maxlength' ] ).toBeFalsy();

    /*
     * ----- length to long
     */

    const long_string : string = 'a'.repeat( 2001 );

    setFormValue( { contact_text: long_string } );

    expect( ctrl_input_1.errors ).toBeTruthy();

    expect( ctrl_input_1.errors?.[ 'minlength' ] ).toBeFalsy();
    expect( ctrl_input_1.errors?.[ 'maxlength' ] ).toBeTruthy();
  });


  it( 'should return contact_name control', async () =>
  {
    await getNewTestbed( { contact_name: 'Testtext' } );

    const ctrl_input_1 : AbstractControl | null = component.myUserForm.get( 'contact_name' )!;

    const ctrl_input_2 : AbstractControl | null = component.contact_name;

    let knz_equals = ctrl_input_1 === ctrl_input_2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl_input_1 ).toBeTruthy();

    expect( ctrl_input_2 ).toBeTruthy();
  });


  it( 'should return contact_email control', async () =>
  {
    await getNewTestbed( { contact_email: 'test@example.com' } );

    const ctrl_input_1 : AbstractControl | null = component.myUserForm.get( 'contact_email' )!;

    const ctrl_input_2 : AbstractControl | null = component.contact_email;

    let knz_equals = ctrl_input_1 === ctrl_input_2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl_input_1 ).toBeTruthy();

    expect( ctrl_input_2 ).toBeTruthy();
  });


  it( 'should return contact_subject control', async () =>
  {
    await getNewTestbed( { contact_subject: 'abcdef' } );

    const ctrl_input_1 : AbstractControl | null = component.myUserForm.get( 'contact_subject' )!;

    const ctrl_input_2 : AbstractControl | null = component.contact_subject;

    let knz_equals = ctrl_input_1 === ctrl_input_2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl_input_1 ).toBeTruthy();

    expect( ctrl_input_2 ).toBeTruthy();
  });


  it( 'should return contact_text control', async () =>
  {
    await getNewTestbed( { contact_text: 'Testtext' } );

    const ctrl_input_1 : AbstractControl | null = component.myUserForm.get( 'contact_text' )!;

    const ctrl_input_2 : AbstractControl | null = component.contact_text;

    let knz_equals = ctrl_input_1 === ctrl_input_2;

    expect( knz_equals ).toBeTrue();

    expect( ctrl_input_1 ).toBeTruthy();

    expect( ctrl_input_2 ).toBeTruthy();
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
