import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit
{
  contact_show_confirm_message : boolean = false;

  myUserForm! : FormGroup;

  ngOnInit(): void
  {
    this.myUserForm = new FormGroup(
      {
        contact_name:    new FormControl('', [ Validators.required, Validators.minLength(1),  Validators.maxLength(250)  ] ),
        contact_email:   new FormControl('', [ Validators.required, Validators.maxLength(255), this.customEmailValidator.bind( this ) ] ),
        contact_subject: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(150)  ] ),
        contact_text:    new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(2000) ] )
      });
  }

  customEmailValidator( control: AbstractControl ) : ValidationErrors | null
  {
    const value = control.value;

    if (value == null || value === '') { return null; }

    let validate_msg : string | null = this.validateEmailAdress( value );

    return validate_msg ? { notAEmail: true, validateMsg : validate_msg } : null;
  }

  /*
   * https://github.com/ea234/FkEMailValidator
   */
  private validateEmailAdress( pEingabe : string ): string | null
  {
    if ( pEingabe === undefined ) return 'Eingabe ist "undefined"';

    var pruef_str = pEingabe.trim();

    var len_pruef_str = pruef_str.length;

    if ( ( len_pruef_str < 6 ) || ( len_pruef_str > 254 ) ) return 'Laengenbegrenzungen';

    var pos_at_zeichen = -1;

    var letzter_punkt = -1;

    var zeichen_zaehler = 0;

    var akt_index = 0;

    while ( akt_index < len_pruef_str )
    {
      var aktuelles_zeichen = pruef_str.charAt( akt_index );

      if ( ( ( aktuelles_zeichen >= 'a' ) && ( aktuelles_zeichen <= 'z' ) ) || ( ( aktuelles_zeichen >= 'A' ) && ( aktuelles_zeichen <= 'Z' ) ) )
      {
        zeichen_zaehler++;
      }
      else if ( ( ( aktuelles_zeichen >= '0' ) && ( aktuelles_zeichen <= '9' ) ) || ( aktuelles_zeichen == '_' ) || ( aktuelles_zeichen == '-' ) )
      {
        if ( zeichen_zaehler === 0 ) return 'Zahl oder Sonderzeichen nur nach einem Zeichen hinter ABC (Teilstring darf nicht mit Zahl oder Sonderzeichen beginnen)';
      }
      else if ( aktuelles_zeichen === '.' )
      {
        if ( letzter_punkt === -1 )
        {
          if ( akt_index === 0 ) return 'kein Beginn mit einem Punkt';
        }
        else
        {
          if ( akt_index - letzter_punkt === 1 ) return 'keine zwei Punkte hintereinander';
        }

        letzter_punkt = akt_index;

        zeichen_zaehler = 0;
      }
      else if ( aktuelles_zeichen === '@' )
      {
        if ( pos_at_zeichen === -1 )
        {
          if ( akt_index === 0 ) return 'kein AT-Zeichen am Anfang';

          if ( akt_index > 64 ) return 'RFC 5321 ==> SMTP-Protokoll ==> maximale Laenge des Local-Parts sind 64 Bytes';

          if ( ( akt_index + 1 ) === len_pruef_str ) return 'kein AT-Zeichen am Ende';

          if ( akt_index - letzter_punkt === 1 ) return 'ungueltige Zeichenkombination ".@"';

          if ( pruef_str.charAt( akt_index + 1 ) === '.' ) return 'ungueltige Zeichenkombination "@."';

          pos_at_zeichen = akt_index;
        }
        else
        {
          return 'kein weiteres AT-Zeichen zulassen, sofern schon eins gefunden wurde';
        }
      }
      else
      {
        return 'ungueltiges Zeichen in der Eingabe gefunden';
      }

      akt_index++;
    }

    if ( letzter_punkt === -1 ) return 'keinen Punkt gefunden';

    if ( pos_at_zeichen === -1 ) return 'kein AT-Zeichen gefunden';

    if ( letzter_punkt < pos_at_zeichen ) return 'der letzte Punkt muss nach dem AT-Zeichen liegen ( ... hier eben die negative Form, wenn der letzte Punkt vor dem AT-Zeichen stand ist es ein Fehler )';

    if ( ( letzter_punkt + 1 ) === len_pruef_str ) return 'der letzte Punkt darf nicht am Ende liegen';

    /*
     * ... sind alle Pruefungen ueberstanden, ist es wohl eine gueltige eMail-Adresse.
     */
    return null;
   }


  onSubmit(): void
  {
    if ( this.myUserForm )
    {
      if ( this.myUserForm.valid )
      {
        const formValue = this.myUserForm.value; // Hier weiterverarbeiten, z.B. senden an API console.log('Form submitted', formValue);

        console.log( formValue );


        this.contact_show_confirm_message = true;
      }
    }
  }

  get contact_name()    { return this.myUserForm.get( 'contact_name'   ); }

  get contact_email()   { return this.myUserForm.get( 'contact_email'  ); }

  get contact_subject() { return this.myUserForm.get( 'contact_subject'); }

  get contact_text()    { return this.myUserForm.get( 'contact_text'   ); }

  showContactForm() : boolean
  {
    return !this.contact_show_confirm_message;
  }

  showConfirmMessage() : boolean
  {
    return this.contact_show_confirm_message;
  }
}
